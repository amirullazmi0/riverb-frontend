import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

import { clearAuthFromStore, syncTokensToStore } from "@/lib/auth-sync";
import type { AuthResponse } from "@/types/auth";

const PUBLIC_PATHS = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const getAuthToken = () => {
  return Cookies.get("accessToken") || "";
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    throw error;
  },
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const shouldSkipRefresh = (url?: string) => {
  return PUBLIC_PATHS.some((path) => path !== "/" && url?.includes(path));
};

const redirectToLogin = () => {
  Cookies.remove("accessToken", { path: "/" });
  Cookies.remove("refreshToken", { path: "/" });
  clearAuthFromStore();

  if (
    typeof window !== "undefined" &&
    !PUBLIC_PATHS.includes(window.location.pathname)
  ) {
    window.location.href = "/auth/sign-in";
  }
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const handleQueuedRequest = (originalRequest: RetryableRequestConfig) => {
  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  }).then((token) => {
    originalRequest.headers.Authorization = `Bearer ${token}`;
    return axiosInstance(originalRequest);
  });
};

const handleRefreshToken = async (originalRequest: RetryableRequestConfig) => {
  const refreshToken = Cookies.get("refreshToken");

  if (!refreshToken) {
    processQueue(new Error("No refresh token"), null);
    redirectToLogin();
    throw new Error("No refresh token");
  }

  try {
    const response = await axiosInstance.post(
      "/auth/refresh",
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    const data = response.data.data as
      | AuthResponse
      | {
          accessToken?: string;
          refreshToken?: string;
        };
    const newAccessToken =
      "access_token" in data ? data.access_token : data.accessToken;
    const newRefreshToken =
      "refresh_token" in data ? data.refresh_token : data.refreshToken;

    if (response.data.success && newAccessToken) {
      Cookies.set("accessToken", newAccessToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      if (newRefreshToken) {
        Cookies.set("refreshToken", newRefreshToken, {
          expires: 30,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });
      }

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      syncTokensToStore(newAccessToken, newRefreshToken);
      processQueue(null, newAccessToken);

      return axiosInstance(originalRequest);
    }

    throw new Error("Invalid refresh token response");
  } catch (refreshError) {
    processQueue(refreshError as Error, null);
    redirectToLogin();
    throw refreshError;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (shouldSkipRefresh(originalRequest.url)) {
        throw error;
      }

      if (isRefreshing) {
        return handleQueuedRequest(originalRequest);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        return await handleRefreshToken(originalRequest);
      } finally {
        isRefreshing = false;
      }
    }

    throw error;
  },
);

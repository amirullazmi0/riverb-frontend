"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

import { allMutations } from "@/data-services/mutations";
import { constructUrl } from "@/data-services/utils/constructUrl";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth.store";
import type {
  AuthResponse,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
  GlobalAuthResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  User,
} from "@/types/auth";

const getApiUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  return constructUrl(`${baseUrl}${path}`);
};

const authCookieOptions = {
  expires: 7,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { setAuth, clearAuth } = useAuthStore();

  const loginMutation = useMutation<
    GlobalAuthResponse<AuthResponse>,
    Error,
    LoginRequest
  >({
    mutationFn: async (credentials) => {
      const response = await axiosInstance.post(
        getApiUrl(allMutations.login.url),
        credentials,
      );

      return response.data;
    },
    onSuccess: (data) => {
      const accessToken = data.data.access_token;
      const refreshToken = data.data.refresh_token;

      if (data.success && accessToken) {
        Cookies.set("accessToken", accessToken, authCookieOptions);

        if (refreshToken) {
          Cookies.set("refreshToken", refreshToken, {
            ...authCookieOptions,
            expires: 30,
          });
        }

        setAuth(data.data.user, accessToken, refreshToken);
        queryClient.setQueryData(["user"], data.data.user);
        toast.success("Login success");
      } else {
        toast.error("No access token found in response");
      }
    },
    onError: (error) => {
      const err = error as unknown as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message ?? error.message);
    },
  });

  const registerMutation = useMutation<
    GlobalAuthResponse<AuthResponse>,
    Error,
    RegisterRequest
  >({
    mutationFn: async (userData) => {
      const response = await axiosInstance.post(
        getApiUrl(allMutations.register.url),
        userData,
      );

      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Register success, please check your email");
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      const err = error as unknown as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message ?? error.message);
    },
  });

  const logoutMutation = useMutation<
    GlobalAuthResponse<{ message: string }>,
    Error,
    void
  >({
    mutationFn: async () => {
      const response = await axiosInstance.post(getApiUrl(allMutations.logout.url));
      return response.data;
    },
    onSuccess: () => {
      clearAuth();
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      queryClient.clear();

      window.location.href = "/auth/sign-in";
    },
    onError: () => {
      clearAuth();
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      queryClient.clear();

      window.location.href = "/auth/sign-in";
    },
  });

  const forgetPasswordMutation = useMutation<
    GlobalAuthResponse<ForgetPasswordResponse>,
    Error,
    ForgetPasswordRequest
  >({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(
        getApiUrl(allMutations.forgetPassword.url),
        data,
      );

      return response.data;
    },
  });

  const resetPasswordMutation = useMutation<
    GlobalAuthResponse<{ message: string }>,
    Error,
    ResetPasswordRequest
  >({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(
        getApiUrl(allMutations.resetPassword.url),
        data,
      );

      return response.data;
    },
  });

  const userQuery = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const token = Cookies.get("accessToken");

      if (!token) {
        return null;
      }

      try {
        const response = await axiosInstance.get("/users/profile");

        if (response.data.success && response.data.data) {
          return response.data.data;
        }

        return null;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!Cookies.get("accessToken"),
  });

  useEffect(() => {
    if (userQuery.data) {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (accessToken) {
        setAuth(userQuery.data, accessToken, refreshToken || "");
      }
    } else if (!Cookies.get("accessToken")) {
      clearAuth();
    }
  }, [userQuery.data, setAuth, clearAuth]);

  const isAuthenticated = () => {
    return !!userQuery.data && !userQuery.isError;
  };

  const isLoading = () => {
    return (
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending ||
      userQuery.isLoading
    );
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    forgetPassword: forgetPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    loginState: {
      isLoading: loginMutation.isPending,
      isError: loginMutation.isError,
      error: loginMutation.error,
      isSuccess: loginMutation.isSuccess,
      data: loginMutation.data,
    },
    registerState: {
      isLoading: registerMutation.isPending,
      isError: registerMutation.isError,
      error: registerMutation.error,
      isSuccess: registerMutation.isSuccess,
      data: registerMutation.data,
    },
    logoutState: {
      isLoading: logoutMutation.isPending,
      isError: logoutMutation.isError,
      error: logoutMutation.error,
      isSuccess: logoutMutation.isSuccess,
    },
    forgetPasswordState: {
      isLoading: forgetPasswordMutation.isPending,
      isError: forgetPasswordMutation.isError,
      error: forgetPasswordMutation.error,
      isSuccess: forgetPasswordMutation.isSuccess,
      data: forgetPasswordMutation.data,
    },
    resetPasswordState: {
      isLoading: resetPasswordMutation.isPending,
      isError: resetPasswordMutation.isError,
      error: resetPasswordMutation.error,
      isSuccess: resetPasswordMutation.isSuccess,
      data: resetPasswordMutation.data,
    },
    user: userQuery.data,
    userLoading: userQuery.isLoading,
    userError: userQuery.error,
    refetchUser: userQuery.refetch,
    isAuthenticated,
    isLoading,
    resetLoginState: () => loginMutation.reset(),
    resetRegisterState: () => registerMutation.reset(),
    resetForgetPasswordState: () => forgetPasswordMutation.reset(),
    resetResetPasswordState: () => resetPasswordMutation.reset(),
  };
};

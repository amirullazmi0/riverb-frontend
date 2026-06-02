"use client";

import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import { toast } from "sonner";

import { allMutations, type AllMutationKeys } from "@/data-services/mutations";
import { constructUrl } from "@/data-services/utils/constructUrl";
import type { AllQueryKeys } from "@/data-services/queries";
import { LoadingContext } from "@/provider/QueryProvider";
import { axiosInstance } from "@/lib/axios";
import type { AxiosErrorResponse } from "@/types/api/responses";

interface ApiResponse {
  message?: string;
}

type MutationApiRequestProps<T> = {
  key: AllMutationKeys;
  params?: Record<string, string>;
  queries?: Record<string, string | number | boolean>;
  options?: {
    onSuccess?: (data?: T) => void;
    onError?: (error?: Error) => void;
    onSettled?: () => void;
  };
  config?: {
    showLoading?: boolean;
    successNotification?: boolean;
    errorNotification?: boolean;
    successNotificationMessage?: string;
    errorNotificationMessage?: string;
  };
};

const useMutationApiRequest = <T, V>({
  key,
  queries,
  options,
  params,
  config = {
    showLoading: true,
    successNotification: true,
    errorNotification: true,
  },
}: MutationApiRequestProps<T>) => {
  const queryClient = useQueryClient();
  const mutationConfig = allMutations[key];
  const { setLoading } = useContext(LoadingContext);

  const mutationFn = async (data: V): Promise<T> => {
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;
    const url = constructUrl(mutationConfig.url, { query: params });
    const headers: Record<string, string> = {};

    if (isFormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    const requestConfig: AxiosRequestConfig = {
      url,
      method: mutationConfig.method,
      data,
      params: queries,
      headers,
    };
    const response = await axiosInstance(requestConfig);

    return response.data;
  };

  return useMutation<T, AxiosErrorResponse, V>({
    mutationFn,
    onMutate: () => {
      if (config.showLoading) setLoading(true);
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);

      if (mutationConfig.refetchQueries) {
        mutationConfig.refetchQueries.forEach((queryKey: AllQueryKeys) => {
          queryClient.refetchQueries({ queryKey: [queryKey] });
        });
      }

      if (config.successNotification ?? true) {
        toast.success(
          config.successNotificationMessage ??
            (data as ApiResponse)?.message ??
            "Operation successful",
        );
      }
    },
    onError: (error) => {
      options?.onError?.(error);

      if (config.errorNotification ?? true) {
        toast.error(
          config.errorNotificationMessage ??
            error.response?.data?.error ??
            error.response?.data?.message ??
            error.message ??
            "Something went wrong",
        );
      }
    },
    onSettled: () => {
      options?.onSettled?.();
      if (config.showLoading) setLoading(false);
    },
  });
};

export default useMutationApiRequest;

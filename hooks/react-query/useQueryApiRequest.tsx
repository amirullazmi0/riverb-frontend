"use client";

import { useContext, useEffect } from "react";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";

import { allQueries } from "@/data-services/queries";
import { constructUrl } from "@/data-services/utils/constructUrl";
import { LoadingContext } from "@/provider/QueryProvider";
import { axiosInstance } from "@/lib/axios";
import type { AxiosErrorResponse } from "@/types/api/responses";

type QueryApiRequestProps<T> = {
  key: keyof typeof allQueries;
  params?: Record<string, unknown>;
  queries?: Record<string, unknown>;
  options?: Omit<UseQueryOptions<T, AxiosErrorResponse>, "queryKey" | "queryFn">;
  onSuccess?: (data: T) => void;
  config?: {
    showLoading?: boolean;
    successNotification?: boolean;
    errorNotification?: boolean;
    successNotificationMessage?: string;
    errorNotificationMessage?: string;
  };
};

const useQueryApiRequest = <T,>({
  key,
  params,
  queries,
  options,
  config = {
    showLoading: true,
    successNotification: false,
    errorNotification: true,
  },
  onSuccess,
}: QueryApiRequestProps<T>) => {
  const queryKey = [key, params, queries];
  const { setLoading } = useContext(LoadingContext);

  const queryFn = async (): Promise<T> => {
    const url = constructUrl(allQueries[key], {
      query: params as Record<string, string> | undefined,
    });
    const response = await axiosInstance.get(url, {
      params: queries,
    });

    return response.data;
  };

  const queryFetch = useQuery<T, AxiosErrorResponse>({
    queryKey,
    queryFn,
    ...options,
  });

  useEffect(() => {
    if (config.showLoading) {
      if (queryFetch.isLoading) setLoading(true);
      if (queryFetch.isError || queryFetch.isSuccess) setLoading(false);
    }

    if (queryFetch.isError && config.errorNotification) {
      toast.error(
        config.errorNotificationMessage ??
          queryFetch.error.response?.data?.message ??
          queryFetch.error.message ??
          "Failed to fetch data",
      );
    }

    if (queryFetch.isSuccess) {
      if (onSuccess && queryFetch.data) {
        onSuccess(queryFetch.data);
      }

      if (config.successNotification) {
        const responseMessage =
          queryFetch.data &&
          typeof queryFetch.data === "object" &&
          "message" in queryFetch.data
            ? (queryFetch.data as { message?: string }).message
            : undefined;

        toast.success(
          config.successNotificationMessage ??
            responseMessage ??
            "Data loaded successfully",
        );
      }
    }
  }, [
    queryFetch.isLoading,
    queryFetch.isError,
    queryFetch.isSuccess,
    queryFetch.data,
    queryFetch.error,
    config,
    onSuccess,
    setLoading,
  ]);

  return queryFetch;
};

export default useQueryApiRequest;

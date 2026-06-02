import type { AxiosError } from "axios";

export interface GlobalApiResponse<T = unknown> {
  message: string;
  success: boolean;
  data?: T;
  meta?: {
    total_data: number;
    total_page: number;
    current_page: number;
    limit: number;
  };
}

export type AxiosErrorResponse = AxiosError<ErrorResponse>;

export interface ErrorResponse {
  error: string;
  message: string;
}

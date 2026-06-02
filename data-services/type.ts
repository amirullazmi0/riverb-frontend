import type { AllQueryKeys } from "@/data-services/queries";

export type MutationDataService<T extends string> = {
  [key in T]: {
    url: string;
    method: "POST" | "PATCH" | "DELETE" | "PUT";
    refetchQueries?: AllQueryKeys[];
  };
};

export type QueriesDataService<T extends string> = {
  [key in T]: string;
};

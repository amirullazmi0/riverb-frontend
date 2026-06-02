import type { QueriesDataService } from "@/data-services/type";
import { authQueries, type AuthQueryKeys } from "@/data-services/queries/auth";

export type AllQueryKeys = AuthQueryKeys;

export const allQueries: QueriesDataService<AllQueryKeys> = {
  ...authQueries,
};

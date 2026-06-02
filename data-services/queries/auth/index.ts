import type { QueriesDataService } from "@/data-services/type";

export type AuthQueryKeys = "profile" | "authStatus";

export const authQueries: QueriesDataService<AuthQueryKeys> = {
  profile: "/auth/profile",
  authStatus: "/auth/status",
};

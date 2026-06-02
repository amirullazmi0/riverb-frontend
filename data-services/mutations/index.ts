import type { MutationDataService } from "@/data-services/type";
import { authMutations, type AuthKeys } from "@/data-services/mutations/auth";

export type AllMutationKeys = AuthKeys;

export const allMutations: MutationDataService<AllMutationKeys> = {
  ...authMutations,
};

import type { User } from "@/types/auth";
import { useAuthStore } from "@/stores/auth.store";

export const syncTokensToStore = (
  accessToken: string,
  refreshToken?: string,
) => {
  const { updateTokens } = useAuthStore.getState();
  updateTokens(accessToken, refreshToken);
};

export const syncAuthToStore = (
  user: User,
  accessToken: string,
  refreshToken: string,
) => {
  const { setAuth } = useAuthStore.getState();
  setAuth(user, accessToken, refreshToken);
};

export const clearAuthFromStore = () => {
  const { clearAuth } = useAuthStore.getState();
  clearAuth();
};

export const getAuthState = () => {
  return useAuthStore.getState();
};

"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/hooks/react-query/useAuth";

interface UseAuthMiddlewareOptions {
     redirectTo?: string;
}

export function useAuthMiddleware({ redirectTo = "/auth/login" }: UseAuthMiddlewareOptions = {}) {
     const { user, isAuthenticated, userLoading } = useAuth();
     const router = useRouter();
     const pathname = usePathname();

     useEffect(() => {
          if (userLoading) return;

          const hasToken = isAuthenticated();
          const hasUserData = !!user;

          if (!hasToken && !hasUserData) {
               const loginUrl = new URL(redirectTo, window.location.origin);
               loginUrl.searchParams.set("redirect", pathname);
               router.push(loginUrl.toString());
               return;
          }
     }, [user, isAuthenticated, userLoading, router, pathname, redirectTo]);

     const getAccessStatus = (): boolean => {
          return !!user || isAuthenticated();
     };

     return {
          user,
          isLoading: userLoading,
          isAuthenticated: isAuthenticated(),
          hasAccess: getAccessStatus(),
     };
}

export function useAdminMiddleware() {
     return useAuthMiddleware({
          redirectTo: "/auth/login?redirect=/admin",
     });
}

export function useSuperAdminMiddleware() {
     return useAuthMiddleware({
          redirectTo: "/auth/login?redirect=/admin",
     });
}

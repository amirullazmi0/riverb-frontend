"use client";

import AuthSyncProvider from "@/provider/AuthSyncProvider";
import MainProvider from "@/provider/main.provider";
import QueryProvider from "@/provider/QueryProvider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthSyncProvider>
        <MainProvider>{children}</MainProvider>
      </AuthSyncProvider>
      <Toaster richColors />
    </QueryProvider>
  );
}

"use client";

import { useAuth } from "@/hooks/react-query/useAuth";

export default function AuthSyncProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuth();

  return <>{children}</>;
}

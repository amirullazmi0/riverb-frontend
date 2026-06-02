"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function MainProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

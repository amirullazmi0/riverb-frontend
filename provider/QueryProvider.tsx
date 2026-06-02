"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useMemo, useState } from "react";

interface QueryProviderProps {
  children: React.ReactNode;
}

interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 1,
          },
        },
      }),
  );
  const [loading, setLoading] = useState(false);
  const value = useMemo(() => ({ loading, setLoading }), [loading]);

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
    </QueryClientProvider>
  );
}

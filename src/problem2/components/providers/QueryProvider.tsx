'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * React Query provider wrapper for the application
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // Create a new QueryClient instance for each session
  // This prevents data sharing between users in SSR
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time of 60 seconds
            staleTime: 60 * 1000,
            // Retry failed requests once
            retry: 1,
          },
          mutations: {
            // Retry mutations once on failure
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

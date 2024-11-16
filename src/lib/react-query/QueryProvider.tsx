import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// Configure React Query's global settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetching on window focus
      refetchOnReconnect: false, // Disable refetching on reconnect
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
      cacheTime: 1000 * 60 * 10, // Retain unused data in memory for 10 minutes
      retry: 2, // Retry failed queries twice
    },
    mutations: {
      retry: 1, // Retry failed mutations once
    },
  },
});

const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}> {children}</QueryClientProvider>
  );
};

export default QueryProvider;

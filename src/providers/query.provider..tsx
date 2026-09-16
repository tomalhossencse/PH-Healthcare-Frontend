"use client";

import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

function MakeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1 minute
      },
    },
  });
}

let BrowserQueryClient: QueryClient | null = null;

function getQueryClient() {
  if (environmentManager.isServer()) {
    return MakeQueryClient();
  } else {
    if (!BrowserQueryClient) {
      BrowserQueryClient = MakeQueryClient();
    }
    return BrowserQueryClient;
  }
}

function QueryProvider({ children }: { children: ReactNode }) {
  const quertyClient = getQueryClient();

  return (
    <QueryClientProvider client={quertyClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;

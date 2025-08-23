import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import React, { ReactNode } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const AppQueryClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration queryClient={queryClient}>
        {children}
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools
        initialIsOpen={false}
        client={queryClient}
      />
    </QueryClientProvider>
  );
};

export default AppQueryClientProvider;

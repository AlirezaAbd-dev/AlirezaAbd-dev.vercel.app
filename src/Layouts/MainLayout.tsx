'use client';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CssBaseline } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { lightTheme, darkTheme } from './theme/theme';
import { ReactNode } from 'react';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

//? NOTE Create RTL Cache
const cacheRTL = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const MainLayout = ({
  children,
  mode,
}: {
  children: ReactNode;
  mode: 'dark' | 'light';
}) => {
  const queryClient = getQueryClient();

  const theme = mode === 'dark' ? darkTheme : lightTheme;
  return (
    <CacheProvider value={cacheRTL}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryStreamedHydration>
            <CssBaseline />
            <Grid
              container
              sx={{
                height: '100vh',
              }}
            >
              {children}
            </Grid>
          </ReactQueryStreamedHydration>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MainLayout;

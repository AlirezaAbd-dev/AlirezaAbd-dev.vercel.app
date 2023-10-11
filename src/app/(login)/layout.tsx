'use client';

import '../../assets/css/styles.css';

import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CssBaseline } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { darkTheme as theme } from '../../Layouts/theme/theme';

//? NOTE Create RTL Cache
const cacheRTL = createCache({
   key: 'muirtl',
   stylisPlugins: [prefixer, rtlPlugin],
});

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='fa'>
         <body dir='rtl'>
            <CacheProvider value={cacheRTL}>
               <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Grid
                     container
                     sx={{
                        height: '100vh',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                     {children}
                  </Grid>
               </ThemeProvider>
            </CacheProvider>
         </body>
      </html>
   );
}

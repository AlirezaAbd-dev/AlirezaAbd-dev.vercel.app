"use client";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CssBaseline } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { lightTheme, darkTheme } from "./theme/theme";
import { ReactNode } from "react";

//? NOTE Create RTL Cache
const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const MainLayout = ({
  children,
  mode,
}: {
  children: ReactNode;
  mode: "dark" | "light";
}) => {
  const theme = mode === "dark" ? darkTheme : lightTheme;
  return (
    <CacheProvider value={cacheRTL}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          container
          sx={{
            height: "100vh",
          }}
        >
          {children}
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MainLayout;

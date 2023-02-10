"use client";
import { useState, useCallback, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import SwipeableViews from "react-swipeable-views";

import MainLayout from "@/Layouts/MainLayout";
import { Sidebar } from "@/components/sidebar";
import SidebarContainer from "@/containers/SidebarContainer";
import MainContext from "@/context";
import PagesContainer from "@/containers/PagesContainer";
import { DrawerActionButton } from "@/components/drawer";

function AppContainer({ children }) {
  const [pageNumber, setPageNumber] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState();

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  useEffect(() => {
    isMdUp && setDrawerOpen(false);
  }, [isMdUp]);

  const handlePageNumber = useCallback((_event, newValue) => {
    setPageNumber(newValue);
  }, []);

  const handleThemeChange = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  return (
    <MainContext.Provider
      value={{
        pageNumber,
        handlePageNumber,
        drawerOpen,
        setDrawerOpen,
        handleThemeChange,
      }}
    >
      <MainLayout mode={mode}>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>

        <DrawerActionButton />

        <PagesContainer>
          <SwipeableViews
            axis={theme.direction === "ltr" ? "x-reverse" : "x"}
            index={pageNumber}
            onChangeIndex={handlePageNumber}
          >
            {children}
          </SwipeableViews>
        </PagesContainer>
      </MainLayout>
    </MainContext.Provider>
  );
}

export default AppContainer;

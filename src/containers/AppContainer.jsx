import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import SwipeableViews from "react-swipeable-views";

import MainLayout from "../Layouts/MainLayout";
import { Sidebar } from "../components/sidebar";
import Page from "../pages/components/Page";
import SidebarContainer from "./SidebarContainer";
import MainContext from "../context";
import PagesContainer from "./PagesContainer";
import { DrawerActionButton } from "../components/drawer";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const MyProjects = lazy(() => import("../pages/MyProjects"));
const Contact = lazy(() => import("../pages/Contact"));

function AppContainer() {
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
            <Page index={0}>
              <Suspense fallback={<LoadingSpinner />}>
                <Home />
              </Suspense>
            </Page>
            <Page index={1}>
              <Suspense fallback={<LoadingSpinner />}>
                <About />
              </Suspense>
            </Page>
            <Page index={2}>
              <Suspense fallback={<LoadingSpinner />}>
                <MyProjects />
              </Suspense>
            </Page>
            <Page index={3}>
              <Suspense fallback={<LoadingSpinner />}>
                <Contact />
              </Suspense>
            </Page>
          </SwipeableViews>
        </PagesContainer>
      </MainLayout>
    </MainContext.Provider>
  );
}

export default AppContainer;

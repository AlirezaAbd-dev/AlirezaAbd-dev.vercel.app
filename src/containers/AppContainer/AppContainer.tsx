'use client';
import {
  useState,
  useCallback,
  useEffect,
  ReactNode,
  SyntheticEvent,
  use,
} from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import MainLayout from '../../Layouts/MainLayout';
import MainContext from '../../context';
import { usePathname } from 'next/navigation';

import AppContainerContent from './AppContainerContent';
import AppQueryClientProvider from './AppQueryClientProvider';
import { adminTabs } from '@/components/data/tabsData.sidebar';

function AppContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  let pageNumberFromPathname = 0;

  useEffect(() => {
    pageNumberFromPathname =
      adminTabs.filter((tab) => tab.path === pathname)[0]?.id || 0;
  }, [pathname]);

  const [pageNumber, setPageNumber] = useState(pageNumberFromPathname);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState<'dark' | 'light'>('dark');

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const onSetDrawerOpen = useCallback((isOpen: boolean) => {
    setDrawerOpen(isOpen);
  }, []);

  useEffect(() => {
    isMdUp && onSetDrawerOpen(false);
  }, [isMdUp, onSetDrawerOpen]);

  const handlePageNumber = useCallback(
    (e: SyntheticEvent, newValue: number) => {
      setPageNumber(newValue);
    },
    [],
  );

  const handleThemeChange = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <AppQueryClientProvider>
      <MainContext.Provider
        value={{
          pageNumber,
          handlePageNumber,
          drawerOpen,
          setDrawerOpen: onSetDrawerOpen,
          handleThemeChange,
        }}
      >
        <MainLayout mode={mode}>
          <AppContainerContent>{children}</AppContainerContent>
        </MainLayout>
      </MainContext.Provider>
    </AppQueryClientProvider>
  );
}

export default AppContainer;

'use client';
import {
   useState,
   useCallback,
   useEffect,
   ReactNode,
   SyntheticEvent,
} from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

import MainLayout from '../Layouts/MainLayout';
import { Sidebar } from '../components/sidebar';
import SidebarContainer from '../containers/SidebarContainer';
import MainContext from '../context';
import PagesContainer from '../containers/PagesContainer';
import { DrawerActionButton } from '../components/drawer';
import { usePathname } from 'next/navigation';

function AppContainer({ children }: { children: ReactNode }) {
   const pathname = usePathname();

   let pageNumberFromPathname = 0;
   switch (pathname) {
      case '/':
         pageNumberFromPathname = 0;
         break;
      case '/about':
         pageNumberFromPathname = 1;
         break;
      case '/myProjects':
         pageNumberFromPathname = 2;
         break;
      case '/contactUs':
         pageNumberFromPathname = 3;
         break;
      case '/admin':
         pageNumberFromPathname = 4;
         break;
   }

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
      (e: SyntheticEvent | undefined, newValue: number) => {
         setPageNumber(newValue);
      },
      [],
   );

   const handleThemeChange = useCallback(() => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
   }, []);

   return (
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
            <SidebarContainer>
               <Sidebar />
            </SidebarContainer>

            <DrawerActionButton />

            <PagesContainer>
               <SwipeableViews
                  axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'}
               >
                  {children}
               </SwipeableViews>
            </PagesContainer>
         </MainLayout>
      </MainContext.Provider>
   );
}

export default AppContainer;

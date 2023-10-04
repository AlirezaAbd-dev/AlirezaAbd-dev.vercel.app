'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Tab, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const Tabs = dynamic(() => import('@mui/material').then((mui) => mui.Tabs), {
   ssr: false,
});

import MainContext from '../../context';

import tabs from '../data/tabsData.sidebar';

const SidebarTabs = () => {
   const { pageNumber, handlePageNumber, setDrawerOpen } =
      useContext(MainContext);
   const [isClient, setIsClient] = useState(false);

   const router = useRouter();

   const theme = useTheme();

   useEffect(() => {
      setIsClient(true);
   }, []);

   const redirectToChosenPage = (path: string) => {
      router.push(path);
   };

   const onMouseOverPrefetch = (path: string) => {
      router.prefetch(path);
   };

   return (
      <Tabs
         orientation='vertical'
         variant='scrollable'
         allowScrollButtonsMobile
         value={pageNumber}
         textColor={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
         onChange={handlePageNumber}
         sx={{
            '& .MuiTabs-indicator': {
               bgcolor: theme.palette.mode === 'light' ? 'redAccent.main' : '',
            },
         }}
      >
         {isClient &&
            tabs(localStorage.getItem('token')).map((tab, index) => {
               if (tab)
                  return (
                     <Tab
                        key={index}
                        icon={<tab.icon />}
                        iconPosition='start'
                        sx={{
                           '&.MuiTab-root': {
                              borderRadius: 1,
                              minHeight: 30,
                              my: 0.6,
                              mx: 1,
                              py: 1.5,
                           },
                        }}
                        onClick={() => {
                           setDrawerOpen(false);
                           redirectToChosenPage(tab.path);
                        }}
                        onMouseOver={onMouseOverPrefetch.bind(null, tab.path)}
                        label={tab.label}
                     />
                  );
            })}
      </Tabs>
   );
};

export default SidebarTabs;

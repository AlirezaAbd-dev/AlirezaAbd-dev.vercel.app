import React, { ReactNode } from 'react';
import SidebarContainer from '../SidebarContainer';
import { Sidebar } from '@/components/sidebar';
import { DrawerActionButton } from '@/components/drawer';
import PagesContainer from '../PagesContainer';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material';
import useProfileQuery from '@/services/main/useProfileQuery';
import Loading from '@/app/loading';

const AppContainerContent = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  const { data, isPending } = useProfileQuery();

  if (isPending) {
    return <Loading />;
  }

  if (!isPending && data)
    return (
      <>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>

        <DrawerActionButton />

        <PagesContainer>
          <SwipeableViews axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'}>
            {children}
          </SwipeableViews>
        </PagesContainer>
      </>
    );
};

export default AppContainerContent;

'use client';
import { createContext, SyntheticEvent } from 'react';

export default createContext({
   pageNumber: 0,
   handlePageNumber: (
      e: SyntheticEvent | undefined,
      newValue: number,
   ): void => {},
   drawerOpen: false,
   setDrawerOpen: (isOpen: boolean): void => {},
   handleThemeChange: () => {},
});

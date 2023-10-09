'use client';
import { createContext, SyntheticEvent } from 'react';

export default createContext({
   pageNumber: 0,
   handlePageNumber: (
      _e: SyntheticEvent | undefined,
      _newValue: number,
   ): void => {},
   drawerOpen: false,
   setDrawerOpen: (_isOpen: boolean): void => {},
   handleThemeChange: () => {},
});

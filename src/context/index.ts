"use client";
import { createContext } from "react";

export interface MainContextType {
  pageNumber: number;
  setPageNumber: (page: number) => void;
  drawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
}

const MainContext = createContext<MainContextType>({
  pageNumber: 0,
  setPageNumber: () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
});

export default MainContext;

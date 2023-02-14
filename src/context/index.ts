"use client";
import { ChangeEvent, createContext, SyntheticEvent } from "react";

export default createContext({
  pageNumber: 0,
  handlePageNumber: (
    e: SyntheticEvent,
    newValue: number
  ): void => {},
  drawerOpen: false,
  setDrawerOpen: (isOpen: boolean): void => {},
  handleThemeChange: () => {},
});

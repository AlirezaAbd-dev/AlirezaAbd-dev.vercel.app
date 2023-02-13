"use client";
import { createContext } from "react";

export default createContext({
  pageNumber: 0,
  handlePageNumber: (e: Event, newValue: number): void => {},
  drawerOpen: false,
  setDrawerOpen: (): void => {},
  handleThemeChange: () => {},
});

import { createContext } from "react";

export default createContext({
  pageNumber: 0,
  handlePageNumber: () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
  handleThemeChange: () => {},
});

import React, { useContext } from "react";

import { Tab, Tabs, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

import MainContext from "../../context";
import tabs from "../data/tabsData.sidebar";

const SidebarTabs = () => {
  const { pageNumber, handlePageNumber, setDrawerOpen } =
    useContext(MainContext);

  const theme = useTheme();

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      scrollbutton="auto"
      allowScrollButtonsMobile
      value={pageNumber}
      textColor={theme.palette.mode === "dark" ? "primary" : "secondary"}
      onChange={handlePageNumber}
      sx={{
        "& .MuiTabs-indicator": {
            bgcolor: theme.palette.mode === 'light' && "redAccent.main"
        }
      }}
      
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          label={tab.label}
          icon={tab.icon}
          iconPosition="start"
          sx={{
            "&.MuiTab-root": {
              backgroundColor:
                theme.palette.mode === "dark" ? grey[800] : grey[300],
              borderRadius: 1,
              minHeight: 30,
              my: 0.6,
              mx: 1,
              py: 1.5,
            },
          }}
          onClick={() => setDrawerOpen(false)}
          {...tab}
        />
      ))}
    </Tabs>
  );
};

export default SidebarTabs;

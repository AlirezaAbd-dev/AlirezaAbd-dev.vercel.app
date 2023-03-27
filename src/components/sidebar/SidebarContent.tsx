"use client";
import { Box } from "@mui/material";
import { SidebarFooter, SidebarHeader, SidebarTabs } from "./index";

const SidebarContent = () => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        textAlign: "center",
        mt: 2,
      }}
    >
      <SidebarHeader />

      <SidebarTabs />

      <SidebarFooter />
    </Box>
  );
};

export default SidebarContent;

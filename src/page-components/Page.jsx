"use client";
import { Box } from "@mui/material";
import { useContext } from "react";

import MainContext from "../../context";

const Page = (props) => {
  const { children, index, ...others } = props;

  const { pageNumber } = useContext(MainContext);

  return (
    <div
      role="tabpanel"
      hidden={pageNumber !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`sidebar-tab-${index}`}
      {...others}
    >
      {pageNumber === index && (
        <Box
          sx={{
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default Page;
"use client";
import { Box, LinearProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box>
      {/* @ts-ignore */}
      <LinearProgress color="progressbar" />
    </Box>
  );
};

export default Loading;

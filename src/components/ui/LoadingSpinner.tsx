import { Box, useTheme, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const LoadingSpinner = () => {
  const [mode, setMode] = useState("dark");

  const { mode: themeMode } = useTheme().palette;

  useEffect(() => {
    setMode(themeMode);
  }, [themeMode]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress
        size={100}
        color={mode === "dark" ? "primary" : "redAccent"}
      />
    </Box>
  );
};

export default LoadingSpinner;

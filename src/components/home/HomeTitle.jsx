import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";
import Typed from "typed.js";

const HomeTitle = () => {
  const theme = useTheme();

  const nameEl = useRef(null);

  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const typedName = new Typed(nameEl.current, {
      strings: [`علیرضا عابدی`],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 30,
      showCursor: false,
    });

    return () => {
      typedName.destroy();
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Typography
        variant={isSmDown ? "h4" : "h3"}
        color={
          theme.palette.mode === "dark" ? "primary.light" : "secondary.main"
        }
      >
        {`{" `}
      </Typography>
      <Typography
        textAlign="center"
        variant={isSmDown ? "h4" : "h3"}
        color={
          theme.palette.mode === "dark" ? "primary.light" : "secondary.main"
        }
        ref={nameEl}
      ></Typography>
      <Typography
        variant={isSmDown ? "h4" : "h3"}
        color={
          theme.palette.mode === "dark" ? "primary.light" : "secondary.main"
        }
      >
        {` "}`}
      </Typography>
    </Box>
  );
};

export default HomeTitle;

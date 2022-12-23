import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import TextTransition, { presets } from "react-text-transition";

const HomeSubtitle = () => {
  const [index, setIndex] = useState(0);

  const strings = useMemo(
    () => [
      "توسعه دهنده فول استک هستم",
      "دانشجوی رشته نرم افزار هستم",
      "فریلنسر هستم",
    ],
    []
  );

  useEffect(() => {
    const textInterval = setInterval(() => {
      setIndex((prevIndex) => {
        return prevIndex + 1;
      });
    }, 3000);

    return () => {
      clearInterval(textInterval);
    };
  }, [strings]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <TextTransition
        springConfig={presets.wobbly}
        inline={true}
        direction="up"
      >
        <Typography
          variant="h5"
          color="text.primary"
          sx={{
            mt: 4,
          }}
        >
          {strings[index % strings.length]}
        </Typography>
      </TextTransition>
      <Typography
        variant="h5"
        color="text.primary"
        sx={{
          mt: 4,
          mr: 1,
        }}
      >
        من یک
      </Typography>
    </Box>
  );
};

export default HomeSubtitle;

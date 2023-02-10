"use client";
import { Chip, Divider, Slide, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const HeaderDivider = ({
  color,
  icon,
  chipAlign = "center",
  animation = true,
  children,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <Slide
      direction="down"
      in={loading}
      style={{
        transitionDelay: loading && animation ? "300ms" : "0ms",
      }}
    >
      <Divider
        textAlign={chipAlign}
        sx={{
          mt: {
            xs: 5,
            sm: 5,
            md: 1,
          },
          "&::before, &::after": {
            borderColor: color,
          },
        }}
      >
        <Chip
          label={
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ textAlign: "center" }}
            >
              {children}
            </Typography>
          }
          sx={{ p: 3, bgcolor: color }}
          icon={icon}
        />
      </Divider>
    </Slide>
  );
};

export default HeaderDivider;

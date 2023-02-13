"use client";
import { ReactNode, useEffect, useState } from "react";
import { Chip, Divider, Slide, Typography } from "@mui/material";

const HeaderDivider = ({
  color,
  icon,
  chipAlign = "center",
  animation = true,
  children,
}: {
  color: string;
  icon: any;
  chipAlign?: "center" | "right";
  animation?: boolean;
  children: ReactNode;
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

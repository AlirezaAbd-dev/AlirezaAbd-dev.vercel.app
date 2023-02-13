"use client"
import { Slide, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import Image from "next/image";

import worldMap from "../../assets/tech2.png";

const EmailMe = () => {
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    setLoading(true);

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <Slide
      direction="left"
      in={loading}
      style={{
        transitionDelay: loading ? `200ms` : "0ms",
      }}
    >
      <Grid
        xs={0}
        sm={0}
        md={4}
        sx={{
          position: 'relative',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          filter: theme.palette.mode === "dark" ? "invert(100%)" : "",
        }}
      >
        <Image src={worldMap} alt="world map" width={300} height={200} style={{
          position: 'absolute',
          width: '100%',
          height: 'auto'
        }} />
        <Typography
          variant="h6"
          sx={{
            fontFamily: "vazir",
            mt: 4,
            color: "text.primary",
            filter: theme.palette.mode === "dark" && "invert(100%)",
            display: {
              xs: "none",
              sm: "none",
              md: "block",
              lg: "block",
              xl: "block",
            },
          }}
        >
          هر چیزی خواستی بهم بگو
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{
            mt: 2,
            filter: theme.palette.mode === "dark" && "invert(100%)",
            display: {
              xs: "none",
              sm: "none",
              md: "block",
            },
          }}
        >
          👋{" "}
          <a
            href="mailto:alireza.abedi9310@gmail.com"
            alt="email"
            style={{
              color: theme.palette.redAccent.main,
            }}
          >
            ایمیل
          </a>{" "}
          بزن به من
        </Typography>
      </Grid>
    </Slide>
  );
};

export default EmailMe;

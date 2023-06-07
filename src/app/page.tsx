"use client";
import { useCallback, useEffect, useState } from "react";
import { Box, Skeleton, useTheme } from "@mui/material";
import Particles from "react-particles";
// @ts-ignore
import { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import Image, { StaticImageData } from "next/image";

import bg03 from "../assets/bg03.jpg";
import bg04 from "../assets/bg04.jpg";
import { createLinks } from "../constants/particles";
import HomeTitle from "../components/home/HomeTitle";
import HomeSubtitle from "../components/home/HomeSubtitle";

const Home = () => {
  const theme = useTheme();
  const [background, setBackground] = useState<StaticImageData>(bg03);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  const mode = theme.palette.mode;

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (_container: Container | undefined) => {},
    []
  );

  useEffect(() => {
    setIsBackgroundLoaded(false);
    if (mode === "light") {
      setBackground(bg04);
    } else {
      setBackground(bg03);
    }
  }, [mode]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {!isBackgroundLoaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            zIndex: "-1",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      <Image
        priority
        src={background}
        alt="portfolio background"
        width={1500}
        height={1200}
        style={{
          display: isBackgroundLoaded ? "block" : "none",
          position: "absolute",
          zIndex: "-1",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onLoad={() => {
          setIsBackgroundLoaded(true);
        }}
      />

      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={createLinks(theme.palette.mode)}
      />

      {/* MAIN TITLE */}
      <HomeTitle />

      {/* SUBTITLE */}
      <HomeSubtitle />
    </Box>
  );
};

export default Home;

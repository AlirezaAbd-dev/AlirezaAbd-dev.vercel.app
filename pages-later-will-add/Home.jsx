import { Box, useTheme } from "@mui/material";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

import bg03 from "../assets/bg03.jpg";
import bg04 from "../assets/bg04.jpg";
import { useCallback } from "react";
import { createLinks } from "../constants/particles";
import { Helmet } from "react-helmet-async";
import HomeTitle from "../components/home/HomeTitle";
import HomeSubtitle from "../components/home/HomeSubtitle";

const Home = () => {
  const theme = useTheme();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <Box
      sx={{
        backgroundImage:
          theme.palette.mode === "dark" ? `url(${bg03})` : `url(${bg04})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Helmet>
        <title>علیرضا عابدی | صفحه اصلی</title>
      </Helmet>
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

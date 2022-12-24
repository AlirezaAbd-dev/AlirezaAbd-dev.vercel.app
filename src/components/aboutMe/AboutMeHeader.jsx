import { CodeRounded } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import HeaderDivider from "../ui/HeaderDivider";
import AboutMeMobile from "./AboutMeMobile";
import AboutMeContent from "./AboutMeContent";

const AboutMeHeader = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container sx={{ mx: 1 }}>
      <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
        <HeaderDivider
          color="secondary.main"
          chipAlign={isMdDown ? "center" : "right"}
          icon={<CodeRounded color="text.primary" />}
        >
          توسعه دهنده فول استک
        </HeaderDivider>

        <AboutMeContent />
      </Grid>
      <AboutMeMobile />
    </Grid>
  );
};

export default AboutMeHeader;

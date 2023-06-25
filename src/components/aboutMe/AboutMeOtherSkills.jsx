"use client";
import { SelfImprovementRounded } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import HeaderDivider from "../ui/HeaderDivider";

const AboutMeOtherSkills = () => {
  return (
    <Grid container>
      <Grid sx={{ width: 1, mt: 1 }}>
        <HeaderDivider
          color="primary.dark"
          animation={false}
          // @ts-ignore
          icon={<SelfImprovementRounded color="text.primary" />}
        >
          سایر مهارت ها
        </HeaderDivider>
      </Grid>
    </Grid>
  );
};

export default AboutMeOtherSkills;

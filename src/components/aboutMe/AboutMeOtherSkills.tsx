"use client";
import { SelfImprovementRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import otherSkillsData from "../data/otherSkillsData";
import HeaderDivider from "../ui/HeaderDivider";
import AboutMeSkillItem from "./AboutMeSkillItem";

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
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {otherSkillsData.map((skill) => (
            <AboutMeSkillItem key={skill.name} skill={skill} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AboutMeOtherSkills;

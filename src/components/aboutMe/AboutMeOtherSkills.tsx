"use client";
import { SelfImprovementRounded } from "@mui/icons-material";
import { Chip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import HeaderDivider from "../ui/HeaderDivider";
import { reactIcon as ReactNativeIcon } from "../../assets/icons/index";

const otherSkills = [
  {
    name: "react native",
    icon: ReactNativeIcon,
    color: "#0059ff",
  },
];

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
        <Grid container>
          {otherSkills.map((skill) => (
            <Grid sm={2} md={2} lg={4}>
              <Chip
                label={skill.name}
                sx={{
                  bgcolor: skill.color,
                }}
                icon={skill.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutMeOtherSkills;

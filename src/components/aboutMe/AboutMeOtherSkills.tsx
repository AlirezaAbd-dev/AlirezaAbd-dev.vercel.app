"use client";
import { SelfImprovementRounded } from "@mui/icons-material";
import { Chip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import HeaderDivider from "../ui/HeaderDivider";
import { reactIcon as ReactNativeIcon } from "../../assets/icons/index";
import Image from "next/image";

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
                icon={
                  <Image
                    src={skill.icon.src}
                    alt={skill.name}
                    width={50}
                    height={50}
                  />
                }
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutMeOtherSkills;

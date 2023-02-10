"use client"
import { Card, CardContent } from "@mui/material";

import EducationTimeline from "@/components/timeline/EducationTimeline";
import AboutMeHeader from "@/components/aboutMe/AboutMeHeader";
import AboutMeSkills from "@/components/aboutMe/AboutMeSkills";

const About = () => {
  return (
    <Card
      sx={{
        height: "100vh",
        backgroundColor: "background.secondary",
        overflowY: "scroll",
        borderRadius: 0,
      }}
    >
      <CardContent>
        <AboutMeHeader />

        <AboutMeSkills />

        <EducationTimeline />
      </CardContent>
    </Card>
  );
};

export default About;

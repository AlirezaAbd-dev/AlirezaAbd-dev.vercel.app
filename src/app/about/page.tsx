"use client";
import { Card, CardContent } from "@mui/material";

import EducationTimeline from "../../components/timeline/EducationTimeline";
import AboutMeHeader from "../../components/aboutMe/AboutMeHeader";
import AboutMeSkills from "../../components/aboutMe/AboutMeSkills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "علیرضا عابدی | درباره من",
  description:
    "در این صفحه میتوانید با من و توانایی های من بیشتر آشنا شوید و من را بیشتر بشناسید.",
};

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

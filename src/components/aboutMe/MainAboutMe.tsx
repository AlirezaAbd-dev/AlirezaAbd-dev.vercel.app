"use client";
import React from "react";
import AboutMeHeader from "./AboutMeHeader";
import AboutMeStats from "./AboutMeStats";
import AboutMeSkills from "./AboutMeSkills";
import AboutMeOtherSkills from "./AboutMeOtherSkills";
import EducationTimeline from "../timeline/EducationTimeline";

export default function MainAboutMe() {
  return (
    <div className="relative w-full min-h-screen px-4 sm:px-6 lg:px-10 py-8 max-w-5xl mx-auto overflow-hidden">
      {/* Ambient Aurora Orbs */}
      <div className="absolute top-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-aurora" />
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none animate-aurora-reverse" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-float" />

      <div className="relative z-10 animate-slide-up">
        <AboutMeHeader />
        <AboutMeStats />
        <AboutMeSkills />
        <AboutMeOtherSkills />
        <EducationTimeline />
      </div>
    </div>
  );
}

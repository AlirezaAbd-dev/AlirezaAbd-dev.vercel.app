"use client";
import React from "react";
import { Layers } from "lucide-react";
import otherSkillsData from "../data/otherSkillsData";
import HeaderDivider from "../ui/HeaderDivider";
import AboutMeSkillItem from "./AboutMeSkillItem";

export default function AboutMeOtherSkills() {
  return (
    <div className="w-full mb-10">
      <HeaderDivider icon={<Layers className="w-5 h-5" />} chipAlign="right">
        سایر تکنولوژی‌ها و ابزارها
      </HeaderDivider>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
        {otherSkillsData.map((skill) => (
          <AboutMeSkillItem key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}

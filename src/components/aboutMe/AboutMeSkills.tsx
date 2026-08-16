"use client";
import React from "react";
import { Cpu } from "lucide-react";
import HeaderDivider from "../ui/HeaderDivider";
import Skill from "../../page-components/Skill";
import { devSkills } from "../../constants/skills";

const skillsData = [
  { ...devSkills.tsSkill, color: "info", value: devSkills.tsSkill.value },
  { ...devSkills.nextJsSkill, color: "primary", value: devSkills.nextJsSkill.value },
  { ...devSkills.uiSkill, color: "info", value: devSkills.uiSkill.value },
  { ...devSkills.devopsSkill, color: "primary", value: devSkills.devopsSkill.value },
  { ...devSkills.nestSkill, color: "error", value: devSkills.nestSkill.value },
  { ...devSkills.architectureSkill, color: "success", value: devSkills.architectureSkill.value },
  { ...devSkills.csharpSkill, color: "secondary", value: devSkills.csharpSkill.value },
  { ...devSkills.databaseSkill, color: "warning", value: devSkills.databaseSkill.value },
];

export default function AboutMeSkills() {
  return (
    <div className="w-full mb-10 animate-slide-up">
      <HeaderDivider icon={<Cpu className="w-5 h-5 text-emerald-500" />} chipAlign="right">
        مهارت‌های تخصصی و سطح تسلط (تحلیل شده از کدهای گیت‌هاب)
      </HeaderDivider>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5 mt-4">
        {skillsData.map((skill) => (
          <Skill
            key={skill.name}
            name={skill.name}
            icon={skill.icon}
            color={skill.color}
            value={skill.value}
          />
        ))}
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Image from "next/image";

interface AboutMeSkillItemProps {
  skill: {
    name: string;
    color: string;
    icon: any;
  };
}

export default function AboutMeSkillItem({ skill }: AboutMeSkillItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = typeof skill.icon === "function" ? skill.icon : null;
  const iconSrc = !IconComponent ? (skill.icon?.src || skill.icon) : null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 select-none cursor-pointer"
      style={{
        borderColor: isHovered ? skill.color : undefined,
        boxShadow: isHovered ? `0 8px 24px -4px ${skill.color}35` : undefined,
      }}
    >
      {/* Background Soft Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 blur-md transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: skill.color }}
      />

      <div className="w-6 h-6 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115">
        {IconComponent ? (
          <IconComponent className="w-5 h-5 transition-transform duration-300" />
        ) : iconSrc ? (
          <Image
            src={iconSrc}
            alt={skill.name}
            width={24}
            height={24}
            className="w-full h-full object-contain"
          />
        ) : null}
      </div>

      <span className="text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200 capitalize group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
        {skill.name}
      </span>
    </div>
  );
}

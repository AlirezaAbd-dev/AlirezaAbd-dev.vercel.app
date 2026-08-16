"use client";
import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import AnimatedCounter from "../components/ui/AnimatedCounter";

interface SkillProps {
  icon: StaticImageData | any;
  name: string;
  color?: string;
  value: number;
}

const colorMap: Record<string, { bar: string; text: string; bg: string; border: string; glow: string }> = {
  error: {
    bar: "from-rose-500 to-red-600",
    text: "text-rose-500 dark:text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    glow: "rgba(244, 63, 94, 0.4)",
  },
  info: {
    bar: "from-sky-400 to-blue-600",
    text: "text-sky-500 dark:text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    glow: "rgba(56, 189, 248, 0.4)",
  },
  warning: {
    bar: "from-amber-400 to-yellow-500",
    text: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "rgba(251, 191, 36, 0.4)",
  },
  success: {
    bar: "from-emerald-400 to-green-600",
    text: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "rgba(52, 211, 153, 0.4)",
  },
  primary: {
    bar: "from-emerald-400 to-teal-600",
    text: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  secondary: {
    bar: "from-violet-400 to-purple-600",
    text: "text-violet-500 dark:text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "rgba(167, 139, 250, 0.4)",
  },
};

export default function Skill({ icon, name, color = "primary", value }: SkillProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const scheme = colorMap[color] || colorMap.primary;
  const roundedValue = Math.round(value);
  const IconComponent = typeof icon === "function" ? icon : null;
  const iconSrc = !IconComponent ? (icon?.src || icon) : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(roundedValue);
    }, 150);
    return () => clearTimeout(timer);
  }, [roundedValue]);

  return (
    <div className="group w-full mb-3.5 p-3.5 rounded-2xl bg-white/75 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:scale-[1.015]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-xl ${scheme.bg} ${scheme.border} border flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
            {IconComponent ? (
              <IconComponent className="w-5 h-5" />
            ) : iconSrc ? (
              <Image src={iconSrc} alt={name} width={20} height={20} className="w-5 h-5 object-contain" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            )}
          </div>
          <span className="text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {name}
          </span>
        </div>
        <span className={`text-xs font-black font-mono px-2.5 py-0.5 rounded-lg ${scheme.bg} ${scheme.text} ${scheme.border} border shadow-sm`}>
          <AnimatedCounter target={roundedValue} duration={1400} suffix="%" />
        </span>
      </div>

      {/* Progress Bar Track with Expanding Shimmer and Glow */}
      <div className="w-full h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800/90 overflow-hidden relative shadow-inner">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${scheme.bar} transition-all duration-1000 ease-out shadow-sm relative overflow-hidden`}
          style={{
            width: `${animatedWidth}%`,
            boxShadow: `0 0 10px ${scheme.glow}`,
          }}
        >
          {/* Shimmer wave effect */}
          <div className="absolute inset-0 bg-white/25 animate-text-shimmer" />
        </div>
      </div>
    </div>
  );
}

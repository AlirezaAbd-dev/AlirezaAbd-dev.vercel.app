"use client";
import React from "react";
import { Briefcase, FolderCheck, GitBranch, GraduationCap } from "lucide-react";
import AnimatedCounter from "../ui/AnimatedCounter";
import SpotlightCard from "../ui/SpotlightCard";

const stats = [
  {
    icon: Briefcase,
    value: 3.5,
    decimals: 1,
    suffix: " سال",
    title: "سابقه کاری تخصصی",
    subtitle: "۱ سال شرکتی + ۲.۵ سال فریلنس",
    color: "rgba(16, 185, 129, 0.2)",
    accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: FolderCheck,
    value: 10,
    decimals: 0,
    prefix: "+",
    suffix: " پروژه",
    title: "پروژه‌های موفق تحویل‌شده",
    subtitle: "پلتفرم‌های سازمانی و تجاری",
    color: "rgba(139, 92, 246, 0.2)",
    accent: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: GitBranch,
    value: 41,
    decimals: 0,
    prefix: "+",
    suffix: " ریپازیتوری",
    title: "مخازن کد در گیت‌هاب",
    subtitle: "بیش از ۳.۱ مگابایت سورس‌کد",
    color: "rgba(6, 182, 212, 0.2)",
    accent: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: GraduationCap,
    value: 1404,
    decimals: 0,
    suffix: "",
    title: "کارشناسی ارشد نرم‌افزار",
    subtitle: "دانشگاه آزاد اسلامی واحد رشت",
    color: "rgba(245, 158, 11, 0.2)",
    accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
];

export default function AboutMeStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 my-8">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <SpotlightCard
            key={idx}
            spotlightColor={item.color}
            className="p-4 bg-white/75 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-2xl ${item.accent} border shadow-inner`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-lg md:text-xl font-black text-zinc-900 dark:text-white">
                <AnimatedCounter
                  target={item.value}
                  decimals={item.decimals}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  duration={1500}
                />
              </span>
            </div>

            <div className="text-right">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{item.title}</h4>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{item.subtitle}</p>
            </div>
          </SpotlightCard>
        );
      })}
    </div>
  );
}

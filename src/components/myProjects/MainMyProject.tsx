"use client";
import React, { useState, useMemo } from "react";
import { FolderGit2 } from "lucide-react";
import { myProjects } from "@/constants/myProjects";
import HeaderDivider from "../ui/HeaderDivider";
import ProjectCard from "./ProjectCard";

const filterCategories = [
  "همه پروژه‌ها",
  "C# و دات‌نت",
  "بک‌اند و API",
  "فرانت‌اند و فول‌استک",
  "موبایل و هوش مصنوعی",
];

export default function MainMyProject() {
  const [activeCategory, setActiveCategory] = useState("همه پروژه‌ها");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "همه پروژه‌ها") return myProjects;
    if (activeCategory === "C# و دات‌نت") {
      return myProjects.filter(
        (p) =>
          p.category.includes("C#") ||
          p.technologies.some((t) => ["C#", ".NET Core", "ASP.NET Core", ".NET"].includes(t))
      );
    }
    if (activeCategory === "بک‌اند و API") {
      return myProjects.filter(
        (p) =>
          p.category.includes("بک‌اند") ||
          p.technologies.some((t) => ["NestJS", "PostgreSQL", "Node.js", "Prisma ORM"].includes(t))
      );
    }
    if (activeCategory === "فرانت‌اند و فول‌استک") {
      return myProjects.filter(
        (p) =>
          p.category.includes("فرانت‌اند") ||
          p.category.includes("فول‌استک") ||
          p.technologies.some((t) => ["Next.js", "React", "tRPC"].includes(t))
      );
    }
    if (activeCategory === "موبایل و هوش مصنوعی") {
      return myProjects.filter(
        (p) =>
          p.category.includes("موبایل") ||
          p.category.includes("هوش مصنوعی") ||
          p.category.includes("بلادرنگ") ||
          p.technologies.some((t) => ["React Native", "Gemini 2.5 Pro API", "WebRTC"].includes(t))
      );
    }
    return myProjects;
  }, [activeCategory]);

  return (
    <div className="relative w-full min-h-screen px-4 sm:px-6 lg:px-10 py-8 max-w-6xl mx-auto overflow-hidden">
      {/* Ambient Background Aurora Orbs - Emerald & Violet */}
      <div className="absolute top-10 -right-20 w-[450px] h-[450px] bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-[100px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-violet-500/15 via-purple-500/10 to-transparent rounded-full blur-[100px] pointer-events-none animate-aurora-reverse" />

      <div className="relative z-10 animate-slide-up">
        <HeaderDivider icon={<FolderGit2 className="w-5 h-5 text-emerald-500" />} chipAlign="right">
          پروژه‌ها و دستاوردهای منتخب ({myProjects.length} پروژه برجسته)
        </HeaderDivider>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 mb-8">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105"
                  : "bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/40 hover:text-zinc-900 dark:hover:text-white backdrop-blur-xl"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredProjects.map((item, index) => (
            <ProjectCard item={item} index={index} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

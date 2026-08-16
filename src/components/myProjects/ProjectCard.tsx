"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, Terminal, Sparkles } from "lucide-react";
import { GithubIcon } from "../icons/BrandIcons";
import { myProjectsType } from "../../constants/myProjects";
import SpotlightCard from "../ui/SpotlightCard";
import BorderBeam from "../ui/BorderBeam";

export default function ProjectCard({
  item,
  index,
}: {
  item: myProjectsType;
  index: number;
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <SpotlightCard
      spotlightColor="rgba(16, 185, 129, 0.2)"
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg hover:shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/50"
    >
      {/* Featured Laser Border Beam for Top Flagship Projects */}
      {index < 3 && (
        <BorderBeam
          size={260}
          duration={index === 0 ? 8 : 12}
          colorFrom="#10b981"
          colorTo="#8b5cf6"
        />
      )}

      {/* Project Visual Header */}
      <div className={`relative w-full aspect-video overflow-hidden bg-gradient-to-br ${item.gradient} flex flex-col justify-between p-4 border-b border-zinc-200/40 dark:border-zinc-800/40`}>
        {item.image ? (
          <>
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            )}
            <Image
              src={item.image}
              alt={item.title}
              width={600}
              height={380}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300" />
          </>
        ) : (
          /* High-Tech Terminal Visual Frame for Backend/Architecture Projects */
          <div className="relative z-10 w-full h-full flex flex-col justify-between select-none">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-900/80 border border-white/10 text-zinc-400">
                <Terminal className="w-3 h-3 text-emerald-400" />
                <span>source / repo</span>
              </div>
            </div>

            {/* Middle Feature Highlights */}
            <div className="my-auto flex flex-col items-center justify-center text-center">
              <div className="flex flex-wrap justify-center gap-1.5 mb-1">
                {item.features?.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-zinc-900/90 border border-emerald-500/30 text-emerald-300 shadow-sm"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Tech Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-zinc-400">
              <span className="text-zinc-300 font-semibold">{item.category}</span>
              <span className="text-emerald-400 font-mono">v1.0.0</span>
            </div>
          </div>
        )}

        {/* Floating Index Badge */}
        <span className="relative z-10 self-start px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-black bg-zinc-950/90 text-emerald-400 border border-white/10 backdrop-blur-md shadow-md">
          #{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-black text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
            {item.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60 transition-colors group-hover:border-emerald-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800/80">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-600 hover:text-white dark:hover:text-white transition-all duration-300 shadow-sm shimmer-effect group-hover:shadow-emerald-500/20"
          >
            <GithubIcon className="w-4 h-4" />
            <span>مشاهده ریپازیتوری در گیت‌هاب</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </SpotlightCard>
  );
}

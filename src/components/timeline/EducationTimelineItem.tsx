"use client";
import React from "react";
import { GraduationCap, Calendar, Building2 } from "lucide-react";
import { educationItem } from "../../constants/education";

export default function EducationTimelineItem({ item }: { item: educationItem }) {
  return (
    <div className="relative flex items-start gap-4 pb-8 last:pb-2 group">
      {/* Timeline Connecting Line with Traveling Laser Pulse */}
      <div className="absolute top-10 right-4 -bottom-2 w-0.5 bg-gradient-to-b from-emerald-500/40 via-violet-500/40 to-transparent group-last:hidden overflow-hidden">
        <div className="absolute w-full h-12 bg-gradient-to-b from-transparent via-emerald-400 to-transparent animate-laser" />
      </div>

      {/* Milestone Node with Sonar Glow */}
      <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
        <span className="absolute -inset-1 rounded-xl bg-emerald-500 opacity-40 blur group-hover:opacity-80 transition duration-300" />
        <GraduationCap className="w-4 h-4 relative z-10" />
      </div>

      {/* Content Card */}
      <div className="flex-1 p-4 rounded-2xl bg-white/75 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span className="text-sm md:text-base font-black text-zinc-900 dark:text-white">
            {item.cert}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
            <Calendar className="w-3 h-3" />
            {item.year}
          </span>
        </div>

        <p className="text-xs md:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          {item.major}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <Building2 className="w-3.5 h-3.5" />
          <span>{item.place}</span>
        </div>
      </div>
    </div>
  );
}

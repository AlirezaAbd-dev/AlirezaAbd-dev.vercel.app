"use client";
import React, { ReactNode } from "react";

interface HeaderDividerProps {
  color?: string;
  icon?: ReactNode;
  chipAlign?: "center" | "right";
  children: ReactNode;
}

export default function HeaderDivider({
  icon,
  chipAlign = "center",
  children,
}: HeaderDividerProps) {
  const isRight = chipAlign === "right";

  return (
    <div className={`relative flex items-center gap-4 my-6 max-w-full ${isRight ? "justify-start" : "justify-center"}`}>
      {/* Background glowing line */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-800 to-transparent" />

      {/* Pill Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 max-w-full">
        {icon && <span className="text-emerald-500 dark:text-emerald-400 shrink-0">{icon}</span>}
        <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-black text-zinc-900 dark:text-zinc-100 truncate">
          {children}
        </h2>
      </div>
    </div>
  );
}

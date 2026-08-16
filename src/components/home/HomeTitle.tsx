"use client";
import React from "react";
import { useTypewriter } from "../../hooks/useTypewriter";

export default function HomeTitle() {
  const { displayedText } = useTypewriter({
    text: "علیرضا عابدی",
    speed: 120,
    delay: 300,
  });

  return (
    <div className="flex items-center justify-center gap-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight select-none">
      <span className="text-emerald-500/80 dark:text-emerald-400/80 font-mono">
        {"{"}&quot;
      </span>
      <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400 dark:from-emerald-400 dark:via-teal-300 dark:to-violet-400 bg-clip-text text-transparent min-w-[1ch] text-center animate-text-shimmer">
        {displayedText}
      </span>
      <span className="inline-block w-1 md:w-1.5 h-8 md:h-12 bg-emerald-400 animate-blink rounded-full mr-1" />
      <span className="text-emerald-500/80 dark:text-emerald-400/80 font-mono">
        &quot;{"}"}
      </span>
    </div>
  );
}

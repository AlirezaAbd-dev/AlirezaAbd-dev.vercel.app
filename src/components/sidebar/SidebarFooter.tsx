"use client";
import React from "react";
import { Heart, Globe } from "lucide-react";

export default function SidebarFooter() {
  return (
    <div className="w-full px-4 py-4 mt-auto border-t border-zinc-200/60 dark:border-zinc-800/60 text-center">
      <a
        href="https://alireza-abedi.ir"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300 mb-2"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>alireza-abedi.ir</span>
      </a>

      <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
        <span>طراحی با</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse" />
        <span>توسط علیرضا عابدی</span>
      </div>
    </div>
  );
}

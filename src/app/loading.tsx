"use client";
import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-50/90 dark:bg-[#09090b]/90 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
        <Loader2 className="w-6 h-6 text-emerald-500 animate-pulse absolute" />
      </div>
      <p className="mt-4 text-xs font-bold text-zinc-600 dark:text-zinc-400 animate-pulse">
        در حال بارگذاری
      </p>
    </div>
  );
}

"use client";
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

export default function ThemeActionButton() {
  const { mode, toggleTheme } = useThemeContext();
  const isDark = mode === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="تغییر تم"
      className={`relative inline-flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 shadow-sm hover:scale-110 active:scale-95 cursor-pointer ${
        isDark
          ? "bg-zinc-800/90 hover:bg-zinc-700 text-amber-400 border border-zinc-700/80 shadow-amber-500/10"
          : "bg-zinc-100 hover:bg-zinc-200 text-violet-600 border border-zinc-300/80 shadow-violet-500/10"
      }`}
    >
      {isDark ? (
        <Sun className="w-4.5 h-4.5 transition-transform duration-500 hover:rotate-90" />
      ) : (
        <Moon className="w-4.5 h-4.5 transition-transform duration-500 hover:-rotate-12" />
      )}
    </button>
  );
}

"use client";
import React, { useContext } from "react";
import { Menu } from "lucide-react";
import MainContext from "../../context";

export default function DrawerActionButton() {
  const { setDrawerOpen } = useContext(MainContext);

  return (
    <div className="fixed top-4 left-4 z-40 md:hidden">
      <button
        onClick={() => setDrawerOpen(true)}
        type="button"
        aria-label="باز کردن منوی موبایل"
        className="p-3 rounded-2xl bg-white/90 dark:bg-zinc-900/90 text-emerald-600 dark:text-emerald-400 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:border-emerald-500/50 flex items-center justify-center cursor-pointer"
      >
        <Menu className="w-5 h-5" />
      </button>
    </div>
  );
}

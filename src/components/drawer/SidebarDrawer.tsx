"use client";
import React, { useContext, useEffect } from "react";
import { X } from "lucide-react";
import { SidebarContent } from "../sidebar";
import MainContext from "../../context";

export default function SidebarDrawer() {
  const { drawerOpen, setDrawerOpen } = useContext(MainContext);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
        drawerOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute top-0 right-0 w-[280px] sm:w-[320px] max-w-[85vw] h-full bg-white dark:bg-[#111114] border-l border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl transition-transform duration-300 ease-out flex flex-col z-10 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-3.5 border-b border-zinc-100 dark:border-zinc-800/80">
          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">منوی ناوبری</span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="بستن منو"
            className="p-1.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <SidebarContent />
        </div>
      </div>
    </div>
  );
}

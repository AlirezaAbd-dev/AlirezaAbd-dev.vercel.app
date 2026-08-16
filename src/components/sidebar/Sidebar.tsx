"use client";
import React from "react";
import SidebarContent from "./SidebarContent";
import { SidebarDrawer } from "../drawer";

export default function Sidebar() {
  return (
    <>
      <div className="hidden md:block w-64 lg:w-72 h-screen shrink-0 border-l border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#111114]/90 backdrop-blur-2xl z-20 sticky top-0 shadow-xl transition-colors duration-300">
        <SidebarContent />
      </div>
      <SidebarDrawer />
    </>
  );
}
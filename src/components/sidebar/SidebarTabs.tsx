"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainContext from "../../context";
import tabs from "../data/tabsData.sidebar";

export default function SidebarTabs() {
  const pathname = usePathname();
  const { setDrawerOpen } = useContext(MainContext);

  return (
    <nav className="w-full px-3 py-3 space-y-1.5" aria-label="منوی اصلی">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          pathname === tab.path ||
          (tab.path !== "/" && pathname?.startsWith(tab.path));

        return (
          <Link
            key={tab.path}
            href={tab.path}
            onClick={() => setDrawerOpen(false)}
            className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-l from-emerald-500/15 via-emerald-500/10 to-transparent text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            }`}
          >
            {/* Active glowing indicator pill */}
            {isActive && (
              <span className="absolute right-0 w-1.5 h-6 bg-emerald-500 rounded-l-full shadow-sm shadow-emerald-500/50" />
            )}

            <Icon
              className={`w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 ${
                isActive
                  ? "text-emerald-500 dark:text-emerald-400"
                  : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200"
              }`}
            />
            <span className="flex-1 text-right">{tab.label}</span>
            {tab.badge && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-pulse">
                {tab.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

"use client";
import React, { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "../context/ThemeContext";
import MainContext from "../context";
import { Sidebar } from "../components/sidebar";
import { DrawerActionButton } from "../components/drawer";
import InteractiveCursor from "../components/ui/InteractiveCursor";

export default function AppContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  let pageNumber = 0;
  if (pathname === "/about") pageNumber = 1;
  else if (pathname === "/myProjects") pageNumber = 2;
  else if (pathname === "/contactUs") pageNumber = 3;

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <ThemeProvider>
      <MainContext.Provider
        value={{
          pageNumber,
          setPageNumber: () => {},
          drawerOpen,
          setDrawerOpen,
        }}
      >
        <div className="flex w-full h-screen overflow-hidden bg-zinc-50 dark:bg-[#09090b] text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
          {/* Cyber Interactive Magnetic Cursor */}
          <InteractiveCursor />

          {/* Sidebar */}
          <Sidebar />

          {/* Floating Mobile Drawer Trigger */}
          <DrawerActionButton />

          {/* Main Content Area */}
          <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative bg-transparent">
            {children}
          </main>
        </div>
      </MainContext.Provider>
    </ThemeProvider>
  );
}

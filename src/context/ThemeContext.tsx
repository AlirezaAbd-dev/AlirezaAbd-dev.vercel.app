"use client";
import React, { createContext, useContext, useEffect, useState, useSyncExternalStore, useCallback } from "react";

type ThemeMode = "dark" | "light";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleTheme: () => {},
  setMode: () => {},
});

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("theme-change", callback);
  };
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const getSnapshot = useCallback((): ThemeMode => {
    if (typeof window === "undefined") return "dark";
    try {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    } catch {
      return "dark";
    }
  }, []);

  const getServerSnapshot = useCallback((): ThemeMode => "dark", []);

  const storeMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [overrideMode, setOverrideMode] = useState<ThemeMode | null>(null);

  const mode = overrideMode || storeMode;

  useEffect(() => {
    const isDark = mode === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setOverrideMode(newMode);
    try {
      localStorage.setItem("portfolio-theme", newMode);
      window.dispatchEvent(new Event("theme-change"));
    } catch (_) {}
  }, []);

  const toggleTheme = useCallback(() => {
    const nextMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
  }, [mode, setMode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
export default ThemeContext;

"use client";
import { useState, useEffect } from "react";

export function useRotatingText(strings: string[], intervalTime = 3000) {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (strings.length <= 1) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % strings.length);
        setIsFading(false);
      }, 300);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [strings, intervalTime]);

  return {
    currentText: strings[index] || "",
    isFading,
    index,
  };
}

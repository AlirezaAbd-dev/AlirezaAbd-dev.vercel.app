"use client";
import { useState, useEffect } from "react";

const GLYPHS = "01#*$%&@<>~/{}[];:?!+=";

export function useDecryptEffect(targetText: string, speed = 30, delay = 150) {
  const [displayText, setDisplayText] = useState(targetText);

  useEffect(() => {
    let iteration = 0;
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setDisplayText(() => {
          return targetText
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return targetText[index];
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("");
        });

        if (iteration >= targetText.length) {
          clearInterval(intervalId);
        }

        iteration += 1 / 2;
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [targetText, speed, delay]);

  return displayText;
}

"use client";
import { lightTheme } from "../Layouts/theme/theme";
import type { ISourceOptions } from "@tsparticles/engine";

export const createLinks = (
  mode: "light" | "dark"
): ISourceOptions => {
  return {
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: false, mode: "push" },
        onHover: {
          enable: true,
          mode: "attract",
          parallax: { enable: true, force: 60, smooth: 15 },
        },
        resize: { enable: true },
      },
      modes: {
        push: { quantity: 4 },
        attract: { distance: 200, duration: 0.4, factor: 5 },
      },
    },
    particles: {
      color: {
        value:
          mode === "light"
            ? lightTheme.palette.secondary.main
            : lightTheme.palette.primary.dark,
      },
      links: {
        color:
          mode === "light"
            ? lightTheme.palette.secondary.main
            : lightTheme.palette.primary.dark,
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 0.5,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "out" },
        random: false,
        speed: 2,
        straight: false,
      },
      number: { density: { enable: true }, value: 100 },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
        animation: { enable: true, speed: 40, sync: false },
      },
    },
    detectRetina: true,
  };
};


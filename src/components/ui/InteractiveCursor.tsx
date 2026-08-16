"use client";
import React, { useEffect, useRef, useState } from "react";

export default function InteractiveCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer desktop devices
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instant center dot update
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check if hovering over clickable/interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("[role='button']") ||
          target.closest(".group"))
      ) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const updateSmoothPosition = () => {
      // Lerp smoothing with high responsiveness
      currentX += (mouseX - currentX) * 0.35;
      currentY += (mouseY - currentY) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(updateSmoothPosition);
    };

    animId = requestAnimationFrame(updateSmoothPosition);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Smooth Trailing Glow Ring - No CSS transition on transform to prevent rubber-band glitching */}
      <div
        ref={cursorRef}
        style={{
          transition: "width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out, opacity 0.2s ease-out",
        }}
        className={`pointer-events-none fixed top-0 left-0 rounded-full z-50 will-change-transform ${
          isHoveringInteractive
            ? "w-12 h-12 bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
            : isClicking
            ? "w-8 h-8 bg-violet-500/30 border-2 border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            : "w-9 h-9 border border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
        }`}
      />

      {/* Instant Center Dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full z-50 transition-colors duration-150 will-change-transform ${
          isHoveringInteractive
            ? "bg-violet-400 shadow-[0_0_8px_#8b5cf6]"
            : "bg-emerald-400 shadow-[0_0_8px_#10b981]"
        }`}
      />
    </>
  );
}

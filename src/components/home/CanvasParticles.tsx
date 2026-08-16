"use client";
import React, { useEffect, useRef } from "react";
import { useThemeContext } from "../../context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  color: string;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export default function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { mode } = useThemeContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const isDark = mode === "dark";
    const palette = isDark
      ? ["#10b981", "#8b5cf6", "#f59e0b", "#06b6d4", "#ec4899"]
      : ["#059669", "#7c3aed", "#d97706", "#0891b2", "#db2777"];

    // Initialize interactive particles
    const particleCount = Math.min(Math.floor((width * height) / 9000), 95);
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const radius = Math.random() * 2.5 + 1;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius,
        baseRadius: radius,
        alpha: Math.random() * 0.7 + 0.3,
        color: palette[Math.floor(Math.random() * palette.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
      };
    });

    const shockwaves: Shockwave[] = [];
    const meteors: Meteor[] = [];

    // Create occasional shooting star meteors
    const spawnMeteor = () => {
      if (Math.random() < 0.035 && meteors.length < 3) {
        meteors.push({
          x: Math.random() * width * 1.2,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 120 + 80,
          speed: Math.random() * 8 + 10,
          angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2,
          alpha: 1,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
    };

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Spawn multi-layer shockwave explosion
      palette.forEach((col, idx) => {
        setTimeout(() => {
          shockwaves.push({
            x: clickX,
            y: clickY,
            radius: 5,
            maxRadius: 220 + idx * 30,
            alpha: 0.9,
            color: col,
          });
        }, idx * 60);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render & Update Shockwaves
      for (let r = shockwaves.length - 1; r >= 0; r--) {
        const sw = shockwaves[r];
        sw.radius += 5.5;
        sw.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Push particles along wavefront
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - sw.radius) < 30) {
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * 4;
            p.y += Math.sin(angle) * 4;
          }
        }

        if (sw.alpha < 0.02 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(r, 1);
        }
      }

      // 2. Render & Update Meteors (Shooting Stars)
      spawnMeteor();
      for (let m = meteors.length - 1; m >= 0; m--) {
        const met = meteors[m];
        met.x -= Math.cos(met.angle) * met.speed;
        met.y += Math.sin(met.angle) * met.speed;
        met.alpha *= 0.97;

        const tailX = met.x + Math.cos(met.angle) * met.length;
        const tailY = met.y - Math.sin(met.angle) * met.length;

        const gradient = ctx.createLinearGradient(met.x, met.y, tailX, tailY);
        gradient.addColorStop(0, met.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(met.x, met.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.globalAlpha = met.alpha;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (met.alpha < 0.02 || met.x < -100 || met.y > height + 100) {
          meteors.splice(m, 1);
        }
      }

      // 3. Update & Draw Particles & Constellation Links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Pulse radius gently
        p.radius = p.baseRadius + Math.sin(Date.now() * p.pulseSpeed) * 0.6;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Connect with nearby particles with gradient lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const lineGradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            const lineAlpha = (1 - dist / 135) * (isDark ? 0.35 : 0.22);
            lineGradient.addColorStop(0, p.color);
            lineGradient.addColorStop(1, p2.color);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineGradient;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.9;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }

        // Magnetic Attraction & Laser Beam to Mouse Cursor
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 190) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const mAlpha = (1 - mdist / 190) * (isDark ? 0.65 : 0.45);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = mAlpha;
          ctx.lineWidth = 1.3;
          ctx.stroke();
          ctx.globalAlpha = 1;

          // Gentle gravity pull
          p.x -= (mdx / mdist) * 0.5;
          p.y -= (mdy / mdist) * 0.5;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-0 cursor-crosshair opacity-85"
    />
  );
}

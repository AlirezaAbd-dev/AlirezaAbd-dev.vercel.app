"use client";
import React from "react";
import Image from "next/image";
import { Sparkles, Code, Cpu } from "lucide-react";
import avatar from "../../assets/avatar.png";
import BorderBeam from "../ui/BorderBeam";

export default function AboutMeMobile() {
  return (
    <div className="flex justify-center items-center w-full md:w-1/3 p-4">
      <div className="relative group">
        {/* Animated Multi-layer Glowing Aurora Rings */}
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-emerald-500 via-violet-500 to-amber-500 opacity-50 blur-2xl group-hover:opacity-90 transition-all duration-700 animate-aurora" />
        
        {/* Avatar Frame with BorderBeam */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-white/90 dark:border-zinc-800 shadow-2xl bg-zinc-100 dark:bg-zinc-900 transition-all duration-500 group-hover:scale-105 group-hover:shadow-emerald-500/20">
          <BorderBeam size={220} duration={10} colorFrom="#10b981" colorTo="#8b5cf6" />
          
          <Image
            src={avatar}
            alt="علیرضا عابدی - Alireza Abedi"
            width={240}
            height={240}
            priority
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Holographic light gradient sheen */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Floating Cyber Badges with Soft Bounce Animation */}
        <div className="absolute -bottom-3 -right-2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900/95 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold shadow-xl backdrop-blur-md animate-float">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
          <span>Team Lead</span>
        </div>

        <div className="absolute -top-2 -left-2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900/95 border border-violet-500/40 text-violet-400 text-[11px] font-bold shadow-xl backdrop-blur-md animate-float" style={{ animationDelay: "1.5s" }}>
          <Cpu className="w-3.5 h-3.5 text-violet-400" />
          <span>Full-Stack</span>
        </div>
      </div>
    </div>
  );
}

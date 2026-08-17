"use client";
import React from "react";
import Link from "next/link";
import { FolderGit2, Mail, User, Code2, Zap, Award, Sparkles } from "lucide-react";
import HomeTitle from "../components/home/HomeTitle";
import HomeSubtitle from "../components/home/HomeSubtitle";
import CanvasParticles from "../components/home/CanvasParticles";
import SpotlightCard from "../components/ui/SpotlightCard";
import BorderBeam from "../components/ui/BorderBeam";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-16 pb-12 sm:py-12 overflow-hidden select-none">
      {/* Interactive Constellation Canvas with Click Ripples & Quantum Meteors */}
      <CanvasParticles />

      {/* Floating Animated Emerald & Violet Aurora Mesh Orbs */}
      <div className="absolute top-10 -right-20 w-[480px] h-[480px] bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-[100px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-violet-500/15 via-purple-500/10 to-transparent rounded-full blur-[100px] pointer-events-none animate-aurora-reverse" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none animate-float" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center animate-slide-up">
        {/* Welcome Tag with Sonar Glow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold bg-white/90 dark:bg-zinc-900/90 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 mb-6 shadow-lg shadow-emerald-500/10 backdrop-blur-xl animate-float">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span>سلام! 👋 به وب‌سایت من خوش آمدید</span>
        </div>

        {/* Title with Shimmer Animation */}
        <HomeTitle />

        {/* Subtitle */}
        <HomeSubtitle />

        {/* Description Bio from Resume */}
        <p className="mt-6 text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          مهندس نرم‌افزار با <strong className="text-emerald-600 dark:text-emerald-400 font-bold">۳.۵ سال تجربه حرفه‌ای</strong> در طراحی و توسعه برنامه‌های تحت وب مدرن (Next.js، React، NestJS، ASP.NET Core). در حال حاضر به عنوان <strong className="text-zinc-900 dark:text-white font-bold">لید تیم فرانت‌اند</strong>، هدایت پروژه‌ها، توسعه سرویس‌های مقیاس‌پذیر و معماری تمیز را بر عهده دارم.
        </p>

        {/* CTA Action Buttons with Glow Effects */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 w-full max-w-md">
          <Link
            href="/myProjects"
            className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300 shimmer-effect"
          >
            <FolderGit2 className="w-4 h-4 animate-bounce" />
            <span>مشاهده نمونه‌کارها</span>
          </Link>

          <Link
            href="/contactUs"
            className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/90 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-100 font-bold text-sm border border-zinc-200 dark:border-zinc-700/80 shadow-lg hover:border-emerald-500/60 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-xl"
          >
            <Mail className="w-4 h-4 text-emerald-500" />
            <span>ارتباط با من</span>
          </Link>
        </div>

        <Link
          href="/about"
          className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold text-xs transition-colors duration-200"
        >
          <User className="w-3.5 h-3.5" />
          <span>اطلاعات بیشتر درباره من</span>
        </Link>

        {/* 3D Tilt Feature Badges with Laser Border Beam on Center Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 w-full">
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.2)"
            className="p-4 bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h3 className="text-xs font-black text-zinc-900 dark:text-white">لید تیم فرانت‌اند</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">ارتقا بر اساس سرعت و کیفیت</p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(139, 92, 246, 0.25)"
            className="relative p-4 bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-md"
          >
            <BorderBeam size={180} duration={8} colorFrom="#8b5cf6" colorTo="#10b981" />
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-500 dark:text-violet-400 border border-violet-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h3 className="text-xs font-black text-zinc-900 dark:text-white">۱۰+ پروژه موفق</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">تحویل به موقع در محیط شرکتی</p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.2)"
            className="p-4 bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h3 className="text-xs font-black text-zinc-900 dark:text-white">معماری تمیز و DDD</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">توسعه ماژولار و مقیاس‌پذیر</p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

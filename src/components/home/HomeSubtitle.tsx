"use client";
import React from "react";
import { useRotatingText } from "../../hooks/useRotatingText";
import { Sparkles } from "lucide-react";

const roles = [
  "لید تیم فرانت‌اند (Frontend Team Lead)",
  "توسعه‌دهنده فول‌استک (Next.js / React / NestJS / ASP.NET)",
  "متخصص معماری تمیز و مقیاس‌پذیر (Clean Architecture & DDD)",
  "طراح سیستم‌های سازمانی CRM، حسابداری و آموزش آنلاین",
  "مشتاق یادگیری مداوم و ساخت محصولاتی با پرفورمنس عالی",
];

export default function HomeSubtitle() {
  const { currentText, isFading } = useRotatingText(roles, 3200);

  return (
    <div className="flex items-center justify-center mt-5 text-xs sm:text-sm md:text-base font-semibold text-zinc-700 dark:text-zinc-300 max-w-full px-2">
      <div className="relative inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 shadow-sm backdrop-blur-xl max-w-full">
        <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400 animate-pulse shrink-0" />
        <span
          className={`transition-all duration-300 transform font-bold text-emerald-600 dark:text-emerald-400 text-center leading-tight ${
            isFading
              ? "opacity-0 -translate-y-2 scale-95"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {currentText}
        </span>
      </div>
    </div>
  );
}

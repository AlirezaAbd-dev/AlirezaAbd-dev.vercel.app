"use client";
import React, { useState } from "react";
import { User, Calendar, MapPin, Mail, Laptop, GraduationCap, Briefcase, Award, Globe, Check, Copy, ExternalLink } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";

interface InfoItem {
  icon: any;
  label: string;
  value: string;
  tooltip: string;
  color: string;
  copyable?: boolean;
  href?: string;
}

const infoList: InfoItem[] = [
  {
    icon: User,
    label: "نام و نام خانوادگی",
    value: "علیرضا عابدی",
    tooltip: "علیرضا عابدی (Alireza Abedi) - لید تیم و مهندس نرم‌افزار",
    color: "rgba(16, 185, 129, 0.2)",
  },
  {
    icon: Globe,
    label: "وب‌سایت شخصی و رسمی",
    value: "alireza-abedi.ir",
    tooltip: "مشاهده وب‌سایت و رزومه رسمی alireza-abedi.ir",
    color: "rgba(16, 185, 129, 0.25)",
    href: "https://alireza-abedi.ir",
  },
  {
    icon: Briefcase,
    label: "سمت و جایگاه فعلی",
    value: "Frontend Team Lead / Full-Stack",
    tooltip: "رهبری تیم توسعه فرانت‌اند و مشارکت فعال در معماری و سرویس‌های بک‌اند",
    color: "rgba(139, 92, 246, 0.2)",
  },
  {
    icon: Award,
    label: "سابقه کاری و تجربیات",
    value: "۳.۵ سال (۱ سال شرکتی، ۲.۵ سال فریلنس)",
    tooltip: "۳.۵ سال تجربه حرفه‌ای شامل تحویل بیش از ۱۰ پروژه موفق و ارتقا به لید تیم",
    color: "rgba(245, 158, 11, 0.2)",
  },
  {
    icon: Calendar,
    label: "تاریخ تولد",
    value: "۱۳۸۲/۰۳/۲۰ (۲۰ خرداد ۱۳۸۲)",
    tooltip: "متولد ۲۰ خرداد ۱۳۸۲ (10 June 2003) - ۲۱ سال",
    color: "rgba(59, 130, 246, 0.2)",
  },
  {
    icon: MapPin,
    label: "موقعیت جغرافیایی",
    value: "رشت، گیلان، ایران",
    tooltip: "سکونت در استان گیلان، شهر رشت - امکان همکاری حضوری و ریموت",
    color: "rgba(245, 158, 11, 0.2)",
  },
  {
    icon: Mail,
    label: "پست الکترونیک",
    value: "alireza.abedi9310@gmail.com",
    tooltip: "برای کپی کردن ایمیل کلیک کنید",
    color: "rgba(239, 68, 68, 0.2)",
    copyable: true,
  },
  {
    icon: Laptop,
    label: "استک تخصصی اصلی",
    value: "Next.js, React, C#, .NET, NestJS",
    tooltip: "تخصص عمیق در Next.js, React, C#, .NET Core, NestJS, Clean Architecture",
    color: "rgba(16, 185, 129, 0.2)",
  },
  {
    icon: GraduationCap,
    label: "مقطع و وضعیت تحصیلی",
    value: "کارشناسی ارشد مهندسی کامپیوتر - نرم‌افزار",
    tooltip: "دانشجوی کارشناسی ارشد مهندسی نرم‌افزار در دانشگاه آزاد اسلامی واحد رشت",
    color: "rgba(168, 85, 247, 0.2)",
  },
];

export default function AboutMeContent() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full">
      {/* Intro Summary Spotlight Card */}
      <SpotlightCard
        spotlightColor="rgba(16, 185, 129, 0.12)"
        className="mb-5 p-5 bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-md"
      >
        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          مهندس نرم‌افزار با <strong className="text-emerald-600 dark:text-emerald-400 font-bold">۳.۵ سال تجربه حرفه‌ای</strong> در طراحی و پیاده‌سازی برنامه‌های کاربردی وب مدرن. به عنوان <strong className="text-zinc-900 dark:text-white font-bold">لید تیم فرانت‌اند</strong>، پروژه‌های سازمانی متعددی از جمله پلتفرم‌های CRM، سیستم‌های حسابداری جامع، پلتفرم‌های محتوای آموزشی و بازی‌های تعاملی را طراحی و با سرعت و کیفیت بالا تحویل داده‌ام.
        </p>
      </SpotlightCard>

      {/* Grid with Smart Tooltips and Non-Truncated Responsive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {infoList.map((item, idx) => {
          const Icon = item.icon;
          const isCopied = copiedIndex === idx;

          return (
            <div key={idx} className="relative group/card">
              {/* Floating Animated Tooltip */}
              <div className="pointer-events-none absolute -top-10 right-1/2 translate-x-1/2 opacity-0 group-hover/card:opacity-100 group-hover/card:-top-12 transition-all duration-300 z-30 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-zinc-950/95 border border-zinc-700/80 shadow-2xl backdrop-blur-md whitespace-nowrap max-w-[280px] text-center">
                <span>{isCopied ? "کپی شد!" : item.tooltip}</span>
                <div className="absolute top-full right-1/2 translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-950" />
              </div>

              <SpotlightCard
                spotlightColor={item.color}
                className={`p-3.5 bg-white/75 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col justify-center ${
                  item.copyable || item.href ? "cursor-pointer active:scale-98" : ""
                }`}
                onClick={() => {
                  if (item.copyable) {
                    handleCopy(item.value, idx);
                  } else if (item.href) {
                    window.open(item.href, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 border border-zinc-200 dark:border-zinc-700/60 shrink-0 mt-0.5 transition-transform duration-300 group-hover/card:scale-110">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex flex-col text-right flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500">
                      {item.label}
                    </span>
                    <span className="text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-snug mt-0.5 break-words">
                      {item.value}
                    </span>
                  </div>

                  {item.copyable && (
                    <div className="shrink-0 text-zinc-400 dark:text-zinc-500 hover:text-emerald-500 transition-colors p-1">
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </div>
                  )}

                  {item.href && (
                    <div className="shrink-0 text-emerald-500/80 group-hover/card:text-emerald-400 transition-colors p-1">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}

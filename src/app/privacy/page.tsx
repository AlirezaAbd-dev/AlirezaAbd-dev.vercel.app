import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, Server, Cookie, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import HeaderDivider from "@/components/ui/HeaderDivider";

export const metadata: Metadata = {
  title: "حریم خصوصی و شفافیت اطلاعات | Privacy Policy",
  description:
    "سیاست حفظ حریم خصوصی، شفافیت در جمع‌آوری داده‌ها و تعهدات امنیتی وب‌سایت شخصی و رسمی علیرضا عابدی (Alireza Abedi). عدم استفاده از کوکی‌های رهگیری و حفظ محرمانگی ارتباطات.",
  keywords: [
    "حریم خصوصی",
    "سیاست حریم خصوصی",
    "Privacy Policy",
    "علیرضا عابدی",
    "Alireza Abedi Privacy",
    "شفافیت داده",
    "امنیت وب‌سایت",
  ],
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="relative w-full min-h-screen px-4 sm:px-6 lg:px-10 pt-16 pb-12 sm:py-10 max-w-5xl mx-auto overflow-hidden">
      {/* Background Aurora */}
      <div className="absolute top-10 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 animate-slide-up">
        <HeaderDivider icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />} chipAlign="right">
          سیاست حریم خصوصی و شفافیت اطلاعات (Privacy Policy)
        </HeaderDivider>

        {/* Intro Card */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.15)"
          className="my-6 p-6 bg-white/75 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div className="text-right space-y-2">
              <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                تعهد به حفاظت از اطلاعات و عدم رهگیری کاربران
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                وب‌سایت شخصی و مهندسی <strong>علیرضا عابدی</strong> (به آدرس‌های رسمی <code className="text-emerald-500 font-mono">alireza-abedi.ir</code> و <code className="text-emerald-500 font-mono">portfolio.alireza-abedi.ir</code>) با هدف معرفی سوابق کاری، ارائه نمونه‌کارهای برنامه‌نویسی و فراهم‌سازی پل ارتباطی مستقیم ایجاد گردیده است. ما ارزش بنیادینی برای حریم خصوصی کاربران و عامل‌های هوشمند (AI Agents) قائل هستیم و بر اصل شفافیت کامل در داده‌ها پایبندیم.
              </p>
            </div>
          </div>
        </SpotlightCard>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.15)"
            className="p-5 bg-white/75 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm text-right"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <Cookie className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                عدم استفاده از کوکی‌های تبلیغاتی و ردیاب
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              این پورتفولیو از هیچ‌گونه کوکی رهگیری تبلیغاتی (Advertising Trackers) یا اسکریپت‌های تحلیلی شخص ثالث مخرب استفاده نمی‌کند. تنها داده ذخیره‌شده روی مرورگر کاربر، ترجیح پوسته تیره/روشن (<code className="font-mono text-emerald-500">portfolio-theme</code>) در حافظه محلی (localStorage) جهت بهبود تجربه بصری است.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(168, 85, 247, 0.15)"
            className="p-5 bg-white/75 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm text-right"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                حفاظت از اطلاعات فرم تماس
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              اطلاعات ارسالی شما در صفحه ارتباط با من (نام، ایمیل، شماره تماس و متن پیام) منحصراً برای پاسخگویی به درخواست‌های کاری، مشاوره‌های فنی و استخدام مورد استفاده قرار گرفته و هرگز در اختیار هیچ شخص ثالث یا سرویس تبلیغاتی قرار نخواهد گرفت.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.15)"
            className="p-5 bg-white/75 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm text-right"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Server className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                امنیت زیرساخت و ارتباطات امن HTTPS
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              تمام ارتباطات میان مرورگر کاربر و سرورها بر بستر پروتکل رمزنگاری‌شده مدرن SSL/TLS (HTTPS) و شبکه توزیع محتوای امن ورسل (Vercel Edge Network) انتقال می‌یابند که ضامن محرمانگی و عدم دستکاری داده‌ها در طول مسیر است.
            </p>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.15)"
            className="p-5 bg-white/75 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm text-right"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <EyeOff className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                دسترسی آزاد برای هوش مصنوعی و ربات‌های کاوشگر
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              این پورتفولیو از پروتکل‌های استاندارد وب برای خزندگان هوش مصنوعی و مدل‌های زبانی از طریق فایل‌های ماشین‌خوان <code className="font-mono text-emerald-500">/llms.txt</code> و مذاکره محتوای مارک‌داون (<code className="font-mono text-emerald-500">Accept: text/markdown</code>) بدون ایجاد ترافیک اسپم پشتیبانی می‌کند.
            </p>
          </SpotlightCard>
        </div>

        {/* Detailed Points */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.1)"
          className="p-6 bg-white/75 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm text-right space-y-4"
        >
          <h3 className="text-sm sm:text-base font-black text-zinc-900 dark:text-white">
            مشخصات مسئول وب‌سایت و راه‌های تماس برای امور حریم خصوصی
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>مالک و توسعه‌دهنده وب‌سایت:</strong> علیرضا عابدی (Alireza Abedi)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>پست الکترونیک رسمی:</strong> alireza.abedi9310@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>کانال تلگرام:</strong> @AlirezaAbd_Dev</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>موقعیت مکانی:</strong> رشت، استان گیلان، ایران</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>آخرین بازبینی و به‌روزرسانی:</strong> اسفند ۱۴۰۴ / March 2026</span>
            </li>
          </ul>

          <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              هرگونه سوال یا درخواست در خصوص حذف پیام‌های ارسالی را از طریق ایمیل با ما در میان بگذارید.
            </span>
            <Link
              href="/contactUs"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 font-bold text-xs transition"
            >
              <span>صفحه ارتباط با من</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

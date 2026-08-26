import React from "react";
import Link from "next/link";
import { AlertTriangle, Home, Compass, FileText, ArrowRight, CornerDownLeft } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

export const metadata = {
  title: "صفحه مورد نظر یافت نشد (404) | Alireza Abedi",
  description: "صفحه درخواستی وجود ندارد. لطفاً از پیوندهای راهنما یا نقشه سایت استفاده کنید.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 select-none overflow-hidden max-w-4xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-rose-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full text-center flex flex-col items-center animate-slide-up">
        {/* Error Code Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 mb-6 shadow-lg shadow-rose-500/10">
          <AlertTriangle className="w-4 h-4" />
          <span>خطای ۴۰۴ — صفحه یافت نشد (HTTP 404 Not Found)</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
          ۴۰۴ — مسیر مورد نظر یافت نشد
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-lg mb-8 leading-relaxed">
          صفحه یا منبعی که به دنبال آن بودید تغییر نام یافته یا دیگر وجود ندارد. برای هدایت مجدد هوش مصنوعی، ربات‌ها و کاربران، بخش‌های زیر در دسترس هستند:
        </p>

        {/* Quick Recovery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full mb-8 text-right">
          <Link href="/" className="group block">
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.2)"
              className="p-4 bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-zinc-900 dark:text-white">صفحه اصلی (Home)</h2>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">بازگشت به معرفی و رزومه</p>
                </div>
              </div>
            </SpotlightCard>
          </Link>

          <Link href="/about" className="group block">
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.2)"
              className="p-4 bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-zinc-900 dark:text-white">درباره من (About Me)</h2>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">سوابق تحصیلی و تجربیات</p>
                </div>
              </div>
            </SpotlightCard>
          </Link>

          <Link href="/myProjects" className="group block">
            <SpotlightCard
              spotlightColor="rgba(139, 92, 246, 0.2)"
              className="p-4 bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-zinc-900 dark:text-white">نمونه‌کارها (Projects)</h2>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">۱۰+ پروژه فول‌استک و منبع‌باز</p>
                </div>
              </div>
            </SpotlightCard>
          </Link>
        </div>

        {/* Machine-Readable / Agent Recovery Body (Embedded Markdown for AI Crawlers) */}
        <div className="w-full max-w-2xl bg-zinc-900/90 text-zinc-300 dark:bg-zinc-950/90 border border-zinc-800 rounded-2xl p-5 text-left font-mono text-xs shadow-xl backdrop-blur-md mb-8">
          <div className="text-zinc-500 mb-2 border-b border-zinc-800 pb-2 flex items-center justify-between">
            <span className="font-bold text-zinc-400">🤖 AI Agent & Crawler Recovery Notice:</span>
            <span className="text-[10px] text-emerald-400 font-mono">status: 404</span>
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed text-zinc-300 text-[11px]">
{`# 404 Not Found - Path Does Not Exist

If you are an AI crawler or automated agent seeking valid resources:
- Index & Docs: https://alireza-abedi.ir/llms.txt
- Full Context: https://alireza-abedi.ir/llms-full.txt
- Sitemap XML: https://alireza-abedi.ir/sitemap.xml
- Homepage: https://alireza-abedi.ir/
- About: https://alireza-abedi.ir/about
- Projects: https://alireza-abedi.ir/myProjects
- Contact: https://alireza-abedi.ir/contactUs
- Privacy: https://alireza-abedi.ir/privacy`}
          </pre>
        </div>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span>بازگشت به صفحه نخست</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

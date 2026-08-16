"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Mail, Send, MapPin, Clock, MessageCircle, Copy, Check, Globe, ExternalLink } from "lucide-react";
import worldMap from "../../assets/tech2.png";

export default function EmailMe() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "telegram") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedTelegram(true);
      setTimeout(() => setCopiedTelegram(false), 2000);
    }
  };

  return (
    <div className="flex flex-col justify-between p-5 sm:p-6 md:p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden h-full">
      {/* Decorative Background Image */}
      <div className="absolute inset-0 opacity-10 dark:opacity-15 pointer-events-none flex items-center justify-center">
        <Image
          src={worldMap}
          alt="world map"
          width={400}
          height={300}
          className="w-full h-auto object-contain dark:invert"
        />
      </div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold mb-4 shadow-sm">
          <MessageCircle className="w-4 h-4" />
          <span>ارتباط مستقیم و سریع</span>
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-zinc-900 dark:text-white leading-snug">
          خوشحال می‌شم در مورد ایده‌ها و پروژه‌هاتون با هم گفتگو کنیم!
        </h3>

        <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
          اگر نیاز به مشاوره فنی، طراحی و توسعه یک وب‌سایت مدرن یا همکاری در پروژه دارید، از طریق راه‌های زیر در دسترس هستم:
        </p>

        {/* Contact Method Pills with Copy Action */}
        <div className="flex flex-col gap-3 mt-6">
          {/* Website Link */}
          <a
            href="https://alireza-abedi.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 shadow-sm hover:border-emerald-500/50 hover:scale-[1.01] transition-all duration-300 group"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 flex-1 overflow-hidden">
              <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition shrink-0">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col text-right overflow-hidden min-w-0">
                <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 dark:text-zinc-500">وب‌سایت شخصی و رزومه رسمی</span>
                <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 font-mono truncate" dir="ltr">
                  alireza-abedi.ir
                </span>
              </div>
            </div>
            <div className="p-2 text-zinc-400 group-hover:text-emerald-500 transition">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* Email */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 shadow-sm hover:border-emerald-500/50 hover:scale-[1.01] transition-all duration-300 group">
            <a
              href="mailto:alireza.abedi9310@gmail.com"
              className="flex items-center gap-2.5 sm:gap-3 flex-1 overflow-hidden"
            >
              <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col text-right overflow-hidden min-w-0">
                <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 dark:text-zinc-500">ایمیل مستقیم</span>
                <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 font-mono truncate" dir="ltr">
                  alireza.abedi9310@gmail.com
                </span>
              </div>
            </a>
            <button
              onClick={() => copyToClipboard("alireza.abedi9310@gmail.com", "email")}
              type="button"
              aria-label="کپی ایمیل"
              className="p-2 rounded-xl text-zinc-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition cursor-pointer shrink-0"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Telegram */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 shadow-sm hover:border-sky-500/50 hover:scale-[1.01] transition-all duration-300 group">
            <a
              href="https://t.me/AlirezaAbd_Dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 sm:gap-3 flex-1 overflow-hidden"
            >
              <div className="p-2 sm:p-2.5 rounded-xl bg-sky-500/10 text-sky-500 group-hover:scale-110 transition shrink-0">
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col text-right overflow-hidden min-w-0">
                <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 dark:text-zinc-500">تلگرام</span>
                <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 font-mono truncate" dir="ltr">
                  @AlirezaAbd_Dev
                </span>
              </div>
            </a>
            <button
              onClick={() => copyToClipboard("@AlirezaAbd_Dev", "telegram")}
              type="button"
              aria-label="کپی آیدی تلگرام"
              className="p-2 rounded-xl text-zinc-400 hover:text-sky-500 hover:bg-sky-500/10 transition cursor-pointer shrink-0"
            >
              {copiedTelegram ? <Check className="w-4 h-4 text-sky-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Location & Response Badge */}
      <div className="relative z-10 mt-6 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>رشت، گیلان، ایران</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>پاسخگویی در کمتر از ۲۴ ساعت</span>
        </div>
      </div>
    </div>
  );
}

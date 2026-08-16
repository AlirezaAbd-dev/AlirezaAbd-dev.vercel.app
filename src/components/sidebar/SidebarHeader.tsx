"use client";
import React from "react";
import Image from "next/image";
import { Send, Mail, Globe } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "../icons/BrandIcons";
import ThemeActionButton from "../ThemeActionButton";
import avatar from "../../assets/avatar.png";

const socialLinks = [
  {
    name: "وب‌سایت شخصی (alireza-abedi.ir)",
    href: "https://alireza-abedi.ir",
    icon: Globe,
    hoverClass: "hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/alireza-abedi-714280235",
    icon: LinkedinIcon,
    hoverClass: "hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/30",
  },
  {
    name: "GitHub",
    href: "https://github.com/AlirezaAbd-dev",
    icon: GithubIcon,
    hoverClass: "hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30",
  },
  {
    name: "Telegram",
    href: "https://t.me/AlirezaAbd_Dev",
    icon: Send,
    hoverClass: "hover:text-sky-500 hover:bg-sky-500/10 hover:border-sky-500/30",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/alirezaabd.dev",
    icon: InstagramIcon,
    hoverClass: "hover:text-pink-500 hover:bg-pink-500/10 hover:border-pink-500/30",
  },
  {
    name: "Email",
    href: "mailto:alireza.abedi9310@gmail.com",
    icon: Mail,
    hoverClass: "hover:text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/30",
  },
];

export default function SidebarHeader() {
  return (
    <div className="flex flex-col items-center w-full px-4 pt-5 pb-3">
      {/* Top action row */}
      <div className="w-full flex justify-between items-center mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          آماده همکاری و استخدام
        </span>
        <ThemeActionButton />
      </div>

      {/* Avatar Container with glowing border */}
      <div className="relative group mb-3">
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-violet-500 to-amber-500 opacity-50 blur group-hover:opacity-100 transition duration-500 animate-aurora" />
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl flex items-center justify-center">
          <Image
            src={avatar}
            alt="علیرضا عابدی - لید تیم فرانت‌اند و توسعه‌دهنده فول‌استک"
            width={140}
            height={140}
            priority
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Name and Role */}
      <h1 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1">
        علیرضا عابدی
      </h1>
      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
        لید تیم فرانت‌اند & توسعه‌دهنده فول‌استک
      </p>

      {/* Social Links including alireza-abedi.ir */}
      <div className="flex items-center gap-1.5 mt-4">
        {socialLinks.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              title={item.name}
              className={`p-2 rounded-xl text-zinc-600 dark:text-zinc-400 bg-zinc-100/90 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 transition-all duration-300 hover:scale-110 shadow-sm ${item.hoverClass}`}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

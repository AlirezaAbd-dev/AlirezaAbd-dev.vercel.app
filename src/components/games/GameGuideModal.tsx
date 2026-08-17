"use client";
import React, { useState } from "react";
import {
  HelpCircle,
  X,
  Smartphone,
  Monitor,
  Layers,
  FlaskConical,
  Grid,
  Sparkles,
  Undo2,
  Shuffle,
  Wand2,
  PlusCircle,
  RotateCw,
  Bomb,
  RotateCcw,
  CheckCircle2,
  Flame,
  Lightbulb,
  Hand,
} from "lucide-react";
import { sound } from "@/utils/audioSynth";

export type GameId = "tileMatch" | "liquidSort" | "blockBlast" | "2048";

interface GameGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGameId?: GameId;
}

interface GameGuideData {
  id: GameId;
  title: string;
  subtitle: string;
  icon: typeof Layers;
  color: string;
  glowColor: string;
  tag: string;
  goal: string;
  rules: string[];
  mobileControls: {
    icon: typeof Hand;
    title: string;
    description: string;
  }[];
  desktopControls: {
    keyBadge: string;
    action: string;
    description: string;
  }[];
  boosters: {
    icon: typeof Undo2;
    name: string;
    effect: string;
    shortcut: string;
  }[];
  proTips: string[];
}

const GUIDES: Record<GameId, GameGuideData> = {
  tileMatch: {
    id: "tileMatch",
    title: "تطبیق کاشی‌های سایبری",
    subtitle: "Cyber Tile Match (Tile Family 3D)",
    icon: Layers,
    color: "from-amber-500 to-rose-600",
    glowColor: "rgba(245,158,11,0.25)",
    tag: "پازل لایه‌ای سه‌بعدی",
    goal: "پاکسازی تمام کاشی‌های چندلایه‌ای سه‌بعدی صفحه با جفت کردن ۳ کاشی هم‌شکل در بارانداز پایین.",
    rules: [
      "کاشی‌های لایه زیرین که توسط کاشی‌های بالایی پوشانده شده‌اند، قفل و تیره هستند و نمی‌توانید آنها را بردارید.",
      "تنها کاشی‌های روشن و بدون مانعِ رویی قابل انتخاب و انتقال به بارانداز هستند.",
      "بارانداز پایین ظرفیت حداکثر ۷ کاشی را دارد. به محض جمع شدن ۳ کاشی یکسان، منفجر شده و فضا آزاد می‌شود.",
      "اگر بارانداز با ۷ کاشی غیرهمسان پر شود، بازی به پایان می‌رسد (Game Over).",
    ],
    mobileControls: [
      {
        icon: Hand,
        title: "لمس کاشی‌های روشن",
        description: "روی هر کاشی روشن و آزاد ضربه بزنید تا بلافاصله به اولین خانه خالی بارانداز منتقل شود.",
      },
      {
        icon: Hand,
        title: "استفاده از ابزارهای کمکی",
        description: "با لمس دکمه‌های پایین صفحه (بازگشت، بر زدن، جارو) موقعیت‌های بحرانی را نجات دهید.",
      },
    ],
    desktopControls: [
      {
        keyBadge: "کلید روی کاشی",
        action: "انتخاب سریع کاشی",
        description: "هر کاشی آزاد دارای یک کلید انگلیسی است. با فشردن آن کلید روی کیبورد، کاشی فوراً برداشته می‌شود.",
      },
      {
        keyBadge: "U / Ctrl+Z",
        action: "بازگشت حرکت (Undo)",
        description: "آخرین کاشی انتخاب شده را از بارانداز به صفحه برمی‌گرداند.",
      },
      {
        keyBadge: "S",
        action: "بر زدن کاشی‌ها (Shuffle)",
        description: "موقعیت تمام کاشی‌های باقیمانده در صفحه را به صورت تصادفی مخلوط می‌کند.",
      },
      {
        keyBadge: "V",
        action: "جاروی جادویی (Magic Vacuum)",
        description: "۳ کاشی آخر بارانداز را پاک کرده و به لایه رویی صفحه برمی‌گرداند.",
      },
      {
        keyBadge: "R",
        action: "شروع مجدد مرحله",
        description: "مرحله فعلی را از ابتدا با چیدمان اولیه آغاز می‌کند.",
      },
      {
        keyBadge: "Space / Enter",
        action: "مرحله بعدی",
        description: "پس از پیروزی، مرحله بعدی را بدون نیاز به ماوس بارگذاری می‌کند.",
      },
    ],
    boosters: [
      {
        icon: Undo2,
        name: "بازگشت (Undo)",
        effect: "برگرداندن آخرین کاشی به صفحه",
        shortcut: "[U]",
      },
      {
        icon: Shuffle,
        name: "بر زدن (Shuffle)",
        effect: "مخلوط کردن کاشی‌های صفحه",
        shortcut: "[S]",
      },
      {
        icon: Wand2,
        name: "جاروی سایبری (Vacuum)",
        effect: "خالی کردن ۳ کاشی از بارانداز پر شده",
        shortcut: "[V]",
      },
    ],
    proTips: [
      "همیشه کاشی‌هایی را بردارید که لایه‌های زیرین آنها کاشی‌های مکمل را آزاد می‌کند.",
      "اجازه ندهید بارانداز بیشتر از ۴ الی ۵ خانه پر شود مگر اینکه مطمئن باشید با کاشی بعدی یک ست ۳تایی کامل می‌شود.",
      "جاروی جادویی را برای لحظات پر شدن کامل بارانداز ذخیره کنید.",
    ],
  },
  liquidSort: {
    id: "liquidSort",
    title: "تفکیک مایعات کوانتومی",
    subtitle: "Quantum Liquid Sort (Water Sort)",
    icon: FlaskConical,
    color: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6,182,212,0.25)",
    tag: "تمرکز و مرتب‌سازی",
    goal: "تفکیک و مرتب‌سازی تمام رنگ‌های نئونی بین لوله‌ها تا زمانی که هر لوله فقط یک رنگ یکپارچه داشته باشد.",
    rules: [
      "ریختن مایع فقط در صورتی مجاز است که بالاترین لایه رنگ لوله مبدا و مقصد یکسان باشد یا لوله مقصد کاملاً خالی باشد.",
      "هر لوله آزمایشگاهی حداکثر گنجایش ۴ واحد مایع را دارد و اگر پر باشد نمی‌توانید در آن مایع بریزید.",
      "تمام قطرات هم‌رنگ بالای لوله مبدا به صورت یکجا به لوله مقصد سرازیر می‌شوند (در صورت داشتن ظرفیت خالی).",
      "وقتی یک لوله با ۴ واحد از یک رنگ یکپارچه کامل شود، قفل و برنده اعلام می‌شود.",
    ],
    mobileControls: [
      {
        icon: Hand,
        title: "انتخاب لوله مبدا",
        description: "روی لوله‌ای که می‌خواهید از آن مایع بردارید ضربه بزنید تا به بالا حرکت کند.",
      },
      {
        icon: Hand,
        title: "ریختن در لوله مقصد",
        description: "سپس روی لوله مقصد ضربه بزنید تا مایع هم‌رنگ به صورت انیمیشنی ریخته شود.",
      },
      {
        icon: Hand,
        title: "انصراف از انتخاب",
        description: "اگر از ریختن پشیمان شدید، دوباره روی همان لوله ضربه بزنید تا به جای خود برگردد.",
      },
    ],
    desktopControls: [
      {
        keyBadge: "1 تا 8",
        action: "انتخاب مستقیم لوله",
        description: "فشردن شماره هر لوله آن را انتخاب کرده و فشردن شماره بعدی مایع را به آن لوله منتقل می‌کند.",
      },
      {
        keyBadge: "U",
        action: "بازگشت حرکت (Undo)",
        description: "آخرین انتقال مایع را به لوله قبلی برمی‌گرداند.",
      },
      {
        keyBadge: "A",
        action: "افزودن لوله اضافی (Add Tube)",
        description: "یک لوله شیشه‌ای کاملاً خالی برای باز شدن گره‌های دشوار به صفحه اضافه می‌کند.",
      },
      {
        keyBadge: "R",
        action: "ریست مرحله",
        description: "رنگ‌های لوله‌ها را به وضعیت اولیه مرحله برمی‌گرداند.",
      },
    ],
    boosters: [
      {
        icon: Undo2,
        name: "بازگشت حرکت (Undo)",
        effect: "برگرداندن آخرین جابجایی مایع",
        shortcut: "[U]",
      },
      {
        icon: PlusCircle,
        name: "لوله کمکی (+1 Tube)",
        effect: "اضافه کردن لوله شیشه‌ای خالی اضافی",
        shortcut: "[A]",
      },
    ],
    proTips: [
      "سعی کنید همیشه حداقل یک لوله را کاملاً خالی نگه دارید تا به عنوان فضای موقت از آن استفاده کنید.",
      "روی لوله‌هایی تمرکز کنید که بیشترین تعداد قطرات هم‌رنگ را در خود جای داده‌اند تا سریع‌تر تکمیل شوند.",
      "قبل از هر انتقال، بررسی کنید که آیا رنگ زیرین آزاد شده به شما در حرکات بعدی کمک می‌کند یا خیر.",
    ],
  },
  blockBlast: {
    id: "blockBlast",
    title: "انفجار بلوک‌های سایبری",
    subtitle: "Cyber Block Blast (1010! / Blockudoku)",
    icon: Grid,
    color: "from-purple-500 to-pink-600",
    glowColor: "rgba(168,85,247,0.25)",
    tag: "درگ و دراپ تعاملی",
    goal: "جای‌گذاری قطعات چندضلعی در شبکه ۸×۸ و منفجر کردن همزمان سطرها و ستون‌ها برای ثبت کمبوهای امتیازی.",
    rules: [
      "در هر نوبت، ۳ قطعه چندضلعی رنگی در پایین صفحه به شما پیشنهاد می‌شود که باید همه آنها را در صفحه قرار دهید.",
      "با کامل شدن هر سطر یا هر ستون، آن خط منفجر شده و خانه‌هایش برای قطعات بعدی آزاد می‌شود.",
      "پاک کردن همزمان چند خط (مثلاً یک سطر و یک ستون با هم) امتیاز چندبرابری و کمبو (Combo) تولید می‌کند.",
      "اگر هیچ فضای خالی برای قرار دادن هیچ‌یک از قطعات موجود نماند، بازی به پایان می‌رسد.",
    ],
    mobileControls: [
      {
        icon: Hand,
        title: "درگ و دراپ لمسی (Drag & Drop)",
        description: "انگشت خود را روی قطعه پایین نگه داشته، بکشید و روی خانه مورد نظر صفحه رها کنید.",
      },
      {
        icon: Hand,
        title: "روش دو ضربه‌ای (Tap to Place)",
        description: "روی قطعه پایین ضربه بزنید تا انتخاب شود، سپس روی خانه مورد نظر در صفحه ۸×۸ کلیک کنید.",
      },
      {
        icon: Hand,
        title: "استفاده از بمب و چرخش",
        description: "دکمه بمب را لمس کنید و روی هر خانه بزنید تا ناحیه ۳×۳ فوراً منفجر و پاکسازی شود.",
      },
    ],
    desktopControls: [
      {
        keyBadge: "درگ با ماوس",
        action: "جابجایی قطعه (Drag & Drop)",
        description: "قطعه را با کلیک چپ ماوس بگیرید و مستقیماً روی خانه‌های شبکه رها کنید.",
      },
      {
        keyBadge: "1 , 2 , 3",
        action: "انتخاب قطعه با کیبورد",
        description: "قطعه اول، دوم یا سوم را برای جای‌گذاری انتخاب می‌کند.",
      },
      {
        keyBadge: "WASD / جهت‌ها",
        action: "حرکت نشانگر روی صفحه",
        description: "مکان‌نمای هدف را روی خانه‌های شبکه ۸×۸ جابجا می‌کند.",
      },
      {
        keyBadge: "Space / Enter",
        action: "قرار دادن قطعه (Place)",
        description: "قطعه انتخاب شده را در مختصات فعلی نشانگر قرار می‌دهد.",
      },
      {
        keyBadge: "T / Tab",
        action: "چرخش ۹۰ درجه (Rotate)",
        description: "قطعه فعال را ۹۰ درجه در جهت عقربه‌های ساعت می‌چرخاند.",
      },
      {
        keyBadge: "B",
        action: "فعال‌سازی بمب (Bomb)",
        description: "حالت تخریب ۳×۳ را فعال می‌کند تا با کلیک روی هر نقطه آن را پاک کنید.",
      },
      {
        keyBadge: "U / Ctrl+Z",
        action: "بازگشت حرکت (Undo)",
        description: "آخرین قطعه قرار داده شده را لغو می‌کند.",
      },
    ],
    boosters: [
      {
        icon: RotateCw,
        name: "چرخش قطعه (Rotate)",
        effect: "چرخاندن ۹۰ درجه شکل قطعه برای جا شدن در فضاهای باریک",
        shortcut: "[T]",
      },
      {
        icon: Bomb,
        name: "بمب تخریب ۳×۳ (Bomb)",
        effect: "انفجار کامل یک محدوده ۳×۳ در هر نقطه از صفحه",
        shortcut: "[B]",
      },
      {
        icon: Undo2,
        name: "بازگشت حرکت (Undo)",
        effect: "برگرداندن آخرین قطعه به سبد قطعات",
        shortcut: "[U]",
      },
    ],
    proTips: [
      "همیشه مرکز شبکه را تا حد امکان خالی نگه دارید؛ قطعات بزرگ ۳×۳ به فضای مرکزی نیاز دارند.",
      "تلاش کنید خطوط را به صورت چندگانه با هم پاک کنید تا کمبو زنجیره‌ای (x2, x3, x4) ثبت شود و امتیاز جهش پیدا کند.",
      "قبل از قرار دادن قطعه اول، بررسی کنید که آیا قطعات دوم و سوم هم در صفحه جا می‌شوند یا خیر.",
    ],
  },
  2048: {
    id: "2048",
    title: "تکامل هسته ۲۰۴۸",
    subtitle: "Cyber 2048 Evolution",
    icon: Sparkles,
    color: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16,185,129,0.25)",
    tag: "استراتژی و ترکیب اعداد",
    goal: "ترکیب رده‌های نرم‌افزاری هم‌ارزش و ارتقای کارت‌ها از سطح Bit (۲) به سطح مهندس ۱۰x و بالاترین رکوردهای امتیازی.",
    rules: [
      "با هر حرکت، تمام کارت‌های روی صفحه در جهت انتخاب شده سر می‌خورند.",
      "وقتی دو کارت با مقدار یکسان با هم برخورد کنند، در یک کارت ادغام شده و مقدار آن ۲ برابر می‌شود.",
      "بعد از هر حرکت موفق، یک کارت جدید (مقدار ۲ یا ۴) در یکی از خانه‌های خالی تصادفی ظاهر می‌شود.",
      "اگر تمام ۱۶ خانه پر شوند و هیچ دو کارت مجاوری قابل ادغام نباشند، بازی تمام می‌شود.",
    ],
    mobileControls: [
      {
        icon: Hand,
        title: "سوایپ لمسی (Swipe)",
        description: "انگشت خود را در یکی از ۴ جهت (بالا، پایین، چپ، راست) روی صفحه بکشید تا تمام کارت‌ها سر بخورند.",
      },
      {
        icon: Hand,
        title: "دکمه بازگشت حرکت",
        description: "با لمس دکمه «بازگشت ۱ حرکت»، آخرین سوایپ اشتباه را لغو کنید.",
      },
    ],
    desktopControls: [
      {
        keyBadge: "کلیدهای جهت‌نما (Arrow Keys)",
        action: "حرکت کارت‌ها در ۴ جهت",
        description: "فشردن بالا، پایین، چپ و راست تمام کارت‌های شبکه را در آن جهت هدایت می‌کند.",
      },
      {
        keyBadge: "W , A , S , D",
        action: "کنترل گیمینگ",
        description: "جهت‌دهی جایگزین برای دست چپ گیمرها.",
      },
      {
        keyBadge: "U / Ctrl+Z",
        action: "بازگشت حرکت (Undo)",
        description: "صفحه و امتیاز را دقیقاً به وضعیت قبل از آخرین حرکت برمی‌گرداند.",
      },
      {
        keyBadge: "R",
        action: "شروع بازی جدید",
        description: "شبکه را ریست کرده و بازی را با ۲ کارت اولیه آغاز می‌کند.",
      },
    ],
    boosters: [
      {
        icon: Undo2,
        name: "بازگشت حرکت (Undo)",
        effect: "برگرداندن وضعیت صفحه به ۱ حرکت قبل برای جبران اشتباه",
        shortcut: "[U]",
      },
    ],
    proTips: [
      "استراتژی گوشه: بالاترین کارت خود را همیشه در یکی از ۴ گوشه صفحه (مثلاً گوشه پایین-راست) ثابت نگه دارید.",
      "سعی کنید کارت‌ها را به ترتیب نزولی در امتداد یک ردیف بچینید تا زنجیره ادغام‌های پی‌درپی رخ دهد.",
      "از حرکت دادن کارت‌ها به خلاف جهت گوشه اصلی خودداری کنید تا کارت‌های بزرگ جابجا نشوند.",
    ],
  },
};

export default function GameGuideModal({
  isOpen,
  onClose,
  initialGameId = "tileMatch",
}: GameGuideModalProps) {
  const [selectedGameId, setSelectedGameId] = useState<GameId>(initialGameId);
  const [controlTab, setControlTab] = useState<"mobile" | "desktop">("mobile");

  if (!isOpen) return null;

  const guide = GUIDES[selectedGameId];
  const Icon = guide.icon;

  const handleSelectGame = (id: GameId) => {
    sound.playClick();
    setSelectedGameId(id);
  };

  const handleTabChange = (tab: "mobile" | "desktop") => {
    sound.playClick();
    setControlTab(tab);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-zinc-950/80 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121218] border-2 border-zinc-300 dark:border-zinc-800 shadow-2xl p-3.5 sm:p-7 overflow-hidden text-right my-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col">
        {/* Background Ambient Glow */}
        <div
          className="absolute -top-24 -left-24 w-60 h-60 rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-500"
          style={{ backgroundColor: guide.glowColor }}
        />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-2.5 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 flex-shrink-0">
              <HelpCircle className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-xl font-black text-zinc-900 dark:text-white truncate">
                راهنمای بازی‌های سایبر آرکید
              </h2>
              <span className="text-[10px] sm:text-xs text-zinc-500 block truncate">
                آموزش قوانین، کنترل لمسی و کیبورد
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            aria-label="بستن پنجره راهنما"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer flex-shrink-0 mr-1"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Game Selector Tab Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 pb-2 overflow-x-auto no-scrollbar mb-2.5 sm:mb-3">
          {(Object.keys(GUIDES) as GameId[]).map((id) => {
            const g = GUIDES[id];
            const isSel = selectedGameId === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSelectGame(id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black transition-all cursor-pointer ${
                  isSel
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-md scale-105"
                    : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700/80"
                }`}
              >
                <g.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{g.title}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto pr-0.5 space-y-3 text-xs sm:text-sm">
          {/* Selected Game Banner */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div
                className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${guide.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}
              >
                <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-xs sm:text-base font-black text-zinc-900 dark:text-white">
                  {guide.title}
                </h3>
                <span className="text-[9px] sm:text-xs font-mono text-zinc-500">
                  {guide.subtitle}
                </span>
              </div>
            </div>

            <span className="text-[9px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              {guide.tag}
            </span>
          </div>

          {/* Goal & Main Objective */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-1.5 font-black text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>هدف اصلی بازی:</span>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-[11px] sm:text-xs">
              {guide.goal}
            </p>
          </div>

          {/* Rules List */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-1.5 font-black text-zinc-900 dark:text-white mb-1.5">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0" />
              <span>قوانین و مکانیزم‌ها:</span>
            </div>
            <ul className="space-y-1 text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-inside">
              {guide.rules.map((rule, idx) => (
                <li key={idx} className="text-[10px] sm:text-xs">
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Device Controls Switcher Tabs (Mobile vs Desktop) */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 mb-2.5 pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-black text-zinc-900 dark:text-white flex items-center gap-1.5 text-xs sm:text-sm">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                <span>روش بازی و کنترل‌ها:</span>
              </span>

              {/* Tabs: Mobile vs Desktop */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg sm:rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80 self-stretch xs:self-auto justify-center">
                <button
                  type="button"
                  onClick={() => handleTabChange("mobile")}
                  className={`flex-1 xs:flex-initial flex items-center justify-center gap-1 px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-bold transition cursor-pointer ${
                    controlTab === "mobile"
                      ? "bg-white dark:bg-zinc-950 text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>موبایل (لمسی)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabChange("desktop")}
                  className={`flex-1 xs:flex-initial flex items-center justify-center gap-1 px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-bold transition cursor-pointer ${
                    controlTab === "desktop"
                      ? "bg-white dark:bg-zinc-950 text-cyan-600 dark:text-cyan-400 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <Monitor className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>دسکتاپ (کیبورد)</span>
                </button>
              </div>
            </div>

            {/* Mobile Controls Content */}
            {controlTab === "mobile" ? (
              <div className="space-y-1.5 sm:space-y-2">
                {guide.mobileControls.map((ctrl, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 flex-shrink-0 mt-0.5">
                      <ctrl.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] sm:text-xs font-bold text-zinc-900 dark:text-white">
                        {ctrl.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                        {ctrl.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Desktop Keyboard Shortcuts Table */
              <div className="space-y-1.5 sm:space-y-2">
                {guide.desktopControls.map((ctrl, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800"
                  >
                    <div>
                      <span className="text-[11px] sm:text-xs font-bold text-zinc-900 dark:text-white block">
                        {ctrl.action}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400">
                        {ctrl.description}
                      </span>
                    </div>

                    <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-mono text-[9px] sm:text-[10px] font-black shadow-sm flex-shrink-0">
                      {ctrl.keyBadge}
                    </kbd>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Boosters & Power-ups Section */}
          {guide.boosters.length > 0 && (
            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-1.5 font-black text-purple-600 dark:text-purple-400 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>ابزارهای کمکی (Boosters):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {guide.boosters.map((booster, idx) => {
                  const BIcon = booster.icon;
                  return (
                    <div
                      key={idx}
                      className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-purple-500/15 text-purple-500 flex items-center justify-center flex-shrink-0">
                          <BIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                        <div>
                          <span className="text-[11px] sm:text-xs font-bold text-zinc-900 dark:text-white block">
                            {booster.name}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-zinc-500">{booster.effect}</span>
                        </div>
                      </div>
                      <kbd className="text-[8px] sm:text-[9px] font-mono font-bold text-zinc-400">
                        {booster.shortcut}
                      </kbd>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pro Tips */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-1.5 font-black text-amber-600 dark:text-amber-400 mb-1">
              <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>ترفندهای کسب بالاترین رکورد (Pro Tips):</span>
            </div>
            <ul className="space-y-0.5 text-zinc-600 dark:text-zinc-400 text-[10px] sm:text-xs leading-relaxed list-disc list-inside">
              {guide.proTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Button */}
        <div className="pt-2.5 sm:pt-4 mt-2 sm:mt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black text-xs sm:text-sm hover:bg-emerald-500 dark:hover:bg-emerald-400 transition active:scale-95 cursor-pointer shadow-md text-center"
          >
            متوجه شدم، بزن بریم بازی!
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useSyncExternalStore, useCallback } from "react";
import {
  Gamepad2,
  Sparkles,
  Layers,
  FlaskConical,
  Grid,
  Volume2,
  VolumeX,
  Trophy,
  ArrowRight,
  Play,
  RotateCcw,
  Trash2,
  X,
  Check,
  HelpCircle,
} from "lucide-react";
import CyberTileMatch from "./CyberTileMatch";
import CyberLiquidSort from "./CyberLiquidSort";
import CyberBlockBlast from "./CyberBlockBlast";
import Cyber2048 from "./Cyber2048";
import GameGuideModal from "./GameGuideModal";
import { sound } from "@/utils/audioSynth";
import BorderBeam from "../ui/BorderBeam";

type GameId = "tileMatch" | "liquidSort" | "blockBlast" | "2048";

interface GameMeta {
  id: GameId;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Layers;
  color: string;
  glowColor: string;
  badge: string;
  badgeBg: string;
  difficulty: "ساده" | "متوسط" | "چالش‌برانگیز";
  storageKey: string;
}

const GAMES: GameMeta[] = [
  {
    id: "tileMatch",
    title: "تطبیق کاشی‌های سایبری",
    subtitle: "Cyber Tile Match (Tile Family)",
    description: "پازل تطبیق ۳تایی کاشی‌های نرم‌افزاری در ساختار لایه‌ای سه‌بعدی همراه با ابزارهای کمکی، انیمیشن‌های روان و کلیدهای میانبر سریع.",
    icon: Layers,
    color: "from-amber-500 to-rose-600",
    glowColor: "rgba(245,158,11,0.3)",
    badge: "پازل لایه‌ای سه‌بعدی",
    badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    difficulty: "چالش‌برانگیز",
    storageKey: "cyber_tile_match_highscore",
  },
  {
    id: "liquidSort",
    title: "تفکیک مایعات کوانتومی",
    subtitle: "Quantum Liquid Sort (Water Sort)",
    description: "چالش تفکیک و مرتب‌سازی رنگ‌های نئونی بین لوله‌های آزمایشگاهی با فیزیک روان مایعات، محاسبات منطقی و افکت‌های صوتی تعاملی.",
    icon: FlaskConical,
    color: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6,182,212,0.3)",
    badge: "تمرکز و مرتب‌سازی",
    badgeBg: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    difficulty: "متوسط",
    storageKey: "cyber_liquid_sort_highscore",
  },
  {
    id: "blockBlast",
    title: "انفجار بلوک‌های سایبری",
    subtitle: "Cyber Block Blast (1010! / Blockudoku)",
    description: "بازی استراتژیک جای‌گذاری قطعات چندضلعی در شبکه ۸×۸ با قابلیت درگ و دراپ (Drag & Drop)، انفجار خطی سطر و ستون‌ها و ثبت کمبوهای امتیازی.",
    icon: Grid,
    color: "from-purple-500 to-pink-600",
    glowColor: "rgba(168,85,247,0.3)",
    badge: "درگ و دراپ تعاملی",
    badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    difficulty: "متوسط",
    storageKey: "cyber_block_blast_highscore",
  },
  {
    id: "2048",
    title: "تکامل هسته ۲۰۴۸",
    subtitle: "Cyber 2048 Evolution",
    description: "نسخه بازطراحی‌شده بازی محبوب ۲۰۴۸ با تم توسعه‌دهندگان نرم‌افزار، انیمیشن‌های نرم حرکتی، قابلیت بازگشت حرکت و ژست‌های لمسی سوایپ.",
    icon: Sparkles,
    color: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16,185,129,0.3)",
    badge: "استراتژی و ترکیب اعداد",
    badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    difficulty: "متوسط",
    storageKey: "cyber_2048_highscore",
  },
];

interface ScoreStats {
  total: number;
  count: number;
  tileMatch: number;
  liquidSort: number;
  blockBlast: number;
  game2048: number;
}

let cachedStats: ScoreStats = {
  total: 0,
  count: 0,
  tileMatch: 0,
  liquidSort: 0,
  blockBlast: 0,
  game2048: 0,
};
let cachedRaw = "";

function getStoredStats(): ScoreStats {
  if (typeof window === "undefined") {
    return SERVER_STATS;
  }
  try {
    const count = localStorage.getItem("cyber_arcade_played_count") || "0";
    const s1 = localStorage.getItem("cyber_tile_match_highscore") || "0";
    const s2 = localStorage.getItem("cyber_liquid_sort_highscore") || "0";
    const s3 = localStorage.getItem("cyber_block_blast_highscore") || "0";
    const s4 = localStorage.getItem("cyber_2048_highscore") || "0";
    const raw = `${count}:${s1}:${s2}:${s3}:${s4}`;
    if (raw === cachedRaw) {
      return cachedStats;
    }
    cachedRaw = raw;
    const c = parseInt(count, 10);
    const n1 = parseInt(s1, 10);
    const n2 = parseInt(s2, 10);
    const n3 = parseInt(s3, 10);
    const n4 = parseInt(s4, 10);
    cachedStats = {
      total: n1 + n2 + n3 + n4,
      count: c,
      tileMatch: n1,
      liquidSort: n2,
      blockBlast: n3,
      game2048: n4,
    };
    return cachedStats;
  } catch {
    return SERVER_STATS;
  }
}

function subscribeStorage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("local-storage-update", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("local-storage-update", callback);
  };
}

const SERVER_STATS: ScoreStats = {
  total: 0,
  count: 0,
  tileMatch: 0,
  liquidSort: 0,
  blockBlast: 0,
  game2048: 0,
};

export default function GameHub() {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState<boolean>(false);
  const [guideModalGame, setGuideModalGame] = useState<GameId | null>(null);
  const [confirmResetAll, setConfirmResetAll] = useState<boolean>(false);

  const stats = useSyncExternalStore(
    subscribeStorage,
    getStoredStats,
    () => SERVER_STATS
  );

  const isMuted = useSyncExternalStore(
    subscribeStorage,
    () => sound.getMuted(),
    () => false
  );

  const refreshStats = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("local-storage-update"));
    }
  }, []);

  const handleToggleSound = () => {
    sound.toggleMute();
    window.dispatchEvent(new Event("local-storage-update"));
  };

  const handleSelectGame = (id: GameId) => {
    sound.playClick();
    setActiveGame(id);
    if (typeof window !== "undefined") {
      const newCount = stats.count + 1;
      localStorage.setItem("cyber_arcade_played_count", String(newCount));
      window.dispatchEvent(new Event("local-storage-update"));
    }
  };

  const handleBackToHub = () => {
    sound.playClick();
    window.dispatchEvent(new Event("local-storage-update"));
    setActiveGame(null);
  };

  // Reset a specific game score
  const handleResetSingleScore = (storageKey: string) => {
    sound.playClick();
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, "0");
      window.dispatchEvent(new Event("local-storage-update"));
    }
  };

  // Reset all games & play count
  const handleResetAllScores = () => {
    sound.playError();
    if (typeof window !== "undefined") {
      localStorage.setItem("cyber_tile_match_highscore", "0");
      localStorage.setItem("cyber_liquid_sort_highscore", "0");
      localStorage.setItem("cyber_block_blast_highscore", "0");
      localStorage.setItem("cyber_2048_highscore", "0");
      localStorage.setItem("cyber_arcade_played_count", "0");
      window.dispatchEvent(new Event("local-storage-update"));
      setConfirmResetAll(false);
    }
  };

  return (
    <div className="w-full min-h-screen pt-14 pb-8 sm:py-8 px-3.5 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col">
      {/* Top Header & Cyber Arena Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80 mb-5 sm:mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[11px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-pulse">
              اتاق چالش‌های فکری و مینی‌گیم
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            سایبر آرکید (Cyber Arcade)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            مجموعه مینی‌گیم‌ها و چالش‌های فکری تعاملی؛ طراحی و پیاده‌سازی اختصاصی با فرانت‌اند مدرن، رندرینگ ۶۰ فریم و پردازش صدای تعاملی
          </p>
        </div>

        {/* Global Controls & Stats */}
        <div className="w-full sm:w-auto flex flex-wrap items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0">
          {/* Global Game Guide Trigger */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setGuideModalGame("tileMatch");
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl sm:rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-[11px] sm:text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>راهنمای بازی‌ها</span>
          </button>

          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? "وصل صدا" : "قطع صدا"}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-300 text-[11px] sm:text-xs font-bold border border-zinc-200 dark:border-zinc-700/80 transition-all active:scale-95 cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                <span>صدا قطع</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>افکت صوتی</span>
              </>
            )}
          </button>

          {/* Interactive Aggregate Score & Trophy Modal Trigger */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              refreshStats();
              setIsScoreModalOpen(true);
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl sm:rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] sm:text-xs font-black transition active:scale-95 cursor-pointer shadow-sm"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>مجموع رکوردها: {stats.total}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {!activeGame ? (
        // Game Catalog Grid
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-auto">
            {GAMES.map((game) => {
              const Icon = game.icon;

              return (
                <div
                  key={game.id}
                  onClick={() => handleSelectGame(game.id)}
                  className="group relative p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer overflow-hidden"
                >
                  {/* Neon laser hover border */}
                  <BorderBeam
                    size={160}
                    duration={8}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Card Background Glow */}
                  <div
                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none transition-all group-hover:scale-125"
                    style={{ backgroundColor: game.glowColor }}
                  />

                  <div>
                    {/* Header: Icon & Category */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div
                        className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-white shadow-md shadow-zinc-950/20 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border ${game.badgeBg}`}>
                          {game.badge}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                          {game.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Titles */}
                    <h3 className="text-base sm:text-xl font-black text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      {game.title}
                    </h3>
                    <span className="text-[11px] sm:text-xs font-mono text-zinc-400 dark:text-zinc-500 block mt-0.5">
                      {game.subtitle}
                    </span>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 sm:mt-3 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  {/* Play & Guide Action Footer */}
                  <div className="flex items-center justify-between mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                    {/* Secondary Quick Guide Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        setGuideModalGame(game.id);
                      }}
                      className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 text-[11px] sm:text-xs font-bold transition cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
                      <span>راهنمای بازی</span>
                    </button>

                    <button
                      type="button"
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[11px] sm:text-xs font-black shadow-md group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 dark:group-hover:text-zinc-950 transition-colors"
                    >
                      <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                      <span>شروع بازی</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Active Game Screen
        <div className="flex-1 flex flex-col animate-fadeIn">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
            <button
              type="button"
              onClick={handleBackToHub}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-black text-[11px] sm:text-xs hover:bg-zinc-200 dark:hover:bg-zinc-800 transition active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>بازگشت</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Game-Specific Guide Modal Trigger */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setGuideModalGame(activeGame);
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-[11px] sm:text-xs font-bold transition cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>راهنمای بازی</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  refreshStats();
                  setIsScoreModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] sm:text-xs font-bold transition cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">جدول رکوردها</span>
              </button>

              <span className="text-[11px] sm:text-xs font-black text-emerald-600 dark:text-emerald-400">
                {GAMES.find((g) => g.id === activeGame)?.title}
              </span>
            </div>
          </div>

          {/* Game Canvas Container */}
          <div className="flex-1 flex items-center justify-center">
            {activeGame === "tileMatch" && <CyberTileMatch onScoreUpdate={refreshStats} />}
            {activeGame === "liquidSort" && <CyberLiquidSort onScoreUpdate={refreshStats} />}
            {activeGame === "blockBlast" && <CyberBlockBlast onScoreUpdate={refreshStats} />}
            {activeGame === "2048" && <Cyber2048 onScoreUpdate={refreshStats} />}
          </div>
        </div>
      )}

      {/* Cyber Scoreboard & LocalStorage Manager Modal */}
      {isScoreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#121218] border-2 border-zinc-300 dark:border-zinc-800 shadow-2xl p-6 sm:p-7 overflow-hidden text-right">
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">جدول رکوردها و امتیازات</h3>
                  <span className="text-xs text-zinc-500">ذخیره شده به صورت دائمی در مرورگر (LocalStorage)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsScoreModalOpen(false);
                }}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Global Stats Summary */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-xs font-semibold text-zinc-500 block mb-1">مجموع کل امتیازات</span>
                <span className="text-xl font-black text-amber-500">{stats.total}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-xs font-semibold text-zinc-500 block mb-1">تعداد بازی‌های اجرا شده</span>
                <span className="text-xl font-black text-cyan-500">{stats.count} بار</span>
              </div>
            </div>

            {/* Individual Game Scores List */}
            <div className="space-y-2.5 mb-6">
              {GAMES.map((game) => {
                const Icon = game.icon;
                const scoreValue =
                  game.id === "tileMatch"
                    ? stats.tileMatch
                    : game.id === "liquidSort"
                    ? stats.liquidSort
                    : game.id === "blockBlast"
                    ? stats.blockBlast
                    : stats.game2048;

                return (
                  <div
                    key={game.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-white`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{game.title}</h4>
                        <span className="text-[10px] text-zinc-400 font-mono">{game.subtitle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        {scoreValue}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleResetSingleScore(game.storageKey)}
                        title="ریست رکورد این بازی"
                        className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-rose-500 hover:text-white text-zinc-500 transition flex items-center justify-center cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reset All Footer Action */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              {!confirmResetAll ? (
                <button
                  type="button"
                  onClick={() => setConfirmResetAll(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-bold transition active:scale-95 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>ریست تمام رکوردها (Reset All)</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-500">آیا مطمئن هستید؟</span>
                  <button
                    type="button"
                    onClick={handleResetAllScores}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-black shadow-md hover:bg-rose-700 transition"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>بله، ریست کن</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmResetAll(false)}
                    className="px-2.5 py-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold"
                  >
                    انصراف
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsScoreModalOpen(false)}
                className="px-5 py-2.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-black shadow-md hover:opacity-90 transition active:scale-95 cursor-pointer"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Game Guide Modal */}
      <GameGuideModal
        isOpen={guideModalGame !== null}
        onClose={() => setGuideModalGame(null)}
        initialGameId={guideModalGame ?? "tileMatch"}
      />
    </div>
  );
}

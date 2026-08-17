"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  RotateCcw,
  Undo2,
  PlusCircle,
  Sparkles,
  CheckCircle2,
  FlaskConical,
  Keyboard,
} from "lucide-react";
import { sound } from "@/utils/audioSynth";

export type FluidColorKey =
  | "emerald"
  | "cyan"
  | "purple"
  | "amber"
  | "rose"
  | "blue";

interface ColorConfig {
  key: FluidColorKey;
  label: string;
  gradient: string;
  glow: string;
  text: string;
}

const COLOR_CONFIGS: Record<FluidColorKey, ColorConfig> = {
  emerald: {
    key: "emerald",
    label: "انرژی زمرد",
    gradient: "from-emerald-500 via-teal-400 to-emerald-600",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.7)]",
    text: "text-emerald-400",
  },
  cyan: {
    key: "cyan",
    label: "پالس کوانتوم",
    gradient: "from-cyan-400 via-sky-300 to-cyan-600",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.7)]",
    text: "text-cyan-400",
  },
  purple: {
    key: "purple",
    label: "پلاسمای بنفش",
    gradient: "from-purple-500 via-fuchsia-400 to-indigo-600",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.7)]",
    text: "text-purple-400",
  },
  amber: {
    key: "amber",
    label: "رآکتور خورشیدی",
    gradient: "from-amber-400 via-orange-300 to-yellow-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.7)]",
    text: "text-amber-400",
  },
  rose: {
    key: "rose",
    label: "هسته زرشکی",
    gradient: "from-rose-500 via-red-400 to-pink-600",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.7)]",
    text: "text-rose-400",
  },
  blue: {
    key: "blue",
    label: "موج کبالت",
    gradient: "from-blue-500 via-indigo-400 to-blue-700",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.7)]",
    text: "text-blue-400",
  },
};

const ALL_COLORS: FluidColorKey[] = [
  "emerald",
  "cyan",
  "purple",
  "amber",
  "rose",
  "blue",
];

const TUBE_CAPACITY = 4;

export interface TubeData {
  id: number;
  layers: FluidColorKey[]; // max length 4, index 0 is bottom, index length-1 is top
}

/**
 * Generate randomized solvable level tubes
 */
function generateLevelTubes(lvl: number, extraTubesCount: number = 0): TubeData[] {
  const numColors = Math.min(ALL_COLORS.length, 3 + Math.floor((lvl - 1) / 2));
  const activeColors = ALL_COLORS.slice(0, numColors);

  // Pool has 4 units of each active color
  const pool: FluidColorKey[] = [];
  activeColors.forEach((color) => {
    pool.push(color, color, color, color);
  });

  // Shuffle pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const tubes: TubeData[] = [];
  // Filled tubes
  for (let t = 0; t < numColors; t++) {
    tubes.push({
      id: t,
      layers: pool.slice(t * TUBE_CAPACITY, (t + 1) * TUBE_CAPACITY),
    });
  }

  // 2 empty tubes + any extra booster tubes
  const totalEmpty = 2 + extraTubesCount;
  for (let e = 0; e < totalEmpty; e++) {
    tubes.push({
      id: numColors + e,
      layers: [],
    });
  }

  return tubes;
}

import { useLocalStorageNumber } from "@/hooks/useLocalStorageState";

export default function CyberLiquidSort({ onScoreUpdate }: { onScoreUpdate?: (score: number) => void }) {
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useLocalStorageNumber("cyber_liquid_sort_highscore", 0);

  const [tubes, setTubes] = useState<TubeData[]>(() => generateLevelTubes(1));
  const [selectedTubeId, setSelectedTubeId] = useState<number | null>(null);
  const [history, setHistory] = useState<TubeData[][]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [extraTubesLeft, setExtraTubesLeft] = useState<number>(2);
  const [undosLeft, setUndosLeft] = useState<number>(3);
  const [moves, setMoves] = useState<number>(0);

  /**
   * Checks whether a tube is fully sorted (4 units of identical color)
   */
  const completedTubes = useMemo(() => {
    const set = new Set<number>();
    tubes.forEach((tube) => {
      if (
        tube.layers.length === TUBE_CAPACITY &&
        tube.layers.every((c) => c === tube.layers[0])
      ) {
        set.add(tube.id);
      }
    });
    return set;
  }, [tubes]);

  /**
   * Handle Tube Selection & Pour Logic
   */
  const handleTubeClick = useCallback((tubeId: number) => {
    if (isWon) return;

    // If no tube selected yet: select source
    if (selectedTubeId === null) {
      const source = tubes.find((t) => t.id === tubeId);
      if (!source || source.layers.length === 0) return;
      if (completedTubes.has(tubeId)) return; // already completed

      sound.playClick();
      setSelectedTubeId(tubeId);
      return;
    }

    // If clicking same tube again: deselect
    if (selectedTubeId === tubeId) {
      sound.playClick();
      setSelectedTubeId(null);
      return;
    }

    // Attempt to pour from selectedTube to targetTube
    const sourceTube = tubes.find((t) => t.id === selectedTubeId)!;
    const targetTube = tubes.find((t) => t.id === tubeId)!;

    if (targetTube.layers.length >= TUBE_CAPACITY) {
      // Target full: switch selection to this tube if valid
      if (targetTube.layers.length > 0 && !completedTubes.has(tubeId)) {
        sound.playClick();
        setSelectedTubeId(tubeId);
      } else {
        setSelectedTubeId(null);
      }
      return;
    }

    const sourceTopColor = sourceTube.layers[sourceTube.layers.length - 1];
    const targetTopColor =
      targetTube.layers.length > 0
        ? targetTube.layers[targetTube.layers.length - 1]
        : null;

    // Can only pour if target is empty OR target top matches source top
    if (targetTopColor !== null && targetTopColor !== sourceTopColor) {
      // Invalid pour: switch selection to target
      sound.playClick();
      setSelectedTubeId(tubeId);
      return;
    }

    // Calculate how many matching units to move
    let unitsToMove = 0;
    for (let i = sourceTube.layers.length - 1; i >= 0; i--) {
      if (sourceTube.layers[i] === sourceTopColor) {
        unitsToMove++;
      } else {
        break;
      }
    }

    const availableSpaceInTarget = TUBE_CAPACITY - targetTube.layers.length;
    const actualTransferCount = Math.min(unitsToMove, availableSpaceInTarget);

    if (actualTransferCount <= 0) {
      setSelectedTubeId(null);
      return;
    }

    // Perform Pour
    sound.playPour();
    setHistory((prev) => [...prev, tubes.map((t) => ({ ...t, layers: [...t.layers] }))]);
    setMoves((m) => m + 1);

    const newTubes = tubes.map((t) => {
      if (t.id === sourceTube.id) {
        return {
          ...t,
          layers: t.layers.slice(0, t.layers.length - actualTransferCount),
        };
      }
      if (t.id === targetTube.id) {
        const added = Array(actualTransferCount).fill(sourceTopColor);
        return {
          ...t,
          layers: [...t.layers, ...added],
        };
      }
      return t;
    });

    setTubes(newTubes);
    setSelectedTubeId(null);

    // Check if target tube just completed
    const updatedTarget = newTubes.find((t) => t.id === targetTube.id)!;
    if (
      updatedTarget.layers.length === TUBE_CAPACITY &&
      updatedTarget.layers.every((c) => c === updatedTarget.layers[0])
    ) {
      sound.playTubeComplete();
    }

    // Check Global Victory
    const nonEmptyTubes = newTubes.filter((t) => t.layers.length > 0);
    const allNonEmptyComplete = nonEmptyTubes.every(
      (t) => t.layers.length === TUBE_CAPACITY && t.layers.every((c) => c === t.layers[0])
    );

    if (allNonEmptyComplete && nonEmptyTubes.length > 0) {
      sound.playSuccess();
      setIsWon(true);

      const addedScore = Math.max(300, 800 + level * 200 - moves * 15);
      setScore((s) => {
        const nextScore = s + addedScore;
        if (nextScore > highScore) {
          setHighScore(nextScore);
          if (typeof window !== "undefined") {
            localStorage.setItem("cyber_liquid_sort_highscore", String(nextScore));
          }
        }
        if (onScoreUpdate) onScoreUpdate(nextScore);
        return nextScore;
      });
    }
  }, [completedTubes, highScore, isWon, level, moves, onScoreUpdate, selectedTubeId, setHighScore, tubes]);

  /**
   * Booster: Undo move
   */
  const handleUndo = useCallback(() => {
    if (undosLeft <= 0 || history.length === 0 || isWon) return;
    sound.playClick();
    const last = history[history.length - 1];
    setTubes(last);
    setHistory((h) => h.slice(0, -1));
    setUndosLeft((u) => u - 1);
    setSelectedTubeId(null);
  }, [history, isWon, undosLeft]);

  /**
   * Booster: Add Extra Empty Tube
   */
  const handleAddTube = useCallback(() => {
    if (extraTubesLeft <= 0 || isWon) return;
    sound.playTubeComplete();
    const newId = tubes.length;
    setTubes((curr) => [...curr, { id: newId, layers: [] }]);
    setExtraTubesLeft((e) => e - 1);
  }, [extraTubesLeft, isWon, tubes.length]);

  const nextLevel = useCallback(() => {
    const nextLvl = level + 1;
    setLevel(nextLvl);
    setTubes(generateLevelTubes(nextLvl));
    setHistory([]);
    setSelectedTubeId(null);
    setIsWon(false);
    setMoves(0);
    setUndosLeft((u) => u + 1);
  }, [level]);

  const restartLevel = useCallback(() => {
    setTubes(generateLevelTubes(level));
    setHistory([]);
    setSelectedTubeId(null);
    setIsWon(false);
    setMoves(0);
  }, [level]);

  /**
   * Desktop Keyboard Shortcuts Handler
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs/textareas
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Number keys 1-9 for tube selection
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= tubes.length) {
        e.preventDefault();
        handleTubeClick(num - 1);
        return;
      }

      // Action Shortcuts
      if (key === "u" || (e.ctrlKey && key === "z")) {
        e.preventDefault();
        handleUndo();
      } else if (key === "a" || key === "+") {
        e.preventDefault();
        handleAddTube();
      } else if (key === "r") {
        e.preventDefault();
        restartLevel();
      } else if ((key === " " || key === "enter") && isWon) {
        e.preventDefault();
        nextLevel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleAddTube, handleTubeClick, handleUndo, isWon, nextLevel, restartLevel, tubes.length]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none touch-manipulation transition-all duration-300">
      {/* Stats Bar */}
      <div className="w-full grid grid-cols-4 gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
        {/* Score */}
        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">امتیاز</span>
          <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">{score}</span>
        </div>

        {/* Level */}
        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">مرحله</span>
          <span className="text-base sm:text-lg font-black text-cyan-600 dark:text-cyan-400">{level}</span>
        </div>

        {/* Moves */}
        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">حرکات</span>
          <span className="text-base sm:text-lg font-black text-amber-500">{moves}</span>
        </div>

        {/* High Score */}
        <div className="relative group p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400">رکورد</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setHighScore(0);
                if (typeof window !== "undefined") {
                  localStorage.setItem("cyber_liquid_sort_highscore", "0");
                }
                if (onScoreUpdate) onScoreUpdate(0);
              }}
              title="ریست رکورد"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-rose-500 cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
            </button>
          </div>
          <span className="text-base sm:text-lg font-black text-purple-500">{highScore}</span>
        </div>
      </div>

      {/* Info Banner & Keyboard Shortcuts Hint */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 mb-2.5 sm:mb-3 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 text-[11px] sm:text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        <div className="flex items-center gap-1.5">
          <FlaskConical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500 animate-pulse" />
          <span>مایع هم‌رنگ را در لوله‌های دیگر تفکیک کنید.</span>
        </div>

        {/* Desktop Keyboard Hints */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
          <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
          <span>[1-{tubes.length}] لوله</span>
          <span>•</span>
          <span>[U] بازگشت</span>
          <span>•</span>
          <span>[A] لوله اضافی</span>
          <span>•</span>
          <span>[R] ریست</span>
        </div>
      </div>

      {/* Main Glass Tubes Field */}
      <div
        dir="ltr"
        className="relative w-full max-w-[420px] min-h-[260px] sm:min-h-[340px] rounded-2xl sm:rounded-3xl bg-zinc-100/80 dark:bg-[#101014]/90 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl p-3 sm:p-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 overflow-hidden"
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06)_0,transparent_75%)] pointer-events-none rounded-3xl" />

        {tubes.map((tube, idx) => {
          const isSelected = selectedTubeId === tube.id;
          const isCompleted = completedTubes.has(tube.id);

          return (
            <button
              key={tube.id}
              type="button"
              onClick={() => handleTubeClick(tube.id)}
              aria-label={`لوله آزمایش شماره ${tube.id + 1}`}
              className={`relative flex flex-col justify-end items-center transition-all duration-300 cursor-pointer ${
                isSelected ? "-translate-y-3 sm:-translate-y-4 scale-105" : "translate-y-0 hover:scale-105"
              }`}
            >
              {/* Desktop Keyboard Shortcut Badge Tag */}
              <span className="hidden sm:flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 dark:bg-zinc-800 border border-zinc-700 text-[10px] font-mono font-bold text-zinc-300 mb-1 shadow-sm">
                {idx + 1}
              </span>

              {/* Glass Tube Container */}
              <div
                className={`relative w-10 xs:w-11 sm:w-14 h-32 xs:h-36 sm:h-40 rounded-b-2xl sm:rounded-b-3xl rounded-t-lg border-2 backdrop-blur-md overflow-hidden flex flex-col justify-end p-0.5 sm:p-1 transition-all duration-300 ${
                  isCompleted
                    ? "border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] bg-emerald-500/5"
                    : isSelected
                    ? "border-cyan-400 ring-2 sm:ring-4 ring-cyan-400/30 shadow-[0_0_25px_rgba(6,182,212,0.5)] bg-cyan-500/10"
                    : "border-zinc-300/90 dark:border-zinc-700/80 bg-white/40 dark:bg-zinc-900/60 hover:border-cyan-400/60 shadow-lg"
                }`}
              >
                {/* Lip Top Collar Rim */}
                <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-white/40 dark:bg-zinc-700/40 border-b border-zinc-200 dark:border-zinc-700 rounded-t-md" />

                {/* Liquid Layers (Bottom to Top) */}
                <div className="w-full flex flex-col-reverse justify-start items-center">
                  {tube.layers.map((colorKey, layerIdx) => {
                    const cfg = COLOR_CONFIGS[colorKey];

                    return (
                      <div
                        key={layerIdx}
                        className={`w-full h-6 xs:h-7 sm:h-8 rounded-sm bg-gradient-to-t ${cfg.gradient} ${cfg.glow} transition-all duration-300 flex items-center justify-center relative overflow-hidden`}
                      >
                        {/* Bubbling ripple sheen */}
                        <div className="absolute inset-0 bg-white/15 opacity-60 animate-pulse" />
                        <span className="text-[6px] sm:text-[7px] font-black text-white/90 drop-shadow-sm opacity-60 uppercase">
                          {cfg.key.slice(0, 3)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Glass Reflection Glare Streak */}
                <div className="absolute top-2 left-0.5 sm:left-1 bottom-3 sm:bottom-4 w-0.5 sm:w-1 bg-white/30 rounded-full pointer-events-none" />
              </div>

              {/* Completed Shield Badge */}
              {isCompleted && (
                <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 border border-emerald-300 flex items-center justify-center text-zinc-950 shadow-md shadow-emerald-500/50 animate-bounce">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              )}
            </button>
          );
        })}

        {/* Victory Overlay */}
        {isWon && (
          <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-4 sm:p-6 text-center z-40 animate-fadeIn">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 sm:mb-4 shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mb-1">مایعات کوانتومی تفکیک شدند!</h3>
            <p className="text-xs text-zinc-400 mb-4 sm:mb-6">تمام پلاسماها با خلوص کامل درون فلاسک‌ها پایدار شدند.</p>

            <button
              type="button"
              onClick={nextLevel}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-zinc-950 font-black text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>مرحله بعدی (Space)</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Boosters & Actions Toolbar */}
      <div className="w-full max-w-[420px] grid grid-cols-3 gap-1.5 sm:gap-2.5 mt-2.5 sm:mt-4 px-1">
        {/* Undo Move */}
        <button
          type="button"
          onClick={handleUndo}
          disabled={undosLeft <= 0 || history.length === 0 || isWon}
          className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] sm:text-xs font-bold disabled:opacity-40 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition active:scale-95 cursor-pointer"
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span>بازگشت ({undosLeft})</span>
        </button>

        {/* Add Extra Tube */}
        <button
          type="button"
          onClick={handleAddTube}
          disabled={extraTubesLeft <= 0 || isWon}
          className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-[11px] sm:text-xs font-bold disabled:opacity-40 hover:bg-cyan-500/25 transition active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5 text-cyan-500" />
          <span>+۱ لوله ({extraTubesLeft})</span>
        </button>

        {/* Restart */}
        <button
          type="button"
          onClick={restartLevel}
          className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] sm:text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>ریست</span>
        </button>
      </div>
    </div>
  );
}

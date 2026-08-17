"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Atom,
  Zap,
  Terminal,
  Gem,
  Database,
  Brain,
  ShieldCheck,
  Rocket,
  Package,
  RotateCcw,
  Undo2,
  Shuffle,
  Wand2,
  Sparkles,
  CheckCircle2,
  Flame,
  Lock,
  Keyboard,
} from "lucide-react";
import { sound } from "@/utils/audioSynth";

export type TileTypeKey =
  | "react"
  | "next"
  | "python"
  | "typescript"
  | "database"
  | "ai"
  | "security"
  | "cloud"
  | "docker";

interface TileTypeConfig {
  key: TileTypeKey;
  label: string;
  icon: typeof Atom;
  color: string;
  bgColor: string;
  borderColor: string;
  bevelColor: string;
  glow: string;
}

const TILE_CONFIGS: Record<TileTypeKey, TileTypeConfig> = {
  react: {
    key: "react",
    label: "React",
    icon: Atom,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10 dark:bg-cyan-950/40",
    borderColor: "border-cyan-400",
    bevelColor: "bg-cyan-600 dark:bg-cyan-700",
    glow: "shadow-[0_0_16px_rgba(6,182,212,0.45)]",
  },
  next: {
    key: "next",
    label: "Next.js",
    icon: Zap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 dark:bg-emerald-950/40",
    borderColor: "border-emerald-400",
    bevelColor: "bg-emerald-600 dark:bg-emerald-700",
    glow: "shadow-[0_0_16px_rgba(16,185,129,0.45)]",
  },
  typescript: {
    key: "typescript",
    label: "TypeScript",
    icon: Gem,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 dark:bg-blue-950/40",
    borderColor: "border-blue-400",
    bevelColor: "bg-blue-600 dark:bg-blue-700",
    glow: "shadow-[0_0_16px_rgba(59,130,246,0.45)]",
  },
  python: {
    key: "python",
    label: "Python",
    icon: Terminal,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10 dark:bg-amber-950/40",
    borderColor: "border-amber-400",
    bevelColor: "bg-amber-600 dark:bg-amber-700",
    glow: "shadow-[0_0_16px_rgba(245,158,11,0.45)]",
  },
  database: {
    key: "database",
    label: "Database",
    icon: Database,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 dark:bg-purple-950/40",
    borderColor: "border-purple-400",
    bevelColor: "bg-purple-600 dark:bg-purple-700",
    glow: "shadow-[0_0_16px_rgba(168,85,247,0.45)]",
  },
  ai: {
    key: "ai",
    label: "Neural AI",
    icon: Brain,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10 dark:bg-rose-950/40",
    borderColor: "border-rose-400",
    bevelColor: "bg-rose-600 dark:bg-rose-700",
    glow: "shadow-[0_0_16px_rgba(244,63,94,0.45)]",
  },
  security: {
    key: "security",
    label: "Security",
    icon: ShieldCheck,
    color: "text-teal-400",
    bgColor: "bg-teal-500/10 dark:bg-teal-950/40",
    borderColor: "border-teal-400",
    bevelColor: "bg-teal-600 dark:bg-teal-700",
    glow: "shadow-[0_0_16px_rgba(20,184,166,0.45)]",
  },
  cloud: {
    key: "cloud",
    label: "Cloud",
    icon: Rocket,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10 dark:bg-indigo-950/40",
    borderColor: "border-indigo-400",
    bevelColor: "bg-indigo-600 dark:bg-indigo-700",
    glow: "shadow-[0_0_16px_rgba(99,102,241,0.45)]",
  },
  docker: {
    key: "docker",
    label: "Docker",
    icon: Package,
    color: "text-sky-400",
    bgColor: "bg-sky-500/10 dark:bg-sky-950/40",
    borderColor: "border-sky-400",
    bevelColor: "bg-sky-600 dark:bg-sky-700",
    glow: "shadow-[0_0_16px_rgba(14,165,233,0.45)]",
  },
};

const ALL_KEYS: TileTypeKey[] = [
  "react",
  "next",
  "typescript",
  "python",
  "database",
  "ai",
  "security",
  "cloud",
  "docker",
];

const KEYBOARD_SLOTS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
];

export interface BoardTile {
  id: string;
  type: TileTypeKey;
  layer: number; // 0 (bottom), 1, 2, 3 (top)
  x: number; // grid coordinate units
  y: number; // grid coordinate units
}

const DOCK_CAPACITY = 7;

/**
 * High-precision bounding box overlap check.
 */
function isTileCovered(tile: BoardTile, allTiles: BoardTile[]): boolean {
  for (const other of allTiles) {
    if (other.id === tile.id) continue;
    if (other.layer > tile.layer) {
      const dx = Math.abs(other.x - tile.x);
      const dy = Math.abs(other.y - tile.y);
      if (dx < 0.82 && dy < 0.82) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Generate layered half-offset pyramid structures
 */
function generateLevelTiles(lvl: number): BoardTile[] {
  const numTypes = Math.min(ALL_KEYS.length, 3 + lvl);
  const activeKeys = ALL_KEYS.slice(0, numTypes);

  const tripletsPerType = lvl === 1 ? 2 : lvl === 2 ? 3 : 4;
  const pool: TileTypeKey[] = [];
  activeKeys.forEach((key) => {
    for (let t = 0; t < tripletsPerType; t++) {
      pool.push(key, key, key);
    }
  });

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const generatedPositions: { x: number; y: number; layer: number }[] = [];

  // Layer 0 (Bottom Grid)
  for (let y of [0.4, 1.6, 2.8, 4.0]) {
    for (let x of [0.4, 1.6, 2.8, 4.0]) {
      generatedPositions.push({ x, y, layer: 0 });
    }
  }

  // Layer 1 (Middle Grid)
  for (let y of [1.0, 2.2, 3.4]) {
    for (let x of [1.0, 2.2, 3.4]) {
      generatedPositions.push({ x, y, layer: 1 });
    }
  }

  // Layer 2 (High Grid)
  for (let y of [1.6, 2.8]) {
    for (let x of [1.6, 2.8]) {
      generatedPositions.push({ x, y, layer: 2 });
    }
  }

  // Layer 3 (Top Peak)
  generatedPositions.push({ x: 2.2, y: 2.2, layer: 3 });
  generatedPositions.push({ x: 1.6, y: 2.2, layer: 3 });
  generatedPositions.push({ x: 2.8, y: 2.2, layer: 3 });

  return pool.map((type, idx) => {
    const pos = generatedPositions[idx % generatedPositions.length];
    return {
      id: `tile-${idx}-${Math.random().toString(36).substring(2, 7)}`,
      type,
      layer: pos.layer,
      x: pos.x,
      y: pos.y,
    };
  });
}

import { useLocalStorageNumber } from "@/hooks/useLocalStorageState";

export default function CyberTileMatch({ onScoreUpdate }: { onScoreUpdate?: (score: number) => void }) {
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useLocalStorageNumber("cyber_tile_match_highscore", 0);

  const [boardTiles, setBoardTiles] = useState<BoardTile[]>(() => generateLevelTiles(1));
  const [dockTiles, setDockTiles] = useState<BoardTile[]>([]);
  const [history, setHistory] = useState<{ board: BoardTile[]; dock: BoardTile[] }[]>([]);
  const [matchingKey, setMatchingKey] = useState<TileTypeKey | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);

  // Booster counts
  const [shufflesLeft, setShufflesLeft] = useState<number>(3);
  const [undosLeft, setUndosLeft] = useState<number>(3);
  const [vacuumsLeft, setVacuumsLeft] = useState<number>(2);

  // Set of covered tiles
  const coveredSet = useMemo(() => {
    const set = new Set<string>();
    boardTiles.forEach((tile) => {
      if (isTileCovered(tile, boardTiles)) {
        set.add(tile.id);
      }
    });
    return set;
  }, [boardTiles]);

  // Map of available tiles to keyboard shortcuts (1, 2, 3... Q, W, E...)
  const tileShortcutMap = useMemo(() => {
    const map = new Map<string, string>();
    const availableTiles = boardTiles.filter((t) => !coveredSet.has(t.id));
    // Sort available tiles top-to-bottom, left-to-right for intuitive navigation
    availableTiles.sort((a, b) => (b.layer !== a.layer ? b.layer - a.layer : a.y !== b.y ? a.y - b.y : a.x - b.x));
    availableTiles.forEach((t, idx) => {
      if (idx < KEYBOARD_SLOTS.length) {
        map.set(t.id, KEYBOARD_SLOTS[idx]);
      }
    });
    return map;
  }, [boardTiles, coveredSet]);

  /**
   * Handle Tile Click
   */
  const handlePickTile = useCallback((tile: BoardTile) => {
    if (coveredSet.has(tile.id) || isGameOver || isWon) return;
    if (dockTiles.length >= DOCK_CAPACITY) return;

    sound.playTilePick();

    // Snapshot history for Undo
    setHistory((prev) => [...prev, { board: boardTiles, dock: dockTiles }]);

    // Remove from board
    const remainingBoard = boardTiles.filter((t) => t.id !== tile.id);
    setBoardTiles(remainingBoard);

    // Group matching types in dock
    const newDock = [...dockTiles, tile];
    newDock.sort((a, b) => a.type.localeCompare(b.type));
    setDockTiles(newDock);

    // Match 3 Check
    const count = newDock.filter((t) => t.type === tile.type).length;
    if (count === 3) {
      setMatchingKey(tile.type);
      setTimeout(() => {
        sound.playTileMatch();
        setDockTiles((currDock) => currDock.filter((t) => t.type !== tile.type));
        setMatchingKey(null);

        const addedScore = 300 * level;
        setScore((s) => {
          const nextScore = s + addedScore;
          if (nextScore > highScore) {
            setHighScore(nextScore);
            if (typeof window !== "undefined") {
              localStorage.setItem("cyber_tile_match_highscore", String(nextScore));
            }
          }
          if (onScoreUpdate) onScoreUpdate(nextScore);
          return nextScore;
        });

        // Check Victory
        if (remainingBoard.length === 0 && newDock.filter((t) => t.type !== tile.type).length === 0) {
          sound.playSuccess();
          setIsWon(true);
        }
      }, 240);
    } else {
      // Check Game Over
      if (newDock.length >= DOCK_CAPACITY) {
        sound.playWarning();
        setTimeout(() => {
          sound.playError();
          setIsGameOver(true);
        }, 300);
      }
    }
  }, [boardTiles, coveredSet, dockTiles, highScore, isGameOver, isWon, level, onScoreUpdate, setHighScore]);

  /**
   * Booster: Undo
   */
  const handleUndo = useCallback(() => {
    if (undosLeft <= 0 || history.length === 0 || isGameOver) return;
    sound.playClick();
    const lastState = history[history.length - 1];
    setBoardTiles(lastState.board);
    setDockTiles(lastState.dock);
    setHistory((h) => h.slice(0, -1));
    setUndosLeft((u) => u - 1);
  }, [history, isGameOver, undosLeft]);

  /**
   * Booster: Shuffle
   */
  const handleShuffle = useCallback(() => {
    if (shufflesLeft <= 0 || boardTiles.length === 0 || isGameOver) return;
    sound.playShuffle();

    const types = boardTiles.map((t) => t.type);
    for (let i = types.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [types[i], types[j]] = [types[j], types[i]];
    }

    const shuffled = boardTiles.map((t, idx) => ({
      ...t,
      type: types[idx],
    }));

    setBoardTiles(shuffled);
    setShufflesLeft((s) => s - 1);
  }, [boardTiles, isGameOver, shufflesLeft]);

  /**
   * Booster: Magic Vacuum
   */
  const handleVacuum = useCallback(() => {
    if (vacuumsLeft <= 0 || dockTiles.length === 0 || isGameOver) return;
    sound.playTileMatch();

    const pulled = dockTiles.slice(0, 3);
    const remainingDock = dockTiles.slice(3);

    const reinsertedBoard = [
      ...boardTiles,
      ...pulled.map((t, i) => ({
        ...t,
        layer: 3,
        x: 1.0 + i * 1.2,
        y: 2.2,
      })),
    ];

    setDockTiles(remainingDock);
    setBoardTiles(reinsertedBoard);
    setVacuumsLeft((v) => v - 1);
    setIsGameOver(false);
  }, [boardTiles, dockTiles, isGameOver, vacuumsLeft]);

  const nextLevel = useCallback(() => {
    const nextLvl = level + 1;
    setLevel(nextLvl);
    setBoardTiles(generateLevelTiles(nextLvl));
    setDockTiles([]);
    setHistory([]);
    setIsWon(false);
    setIsGameOver(false);
    setShufflesLeft((s) => s + 1);
    setUndosLeft((u) => u + 1);
  }, [level]);

  const restartLevel = useCallback(() => {
    setBoardTiles(generateLevelTiles(level));
    setDockTiles([]);
    setHistory([]);
    setIsWon(false);
    setIsGameOver(false);
  }, [level]);

  /**
   * Desktop Keyboard Shortcuts Listener
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Check if key matches an available tile shortcut
      for (const [tileId, shortcutKey] of tileShortcutMap.entries()) {
        if (key === shortcutKey) {
          e.preventDefault();
          const targetTile = boardTiles.find((t) => t.id === tileId);
          if (targetTile) {
            handlePickTile(targetTile);
            return;
          }
        }
      }

      // Boosters & Action Shortcuts
      if (key === "u" || (e.ctrlKey && key === "z")) {
        e.preventDefault();
        handleUndo();
      } else if (key === "s") {
        e.preventDefault();
        handleShuffle();
      } else if (key === "v") {
        e.preventDefault();
        handleVacuum();
      } else if (key === "r") {
        e.preventDefault();
        restartLevel();
      } else if ((key === " " || key === "enter") && (isWon || isGameOver)) {
        e.preventDefault();
        if (isWon) nextLevel();
        else restartLevel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [boardTiles, handlePickTile, handleShuffle, handleUndo, handleVacuum, isGameOver, isWon, nextLevel, restartLevel, tileShortcutMap]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none touch-manipulation transition-all duration-300">
      {/* Top Stats Bar */}
      <div className="w-full grid grid-cols-4 gap-2 mb-3">
        {/* Score */}
        <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">امتیاز</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{score}</span>
        </div>

        {/* Level */}
        <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">مرحله</span>
          <span className="text-lg font-black text-cyan-600 dark:text-cyan-400">{level}</span>
        </div>

        {/* Remaining Tiles */}
        <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">کاشی باقیمانده</span>
          <span className="text-lg font-black text-amber-500">{boardTiles.length}</span>
        </div>

        {/* High Score */}
        <div className="relative group p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">رکورد</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setHighScore(0);
                if (typeof window !== "undefined") {
                  localStorage.setItem("cyber_tile_match_highscore", "0");
                }
                if (onScoreUpdate) onScoreUpdate(0);
              }}
              title="ریست رکورد"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-rose-500 cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
            </button>
          </div>
          <span className="text-lg font-black text-purple-500">{highScore}</span>
        </div>
      </div>

      {/* Visual Clarity Guide & Desktop Shortcuts Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 px-3.5 py-2 mb-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-emerald-500 border border-emerald-300 shadow-sm" />
            <span className="font-bold text-emerald-600 dark:text-emerald-400">کاشی روشن: آزاد</span>
          </div>
          <span className="text-zinc-400">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-zinc-950 border border-zinc-700 opacity-60" />
            <span className="text-zinc-500 dark:text-zinc-400">کاشی تیره: قفل</span>
          </div>
        </div>

        {/* Desktop Keyboard Hints */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
          <Keyboard className="w-3.5 h-3.5 text-amber-400" />
          <span>[کلید کاشی‌ها] انتخاب</span>
          <span>•</span>
          <span>[U] بازگشت</span>
          <span>•</span>
          <span>[S] بر زدن</span>
          <span>•</span>
          <span>[V] جارو</span>
        </div>
      </div>

      {/* Main 3D Layered Board Container */}
      <div
        dir="ltr"
        className="relative w-full max-w-[440px] aspect-[1/0.95] rounded-3xl bg-zinc-200/90 dark:bg-[#0c0c10] border-2 border-zinc-300 dark:border-zinc-800 shadow-2xl p-4 flex items-center justify-center overflow-hidden"
      >
        {/* Board Depth Shadow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0,transparent_100%)] pointer-events-none" />

        {/* Layered Tiles Field */}
        <div className="relative w-full h-full">
          {boardTiles.map((tile) => {
            const config = TILE_CONFIGS[tile.type];
            const Icon = config.icon;
            const isCovered = coveredSet.has(tile.id);
            const shortcutKey = tileShortcutMap.get(tile.id);

            const zIndex = (tile.layer + 1) * 10;
            const leftPercent = (tile.x / 4.8) * 100;
            const topPercent = (tile.y / 4.8) * 100;

            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => handlePickTile(tile)}
                disabled={isCovered}
                aria-label={`${config.label} ${isCovered ? "(قفل در لایه زیرین)" : "(آماده برداشتن)"}`}
                style={{
                  position: "absolute",
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  zIndex,
                }}
                className={`group w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${
                  isCovered
                    ? "bg-zinc-950/95 border-2 border-zinc-800/80 shadow-none cursor-not-allowed opacity-75 filter brightness-60"
                    : `bg-white dark:bg-[#181822] border-2 ${config.borderColor} ${config.glow} shadow-[0_12px_24px_rgba(0,0,0,0.7)] hover:-translate-y-2 hover:scale-110 hover:z-50 cursor-pointer active:scale-95 animate-scaleIn`
                }`}
              >
                {/* 3D Physical Extruded Bottom Edge */}
                <div
                  className={`absolute -bottom-2 left-0.5 right-0.5 h-2 rounded-b-xl transition-all ${
                    isCovered
                      ? "bg-zinc-900 border-t border-zinc-800"
                      : `${config.bevelColor} shadow-md shadow-zinc-950/50 group-hover:h-2.5`
                  }`}
                />

                {/* Status Indicator / Desktop Keyboard Shortcut Tag */}
                <div className="absolute top-1 left-1.5 flex items-center">
                  {isCovered ? (
                    <div className="p-0.5 rounded-md bg-zinc-900/90 border border-zinc-700/60 text-zinc-500">
                      <Lock className="w-2.5 h-2.5" />
                    </div>
                  ) : shortcutKey ? (
                    <span className="hidden sm:flex items-center justify-center min-w-4 h-4 px-1 rounded-md bg-amber-400 text-zinc-950 font-mono text-[9px] font-black uppercase shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse">
                      {shortcutKey}
                    </span>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                  )}
                </div>

                {/* Layer Elevation Pip Dots (Top-Right) */}
                <div className="absolute top-1 right-1.5 flex items-center gap-0.5">
                  {[...Array(tile.layer + 1)].map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className={`w-1.5 h-1.5 rounded-full ${
                        isCovered
                          ? "bg-zinc-700"
                          : "bg-amber-400 shadow-[0_0_6px_#f59e0b]"
                      }`}
                    />
                  ))}
                </div>

                {/* Tile Icon */}
                <Icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 transition-all ${
                    isCovered
                      ? "text-zinc-500 opacity-50"
                      : `${config.color} group-hover:scale-110 group-hover:rotate-6 drop-shadow-md`
                  }`}
                />

                {/* Tile Label */}
                <span
                  className={`text-[9px] font-black mt-0.5 tracking-tight truncate max-w-[90%] ${
                    isCovered
                      ? "text-zinc-600 dark:text-zinc-600"
                      : `${config.color} font-black drop-shadow-sm`
                  }`}
                >
                  {config.label}
                </span>

                {/* Dark Shadow Mask Overlay for Covered Tiles */}
                {isCovered && (
                  <div className="absolute inset-0 rounded-2xl bg-black/45 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Victory Overlay */}
        {isWon && (
          <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center z-50 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white mb-1">مرحله با موفقیت پاکسازی شد!</h3>
            <p className="text-xs text-zinc-400 mb-6">تمام کاشی‌های لایه‌ای با مهارت ست شدند.</p>

            <button
              type="button"
              onClick={nextLevel}
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-amber-500 text-zinc-950 font-black text-sm shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>مرحله بعدی (Space)</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center z-50 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mb-4 shadow-lg shadow-rose-500/20">
              <Flame className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white mb-1">ظرفیت بارانداز پر شد!</h3>
            <p className="text-sm font-bold text-emerald-400 mb-1">امتیاز نهایی: {score}</p>
            <p className="text-xs text-zinc-400 mb-6">برای ترکیب ۳ کاشی فضای خالی نمانده بود.</p>

            <button
              type="button"
              onClick={restartLevel}
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black text-sm shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>تلاش مجدد (R)</span>
            </button>
          </div>
        )}
      </div>

      {/* Dock / Holder Bar (Bottom Capacity: 7) */}
      <div
        dir="ltr"
        className={`w-full max-w-[440px] mt-3 p-3 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border-2 transition-all duration-300 shadow-xl flex items-center justify-center gap-1.5 sm:gap-2 ${
          dockTiles.length >= 6
            ? "border-rose-500/80 ring-2 ring-rose-500/30 animate-pulse"
            : "border-zinc-300/80 dark:border-zinc-800/80"
        }`}
      >
        {[...Array(DOCK_CAPACITY)].map((_, idx) => {
          const tile = dockTiles[idx];
          const config = tile ? TILE_CONFIGS[tile.type] : null;
          const isPopping = config && matchingKey === config.key;

          return (
            <div
              key={idx}
              className={`w-11 h-12 sm:w-13 sm:h-14 rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-200 ${
                tile && config
                  ? isPopping
                    ? "bg-amber-400 border-amber-300 text-zinc-950 scale-110 shadow-lg shadow-amber-400/50 animate-bounce"
                    : `bg-white dark:bg-[#181822] ${config.borderColor} ${config.color} shadow-md scale-100 animate-scaleIn`
                  : "bg-zinc-200/50 dark:bg-zinc-800/40 border-dashed border-zinc-300 dark:border-zinc-800/60"
              }`}
            >
              {config && (
                <>
                  <config.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-[8px] font-bold mt-0.5 truncate max-w-[90%]">
                    {config.label}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Boosters & Action Toolbar with Desktop Shortcuts */}
      <div className="w-full max-w-[440px] flex items-center justify-between mt-3 px-1">
        {/* Undo */}
        <button
          type="button"
          onClick={handleUndo}
          disabled={undosLeft <= 0 || history.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold disabled:opacity-40 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition active:scale-95 cursor-pointer"
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span>بازگشت [U] ({undosLeft})</span>
        </button>

        {/* Shuffle */}
        <button
          type="button"
          onClick={handleShuffle}
          disabled={shufflesLeft <= 0 || boardTiles.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold disabled:opacity-40 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition active:scale-95 cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>بر زدن [S] ({shufflesLeft})</span>
        </button>

        {/* Magic Vacuum */}
        <button
          type="button"
          onClick={handleVacuum}
          disabled={vacuumsLeft <= 0 || dockTiles.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-500/15 to-indigo-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-300 text-xs font-bold disabled:opacity-40 hover:bg-purple-500/25 transition active:scale-95 cursor-pointer"
        >
          <Wand2 className="w-3.5 h-3.5 text-purple-500" />
          <span>جارو [V] ({vacuumsLeft})</span>
        </button>
      </div>
    </div>
  );
}

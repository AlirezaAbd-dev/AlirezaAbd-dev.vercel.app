"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { RotateCcw, Undo2, Sparkles, Flame } from "lucide-react";
import { sound } from "@/utils/audioSynth";

type Board = number[][];

const DEV_TIERS: Record<number, { label: string; bg: string; text: string; glow?: string }> = {
  2: { label: "Bit", bg: "bg-emerald-500/15 border-emerald-500/30", text: "text-emerald-600 dark:text-emerald-400" },
  4: { label: "Byte", bg: "bg-teal-500/20 border-teal-500/40", text: "text-teal-600 dark:text-teal-400" },
  8: { label: "Array", bg: "bg-cyan-500/25 border-cyan-500/50", text: "text-cyan-600 dark:text-cyan-400" },
  16: { label: "Func", bg: "bg-blue-500/25 border-blue-500/50", text: "text-blue-600 dark:text-blue-400" },
  32: { label: "Module", bg: "bg-indigo-500/30 border-indigo-500/60", text: "text-indigo-600 dark:text-indigo-400" },
  64: { label: "Kernel", bg: "bg-violet-500/35 border-violet-500/70", text: "text-violet-600 dark:text-violet-400" },
  128: { label: "DB", bg: "bg-fuchsia-500/40 border-fuchsia-500/80 shadow-md shadow-fuchsia-500/20", text: "text-fuchsia-600 dark:text-fuchsia-300" },
  256: { label: "Micro", bg: "bg-rose-500/45 border-rose-500 shadow-md shadow-rose-500/25", text: "text-rose-600 dark:text-rose-300" },
  512: { label: "AI Core", bg: "bg-amber-500/50 border-amber-500 shadow-lg shadow-amber-500/30", text: "text-amber-600 dark:text-amber-200" },
  1024: { label: "Quantum", bg: "bg-gradient-to-br from-cyan-500 to-purple-600 border-cyan-400 shadow-xl shadow-cyan-500/40", text: "text-white" },
  2048: { label: "10x Dev", bg: "bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 border-amber-300 shadow-2xl shadow-amber-500/60 animate-pulse", text: "text-white" },
};

function addRandomTile(currentBoard: Board): Board {
  const emptyCells: { r: number; c: number }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (currentBoard[r][c] === 0) emptyCells.push({ r, c });
    }
  }

  if (emptyCells.length === 0) return currentBoard;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  const newBoard = currentBoard.map((row) => [...row]);
  newBoard[randomCell.r][randomCell.c] = value;
  return newBoard;
}

function createInitialBoard(): Board {
  let newBoard: Board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  newBoard = addRandomTile(newBoard);
  newBoard = addRandomTile(newBoard);
  return newBoard;
}

function checkGameOver(currentBoard: Board): boolean {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (currentBoard[r][c] === 0) return false;
      if (c < 3 && currentBoard[r][c] === currentBoard[r][c + 1]) return false;
      if (r < 3 && currentBoard[r][c] === currentBoard[r + 1][c]) return false;
    }
  }
  return true;
}

function slideRow(row: number[]): { newRow: number[]; gainedScore: number; maxTile: number } {
  const filtered = row.filter((val) => val !== 0);
  let gainedScore = 0;
  let maxTile = 0;
  const result: number[] = [];

  for (let i = 0; i < filtered.length; i++) {
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      const mergedVal = filtered[i] * 2;
      result.push(mergedVal);
      gainedScore += mergedVal;
      if (mergedVal > maxTile) maxTile = mergedVal;
      sound.playMerge(Math.log2(mergedVal));
      i++; // skip next tile
    } else {
      result.push(filtered[i]);
    }
  }

  while (result.length < 4) {
    result.push(0);
  }

  return { newRow: result, gainedScore, maxTile };
}

import { useLocalStorageNumber } from "@/hooks/useLocalStorageState";

export default function Cyber2048({ onScoreUpdate }: { onScoreUpdate?: (score: number) => void }) {
  const [board, setBoard] = useState<Board>(() => createInitialBoard());
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useLocalStorageNumber("cyber_2048_highscore", 0);

  const [previousState, setPreviousState] = useState<{ board: Board; score: number } | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [highestTile, setHighestTile] = useState<number>(2);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const initGame = useCallback(() => {
    const freshBoard = createInitialBoard();
    setBoard(freshBoard);
    setScore(0);
    setPreviousState(null);
    setGameOver(false);
    setWon(false);
    setHighestTile(2);
  }, []);

  const move = useCallback(
    (direction: "left" | "right" | "up" | "down") => {
      if (gameOver) return;

      let rotatedBoard: Board = board.map((row) => [...row]);
      let changed = false;
      let totalGained = 0;
      let highestMerged = highestTile;

      if (direction === "right") {
        rotatedBoard = rotatedBoard.map((row) => row.reverse());
      } else if (direction === "up") {
        rotatedBoard = [0, 1, 2, 3].map((c) => [0, 1, 2, 3].map((r) => board[r][c]));
      } else if (direction === "down") {
        rotatedBoard = [0, 1, 2, 3].map((c) => [3, 2, 1, 0].map((r) => board[r][c]));
      }

      const nextRotated = rotatedBoard.map((row) => {
        const { newRow, gainedScore, maxTile } = slideRow(row);
        totalGained += gainedScore;
        if (maxTile > highestMerged) highestMerged = maxTile;
        return newRow;
      });

      let finalBoard: Board;
      if (direction === "right") {
        finalBoard = nextRotated.map((row) => row.reverse());
      } else if (direction === "up") {
        finalBoard = [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => nextRotated[c][r]));
      } else if (direction === "down") {
        finalBoard = [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => nextRotated[c][3 - r]));
      } else {
        finalBoard = nextRotated;
      }

      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (board[r][c] !== finalBoard[r][c]) {
            changed = true;
            break;
          }
        }
      }

      if (changed) {
        setPreviousState({ board, score });
        const boardWithTile = addRandomTile(finalBoard);
        setBoard(boardWithTile);

        const newScore = score + totalGained;
        setScore(newScore);
        if (highestMerged > highestTile) setHighestTile(highestMerged);

        if (newScore > highScore) {
          setHighScore(newScore);
          if (typeof window !== "undefined") {
            localStorage.setItem("cyber_2048_highscore", String(newScore));
          }
        }
        if (onScoreUpdate) onScoreUpdate(newScore);

        if (highestMerged >= 2048 && !won) {
          setWon(true);
          sound.playSuccess();
        }

        if (checkGameOver(boardWithTile)) {
          setGameOver(true);
          sound.playError();
        }
      }
    },
    [board, gameOver, highestTile, score, highScore, onScoreUpdate, setHighScore, won]
  );

  const undoMove = useCallback(() => {
    if (previousState) {
      sound.playClick();
      setBoard(previousState.board);
      setScore(previousState.score);
      setPreviousState(null);
      setGameOver(false);
    }
  }, [previousState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (["ArrowUp", "KeyW"].includes(e.code)) {
        e.preventDefault();
        move("up");
      } else if (["ArrowDown", "KeyS"].includes(e.code)) {
        e.preventDefault();
        move("down");
      } else if (["ArrowLeft", "KeyA"].includes(e.code)) {
        e.preventDefault();
        move("left");
      } else if (["ArrowRight", "KeyD"].includes(e.code)) {
        e.preventDefault();
        move("right");
      } else if (e.code === "KeyU" || (e.ctrlKey && e.code === "KeyZ")) {
        e.preventDefault();
        undoMove();
      } else if (e.code === "KeyR") {
        e.preventDefault();
        initGame();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [initGame, move, undoMove]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) move("right");
        else move("left");
      }
    } else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) move("down");
        else move("up");
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none touch-manipulation transition-all duration-300">
      {/* Stats Bar */}
      <div className="w-full grid grid-cols-3 gap-2 mb-4">
        {/* Score */}
        <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">امتیاز</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{score}</span>
        </div>

        {/* Highest Tier */}
        <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">بالاترین سطح</span>
          <span className="text-lg font-black text-cyan-600 dark:text-cyan-400">
            {DEV_TIERS[highestTile]?.label || highestTile}
          </span>
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
                  localStorage.setItem("cyber_2048_highscore", "0");
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

      {/* Swipe & Desktop Shortcut Guide */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 px-3.5 py-2 mb-3 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
          <span>کدهای نرم‌افزاری مشابه را ترکیب کنید.</span>
        </div>

        {/* Desktop Keyboard Badge */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
          <span>[WASD / جهتی] حرکت</span>
          <span>•</span>
          <span>[U] بازگشت</span>
          <span>•</span>
          <span>[R] ریست</span>
        </div>
      </div>

      {/* 2048 Board Container - Forced LTR for consistent coordinate physics */}
      <div
        dir="ltr"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative p-4 sm:p-5 rounded-3xl bg-white/70 dark:bg-[#121216]/90 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl w-full aspect-square max-w-[380px] sm:max-w-[420px] flex items-center justify-center touch-none"
      >
        <div className="grid grid-cols-4 grid-rows-4 gap-2.5 sm:gap-3 w-full h-full">
          {board.map((row, r) =>
            row.map((cell, c) => {
              const tier = DEV_TIERS[cell];

              return (
                <div
                  key={`${r}-${c}`}
                  className={`rounded-2xl transition-all duration-150 flex flex-col items-center justify-center font-black border text-center ${
                    cell === 0
                      ? "bg-zinc-100 dark:bg-zinc-900/70 border-zinc-200/80 dark:border-zinc-800/80"
                      : `${tier?.bg} ${tier?.text} scale-100 animate-scaleIn`
                  }`}
                >
                  {cell !== 0 && (
                    <>
                      <span className="text-sm sm:text-lg font-black leading-none">{cell}</span>
                      <span className="text-[10px] sm:text-xs opacity-75 font-semibold mt-0.5">
                        {tier?.label}
                      </span>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Game Over / Won Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center z-20 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mb-4 shadow-lg shadow-rose-500/20">
              <Flame className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white mb-1">پایان بازی!</h3>
            <p className="text-sm font-bold text-emerald-400 mb-1">امتیاز کسب شده: {score}</p>
            <p className="text-xs text-zinc-400 mb-6">فضای خالی برای حرکت دیگری نمانده است.</p>

            <button
              type="button"
              onClick={initGame}
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 text-zinc-950 font-black text-sm shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>شروع مجدد</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Action Controls */}
      <div className="w-full flex items-center justify-between mt-4 text-xs">
        <button
          type="button"
          onClick={undoMove}
          disabled={!previousState || gameOver}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-zinc-700 dark:text-zinc-300 disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span>بازگشت ۱ حرکت (Undo)</span>
        </button>

        <button
          type="button"
          onClick={initGame}
          className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>بازی جدید</span>
        </button>
      </div>
    </div>
  );
}

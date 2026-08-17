"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  RotateCcw,
  Undo2,
  Sparkles,
  Flame,
  Bomb,
  RotateCw,
  Keyboard,
  Grid,
} from "lucide-react";
import { sound } from "@/utils/audioSynth";

const GRID_SIZE = 8;

export type BlockColor = "cyan" | "emerald" | "purple" | "amber" | "rose";

interface ShapeDef {
  id: string;
  matrix: number[][]; // 2D array: 1 = block, 0 = empty
  color: BlockColor;
}

const COLOR_MAP: Record<BlockColor, { bg: string; border: string; glow: string }> = {
  cyan: {
    bg: "bg-cyan-400 dark:bg-cyan-400",
    border: "border-cyan-300",
    glow: "shadow-[0_0_12px_rgba(6,182,212,0.8)]",
  },
  emerald: {
    bg: "bg-emerald-400 dark:bg-emerald-400",
    border: "border-emerald-300",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.8)]",
  },
  purple: {
    bg: "bg-purple-400 dark:bg-purple-400",
    border: "border-purple-300",
    glow: "shadow-[0_0_12px_rgba(168,85,247,0.8)]",
  },
  amber: {
    bg: "bg-amber-400 dark:bg-amber-400",
    border: "border-amber-300",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.8)]",
  },
  rose: {
    bg: "bg-rose-400 dark:bg-rose-400",
    border: "border-rose-300",
    glow: "shadow-[0_0_12px_rgba(244,63,94,0.8)]",
  },
};

const BASE_SHAPES: { matrix: number[][]; color: BlockColor }[] = [
  // Dot 1x1
  { matrix: [[1]], color: "cyan" },
  // Horizontal Line 1x2, 1x3, 1x4
  { matrix: [[1, 1]], color: "emerald" },
  { matrix: [[1, 1, 1]], color: "purple" },
  { matrix: [[1, 1, 1, 1]], color: "cyan" },
  // Vertical Line 2x1, 3x1, 4x1
  { matrix: [[1], [1]], color: "emerald" },
  { matrix: [[1], [1], [1]], color: "purple" },
  { matrix: [[1], [1], [1], [1]], color: "amber" },
  // Square 2x2
  {
    matrix: [
      [1, 1],
      [1, 1],
    ],
    color: "amber",
  },
  // Square 3x3
  {
    matrix: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    color: "rose",
  },
  // L-Shapes 2x2
  {
    matrix: [
      [1, 0],
      [1, 1],
    ],
    color: "cyan",
  },
  {
    matrix: [
      [0, 1],
      [1, 1],
    ],
    color: "purple",
  },
  {
    matrix: [
      [1, 1],
      [1, 0],
    ],
    color: "emerald",
  },
  {
    matrix: [
      [1, 1],
      [0, 1],
    ],
    color: "amber",
  },
  // Corner 3x3
  {
    matrix: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "rose",
  },
  {
    matrix: [
      [0, 0, 1],
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "cyan",
  },
  // T-Shapes
  {
    matrix: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "purple",
  },
  {
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "emerald",
  },
  // S / Z shapes
  {
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "rose",
  },
  {
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "amber",
  },
];

function getRandomShapes(): ShapeDef[] {
  const selected: ShapeDef[] = [];
  for (let i = 0; i < 3; i++) {
    const raw = BASE_SHAPES[Math.floor(Math.random() * BASE_SHAPES.length)];
    selected.push({
      id: `shape-${i}-${Math.random().toString(36).substring(2, 7)}`,
      matrix: raw.matrix.map((row) => [...row]),
      color: raw.color,
    });
  }
  return selected;
}

function rotateMatrix(mat: number[][]): number[][] {
  const rows = mat.length;
  const cols = mat[0].length;
  const res: number[][] = [];
  for (let c = 0; c < cols; c++) {
    const newRow: number[] = [];
    for (let r = rows - 1; r >= 0; r--) {
      newRow.push(mat[r][c]);
    }
    res.push(newRow);
  }
  return res;
}

import { useLocalStorageNumber } from "@/hooks/useLocalStorageState";

const emptySubscribe = () => () => {};

export default function CyberBlockBlast({ onScoreUpdate }: { onScoreUpdate?: (score: number) => void }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [grid, setGrid] = useState<(BlockColor | null)[][]>(() =>
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(null))
  );

  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useLocalStorageNumber("cyber_block_blast_highscore", 0);

  const [availableShapes, setAvailableShapes] = useState<ShapeDef[]>(() => getRandomShapes());
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(0);
  const [hoverPos, setHoverPos] = useState<{ r: number; c: number } | null>(null);
  const [keyboardCursor, setKeyboardCursor] = useState<{ r: number; c: number }>({ r: 3, c: 3 });
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [clearingLines, setClearingLines] = useState<{ rows: number[]; cols: number[] }>({
    rows: [],
    cols: [],
  });

  // Drag and Drop pointer state
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    shapeIndex: number | null;
    x: number;
    y: number;
    targetPos: { r: number; c: number } | null;
  }>({
    isDragging: false,
    shapeIndex: null,
    x: 0,
    y: 0,
    targetPos: null,
  });

  const gridContainerRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<
    {
      grid: (BlockColor | null)[][];
      shapes: ShapeDef[];
      score: number;
      combo: number;
    }[]
  >([]);

  // Power-up counts
  const [bombsLeft, setBombsLeft] = useState<number>(2);
  const [rotatesLeft, setRotatesLeft] = useState<number>(4);
  const [undosLeft, setUndosLeft] = useState<number>(3);
  const [isBombMode, setIsBombMode] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const currentSelectedShape = useMemo(() => {
    if (dragState.isDragging && dragState.shapeIndex !== null && availableShapes[dragState.shapeIndex]) {
      return availableShapes[dragState.shapeIndex];
    }
    if (selectedShapeIndex === null || !availableShapes[selectedShapeIndex]) return null;
    return availableShapes[selectedShapeIndex];
  }, [availableShapes, dragState.isDragging, dragState.shapeIndex, selectedShapeIndex]);

  /**
   * Check if a piece can be placed at (startR, startC)
   */
  const canPlaceShape = useCallback(
    (shape: ShapeDef, startR: number, startC: number, currentGrid = grid): boolean => {
      const sRows = shape.matrix.length;
      const sCols = shape.matrix[0].length;

      if (startR + sRows > GRID_SIZE || startC + sCols > GRID_SIZE) return false;
      if (startR < 0 || startC < 0) return false;

      for (let r = 0; r < sRows; r++) {
        for (let c = 0; c < sCols; c++) {
          if (shape.matrix[r][c] === 1) {
            if (currentGrid[startR + r][startC + c] !== null) {
              return false;
            }
          }
        }
      }
      return true;
    },
    [grid]
  );

  /**
   * Check if any remaining shape can fit anywhere on the board
   */
  const checkHasMoves = useCallback(
    (shapes: ShapeDef[], currentGrid = grid): boolean => {
      if (shapes.length === 0) return true;
      for (const shape of shapes) {
        for (let r = 0; r < GRID_SIZE; r++) {
          for (let c = 0; c < GRID_SIZE; c++) {
            if (canPlaceShape(shape, r, c, currentGrid)) {
              return true;
            }
          }
        }
      }
      return false;
    },
    [canPlaceShape, grid]
  );

  /**
   * Handle Placing the Selected Piece at (targetR, targetC)
   */
  const handlePlaceBlock = useCallback(
    (targetR: number, targetC: number, overrideShapeIndex?: number) => {
      if (isGameOver) return;

      // Handle Bomb Power-up
      if (isBombMode) {
        sound.playCombo();
        setHistory((prev) => [
          ...prev,
          {
            grid: grid.map((row) => [...row]),
            shapes: [...availableShapes],
            score,
            combo: comboStreak,
          },
        ]);

        const newGrid = grid.map((row, r) =>
          row.map((cell, c) => {
            if (Math.abs(r - targetR) <= 1 && Math.abs(c - targetC) <= 1) {
              return null;
            }
            return cell;
          })
        );

        setGrid(newGrid);
        setIsBombMode(false);
        setBombsLeft((b) => b - 1);
        return;
      }

      const activeIndex = overrideShapeIndex !== undefined ? overrideShapeIndex : selectedShapeIndex;
      if (activeIndex === null || !availableShapes[activeIndex]) return;
      const shapeToPlace = availableShapes[activeIndex];

      if (!canPlaceShape(shapeToPlace, targetR, targetC)) {
        sound.playError();
        return;
      }

      sound.playPlace();

      // Save History for Undo
      setHistory((prev) => [
        ...prev,
        {
          grid: grid.map((row) => [...row]),
          shapes: [...availableShapes],
          score,
          combo: comboStreak,
        },
      ]);

      // Place blocks on grid
      const newGrid = grid.map((row) => [...row]);
      let placedBlockCount = 0;
      for (let r = 0; r < shapeToPlace.matrix.length; r++) {
        for (let c = 0; c < shapeToPlace.matrix[0].length; c++) {
          if (shapeToPlace.matrix[r][c] === 1) {
            newGrid[targetR + r][targetC + c] = shapeToPlace.color;
            placedBlockCount++;
          }
        }
      }

      // Check full rows and columns
      const fullRows: number[] = [];
      const fullCols: number[] = [];

      for (let r = 0; r < GRID_SIZE; r++) {
        if (newGrid[r].every((cell) => cell !== null)) {
          fullRows.push(r);
        }
      }

      for (let c = 0; c < GRID_SIZE; c++) {
        let isColFull = true;
        for (let r = 0; r < GRID_SIZE; r++) {
          if (newGrid[r][c] === null) {
            isColFull = false;
            break;
          }
        }
        if (isColFull) fullCols.push(c);
      }

      const totalLines = fullRows.length + fullCols.length;
      let gainedScore = placedBlockCount * 10;

      if (totalLines > 0) {
        const nextCombo = comboStreak + 1;
        setComboStreak(nextCombo);
        sound.playLineClear(nextCombo);

        const lineBase = [0, 100, 300, 700, 1500, 2500][Math.min(totalLines, 5)];
        gainedScore += lineBase * nextCombo;

        setClearingLines({ rows: fullRows, cols: fullCols });
        setTimeout(() => {
          setClearingLines({ rows: [], cols: [] });
        }, 300);

        for (const r of fullRows) {
          for (let c = 0; c < GRID_SIZE; c++) {
            newGrid[r][c] = null;
          }
        }
        for (const c of fullCols) {
          for (let r = 0; r < GRID_SIZE; r++) {
            newGrid[r][c] = null;
          }
        }
      } else {
        setComboStreak(0);
      }

      const nextTotalScore = score + gainedScore;
      setScore(nextTotalScore);
      if (nextTotalScore > highScore) {
        setHighScore(nextTotalScore);
        if (typeof window !== "undefined") {
          localStorage.setItem("cyber_block_blast_highscore", String(nextTotalScore));
        }
      }
      if (onScoreUpdate) onScoreUpdate(nextTotalScore);

      const remainingShapes = availableShapes.filter((_, idx) => idx !== activeIndex);
      let finalShapes = remainingShapes;

      if (remainingShapes.length === 0) {
        sound.playTubeComplete();
        finalShapes = getRandomShapes();
      }

      setGrid(newGrid);
      setAvailableShapes(finalShapes);
      setSelectedShapeIndex(finalShapes.length > 0 ? 0 : null);

      if (!checkHasMoves(finalShapes, newGrid)) {
        setTimeout(() => {
          sound.playError();
          setIsGameOver(true);
        }, 350);
      }
    },
    [availableShapes, canPlaceShape, checkHasMoves, comboStreak, grid, highScore, isBombMode, isGameOver, onScoreUpdate, score, selectedShapeIndex, setHighScore]
  );

  /**
   * Pointer Drag and Drop Handlers
   */
  const handleShapePointerDown = (index: number, e: React.PointerEvent) => {
    if (isGameOver) return;
    e.preventDefault();
    sound.playClick();
    setSelectedShapeIndex(index);
    setIsBombMode(false);

    setDragState({
      isDragging: true,
      shapeIndex: index,
      x: e.clientX,
      y: e.clientY,
      targetPos: null,
    });
  };

  /**
   * Global Window Pointer Move & Pointer Up for 60fps Smooth Dragging
   */
  useEffect(() => {
    if (!dragState.isDragging || dragState.shapeIndex === null) return;

    const handlePointerMove = (e: PointerEvent) => {
      let targetPos: { r: number; c: number } | null = null;

      if (gridContainerRef.current) {
        const rect = gridContainerRef.current.getBoundingClientRect();
        const cellWidth = rect.width / GRID_SIZE;
        const cellHeight = rect.height / GRID_SIZE;

        const currentShape = availableShapes[dragState.shapeIndex!];
        if (currentShape) {
          const shapeRows = currentShape.matrix.length;
          const shapeCols = currentShape.matrix[0].length;

          // Center shape calculations relative to pointer
          const relX = e.clientX - rect.left - (shapeCols * cellWidth) / 2 + cellWidth / 2;
          const relY = e.clientY - rect.top - (shapeRows * cellHeight) / 2 + cellHeight / 2;

          const c = Math.round(relX / cellWidth);
          const r = Math.round(relY / cellHeight);

          if (r >= 0 && r + shapeRows <= GRID_SIZE && c >= 0 && c + shapeCols <= GRID_SIZE) {
            targetPos = { r, c };
          }
        }
      }

      setDragState((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        targetPos,
      }));
    };

    const handlePointerUp = () => {
      if (dragState.targetPos && dragState.shapeIndex !== null) {
        const shape = availableShapes[dragState.shapeIndex];
        if (shape && canPlaceShape(shape, dragState.targetPos.r, dragState.targetPos.c)) {
          handlePlaceBlock(dragState.targetPos.r, dragState.targetPos.c, dragState.shapeIndex);
        }
      }

      setDragState({
        isDragging: false,
        shapeIndex: null,
        x: 0,
        y: 0,
        targetPos: null,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [availableShapes, canPlaceShape, dragState.isDragging, dragState.shapeIndex, dragState.targetPos, handlePlaceBlock]);

  /**
   * Booster: Rotate Selected Shape
   */
  const handleRotate = useCallback(() => {
    if (rotatesLeft <= 0 || !currentSelectedShape || selectedShapeIndex === null || isGameOver) return;
    sound.playClick();
    const rotatedMat = rotateMatrix(currentSelectedShape.matrix);
    setAvailableShapes((shapes) =>
      shapes.map((s, idx) => (idx === selectedShapeIndex ? { ...s, matrix: rotatedMat } : s))
    );
    setRotatesLeft((r) => r - 1);
  }, [currentSelectedShape, isGameOver, rotatesLeft, selectedShapeIndex]);

  /**
   * Booster: Undo Move
   */
  const handleUndo = useCallback(() => {
    if (undosLeft <= 0 || history.length === 0 || isGameOver) return;
    sound.playClick();
    const last = history[history.length - 1];
    setGrid(last.grid);
    setAvailableShapes(last.shapes);
    setScore(last.score);
    setComboStreak(last.combo);
    setHistory((h) => h.slice(0, -1));
    setUndosLeft((u) => u - 1);
    setSelectedShapeIndex(0);
  }, [history, isGameOver, undosLeft]);

  /**
   * Reset / Restart
   */
  const restartGame = useCallback(() => {
    setGrid(
      Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(null))
    );
    setScore(0);
    setComboStreak(0);
    setAvailableShapes(getRandomShapes());
    setSelectedShapeIndex(0);
    setHistory([]);
    setIsGameOver(false);
    setIsBombMode(false);
  }, []);

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

      if (e.key === "1" && availableShapes[0]) {
        e.preventDefault();
        setSelectedShapeIndex(0);
        setIsBombMode(false);
      } else if (e.key === "2" && availableShapes[1]) {
        e.preventDefault();
        setSelectedShapeIndex(1);
        setIsBombMode(false);
      } else if (e.key === "3" && availableShapes[2]) {
        e.preventDefault();
        setSelectedShapeIndex(2);
        setIsBombMode(false);
      }

      if (["ArrowUp", "KeyW"].includes(e.code)) {
        e.preventDefault();
        setKeyboardCursor((prev) => ({ r: Math.max(0, prev.r - 1), c: prev.c }));
      } else if (["ArrowDown", "KeyS"].includes(e.code)) {
        e.preventDefault();
        setKeyboardCursor((prev) => ({ r: Math.min(GRID_SIZE - 1, prev.r + 1), c: prev.c }));
      } else if (["ArrowLeft", "KeyA"].includes(e.code)) {
        e.preventDefault();
        setKeyboardCursor((prev) => ({ r: prev.r, c: Math.max(0, prev.c - 1) }));
      } else if (["ArrowRight", "KeyD"].includes(e.code)) {
        e.preventDefault();
        setKeyboardCursor((prev) => ({ r: prev.r, c: Math.min(GRID_SIZE - 1, prev.c + 1) }));
      }

      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        if (isGameOver) {
          restartGame();
        } else {
          handlePlaceBlock(keyboardCursor.r, keyboardCursor.c);
        }
      }

      if (key === "t" || e.code === "Tab") {
        e.preventDefault();
        handleRotate();
      } else if (key === "u" || (e.ctrlKey && key === "z")) {
        e.preventDefault();
        handleUndo();
      } else if (key === "b") {
        e.preventDefault();
        setIsBombMode((m) => !m);
      } else if (key === "r") {
        e.preventDefault();
        restartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [availableShapes, handlePlaceBlock, handleRotate, handleUndo, isGameOver, keyboardCursor, restartGame]);

  // Determine which cells are part of the active drag or hover preview
  const previewCells = useMemo(() => {
    if (!currentSelectedShape || isBombMode) return null;
    const target = dragState.isDragging && dragState.targetPos ? dragState.targetPos : hoverPos || keyboardCursor;
    const isValid = canPlaceShape(currentSelectedShape, target.r, target.c);
    const cells = new Set<string>();

    for (let r = 0; r < currentSelectedShape.matrix.length; r++) {
      for (let c = 0; c < currentSelectedShape.matrix[0].length; c++) {
        if (currentSelectedShape.matrix[r][c] === 1) {
          const gr = target.r + r;
          const gc = target.c + c;
          if (gr < GRID_SIZE && gc < GRID_SIZE) {
            cells.add(`${gr}-${gc}`);
          }
        }
      }
    }
    return { cells, isValid };
  }, [canPlaceShape, currentSelectedShape, dragState.isDragging, dragState.targetPos, hoverPos, isBombMode, keyboardCursor]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none touch-manipulation transition-all duration-300">
      {/* Top Stats Bar */}
      <div className="w-full grid grid-cols-4 gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
        {/* Score */}
        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">امتیاز</span>
          <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">{score}</span>
        </div>

        {/* Combo */}
        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">کمبو</span>
          <span className="text-base sm:text-lg font-black text-amber-500">
            {comboStreak > 1 ? `x${comboStreak}` : "۱x"}
          </span>
        </div>

        {/* Pieces Left */}
        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-center">
          <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">باقیمانده</span>
          <span className="text-base sm:text-lg font-black text-cyan-500">{availableShapes.length}/۳</span>
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
                  localStorage.setItem("cyber_block_blast_highscore", "0");
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

      {/* Mode / Guide Banner */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 mb-2.5 sm:mb-3 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20 text-[11px] sm:text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 animate-pulse" />
          <span>قطعات را بکشید و رها کنید (Drag & Drop) یا با کلیک جای‌گذاری کنید.</span>
        </div>

        {/* Desktop Keyboard Hints */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
          <Keyboard className="w-3.5 h-3.5 text-purple-400" />
          <span>[1-3] قطعه</span>
          <span>•</span>
          <span>[T] چرخش</span>
          <span>•</span>
          <span>[Space] ثبت</span>
        </div>
      </div>

      {/* Main 8x8 Cyber Grid Container */}
      <div
        ref={gridContainerRef}
        dir="ltr"
        style={{ direction: "ltr" }}
        className="relative p-2 sm:p-4 rounded-2xl sm:rounded-3xl bg-zinc-200/90 dark:bg-[#0d0d12] border-2 border-zinc-300 dark:border-zinc-800 shadow-2xl w-full aspect-square max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] flex items-center justify-center overflow-hidden"
      >
        <div
          dir="ltr"
          style={{ direction: "ltr" }}
          className="grid grid-cols-8 grid-rows-8 gap-0.5 sm:gap-1.5 w-full h-full"
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const key = `${r}-${c}`;
              const isClearing =
                clearingLines.rows.includes(r) || clearingLines.cols.includes(c);
              const isPreview = previewCells?.cells.has(key);
              const isValidPreview = previewCells?.isValid;
              const isCursorPos = keyboardCursor.r === r && keyboardCursor.c === c;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handlePlaceBlock(r, c)}
                  onMouseEnter={() => setHoverPos({ r, c })}
                  onMouseLeave={() => setHoverPos(null)}
                  aria-label={`خانه ${r + 1}-${c + 1}`}
                  className={`relative rounded-md sm:rounded-lg transition-all duration-150 flex items-center justify-center border active:scale-95 cursor-pointer ${
                    isClearing
                      ? "bg-white border-amber-300 shadow-[0_0_20px_#fff] scale-110 z-20 animate-tile-match"
                      : cell !== null
                      ? `${COLOR_MAP[cell].bg} ${COLOR_MAP[cell].border} ${COLOR_MAP[cell].glow} shadow-md border-2 scale-100`
                      : isPreview
                      ? isValidPreview
                        ? "bg-emerald-400/40 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)] scale-105"
                        : "bg-rose-500/40 border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] scale-95"
                      : "bg-white/60 dark:bg-zinc-900/60 border-zinc-300/80 dark:border-zinc-800/80 hover:border-purple-400/50"
                  } ${isCursorPos && !dragState.isDragging ? "ring-2 ring-amber-400 ring-offset-1 dark:ring-offset-zinc-950" : ""}`}
                >
                  {cell !== null && (
                    <div className="absolute top-0.5 left-0.5 right-0.5 h-0.5 sm:h-1 bg-white/40 rounded-t-md pointer-events-none" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-4 sm:p-6 text-center z-30 animate-fadeIn">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mb-3 sm:mb-4 shadow-lg shadow-rose-500/20">
              <Flame className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mb-1">فضایی برای قطعات جدید نماند!</h3>
            <p className="text-xs sm:text-sm font-bold text-emerald-400 mb-1">امتیاز نهایی: {score}</p>
            <p className="text-xs text-zinc-400 mb-4 sm:mb-6">شبکه را برای ثبت رکوردهای بالاتر آماده کنید.</p>

            <button
              type="button"
              onClick={restartGame}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>تلاش مجدد (Space)</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom 3 Polyomino Shape Selection Slots with Drag & Drop */}
      <div
        dir="ltr"
        style={{ direction: "ltr" }}
        className="w-full max-w-[420px] mt-2.5 sm:mt-4 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border-2 border-zinc-300/80 dark:border-zinc-800/80 shadow-xl flex items-center justify-around gap-1.5 sm:gap-2 min-h-[80px] sm:min-h-[95px]"
      >
        {availableShapes.map((shape, idx) => {
          const isSelected = selectedShapeIndex === idx && !isBombMode;
          const isCurrentlyDragged = dragState.isDragging && dragState.shapeIndex === idx;
          const cfg = COLOR_MAP[shape.color];

          return (
            <button
              key={shape.id}
              dir="ltr"
              type="button"
              style={{ direction: "ltr" }}
              onPointerDown={(e) => handleShapePointerDown(idx, e)}
              className={`relative p-2 sm:p-3 rounded-xl transition-all duration-200 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none ${
                isCurrentlyDragged
                  ? "opacity-25 scale-95"
                  : isSelected
                  ? "bg-purple-500/20 border-2 border-purple-400 ring-2 ring-purple-400/40 shadow-lg -translate-y-1 scale-105 sm:scale-110"
                  : "bg-white/60 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700/80 hover:border-purple-400 hover:scale-105"
              }`}
            >
              {/* Desktop Key Shortcut Tag */}
              <span className="hidden sm:inline-block absolute -top-2 -right-1 px-1.5 py-0.2 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 text-[9px] font-mono font-black shadow-sm">
                {idx + 1}
              </span>

              {/* Render Mini Shape Grid */}
              <div
                dir="ltr"
                className="grid gap-0.5 sm:gap-1"
                style={{
                  gridTemplateColumns: `repeat(${shape.matrix[0].length}, minmax(0, 1fr))`,
                  direction: "ltr",
                }}
              >
                {shape.matrix.map((row, r) =>
                  row.map((cell, c) => (
                    <div
                      key={`${r}-${c}`}
                      className={`w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 rounded-sm transition-colors ${
                        cell === 1
                          ? `${cfg.bg} ${cfg.border} border shadow-sm`
                          : "opacity-0"
                      }`}
                    />
                  ))
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating Drag Proxy Portal: Attached directly to body for 100% accurate viewport coordinates */}
      {mounted &&
        dragState.isDragging &&
        dragState.shapeIndex !== null &&
        availableShapes[dragState.shapeIndex] &&
        createPortal(
          <div
            dir="ltr"
            style={{
              position: "fixed",
              left: `${dragState.x}px`,
              top: `${dragState.y}px`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 99999,
              direction: "ltr",
            }}
            className="select-none pointer-events-none"
          >
            {(() => {
              const dragShape = availableShapes[dragState.shapeIndex];
              const cfg = COLOR_MAP[dragShape.color];

              return (
                <div
                  dir="ltr"
                  className="grid gap-1 sm:gap-1.5 p-2 sm:p-2.5 rounded-2xl bg-zinc-950/90 backdrop-blur-md border-2 border-purple-400/90 shadow-[0_10px_30px_rgba(168,85,247,0.7)] scale-105 sm:scale-110"
                  style={{
                    gridTemplateColumns: `repeat(${dragShape.matrix[0].length}, minmax(0, 1fr))`,
                    direction: "ltr",
                  }}
                >
                  {dragShape.matrix.map((row, r) =>
                    row.map((cell, c) => (
                      <div
                        key={`${r}-${c}`}
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg ${
                          cell === 1
                            ? `${cfg.bg} ${cfg.border} border-2 ${cfg.glow}`
                            : "opacity-0"
                        }`}
                      />
                    ))
                  )}
                </div>
              );
            })()}
          </div>,
          document.body
        )}

      {/* Boosters & Action Toolbar */}
      <div className="w-full max-w-[420px] grid grid-cols-4 gap-1 sm:gap-2 mt-2.5 sm:mt-3 px-1">
        {/* Undo */}
        <button
          type="button"
          onClick={handleUndo}
          disabled={undosLeft <= 0 || history.length === 0 || isGameOver}
          className="flex items-center justify-center gap-1 px-1.5 sm:px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] sm:text-xs font-bold disabled:opacity-40 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition active:scale-95 cursor-pointer"
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span>بازگشت ({undosLeft})</span>
        </button>

        {/* Rotate */}
        <button
          type="button"
          onClick={handleRotate}
          disabled={rotatesLeft <= 0 || !currentSelectedShape || isGameOver}
          className="flex items-center justify-center gap-1 px-1.5 sm:px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] sm:text-xs font-bold disabled:opacity-40 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition active:scale-95 cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>چرخش ({rotatesLeft})</span>
        </button>

        {/* Bomb */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setIsBombMode((m) => !m);
          }}
          disabled={bombsLeft <= 0 || isGameOver}
          className={`flex items-center justify-center gap-1 px-1.5 sm:px-3 py-2 rounded-xl border text-[10px] sm:text-xs font-bold transition active:scale-95 cursor-pointer ${
            isBombMode
              ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/40 animate-pulse"
              : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/25"
          }`}
        >
          <Bomb className="w-3.5 h-3.5" />
          <span>بمب ({bombsLeft})</span>
        </button>

        {/* Restart */}
        <button
          type="button"
          onClick={restartGame}
          className="flex items-center justify-center gap-1 px-1.5 sm:px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] sm:text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>ریست</span>
        </button>
      </div>
    </div>
  );
}

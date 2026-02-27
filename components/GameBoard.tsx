"use client";

import type { Board } from "@/types";
import type { MoveDirection } from "@/hooks/useGameEngine";

interface GameBoardProps {
  board: Board;
  swipeDirection?: MoveDirection | null;
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
}

const tileStyles: Record<number, string> = {
  0: "bg-amber-50/60 text-transparent",
  2: "bg-amber-100 text-amber-900",
  4: "bg-amber-200 text-amber-900",
  8: "bg-orange-300 text-white",
  16: "bg-orange-400 text-white",
  32: "bg-orange-500 text-white",
  64: "bg-orange-600 text-white",
  128: "bg-yellow-400 text-amber-950",
  256: "bg-yellow-500 text-amber-950",
  512: "bg-yellow-600 text-amber-950",
  1024: "bg-amber-700 text-white",
  2048: "bg-amber-800 text-white",
};

const getTileClasses = (value: number) =>
  tileStyles[value] ?? "bg-slate-900 text-white";

const getSwipeIndicator = (direction: MoveDirection | null | undefined) => {
  if (!direction) return null;
  
  const directionConfig = {
    up: { arrow: "↑", position: "top-4" },
    down: { arrow: "↓", position: "bottom-4" },
    left: { arrow: "←", position: "left-4" },
    right: { arrow: "→", position: "right-4" },
  };

  const config = directionConfig[direction];
  const isVertical = direction === "up" || direction === "down";
  const positionClass = isVertical 
    ? `${config.position} left-1/2 -translate-x-1/2` 
    : `${config.position} top-1/2 -translate-y-1/2`;

  return (
    <div 
      className={`absolute ${positionClass} flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/80 text-3xl text-white shadow-lg backdrop-blur-sm animate-pulse`}
    >
      {config.arrow}
    </div>
  );
};

export const GameBoard = ({ 
  board, 
  swipeDirection, 
  onTouchStart, 
  onTouchMove, 
  onTouchEnd 
}: GameBoardProps) => {
  return (
    <div
      className="relative grid w-[min(92vw,440px)] aspect-square grid-cols-4 gap-3 rounded-3xl bg-amber-200/40 p-3 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.6)] touch-none select-none"
      role="grid"
      aria-label="2048 board"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {getSwipeIndicator(swipeDirection)}
      {board.flat().map((value, index) => (
        <div
          key={index}
          role="gridcell"
          aria-label={value === 0 ? "empty" : `tile-${value}`}
          className={`flex items-center justify-center rounded-2xl text-2xl font-semibold shadow-inner transition-[transform,background-color,color] duration-150 sm:text-3xl ${
            getTileClasses(value)
          } ${value === 0 ? "" : "scale-100"}`}
        >
          <span className={value === 0 ? "opacity-0" : "opacity-100"}>
            {value === 0 ? "0" : value}
          </span>
        </div>
      ))}
    </div>
  );
};

"use client";

import type { Board } from "@/types";

interface GameBoardProps {
  board: Board;
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

export const GameBoard = ({ board }: GameBoardProps) => {
  return (
    <div
      className="grid w-[min(92vw,440px)] aspect-square grid-cols-4 gap-3 rounded-3xl bg-amber-200/40 p-3 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.6)]"
      role="grid"
      aria-label="2048 board"
    >
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

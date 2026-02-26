"use client";

interface ControlsProps {
  onNewGame: () => void;
}

export const Controls = ({ onNewGame }: ControlsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <button
        type="button"
        onClick={onNewGame}
        className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_16px_35px_-20px_rgba(15,23,42,0.9)] transition-transform hover:-translate-y-0.5"
      >
        New Game
      </button>
      <div className="text-sm text-slate-600">
        Use your arrow keys to slide tiles. Combine doubles to reach 2048.
      </div>
    </div>
  );
};

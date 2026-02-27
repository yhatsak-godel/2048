"use client";

import { useState } from "react";
import { BestResultsModal } from "@/components/BestResultsModal";

interface ControlsProps {
  onNewGame: () => void;
}

export const Controls = ({ onNewGame }: ControlsProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onNewGame}
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_16px_35px_-20px_rgba(15,23,42,0.9)] transition-transform hover:-translate-y-0.5"
        >
          New Game
        </button>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-full border border-amber-200 bg-amber-50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-800 shadow-[0_8px_20px_-10px_rgba(180,83,9,0.3)] transition-transform hover:-translate-y-0.5"
        >
          Top Scores
        </button>
      </div>
      <div className="text-sm text-slate-600">
        Use your arrow keys to slide tiles. Combine doubles to reach 2048.
      </div>
      <BestResultsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

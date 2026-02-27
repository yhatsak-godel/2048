"use client";

import { useEffect, useMemo, useRef } from "react";
import type { GameResult } from "@/types";
import { loadResults } from "@/utils/storage";

interface BestResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const BestResultsModal = ({ isOpen, onClose }: BestResultsModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const results = useMemo(
    () =>
      loadResults()
        .slice()
        .sort((a, b) => b.score - a.score)
        .slice(0, 10),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-label="Best results"
      className="w-full max-w-lg rounded-3xl bg-white p-0 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.5)] backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Hall of fame
            </p>
            <h2 className="text-xl font-semibold text-slate-900">Top Scores</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
          {results.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">
              No games played yet. Start playing to see your best scores here!
            </p>
          ) : (
            <ol className="flex flex-col gap-2">
              {results.map((result, index) => (
                <li
                  key={`${result.date}-${result.score}`}
                  className="flex items-center gap-3 rounded-2xl bg-amber-50/60 px-4 py-3"
                >
                  <span className="w-6 text-center text-sm font-semibold text-amber-700">
                    {index + 1}
                  </span>
                  <div className="flex flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <span className="text-lg font-bold text-slate-900">
                      {result.score.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>
                        Max&nbsp;
                        <span className="font-semibold text-amber-700">
                          {result.maxTile}
                        </span>
                      </span>
                      <span>
                        Moves&nbsp;
                        <span className="font-semibold text-slate-700">
                          {result.moves}
                        </span>
                      </span>
                      <span>{formatDate(result.date)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </dialog>
  );
};

"use client";

import { useCallback, useEffect } from "react";
import { Controls } from "@/components/Controls";
import { GameBoard } from "@/components/GameBoard";
import { GameStatus } from "@/components/GameStatus";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { useGameEngine } from "@/hooks/useGameEngine";
import { useTouchSwipe } from "@/hooks/useTouchSwipe";

export const GameContainer = () => {
  const { gameState, move, newGame } = useGameEngine();
  
  const { swipeDirection, touchHandlers } = useTouchSwipe({
    onSwipe: move,
    minSwipeDistance: 30,
  });

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      const keyMap = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      } as const;

      const direction = keyMap[event.key as keyof typeof keyMap];
      if (!direction) {
        return;
      }
      event.preventDefault();
      move(direction);
    },
    [move]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return (
    <section className="relative z-10 flex w-full flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-amber-900/70">
            2048
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Slide, merge, repeat.
          </h1>
        </div>
        <ScoreDisplay
          score={gameState.score}
          bestScore={gameState.bestScore}
          moves={gameState.moves}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <GameBoard 
          board={gameState.board} 
          swipeDirection={swipeDirection}
          {...touchHandlers}
        />
        <div className="flex flex-col gap-4">
          <GameStatus status={gameState.status} />
          <Controls onNewGame={newGame} />
          <div className="rounded-2xl bg-white/70 p-4 text-xs uppercase tracking-[0.3em] text-slate-500 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.6)] backdrop-blur">
            Swipe or use arrow keys
          </div>
        </div>
      </div>
    </section>
  );
};

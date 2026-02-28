"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GameResult, GameState } from "@/types";
import {
  createEmptyBoard,
  getMaxTile,
  hasValidMoves,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  spawnNewTile,
} from "@/utils/gameEngine";
import { useGameResults } from "@/hooks/useGameResults";
import { loadPlayerName } from "@/utils/storage";

export type MoveDirection = "left" | "right" | "up" | "down";

const seedBoard = () => {
  const empty = createEmptyBoard();
  const first = spawnNewTile(empty).board;
  return spawnNewTile(first).board;
};

export const useGameEngine = () => {
  const [board, setBoard] = useState(() => createEmptyBoard());
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState<GameState["status"]>("playing");
  const startTimeRef = useRef<number>(Date.now());
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize board with random tiles on client-side only to avoid hydration mismatch
  useEffect(() => {
    if (!isInitialized) {
      setBoard(seedBoard());
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const { addResult, bestScore } = useGameResults(score);

  const gameState = useMemo<GameState>(
    () => ({ board, score, bestScore, moves, status }),
    [board, score, bestScore, moves, status]
  );

  const finalizeResult = useCallback(
    (finalStatus: GameState["status"], finalBoard: number[][], finalScore: number, finalMoves: number) => {
      if (finalStatus !== "lost") {
        return;
      }

      try {
        const result: GameResult = {
          score: finalScore,
          moves: finalMoves,
          maxTile: getMaxTile(finalBoard),
          date: new Date().toISOString(),
          duration: Date.now() - startTimeRef.current,
          playerName: loadPlayerName(),
        };
        addResult(result);
      } catch (error) {
        console.error("Failed to finalize game result", error);
      }
    },
    [addResult]
  );

  const newGame = useCallback(() => {
    setBoard(seedBoard());
    setScore(0);
    setMoves(0);
    setStatus("playing");
    startTimeRef.current = Date.now();
  }, []);

  const move = useCallback(
    (direction: MoveDirection) => {
      if (status === "lost") {
        return;
      }

      const actionMap = {
        left: moveLeft,
        right: moveRight,
        up: moveUp,
        down: moveDown,
      } as const;

      const action = actionMap[direction];
      if (!action) {
        console.warn(`Unknown move direction: ${direction}`);
        return;
      }

      try {
        const result = action(board);
        if (!result.changed) {
          return;
        }

        const spawned = spawnNewTile(result.board);
        const nextBoard = spawned.board;
        const nextScore = score + result.scoreGained;
        const nextMoves = moves + 1;
        let nextStatus: GameState["status"] = status;

        if (getMaxTile(nextBoard) >= 2048 && status !== "won") {
          nextStatus = "won";
        }
        if (!hasValidMoves(nextBoard)) {
          nextStatus = "lost";
        }

        setBoard(nextBoard);
        setScore(nextScore);
        setMoves(nextMoves);
        setStatus(nextStatus);
        finalizeResult(nextStatus, nextBoard, nextScore, nextMoves);
      } catch (error) {
        console.error("Failed to apply move", error);
      }
    },
    [board, moves, score, status, finalizeResult]
  );

  return { gameState, move, newGame };
};

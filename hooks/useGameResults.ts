"use client";

import { useCallback, useEffect, useState } from "react";
import type { GameResult, PlayerName } from "@/types";
import {
  clearResults as clearStoredResults,
  limitResults,
  loadBestScore,
  loadPlayerName,
  loadResults,
  saveBestScore,
  saveResults,
} from "@/utils/storage";

type GameResultInput = Omit<GameResult, "playerName"> & {
  playerName?: PlayerName;
};

export const useGameResults = (currentScore?: number, playerName?: PlayerName) => {
  // Initialize with safe defaults to ensure SSR/CSR hydration consistency
  const [results, setResults] = useState<GameResult[]>([]);
  const [bestScore, setBestScore] = useState(0);

  // Load persisted values after hydration completes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResults(loadResults());
    setBestScore(loadBestScore());
  }, []);

  // Synchronize best score when current game score changes
  useEffect(() => {
    if (typeof currentScore !== "number") {
      return;
    }
    // Synchronizing with external localStorage when score changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBestScore((prev) => {
      if (currentScore > prev) {
        saveBestScore(currentScore);
        return currentScore;
      }
      return prev;
    });
  }, [currentScore]);

  const addResult = useCallback(
    (result: GameResultInput) => {
      const resolvedPlayerName = result.playerName ?? playerName ?? loadPlayerName();
      const normalizedResult: GameResult = {
        ...result,
        playerName: resolvedPlayerName,
      };
      setResults((prev) => {
        const next = limitResults([normalizedResult, ...prev]);
        saveResults(next);
        return next;
      });
      setBestScore((prev) => {
        if (normalizedResult.score > prev) {
          saveBestScore(normalizedResult.score);
          return normalizedResult.score;
        }
        return prev;
      });
    },
    [playerName]
  );

  const clearResults = useCallback(() => {
    setResults([]);
    clearStoredResults();
  }, []);

  return { results, addResult, bestScore, clearResults };
};

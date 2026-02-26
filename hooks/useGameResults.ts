"use client";

import { useCallback, useEffect, useState } from "react";
import type { GameResult } from "@/types";
import {
  clearResults as clearStoredResults,
  limitResults,
  loadBestScore,
  loadResults,
  saveBestScore,
  saveResults,
} from "@/utils/storage";

export const useGameResults = (currentScore?: number) => {
  const [results, setResults] = useState<GameResult[]>([]);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    setResults(loadResults());
    setBestScore(loadBestScore());
  }, []);

  useEffect(() => {
    if (typeof currentScore !== "number") {
      return;
    }
    setBestScore((prev) => {
      if (currentScore > prev) {
        saveBestScore(currentScore);
        return currentScore;
      }
      return prev;
    });
  }, [currentScore]);

  const addResult = useCallback((result: GameResult) => {
    setResults((prev) => {
      const next = limitResults([result, ...prev]);
      saveResults(next);
      return next;
    });
    setBestScore((prev) => {
      if (result.score > prev) {
        saveBestScore(result.score);
        return result.score;
      }
      return prev;
    });
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    clearStoredResults();
  }, []);

  return { results, addResult, bestScore, clearResults };
};

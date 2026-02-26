import type { GameResult } from "@/types";

const RESULTS_KEY = "2048_results";
const BEST_SCORE_KEY = "2048_bestScore";
const MAX_RESULTS = 100;

const memoryStore = new Map<string, string>();

const isStorageAvailable = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const testKey = "__storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const safeGetItem = (key: string): string | null => {
  if (isStorageAvailable()) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return memoryStore.get(key) ?? null;
    }
  }
  return memoryStore.get(key) ?? null;
};

const safeSetItem = (key: string, value: string): boolean => {
  if (isStorageAvailable()) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch {
      memoryStore.set(key, value);
      return false;
    }
  }
  memoryStore.set(key, value);
  return false;
};

export const loadResults = (): GameResult[] => {
  const raw = safeGetItem(RESULTS_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as GameResult[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item) =>
      typeof item?.score === "number" &&
      typeof item?.moves === "number" &&
      typeof item?.maxTile === "number" &&
      typeof item?.date === "string" &&
      typeof item?.duration === "number"
    );
  } catch {
    return [];
  }
};

export const saveResults = (results: GameResult[]): boolean => {
  const normalized = results.slice(0, MAX_RESULTS);
  return safeSetItem(RESULTS_KEY, JSON.stringify(normalized));
};

export const loadBestScore = (): number => {
  const raw = safeGetItem(BEST_SCORE_KEY);
  if (!raw) {
    return 0;
  }
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const saveBestScore = (score: number): boolean =>
  safeSetItem(BEST_SCORE_KEY, String(score));

export const clearResults = (): void => {
  safeSetItem(RESULTS_KEY, JSON.stringify([]));
};

export const limitResults = (results: GameResult[]): GameResult[] =>
  results.slice(0, MAX_RESULTS);

export const getStorageKeys = () => ({ RESULTS_KEY, BEST_SCORE_KEY });

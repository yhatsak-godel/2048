"use client";

import { useCallback, useEffect, useState } from "react";
import type { PlayerName } from "@/types";
import {
  hasStoredPlayerName,
  loadPlayerName,
  normalizePlayerName,
  savePlayerName,
} from "@/utils/storage";

type SaveResult = {
  success: boolean;
  error?: string;
};

const DEFAULT_PLAYER_NAME: PlayerName = "Player";

/**
 * Manages the player name lifecycle, including first-load prompting and persistence.
 */
export const usePlayerName = () => {
  // Initialize with safe defaults for SSR/CSR consistency
  const [playerName, setPlayerName] = useState<PlayerName>(DEFAULT_PLAYER_NAME);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  // Load persisted name and check if prompt should open after hydration
  useEffect(() => {
    const storedName = loadPlayerName();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlayerName(storedName);
    if (!hasStoredPlayerName()) {
      setIsPromptOpen(true);
    }
  }, []);

  const saveName = useCallback((value: string): SaveResult => {
    const normalized = normalizePlayerName(value);
    if (!normalized) {
      return { success: false, error: "Enter a name to continue." };
    }
    const saved = savePlayerName(normalized);
    const nextName = saved ? normalized : loadPlayerName();
    setPlayerName(nextName);
    setIsPromptOpen(false);
    return saved
      ? { success: true }
      : {
          success: false,
          error: "Unable to save your name. Using the default instead.",
        };
  }, []);

  const useDefaultName = useCallback(() => {
    savePlayerName(DEFAULT_PLAYER_NAME);
    setPlayerName(DEFAULT_PLAYER_NAME);
    setIsPromptOpen(false);
  }, []);

  const requestName = useCallback(() => {
    setIsPromptOpen(true);
  }, []);

  return {
    playerName,
    isPromptOpen,
    requestName,
    saveName,
    useDefaultName,
  };
};

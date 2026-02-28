"use client";

import { useCallback, useState } from "react";
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
  const [playerName, setPlayerName] = useState<PlayerName>(() => loadPlayerName());
  const [isPromptOpen, setIsPromptOpen] = useState(() => !hasStoredPlayerName());

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

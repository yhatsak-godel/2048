import { renderHook, act, waitFor } from "@testing-library/react";
import { usePlayerName } from "@/hooks/usePlayerName";
import { getStorageKeys, savePlayerName } from "@/utils/storage";

describe("usePlayerName", () => {
  beforeEach(() => {
    const { PLAYER_NAME_KEY } = getStorageKeys();
    window.localStorage.removeItem(PLAYER_NAME_KEY);
  });

  test("prompts when no stored name exists", async () => {
    const { result } = renderHook(() => usePlayerName());

    await waitFor(() => {
      expect(result.current.isPromptOpen).toBe(true);
      expect(result.current.playerName).toBe("Player");
    });
  });

  test("does not prompt when name is stored", async () => {
    savePlayerName("Jamie");
    const { result } = renderHook(() => usePlayerName());

    await waitFor(() => {
      expect(result.current.isPromptOpen).toBe(false);
      expect(result.current.playerName).toBe("Jamie");
    });
  });

  test("keeps prompt open on invalid name", async () => {
    const { result } = renderHook(() => usePlayerName());

    await waitFor(() => {
      expect(result.current.isPromptOpen).toBe(true);
    });

    act(() => {
      const outcome = result.current.saveName("   ");
      expect(outcome.success).toBe(false);
    });

    expect(result.current.isPromptOpen).toBe(true);
  });
});

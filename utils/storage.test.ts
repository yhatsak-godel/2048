import {
  clearPlayerName,
  clearResults,
  getStorageKeys,
  hasStoredPlayerName,
  loadBestScore,
  loadPlayerName,
  loadResults,
  saveBestScore,
  savePlayerName,
  saveResults,
} from "@/utils/storage";

const sampleResults = [
  {
    score: 100,
    moves: 10,
    maxTile: 64,
    date: "2026-02-26",
    duration: 1200,
    playerName: "Player One",
  },
];

describe("storage", () => {
  beforeEach(() => {
    clearResults();
    clearPlayerName();
  });

  test("saves and loads results with player name", () => {
    saveResults(sampleResults);
    expect(loadResults()).toEqual(sampleResults);
  });

  test("fills default player name for legacy results", () => {
    const { RESULTS_KEY } = getStorageKeys();
    const legacy = [
      { score: 200, moves: 20, maxTile: 128, date: "2026-02-25", duration: 2400 },
    ];
    window.localStorage.setItem(RESULTS_KEY, JSON.stringify(legacy));
    expect(loadResults()).toEqual([
      {
        score: 200,
        moves: 20,
        maxTile: 128,
        date: "2026-02-25",
        duration: 2400,
        playerName: "Player",
      },
    ]);
  });

  test("saves and loads best score", () => {
    saveBestScore(512);
    expect(loadBestScore()).toBe(512);
  });

  test("saves and loads player name", () => {
    expect(savePlayerName("  Alex  ")).toBe(true);
    expect(loadPlayerName()).toBe("Alex");
  });

  test("reports when a player name is stored", () => {
    clearPlayerName();
    expect(hasStoredPlayerName()).toBe(false);
    savePlayerName("Jules");
    expect(hasStoredPlayerName()).toBe(true);
  });

  test("rejects empty player name and returns default", () => {
    expect(savePlayerName("   ")).toBe(false);
    expect(loadPlayerName()).toBe("Player");
  });
});

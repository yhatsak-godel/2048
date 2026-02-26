import {
  loadBestScore,
  loadResults,
  saveBestScore,
  saveResults,
} from "@/utils/storage";

const sampleResults = [
  { score: 100, moves: 10, maxTile: 64, date: "2026-02-26", duration: 1200 },
];

describe("storage", () => {
  test("saves and loads results", () => {
    saveResults(sampleResults);
    expect(loadResults()).toEqual(sampleResults);
  });

  test("saves and loads best score", () => {
    saveBestScore(512);
    expect(loadBestScore()).toBe(512);
  });
});

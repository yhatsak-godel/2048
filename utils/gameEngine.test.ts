import {
  createEmptyBoard,
  hasValidMoves,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  spawnNewTile,
} from "@/utils/gameEngine";

const boardWithRow = (row: number[]) => [row, [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

describe("gameEngine", () => {
  test("moveLeft merges once per pair", () => {
    const board = boardWithRow([2, 2, 2, 0]);
    const result = moveLeft(board);
    expect(result.board[0]).toEqual([4, 2, 0, 0]);
    expect(result.scoreGained).toBe(4);
    expect(result.changed).toBe(true);
  });

  test("moveRight shifts tiles correctly", () => {
    const board = boardWithRow([2, 0, 2, 2]);
    const result = moveRight(board);
    expect(result.board[0]).toEqual([0, 0, 2, 4]);
    expect(result.scoreGained).toBe(4);
  });

  test("moveUp merges columns", () => {
    const board = [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [4, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const result = moveUp(board);
    expect(result.board[0][0]).toBe(4);
    expect(result.board[1][0]).toBe(4);
  });

  test("moveDown shifts tiles to bottom", () => {
    const board = [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [4, 0, 0, 0],
    ];
    const result = moveDown(board);
    expect(result.board[3][0]).toBe(4);
    expect(result.board[2][0]).toBe(4);
  });

  test("spawnNewTile adds a 2 or 4", () => {
    const board = createEmptyBoard();
    const rngValues = [0.0, 0.95];
    const rng = () => rngValues.shift() ?? 0.0;
    const result = spawnNewTile(board, rng);
    const flat = result.board.flat();
    expect(flat.filter((value) => value !== 0)).toEqual([4]);
  });

  test("hasValidMoves detects no moves", () => {
    const board = [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ];
    expect(hasValidMoves(board)).toBe(false);
  });
});

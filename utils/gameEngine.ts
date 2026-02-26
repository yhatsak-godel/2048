import type { Board, MoveResult, Position } from "@/types";

export const BOARD_SIZE = 4;

/** Create an empty 4x4 board filled with zeros. */
export const createEmptyBoard = (): Board =>
  Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

/** Return the maximum tile value on the board. */
export const getMaxTile = (board: Board): number =>
  Math.max(...board.flat(), 0);

const cloneBoard = (board: Board): Board => board.map((row) => [...row]);

const getEmptyPositions = (board: Board): Position[] => {
  const positions: Position[] = [];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      if (board[row][col] === 0) {
        positions.push({ row, col });
      }
    }
  }
  return positions;
};

const slideAndMergeRow = (row: number[]): { row: number[]; scoreGained: number } => {
  const filtered = row.filter((value) => value !== 0);
  const merged: number[] = [];
  let scoreGained = 0;

  for (let i = 0; i < filtered.length; i += 1) {
    const current = filtered[i];
    const next = filtered[i + 1];
    if (next !== undefined && current === next) {
      const value = current * 2;
      merged.push(value);
      scoreGained += value;
      i += 1;
    } else {
      merged.push(current);
    }
  }

  while (merged.length < BOARD_SIZE) {
    merged.push(0);
  }

  return { row: merged, scoreGained };
};

/** Shift and merge tiles left. */
export const moveLeft = (board: Board): MoveResult => {
  const nextBoard: Board = [];
  let scoreGained = 0;
  let changed = false;

  board.forEach((row, index) => {
    const result = slideAndMergeRow(row);
    nextBoard[index] = result.row;
    scoreGained += result.scoreGained;
    if (!changed && result.row.some((value, col) => value !== row[col])) {
      changed = true;
    }
  });

  return { board: nextBoard, changed, scoreGained };
};

/** Shift and merge tiles right. */
export const moveRight = (board: Board): MoveResult => {
  const reversed = board.map((row) => [...row].reverse());
  const result = moveLeft(reversed);
  const nextBoard = result.board.map((row) => [...row].reverse());
  return { board: nextBoard, changed: result.changed, scoreGained: result.scoreGained };
};

const transpose = (board: Board): Board => {
  const next = createEmptyBoard();
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      next[col][row] = board[row][col];
    }
  }
  return next;
};

/** Shift and merge tiles up. */
export const moveUp = (board: Board): MoveResult => {
  const transposed = transpose(board);
  const result = moveLeft(transposed);
  return { board: transpose(result.board), changed: result.changed, scoreGained: result.scoreGained };
};

/** Shift and merge tiles down. */
export const moveDown = (board: Board): MoveResult => {
  const transposed = transpose(board);
  const result = moveRight(transposed);
  return { board: transpose(result.board), changed: result.changed, scoreGained: result.scoreGained };
};

/** Spawn a new tile (90% = 2, 10% = 4) at a random empty position. */
export const spawnNewTile = (board: Board, rng: () => number = Math.random): MoveResult => {
  const empty = getEmptyPositions(board);
  if (empty.length === 0) {
    return { board: cloneBoard(board), changed: false, scoreGained: 0 };
  }

  const index = Math.floor(rng() * empty.length);
  const value = rng() < 0.9 ? 2 : 4;
  const nextBoard = cloneBoard(board);
  const target = empty[index];
  nextBoard[target.row][target.col] = value;

  return { board: nextBoard, changed: true, scoreGained: 0 };
};

/** Check if there are any valid moves remaining. */
export const hasValidMoves = (board: Board): boolean => {
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const current = board[row][col];
      if (current === 0) {
        return true;
      }
      const right = board[row][col + 1];
      const down = board[row + 1]?.[col];
      if (right === current || down === current) {
        return true;
      }
    }
  }
  return false;
};

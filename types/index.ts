export interface GameState {
  board: number[][];
  score: number;
  bestScore: number;
  moves: number;
  status: "playing" | "won" | "lost";
}

export interface GameResult {
  score: number;
  moves: number;
  maxTile: number;
  date: string;
  duration: number;
}

export interface Position {
  row: number;
  col: number;
}

export type Board = number[][];

export type MoveResult = {
  board: Board;
  changed: boolean;
  scoreGained: number;
};

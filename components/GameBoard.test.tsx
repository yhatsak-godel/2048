import { render, screen } from "@testing-library/react";
import { GameBoard } from "@/components/GameBoard";

describe("GameBoard", () => {
  test("renders 16 grid cells", () => {
    const board = Array.from({ length: 4 }, () => Array(4).fill(0));
    render(<GameBoard board={board} />);
    expect(screen.getAllByRole("gridcell")).toHaveLength(16);
  });

  test("renders tile values", () => {
    const board = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    render(<GameBoard board={board} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});

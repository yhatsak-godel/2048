import { render, screen, within } from "@testing-library/react";
import { GameBoard } from "@/components/GameBoard";

const createEmptyBoard = () =>
  Array.from({ length: 4 }, () => Array(4).fill(0));

describe("GameBoard", () => {
  test("renders grid structure and container classes", () => {
    render(<GameBoard board={createEmptyBoard()} />);

    const grid = screen.getByRole("grid", { name: "2048 board" });
    expect(grid).toHaveClass("grid", "grid-cols-4", "rounded-3xl", "p-3");
    expect(screen.getAllByRole("gridcell")).toHaveLength(16);
  });

  test("renders empty board tiles with hidden text", () => {
    render(<GameBoard board={createEmptyBoard()} />);

    const cells = screen.getAllByRole("gridcell");
    cells.forEach((cell) => {
      expect(cell).toHaveAttribute("aria-label", "empty");
      expect(cell).toHaveClass("bg-amber-50/60", "text-transparent");

      const tileText = within(cell).getByText("0");
      expect(tileText).toHaveClass("opacity-0");
    });
  });

  test("renders mapped tile values with correct styles", () => {
    const board = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 0],
      [0, 0, 0, 0],
    ];

    render(<GameBoard board={board} />);

    const expectations: Array<[number, string[]]> = [
      [2, ["bg-amber-100", "text-amber-900"]],
      [4, ["bg-amber-200", "text-amber-900"]],
      [8, ["bg-orange-300", "text-white"]],
      [16, ["bg-orange-400", "text-white"]],
      [32, ["bg-orange-500", "text-white"]],
      [64, ["bg-orange-600", "text-white"]],
      [128, ["bg-yellow-400", "text-amber-950"]],
      [256, ["bg-yellow-500", "text-amber-950"]],
      [512, ["bg-yellow-600", "text-amber-950"]],
      [1024, ["bg-amber-700", "text-white"]],
      [2048, ["bg-amber-800", "text-white"]],
    ];

    expectations.forEach(([value, classes]) => {
      const cell = screen.getByRole("gridcell", {
        name: `tile-${value}`,
      });
      classes.forEach((className) => expect(cell).toHaveClass(className));

      const tileText = within(cell).getByText(String(value));
      expect(tileText).toHaveClass("opacity-100");
    });

    const emptyCells = screen.getAllByRole("gridcell", { name: "empty" });
    expect(emptyCells).toHaveLength(5);
    emptyCells.forEach((cell) => {
      const tileText = within(cell).getByText("0");
      expect(tileText).toHaveClass("opacity-0");
    });
  });

  test("uses fallback styling for values above 2048", () => {
    const board = [
      [4096, 8192, 16384, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    render(<GameBoard board={board} />);

    [4096, 8192, 16384].forEach((value) => {
      const cell = screen.getByRole("gridcell", {
        name: `tile-${value}`,
      });
      expect(cell).toHaveClass("bg-slate-900", "text-white");
      expect(within(cell).getByText(String(value))).toHaveClass("opacity-100");
    });
  });

  test("flattens board rows in order", () => {
    const board = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    render(<GameBoard board={board} />);

    const labels = screen
      .getAllByRole("gridcell")
      .map((cell) => cell.getAttribute("aria-label"));
    const expected = board
      .flat()
      .map((value) => `tile-${value}`);

    expect(labels).toEqual(expected);
  });

  test("renders a single tile board", () => {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
    ];

    render(<GameBoard board={board} />);

    expect(screen.getByRole("gridcell", { name: "tile-2" })).toBeInTheDocument();
    expect(screen.getAllByRole("gridcell", { name: "empty" })).toHaveLength(15);
  });
});

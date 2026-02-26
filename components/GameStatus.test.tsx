import { render, screen } from "@testing-library/react";
import { GameStatus } from "@/components/GameStatus";

describe("GameStatus", () => {
  test("shows playing status", () => {
    render(<GameStatus status="playing" />);
    expect(screen.getByText(/playing/i)).toBeInTheDocument();
  });

  test("shows win status", () => {
    render(<GameStatus status="won" />);
    expect(screen.getByText(/2048 achieved/i)).toBeInTheDocument();
  });

  test("shows loss status", () => {
    render(<GameStatus status="lost" />);
    expect(screen.getByText(/no moves left/i)).toBeInTheDocument();
  });
});

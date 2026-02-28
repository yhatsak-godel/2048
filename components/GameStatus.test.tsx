import { render, screen, fireEvent } from "@testing-library/react";
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

  test("displays player name when provided", () => {
    render(<GameStatus status="playing" playerName="Alice" />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  test("shows edit button when playerName and onEditName provided", () => {
    const handleEdit = jest.fn();
    render(<GameStatus status="playing" playerName="Bob" onEditName={handleEdit} />);
    const editButton = screen.getByRole("button", { name: /edit player name/i });
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  test("does not show edit button when onEditName not provided", () => {
    render(<GameStatus status="playing" playerName="Charlie" />);
    expect(screen.queryByRole("button", { name: /edit player name/i })).not.toBeInTheDocument();
  });

  test("does not display player section when playerName not provided", () => {
    render(<GameStatus status="playing" />);
    expect(screen.queryByText(/player/i)).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { ScoreDisplay } from "@/components/ScoreDisplay";

describe("ScoreDisplay", () => {
  test("shows score, best score, and moves", () => {
    render(<ScoreDisplay score={120} bestScore={256} moves={9} />);
    expect(screen.getByText("Score")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("Best")).toBeInTheDocument();
    expect(screen.getByText("256")).toBeInTheDocument();
    expect(screen.getByText("Moves")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
  });
});

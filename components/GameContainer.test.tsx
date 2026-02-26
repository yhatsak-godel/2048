import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameContainer } from "@/components/GameContainer";

describe("GameContainer", () => {
  test("moves with arrow keys and updates moves", async () => {
    const randomMock = jest.spyOn(Math, "random").mockReturnValue(0.1);
    const user = userEvent.setup();

    render(<GameContainer />);

    await user.keyboard("{ArrowRight}");
    const movesCard = screen.getByText("Moves").parentElement;
    expect(movesCard).not.toBeNull();
    expect(within(movesCard as HTMLElement).getByText("1")).toBeInTheDocument();

    randomMock.mockRestore();
  });

  test("new game resets moves", async () => {
    const randomMock = jest.spyOn(Math, "random").mockReturnValue(0.1);
    const user = userEvent.setup();

    render(<GameContainer />);
    await user.keyboard("{ArrowRight}");
    await user.click(screen.getByRole("button", { name: /new game/i }));

    const movesCard = screen.getByText("Moves").parentElement;
    expect(movesCard).not.toBeNull();
    expect(within(movesCard as HTMLElement).getByText("0")).toBeInTheDocument();
    randomMock.mockRestore();
  });
});

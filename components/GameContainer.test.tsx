import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameContainer } from "@/components/GameContainer";
import { getStorageKeys, savePlayerName } from "@/utils/storage";

describe("GameContainer", () => {
  beforeEach(() => {
    const { PLAYER_NAME_KEY } = getStorageKeys();
    window.localStorage.removeItem(PLAYER_NAME_KEY);
  });

  test("moves with arrow keys and updates moves", async () => {
    const randomMock = jest.spyOn(Math, "random").mockReturnValue(0.1);
    const user = userEvent.setup();

    savePlayerName("Tester");
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

    savePlayerName("Tester");
    render(<GameContainer />);
    await user.keyboard("{ArrowRight}");
    await user.click(screen.getByRole("button", { name: /new game/i }));

    const movesCard = screen.getByText("Moves").parentElement;
    expect(movesCard).not.toBeNull();
    expect(within(movesCard as HTMLElement).getByText("0")).toBeInTheDocument();
    randomMock.mockRestore();
  });

  test("prompts for name when none is stored", () => {
    render(<GameContainer />);
    expect(
      screen.getByRole("heading", { name: /what should we call you/i })
    ).toBeInTheDocument();
  });

  test("displays player name on game page after stored", async () => {
    const user = userEvent.setup();
    const randomMock = jest.spyOn(Math, "random").mockReturnValue(0.1);

    render(<GameContainer />);
    
    // Fill in name in the prompt
    const nameInput = screen.getByRole("textbox", { name: /player name/i });
    await user.clear(nameInput);
    await user.type(nameInput, "Alice");
    
    const submitButton = screen.getByRole("button", { name: /save name/i });
    await user.click(submitButton);
    
    // Wait for modal to close and player name to appear
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    
    randomMock.mockRestore();
  });

  test("opens name prompt when edit button clicked", async () => {
    const user = userEvent.setup();
    const randomMock = jest.spyOn(Math, "random").mockReturnValue(0.1);

    savePlayerName("Bob");
    render(<GameContainer />);
    
    // Player name should be visible initially
    expect(screen.getByText("Bob")).toBeInTheDocument();
    
    // Click edit button
    const editButton = screen.getByRole("button", { name: /edit player name/i });
    await user.click(editButton);
    
    // Modal should be open
    expect(
      screen.getByRole("heading", { name: /what should we call you/i })
    ).toBeInTheDocument();
    
    randomMock.mockRestore();
  });
});

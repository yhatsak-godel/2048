import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Controls } from "@/components/Controls";

describe("Controls", () => {
  test("triggers new game", async () => {
    const user = userEvent.setup();
    const onNewGame = jest.fn();

    render(<Controls onNewGame={onNewGame} />);

    await user.click(screen.getByRole("button", { name: /new game/i }));
    expect(onNewGame).toHaveBeenCalledTimes(1);
  });
});

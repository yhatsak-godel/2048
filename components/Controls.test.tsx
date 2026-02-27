import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Controls } from "@/components/Controls";

jest.mock("@/utils/storage", () => ({
  loadResults: jest.fn().mockReturnValue([]),
}));

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = jest.fn(function (
    this: HTMLDialogElement
  ) {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = jest.fn(function (
    this: HTMLDialogElement
  ) {
    this.removeAttribute("open");
  });
});

describe("Controls", () => {
  test("triggers new game", async () => {
    const user = userEvent.setup();
    const onNewGame = jest.fn();

    render(<Controls onNewGame={onNewGame} />);

    await user.click(screen.getByRole("button", { name: /new game/i }));
    expect(onNewGame).toHaveBeenCalledTimes(1);
  });

  test("opens Top Scores modal when button is clicked", async () => {
    const user = userEvent.setup();
    render(<Controls onNewGame={jest.fn()} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /top scores/i }));
    expect(screen.getByRole("dialog", { name: /best results/i })).toBeInTheDocument();
    expect(screen.getByText(/hall of fame/i)).toBeInTheDocument();
  });

  test("closes Top Scores modal when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<Controls onNewGame={jest.fn()} />);

    await user.click(screen.getByRole("button", { name: /top scores/i }));
    expect(screen.getByRole("dialog", { name: /best results/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

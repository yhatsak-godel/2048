import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlayerNameModal } from "@/components/PlayerNameModal";

describe("PlayerNameModal", () => {
  test("renders nothing when closed", () => {
    const { container } = render(
      <PlayerNameModal
        isOpen={false}
        onSubmit={jest.fn()}
        onUseDefault={jest.fn()}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("shows title and input when open", () => {
    render(
      <PlayerNameModal isOpen onSubmit={jest.fn()} onUseDefault={jest.fn()} />
    );
    expect(
      screen.getByRole("heading", { name: /what should we call you/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/player name/i)).toBeInTheDocument();
  });

  test("submits a trimmed name", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn(() => ({ success: true }));

    render(
      <PlayerNameModal isOpen onSubmit={onSubmit} onUseDefault={jest.fn()} />
    );

    await user.type(screen.getByLabelText(/player name/i), "  Alex  ");
    await user.click(screen.getByRole("button", { name: /save name/i }));

    expect(onSubmit).toHaveBeenCalledWith("Alex");
  });

  test("shows validation error on empty name", async () => {
    const user = userEvent.setup();
    render(
      <PlayerNameModal isOpen onSubmit={jest.fn()} onUseDefault={jest.fn()} />
    );

    await user.click(screen.getByRole("button", { name: /save name/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/enter a name/i);
  });

  test("triggers default action", async () => {
    const user = userEvent.setup();
    const onUseDefault = jest.fn();
    render(
      <PlayerNameModal isOpen onSubmit={jest.fn()} onUseDefault={onUseDefault} />
    );

    await user.click(
      screen.getByRole("button", { name: /continue as player/i })
    );
    expect(onUseDefault).toHaveBeenCalledTimes(1);
  });
});

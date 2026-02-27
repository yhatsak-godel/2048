import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BestResultsModal } from "@/components/BestResultsModal";
import { loadResults } from "@/utils/storage";

jest.mock("@/utils/storage", () => ({
  loadResults: jest.fn(),
}));

const mockLoadResults = loadResults as jest.MockedFunction<typeof loadResults>;

// jsdom doesn't fully implement HTMLDialogElement; stub the missing methods.
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

const mockResults = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    score: (count - i) * 100,
    maxTile: 2 ** ((count - i) % 11 + 1),
    moves: 50 + i,
    date: new Date(2024, 0, i + 1).toISOString(),
    duration: 120,
  }));

describe("BestResultsModal", () => {
  afterEach(() => jest.clearAllMocks());

  test("renders nothing when closed", () => {
    mockLoadResults.mockReturnValue([]);
    const { container } = render(
      <BestResultsModal isOpen={false} onClose={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("renders modal with title when open", () => {
    mockLoadResults.mockReturnValue([]);
    render(<BestResultsModal isOpen onClose={jest.fn()} />);
    expect(screen.getByText(/top scores/i)).toBeInTheDocument();
  });

  test("shows empty state when no results", () => {
    mockLoadResults.mockReturnValue([]);
    render(<BestResultsModal isOpen onClose={jest.fn()} />);
    expect(screen.getByText(/no games played yet/i)).toBeInTheDocument();
  });

  test("displays results sorted by score descending", () => {
    const results = [
      { score: 200, maxTile: 32, moves: 10, date: "2024-01-01", duration: 60 },
      { score: 500, maxTile: 64, moves: 20, date: "2024-01-02", duration: 90 },
      { score: 100, maxTile: 16, moves: 5, date: "2024-01-03", duration: 30 },
    ];
    mockLoadResults.mockReturnValue(results);
    render(<BestResultsModal isOpen onClose={jest.fn()} />);

    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("500");
    expect(items[1]).toHaveTextContent("200");
    expect(items[2]).toHaveTextContent("100");
  });

  test("shows at most 10 results when more than 10 games are stored", () => {
    mockLoadResults.mockReturnValue(mockResults(15));
    render(<BestResultsModal isOpen onClose={jest.fn()} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(10);
  });

  test("shows all results when fewer than 10 games are stored", () => {
    mockLoadResults.mockReturnValue(mockResults(4));
    render(<BestResultsModal isOpen onClose={jest.fn()} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  test("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    mockLoadResults.mockReturnValue([]);
    const onClose = jest.fn();
    render(<BestResultsModal isOpen onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("each entry shows score, maxTile, moves and date", () => {
    const results = [
      { score: 1024, maxTile: 256, moves: 42, date: "2024-06-15", duration: 180 },
    ];
    mockLoadResults.mockReturnValue(results);
    render(<BestResultsModal isOpen onClose={jest.fn()} />);
    expect(screen.getByText("1,024")).toBeInTheDocument();
    expect(screen.getByText("256")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});

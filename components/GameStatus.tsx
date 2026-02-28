import type { GameState, PlayerName } from "@/types";

interface GameStatusProps {
  status: GameState["status"];
  playerName?: PlayerName;
  onEditName?: () => void;
}

/**
 * GameStatus displays the current game state and player information.
 * @param status - The current game status (playing, won, lost)
 * @param playerName - The current player's name
 * @param onEditName - Callback to trigger the name edit flow
 */
export const GameStatus = ({ status, playerName, onEditName }: GameStatusProps) => {
  const content =
    status === "won"
      ? { title: "2048 achieved", message: "Keep going or start fresh." }
      : status === "lost"
        ? { title: "No moves left", message: "Start a new game to try again." }
        : { title: "Playing", message: "Chain tiles and chase the win." };

  return (
    <div className="rounded-2xl border border-white/40 bg-white/70 p-4 text-slate-700 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.6)] backdrop-blur">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Status</p>
      <p className="text-lg font-semibold text-slate-900">{content.title}</p>
      <p className="text-sm text-slate-600">{content.message}</p>
      {playerName && (
        <div className="mt-4 border-t border-slate-300 pt-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Player</p>
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-base font-medium text-slate-900" aria-label="Player name">
              {playerName}
            </p>
            {onEditName && (
              <button
                type="button"
                onClick={onEditName}
                className="shrink-0 rounded px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Edit player name"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

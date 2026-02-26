import type { GameState } from "@/types";

interface GameStatusProps {
  status: GameState["status"];
}

export const GameStatus = ({ status }: GameStatusProps) => {
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
    </div>
  );
};

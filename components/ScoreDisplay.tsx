interface ScoreDisplayProps {
  score: number;
  bestScore: number;
  moves: number;
}

export const ScoreDisplay = ({ score, bestScore, moves }: ScoreDisplayProps) => {
  const items = [
    { label: "Score", value: score },
    { label: "Best", value: bestScore },
    { label: "Moves", value: moves },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-[88px] rounded-2xl bg-white/80 px-4 py-3 text-center shadow-[0_10px_30px_-18px_rgba(15,23,42,0.6)] backdrop-blur"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            {item.label}
          </p>
          <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

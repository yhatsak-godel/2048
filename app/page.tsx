import { GameContainer } from "@/components/GameContainer";

export default function Home() {
  return (
    <div className="page-shell flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
      <main className="relative z-10 w-full max-w-5xl">
        <GameContainer />
      </main>
    </div>
  );
}

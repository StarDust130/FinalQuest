
import FlashCards from "./FlashCards";
import Header from "./Header";
import HeroCard from "./HeroCard";
import Streak from "./Streak";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-neutral-100 selection:bg-indigo-500/40">
        {/* HEADER */}
        <Header />

        <main className="px-5 md:px-10 pb-24 space-y-12 max-w-6xl mx-auto">
          {/* HERO / REVISION BANNER */}
          <HeroCard />

          {/* STREAK / WEEKLY */}
          <Streak  />

          {/* Flash Card */}
          <FlashCards />
        </main>
      </div>
    </>
  );
}

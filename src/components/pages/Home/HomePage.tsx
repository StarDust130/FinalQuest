
import FlashCards from "./FlashCards";
import HeroCard from "./HeroCard";
import Streak from "./Streak";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen w-full ">

        <main className="px-5 md:px-10 pb-24 space-y-12 max-w-6xl mx-auto">
          {/* HERO / REVISION BANNER */}
          <HeroCard />

          {/* STREAK / WEEKLY */}
          <Streak />

          {/* Flash Card */}
          <FlashCards />
        </main>
      </div>
    </>
  );
}

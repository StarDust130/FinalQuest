"use client";
import { useEffect } from "react";
import HeroCard from "./HeroCard";
import Streak from "./Streak";

export default function HomePage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      throw new Error("Simulated error after 5 seconds");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="min-h-screen w-full ">
        <main className="px-5 md:px-10 pb-24 space-y-12 max-w-6xl mx-auto">
          {/* HERO / REVISION BANNER */}
          <HeroCard />

          {/* STREAK / WEEKLY */}
          <Streak />
        </main>
      </div>
    </>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Course = {
  id: string;
  title: string;
  rating: number;
  duration: string;
  price: number;
  oldPrice?: number;
  sale?: string;
  cover: string;
  fallback: string;
  theme: string;
};

const courses: Course[] = [
  {
    id: "eng-it",
    title: "English for IT Specialists",
    rating: 4.6,
    duration: "8-12 mo",
    price: 100,
    oldPrice: 250,
    sale: "50% OFF",
    cover: "https://images.opendoodles.com/z-U_V3hA-yI.png",
    fallback: "https://placehold.co/300x200/C4B5FD/1e1e1e?text=Learn",
    theme: "from-violet-500/70 via-fuchsia-500/60 to-indigo-500/50",
  },
  {
    id: "study-sprint",
    title: "Deep Work Sprint",
    rating: 4.9,
    duration: "4 wks",
    price: 59,
    oldPrice: 89,
    sale: "NEW",
    cover: "https://images.opendoodles.com/1yP2G-z8G.png",
    fallback: "https://placehold.co/300x200/FECACA/1e1e1e?text=Focus",
    theme: "from-rose-500/70 via-orange-500/60 to-amber-500/50",
  },
];

const targetDate = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 22 * 60 * 60 * 1000 + 39 * 60 * 1000);

export default function App() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTime({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[radial-gradient(circle_at_20%_20%,#1e1b4b,#0f0f17_60%)] text-white selection:bg-fuchsia-500/60 selection:text-white">
      <div className="w-[390px] h-[844px] relative rounded-[40px] border border-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_60px_-10px_rgba(0,0,0,0.6),0_2px_4px_-1px_rgba(255,255,255,0.1)] overflow-hidden backdrop-blur-xl bg-white/[0.02]">
        <GradientFX />
        <div className="flex flex-col h-full">
          <Header />
          <main className="flex-1 overflow-y-auto px-5 pb-6 space-y-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            <CountdownCard time={time} />
            <section className="space-y-6">
              {courses.map((c) => (
                <CourseCard key={c.id} c={c} />
              ))}
            </section>
          </main>
          <NavBar />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="pt-8 pb-5 px-5 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-widest text-white/50 font-medium">Welcome back</p>
        <h1 className="mt-1 text-3xl font-extrabold leading-none">
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_1px_8px_rgba(168,85,247,0.35)]">
            Hello, Lay 👋
          </span>
        </h1>
      </div>
      <button
        aria-label="Profile"
        className="relative group"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-indigo-500 opacity-60 blur-sm group-hover:opacity-90 transition" />
        <Image
          src="https://placehold.co/80x80/6366F1/FFFFFF?text=L"
          alt="User avatar"
          width={48}
          height={48}
          className="relative w-12 h-12 rounded-full ring-2 ring-white/20 object-cover" />
      </button>
    </header>
  );
}

function CountdownCard({ time }: { time: { d: number; h: number; m: number; s: number } }) {
  const items = [
    { label: "Days", value: time.d },
    { label: "Hours", value: time.h },
    { label: "Min", value: time.m },
    { label: "Sec", value: time.s },
  ];
  return (
    <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-emerald-400/20 via-teal-400/10 to-cyan-400/10 border border-emerald-400/30 backdrop-blur-md shadow-[0_8px_30px_-10px_rgba(16,185,129,0.35)]">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl" />
      <div className="flex items-center justify-between relative">
        <div>
          <p className="text-sm font-medium tracking-wide text-emerald-200">Exam Countdown</p>
          <h2 className="mt-1 text-xl font-bold text-emerald-50">Ready to crush it?</h2>
        </div>
        <Sparkle />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {items.map((i) => (
          <div
            key={i.label}
            className="group flex flex-col items-center rounded-xl bg-white/5 border border-white/10 py-2 backdrop-blur-sm hover:border-emerald-300/50 transition"
          >
            <span className="font-bold text-lg tabular-nums tracking-tight">
              {String(i.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-200/70">
              {i.label}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-5 w-full relative group rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-3 text-sm font-semibold tracking-wide">
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] animate-[shimmer_1.5s_linear_infinite]" />
        Start Focus Session
      </button>
    </div>
  );
}

function CourseCard({ c }: { c: Course }) {
  return (
    <article
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md hover:border-white/30 transition shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]"
    >
      <div className="relative h-40 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${c.theme} opacity-60`}></div>
        <Image
          src={c.cover}
          alt={c.title}
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-contain p-4 scale-95 group-hover:scale-100 transition duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = c.fallback;
          }}
        />
        {c.sale && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-black/70 backdrop-blur border border-white/20 tracking-wider">
              {c.sale}
            </span>
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex gap-1">
          <PulseDot color="bg-fuchsia-400" />
          <PulseDot color="bg-indigo-400" />
          <PulseDot color="bg-sky-400" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-[15px] leading-tight line-clamp-2">
              {c.title}
            </h3>
            <p className="mt-1 text-[11px] text-white/60 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="flex items-center gap-1 text-amber-300">
                ⭐ {c.rating}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{c.duration}</span>
            </p>
          </div>
          <button
            aria-label="Preview course"
            className="relative w-11 h-11 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-violet-500 text-white shadow-lg shadow-fuchsia-500/30 hover:scale-105 active:scale-95 transition"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="drop-shadow"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            {c.oldPrice && (
              <span className="text-xs line-through text-white/40">${c.oldPrice}</span>
            )}
            <span className="text-lg font-bold">${c.price}</span>
          </div>
          <button className="group/cart relative overflow-hidden text-xs font-medium px-4 py-2 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/15 transition">
            <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/20 to-fuchsia-500/0 opacity-0 group-hover/cart:opacity-100 transition" />
            Add
          </button>
        </div>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
      </div>
    </article>
  );
}

function NavBar() {
  const items = [
    { id: "home", label: "Home", icon: HomeIcon, active: true },
    { id: "focus", label: "Focus", icon: BoltIcon },
    { id: "courses", label: "Courses", icon: BookIcon },
    { id: "profile", label: "You", icon: UserIcon },
  ];
  return (
    <nav className="relative z-10 px-5 pb-5 pt-3">
      <div className="flex justify-around bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 p-2">
        {items.map((i) => {
          const Icon = i.icon;
            return (
              <button
                key={i.id}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
                  i.active
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {i.active && (
                  <span className="absolute inset-0 -z-10 bg-gradient-to-tr from-fuchsia-500/40 to-violet-500/30 rounded-xl blur-sm" />
                )}
                <Icon
                  className={`w-5 h-5 ${
                    i.active ? "drop-shadow-[0_0_6px_rgba(217,70,239,0.8)]" : ""
                  }`}
                />
                <span className="text-[10px] font-medium tracking-wide">{i.label}</span>
              </button>
            );
        })}
      </div>
    </nav>
  );
}

/* Visual micro components */
function Sparkle() {
  return (
    <div className="relative">
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 flex items-center justify-center text-emerald-950 font-bold text-xs shadow-lg shadow-emerald-500/30 animate-pulse">
        GO
      </div>
    </div>
  );
}

function PulseDot({ color }: { color: string }) {
  return (
    <span
      className={`relative w-2 h-2 rounded-full ${color} after:content-[''] after:absolute after:inset-0 after:rounded-full after:animate-ping after:${color}/40`}
    />
  );
}

const baseIcon =
  "stroke-current stroke-[1.6] fill-none";

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`${baseIcon} ${className}`} viewBox="0 0 24 24">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}
function BoltIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`${baseIcon} ${className}`} viewBox="0 0 24 24">
      <path d="M13 2 3 14h8l-1 8 10-12h-8z" />
    </svg>
  );
}
function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`${baseIcon} ${className}`} viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
    </svg>
  );
}
function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`${baseIcon} ${className}`} viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22c1.5-4 5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

function GradientFX() {
  return (
    <>
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 bg-fuchsia-500/25 rounded-full mix-blend-screen blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 bg-indigo-500/30 rounded-full mix-blend-screen blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
    </>
  );
}
/* Tailwind extra (add to globals if not present):
@keyframes shimmer { 0% {transform:translateX(-100%)} 100% {transform:translateX(100%)} }
*/


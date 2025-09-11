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
    fallback: "https://placehold.co/300x200/3B82F6/FFFFFF?text=Learn",
    theme: "from-blue-500/30 via-indigo-500/20 to-slate-500/10",
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
    fallback: "https://placehold.co/300x200/6366F1/FFFFFF?text=Focus",
    theme: "from-indigo-500/30 via-purple-500/20 to-slate-500/10",
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white selection:bg-blue-500/30 selection:text-white">
      <div className="w-[390px] h-[844px] relative rounded-[40px] border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_40px_-10px_rgba(0,0,0,0.4)] overflow-hidden backdrop-blur-xl bg-white/[0.03]">
        <div className="flex flex-col h-full">
          <Header />
          <main className="flex-1 overflow-y-auto px-5 pb-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            <CountdownCard time={time} />
            <section className="space-y-5">
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
        <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">Welcome back</p>
        <h1 className="mt-1 text-3xl font-bold leading-none">
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
            Hello, Lay 👋
          </span>
        </h1>
      </div>
      <button
        aria-label="Profile"
        className="relative group"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-80 blur-sm group-hover:opacity-100 transition-opacity duration-200" />
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
    <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-slate-500/5 border border-blue-500/20 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between relative">
        <div>
          <p className="text-sm font-medium tracking-wide text-blue-200/80">Exam Countdown ⏰</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Ready to excel?</h2>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">
          🎯
        </div>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-3">
        {items.map((i) => (
          <div
            key={i.label}
            className="flex flex-col items-center rounded-xl bg-white/8 border border-white/10 py-3 backdrop-blur-sm hover:border-blue-400/30 transition-colors duration-200"
          >
            <span className="font-bold text-lg tabular-nums tracking-tight text-white">
              {String(i.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-300">
              {i.label}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-5 w-full relative group rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-semibold tracking-wide text-white hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
        Start Focus Session 🚀
      </button>
    </div>
  );
}

function CourseCard({ c }: { c: Course }) {
  return (
    <article
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.06] backdrop-blur-md hover:border-white/20 transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <div className="relative h-36 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${c.theme} opacity-40`}></div>
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
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-black/80 backdrop-blur border border-white/20 tracking-wider text-white">
              {c.sale}
            </span>
          </div>
        )}
        <div className="absolute bottom-2 right-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-[15px] leading-tight line-clamp-2 text-white">
              {c.title}
            </h3>
            <p className="mt-1 text-[11px] text-slate-300 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="flex items-center gap-1 text-yellow-400">
                ⭐ {c.rating}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>{c.duration}</span>
            </p>
          </div>
          <button
            aria-label="Preview course"
            className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <svg
              width="16"
              height="16"
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
              <span className="text-xs line-through text-slate-400">${c.oldPrice}</span>
            )}
            <span className="text-lg font-bold text-white">${c.price}</span>
          </div>
          <button className="group/cart relative overflow-hidden text-xs font-medium px-4 py-2 rounded-xl border border-white/15 bg-white/[0.08] hover:bg-white/15 transition-colors duration-200 text-white">
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </article>
  );
}

function NavBar() {
  const items = [
    { id: "home", label: "Home", icon: HomeIcon, active: true, emoji: "🏠" },
    { id: "focus", label: "Focus", icon: BoltIcon, emoji: "⚡" },
    { id: "courses", label: "Courses", icon: BookIcon, emoji: "📚" },
    { id: "profile", label: "You", icon: UserIcon, emoji: "👤" },
  ];
  return (
    <nav className="relative z-10 px-5 pb-5 pt-3">
      <div className="flex justify-around bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/10 p-2 shadow-lg">
        {items.map((i) => {
          const Icon = i.icon;
            return (
              <button
                key={i.id}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                  i.active
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {i.active && (
                  <span className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-500/30 to-indigo-500/20 rounded-xl" />
                )}
                <Icon
                  className={`w-5 h-5 ${
                    i.active ? "drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]" : ""
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

/* Visual micro components - removed excessive animations for cleaner look */

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

/* Clean icons with consistent styling */
/* Tailwind extra (add to globals if not present):
@keyframes shimmer { 0% {transform:translateX(-100%)} 100% {transform:translateX(100%)} }
*/


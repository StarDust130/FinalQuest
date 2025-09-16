"use client";
import { Play } from "lucide-react";
import cn from "classnames";

interface HeroCardProps {
  onStart?: () => void;
  className?: string;
}

const features: { emoji: string; title: string; note: string }[] = [
  { emoji: "⚡", title: "Turbo Recall", note: "Answer faster" },
  { emoji: "🧠", title: "Memory Lock", note: "Long-term retention" },
  { emoji: "🧩", title: "Concept Snap", note: "Clarity > cramming" },
  { emoji: "🔥", title: "Streak Energy", note: "Momentum + focus" },
];

const HeroCard = ({ onStart, className }: HeroCardProps) => {
  return (
    <div
      role="region"
      aria-label="Sprint learning card"
      className={cn(
        "group relative w-full mt-5 font-sans select-none",
        "bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
        "rounded-2xl border-[5px] border-neutral-900 dark:border-black",
        "shadow-[12px_12px_0_0_#000] md:shadow-[14px_14px_0_0_#000]",
        "transition-all duration-500",
        "hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[18px_18px_0_0_#000]",
        "active:translate-x-0 active:translate-y-0 active:shadow-[8px_8px_0_0_#000]",
        "overflow-hidden backdrop-blur supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-neutral-900/95",
        className
      )}
    >
      {/* subtle gradient glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_18%_22%,#6366f155,transparent_60%),radial-gradient(circle_at_82%_78%,#ff3e0055,transparent_55%)] dark:bg-[radial-gradient(circle_at_18%_22%,#5d5dff55,transparent_60%),radial-gradient(circle_at_82%_78%,#ff3e0055,transparent_55%)]" />
      </div>

      {/* corner accent + star */}
      <div className="absolute -top-5 -right-5 w-20 h-20 rotate-45 bg-gradient-to-br from-teal-400 to-teal-600 shadow-[0_0_0_3px_#000] z-10" />
      <div className="absolute top-3 right-3 z-20 text-black font-extrabold text-xl drop-shadow">
        ★
      </div>

      {/* soft grid */}
      <div className="absolute inset-0 opacity-40 md:opacity-50 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none transition-opacity duration-700 group-hover:opacity-70" />

      {/* dot overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 bg-[radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:18px_18px]" />

      {/* faint noise */}
      <div className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none [background-image:repeating-radial-gradient(circle_at_0_0,rgba(0,0,0,0.15)_0,rgba(0,0,0,0.15)_1px,transparent_1px,transparent_3px)] dark:[background-image:repeating-radial-gradient(circle_at_0_0,rgba(255,255,255,0.25)_0,rgba(255,255,255,0.25)_1px,transparent_1px,transparent_3px)]" />

      {/* SVG frame pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-15 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            strokeDasharray="15 10"
            strokeWidth="10"
            stroke="black"
            className="dark:stroke-black stroke-neutral-900"
            fill="none"
            d="M0,0 L100,0 L100,100 L0,100 Z"
          />
        </svg>
      </div>

      {/* header */}
      <div className="relative z-20 flex items-center justify-between px-6 py-5 bg-gradient-to-r from-pink-500 via-brown-400 to-blue-400 text-black font-extrabold text-[1.05rem] md:text-[1.15rem] tracking-wide uppercase border-b-[5px] border-neutral-900 dark:border-black">
        <span className="relative pr-2">
          Sprint Recall
          <span className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.25)_0,rgba(0,0,0,0.25)_10px,transparent_10px,transparent_20px)] mix-blend-multiply" />
        </span>
        <span className="bg-black text-white text-[0.55rem] md:text-[0.6rem] font-extrabold px-3 py-1 rounded-md border-[3px] border-black shadow-[4px_4px_0_0_#000] rotate-2 group-hover:-rotate-3 group-hover:scale-110 transition">
          premium
        </span>
      </div>

      {/* body */}
      <div className="relative z-20 px-6 pt-6 pb-6 md:pb-7">
        {/* floating sticker */}
        <div className="absolute -top-5 left-6 rotate-[-8deg] bg-indigo-500 text-white text-[0.6rem] font-bold px-3 py-1 rounded-md border-2 border-black shadow-[4px_4px_0_0_#000] flex gap-1 items-center">
          <span>🚀</span> fast focus
        </div>

        <p className="text-sm md:text-[0.9rem] font-medium text-neutral-700 dark:text-neutral-200 leading-relaxed mb-6 max-w-prose">
          Micro-speed drills that forge sharp recall and crystal concept
          clarity. Adaptive spacing locks knowledge in. Streak energy builds
          habit. Fast input. Durable memory. Zero fluff.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-2 group/feat cursor-default"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg dark:bg-sky-600 bg-sky-500 border-[3px] border-neutral-900 dark:border-black shadow-[5px_5px_0_0_#000] text-lg transition-transform group-hover/feat:-rotate-6 group-hover/feat:scale-110 text-white font-bold">
                {f.emoji}
              </div>
              <div className="leading-tight">
                <p className="text-[0.72rem] md:text-[0.75rem] font-extrabold tracking-wide">
                  {f.title}
                </p>
                <p className="text-[0.6rem] md:text-[0.65rem] font-medium text-neutral-500 dark:text-neutral-400">
                  {f.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* pricing + action */}
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-7 sm:gap-0 justify-between pt-6 mt-2 border-t-2 border-dashed border-neutral-300 dark:border-white/15 cursor-pointer md:justify-center ">
          <button
            type="button"
            aria-label="Start sprint"
            onClick={() => onStart?.()}
            className={cn(
              "relative inline-flex items-center justify-center gap-1",
              "dark:bg-sky-600 bg-sky-500 hover:bg-indigo-600 dark:hover:bg-[#5e70ff] text-white font-extrabold text-xs md:text-sm",
              "px-7 py-3 rounded-lg border-[4px] border-neutral-900 dark:border-black tracking-wider uppercase",
              "shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000]",
              "active:translate-x-1 active:translate-y-1 active:shadow-[3px_3px_0_0_#000]",
              "transition-all overflow-hidden group/button cursor-pointer"
            )}
          >
            <span className="absolute inset-0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-700 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />
            <Play className="w-4 h-4" />
            <span className="relative">Start Now</span>
          </button>
        </div>
      </div>

      {/* decorative dots */}
      <div className="absolute -left-10 bottom-20 w-40 opacity-20 md:opacity-30 -rotate-6 pointer-events-none">
        <svg
          viewBox="0 0 80 40"
          className="w-full h-full fill-neutral-700 dark:fill-white"
        >
          <circle r="3" cy="10" cx="10" />
          <circle r="3" cy="10" cx="30" />
          <circle r="3" cy="10" cx="50" />
          <circle r="3" cy="10" cx="70" />
          <circle r="3" cy="20" cx="20" />
          <circle r="3" cy="20" cx="40" />
          <circle r="3" cy="20" cx="60" />
          <circle r="3" cy="30" cx="10" />
          <circle r="3" cy="30" cx="30" />
          <circle r="3" cy="30" cx="50" />
          <circle r="3" cy="30" cx="70" />
        </svg>
      </div>

      {/* accent rotated square */}
      <div className="absolute -bottom-6 right-10 w-12 h-12 bg-indigo-500 dark:bg-[#4d61ff] border-[3px] border-neutral-900 dark:border-black rounded-md rotate-45 transition group-hover:rotate-[55deg] group-hover:scale-110 shadow-[0_0_0_3px_#000]" />

      {/* stamp */}
      <div className="absolute left-8 bottom-8 w-20 h-20 rounded-full border-2 border-neutral-300 dark:border-white/25 flex items-center justify-center rotate-[-15deg] opacity-30">
        <span className="text-[0.55rem] font-extrabold uppercase tracking-wider">
          approved
        </span>
      </div>

      {/* corner slice */}
      <div className="absolute left-0 bottom-0 w-7 h-7 bg-white dark:bg-neutral-900 border-r-[4px] border-t-[4px] border-neutral-900 dark:border-black rounded-tr-xl" />
    </div>
  );
};

export default HeroCard;

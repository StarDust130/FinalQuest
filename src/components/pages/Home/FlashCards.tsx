"use client";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Search,
  BookOpen,
  Brain,
  TrendingUp,
  Zap,
  Sparkles,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Deck = {
  id: string;
  title: string;
  icon: any;
  progress: number;
  updated: string;
  cards: number;
  description: string;
  keyPoints: string[];
  tone: "amber" | "pink" | "lime" | "sky" | "emerald" | "violet";
  emoji: string;
};

const palettes: Record<
  Deck["tone"],
  {
    bg: string;
    border: string;
    accentBg: string;
    accentText: string;
    progress: string;
    progressTrack: string;
  }
> = {
  amber: {
    bg: "bg-amber-200 dark:bg-amber-900",
    border: "border-amber-700 dark:border-amber-400",
    accentBg: "bg-amber-500 dark:bg-amber-400",
    accentText: "text-amber-900 dark:text-amber-900",
    progress: "bg-amber-500 dark:bg-amber-400",
    progressTrack: "bg-amber-100 dark:bg-amber-800"
  },
  pink: {
    bg: "bg-pink-200 dark:bg-pink-900",
    border: "border-pink-700 dark:border-pink-400",
    accentBg: "bg-pink-500 dark:bg-pink-400",
    accentText: "text-pink-900 dark:text-pink-900",
    progress: "bg-pink-500 dark:bg-pink-400",
    progressTrack: "bg-pink-100 dark:bg-pink-800"
  },
  lime: {
    bg: "bg-lime-200 dark:bg-lime-900",
    border: "border-lime-700 dark:border-lime-400",
    accentBg: "bg-lime-500 dark:bg-lime-400",
    accentText: "text-lime-900 dark:text-lime-900",
    progress: "bg-lime-500 dark:bg-lime-400",
    progressTrack: "bg-lime-100 dark:bg-lime-800"
  },
  sky: {
    bg: "bg-sky-200 dark:bg-sky-900",
    border: "border-sky-700 dark:border-sky-400",
    accentBg: "bg-sky-500 dark:bg-sky-400",
    accentText: "text-sky-900 dark:text-sky-900",
    progress: "bg-sky-500 dark:bg-sky-400",
    progressTrack: "bg-sky-100 dark:bg-sky-800"
  },
  emerald: {
    bg: "bg-emerald-200 dark:bg-emerald-900",
    border: "border-emerald-700 dark:border-emerald-400",
    accentBg: "bg-emerald-500 dark:bg-emerald-400",
    accentText: "text-emerald-900 dark:text-emerald-900",
    progress: "bg-emerald-500 dark:bg-emerald-400",
    progressTrack: "bg-emerald-100 dark:bg-emerald-800"
  },
  violet: {
    bg: "bg-violet-200 dark:bg-violet-900",
    border: "border-violet-700 dark:border-violet-400",
    accentBg: "bg-violet-500 dark:bg-violet-400",
    accentText: "text-violet-900 dark:text-violet-900",
    progress: "bg-violet-500 dark:bg-violet-400",
    progressTrack: "bg-violet-100 dark:bg-violet-800"
  }
};

const allDecks: Deck[] = [
  {
    id: "history",
    title: "History",
    icon: BookOpen,
    progress: 62,
    updated: "2d",
    cards: 145,
    tone: "amber",
    emoji: "🏛️",
    description:
      "Key timelines, empires, movements, and landmark events for quick chronological recall.",
    keyPoints: ["Ancient to Modern flow", "Important dates anchors", "Cause-effect chains"]
  },
  {
    id: "polity",
    title: "Polity",
    icon: Brain,
    progress: 34,
    updated: "5h",
    cards: 102,
    tone: "pink",
    emoji: "⚖️",
    description: "Constitution articles, bodies, powers, amendments, governance concepts.",
    keyPoints: ["Articles clusters", "Amendment patterns", "Institution roles"]
  },
  {
    id: "economy",
    title: "Economy",
    icon: TrendingUp,
    progress: 12,
    updated: "1d",
    cards: 88,
    tone: "lime",
    emoji: "💹",
    description: "Macro indicators, policy terms, schemes, fiscal & monetary distinctions.",
    keyPoints: ["Growth vs inflation", "Policy tools", "Key definitions"]
  },
  {
    id: "science",
    title: "Science",
    icon: Zap,
    progress: 78,
    updated: "3d",
    cards: 167,
    tone: "sky",
    emoji: "🔬",
    description: "Physics basics, bio processes, chemistry reactions, space & tech facts.",
    keyPoints: ["Process cycles", "Laws & units", "Applied innovations"]
  },
  {
    id: "env",
    title: "Environment",
    icon: Zap,
    progress: 5,
    updated: "8h",
    cards: 64,
    tone: "emerald",
    emoji: "🌱",
    description: "Climate treaties, biomes, conservation statuses, pollution control basics.",
    keyPoints: ["Treaty chronology", "IUCN tags", "Mitigation tools"]
  },
  {
    id: "culture",
    title: "Art & Culture",
    icon: Sparkles,
    progress: 91,
    updated: "6d",
    cards: 54,
    tone: "violet",
    emoji: "🎭",
    description: "Architecture styles, performing arts, literature eras, heritage sites.",
    keyPoints: ["Era → form mapping", "Regional signatures", "UNESCO list cues"]
  }
];

const statusOf = (p: number) =>
  p === 0 ? "Not Started" : p < 60 ? "In Progress" : p < 90 ? "Advanced" : "Mastered";

const statusFilters = ["All", "Not Started", "In Progress", "Advanced", "Mastered"];

const FlashCards = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const decks = useMemo(
    () =>
      allDecks.filter((d) => {
        const q = query.toLowerCase();
        const matchesText =
          d.title.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q);
        const matchesStatus = status === "All" || statusOf(d.progress) === status;
        return matchesText && matchesStatus;
      }),
    [query, status]
  );

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-md bg-black text-white dark:bg-white dark:text-black border-2 border-neutral-900 dark:border-neutral-100 shadow-[4px_4px_0_0_#553cff] dark:shadow-[4px_4px_0_0_#7c5bff]">
              Rapid Recall
            </span>
            <span className="font-extrabold text-neutral-900 dark:text-neutral-100">
              Topic Cards
            </span>
          </h2>
          <p className="text-[11px] mt-1 font-semibold tracking-wider text-neutral-600 dark:text-neutral-400">
            Tap a block → expand facts
          </p>
        </div>

        <div className="w-full sm:w-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-700 dark:text-neutral-300" />
            <input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 h-11 text-sm font-semibold rounded-xl border-2 border-neutral-900 dark:border-neutral-200 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 shadow-[4px_4px_0_0_#111] dark:shadow-[4px_4px_0_0_#ffffff20] focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
          </div>
          <Button
            onClick={() => {
              setQuery("");
              setStatus("All");
            }}
            variant="ghost"
            className="h-11 px-4 rounded-xl border-2 border-neutral-900 dark:border-neutral-200 bg-neutral-200 dark:bg-neutral-800 text-xs font-extrabold shadow-[4px_4px_0_0_#111] dark:shadow-[4px_4px_0_0_#ffffff20] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#111]"
          >
            Reset
          </Button>
        </div>
      </header>

      <div className="flex gap-2 flex-wrap">
        {statusFilters.map((f) => {
          const active = status === f;
            return (
              <button
                key={f}
                onClick={() => setStatus(f)}
                className={`px-4 py-2 text-[11px] font-black rounded-lg border-2 transition
                  ${
                    active
                      ? "bg-yellow-300 border-neutral-900 text-neutral-900 shadow-[4px_4px_0_0_#111]"
                      : "bg-white dark:bg-neutral-900 border-neutral-900 dark:border-neutral-200 text-neutral-800 dark:text-neutral-200 shadow-[4px_4px_0_0_#111] dark:shadow-[4px_4px_0_0_#ffffff20]"
                  } hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0_0_#111] dark:hover:shadow-[6px_6px_0_0_#ffffff40]`}
              >
                {f}
              </button>
            );
        })}
      </div>

      <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {decks.map((deck) => {
          const Icon = deck.icon;
          const deckStatus = statusOf(deck.progress);
          const open = expanded === deck.id;
          const p = palettes[deck.tone];
          return (
            <div
              key={deck.id}
              className={`relative group rounded-2xl border-2 ${p.border} ${p.bg} p-0 shadow-[6px_6px_0_0_#111] dark:shadow-[6px_6px_0_0_#ffffff25] transition will-change-transform
              hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#111] dark:hover:shadow-[10px_10px_0_0_#ffffff30]`}
            >
              <button
                onClick={() => setExpanded((cur) => (cur === deck.id ? null : deck.id))}
                className="w-full text-left p-5 flex flex-col gap-4 focus:outline-none"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 items-start">
                    <div className={`h-14 w-14 flex flex-col items-center justify-center rounded-xl bg-white/70 dark:bg-neutral-950 border-2 ${p.border} text-neutral-900 dark:text-neutral-100 font-bold`}>
                      <Icon className="h-6 w-6" />
                      <span className="text-sm leading-none">{deck.emoji}</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-base leading-snug text-neutral-900 dark:text-neutral-50 tracking-tight">
                        {deck.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-300">
                        {deck.cards} cards • {deck.updated} ago
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-1 rounded-md ${p.accentBg} ${p.accentText} border-2 border-neutral-900 shadow-[2px_2px_0_0_#111]`}
                  >
                    {deckStatus}
                  </span>
                </div>

                <p className="text-[12px] leading-snug font-medium text-neutral-900/90 dark:text-neutral-200 line-clamp-4">
                  {deck.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-black tracking-wide text-neutral-800 dark:text-neutral-300">
                    <span>PROGRESS</span>
                    <span>{deck.progress}%</span>
                  </div>
                  <div
                    className={`h-3 w-full rounded-md border-2 ${p.border} ${p.progressTrack} overflow-hidden relative`}
                    role="progressbar"
                    aria-valuenow={deck.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={`h-full ${p.progress} transition-all`}
                      style={{
                        width: `${deck.progress}%`,
                        backgroundImage:
                          "repeating-linear-gradient(45deg,rgba(0,0,0,0.15)_0_6px,transparent_6px_12px)"
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-black text-neutral-900 dark:text-neutral-100 pt-1">
                  <span className="flex items-center gap-1">
                    {open ? "Hide facts" : "Quick facts"}
                    <ArrowRight
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-90" : "group-hover:translate-x-1"
                      }`}
                    />
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-400">
                    {open ? "Collapse" : "Expand"}
                  </span>
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  open
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden px-5 pb-5">
                  <div className="rounded-xl border-2 border-neutral-900 dark:border-neutral-200 bg-white dark:bg-neutral-950 p-4 space-y-3 shadow-[4px_4px_0_0_#111] dark:shadow-[4px_4px_0_0_#ffffff20]">
                    <div className="flex items-center gap-2 text-[11px] font-black tracking-wide text-neutral-800 dark:text-neutral-200">
                      <Info className="h-4 w-4" />
                      KEY POINTS
                    </div>
                    <ul className="space-y-1.5">
                      {deck.keyPoints.map((k) => (
                        <li
                          key={k}
                          className="text-[12px] leading-snug text-neutral-900 dark:text-neutral-200 flex gap-2 font-medium"
                        >
                          <span className={`mt-1 h-2 w-2 rounded-sm ${p.progress} border-2 border-neutral-900`} />
                          <span>{k}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2">
                      <button
                        onClick={() => console.log("start study", deck.id)}
                        className="w-full flex items-center justify-center gap-2 text-[12px] font-black px-4 py-2 rounded-lg bg-fuchsia-400 dark:bg-fuchsia-500 border-2 border-neutral-900 text-neutral-900 shadow-[4px_4px_0_0_#111] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0_0_#111] transition active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_0_#111]"
                      >
                        Start Rapid Recall
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition mix-blend-multiply dark:mix-blend-screen">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.6),transparent_55%)] dark:bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.08),transparent_60%)]" />
              </div>
            </div>
          );
        })}
      </div>

      {decks.length === 0 && (
        <div className="p-8 rounded-2xl border-2 border-neutral-900 dark:border-neutral-200 bg-yellow-200 dark:bg-neutral-900 shadow-[6px_6px_0_0_#111] text-center">
          <p className="font-extrabold text-sm text-neutral-900 dark:text-neutral-200">
            No matches. Tweak filters.
          </p>
        </div>
      )}
    </section>
  );
};

export default FlashCards;
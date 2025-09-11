import { ArrowRight, Flame, Timer, Sparkles, BookOpen, Brain, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Data
const streakDays = ["M","T","W","T","F","S","S"].map((d,i)=>({
  label:d,
  done: i < 3
}))

const decks = [
  { title: "History", icon: BookOpen, progress: 62, updated: "2d ago" },
  { title: "Polity", icon: Brain, progress: 34, updated: "5h ago" },
  { title: "Economy", icon: TrendingUp, progress: 12, updated: "1d ago" },
  { title: "Science", icon: Zap, progress: 78, updated: "3d ago" },
]

export default function Page() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-neutral-100 selection:bg-indigo-500/40">
        {/* HEADER */}
        <header className="px-5 md:px-10 py-5 flex items-center justify-between backdrop-blur supports-[backdrop-filter]:bg-white/0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-indigo-500/30">
            FQ
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-sm">Final Quest</span>
            <span className="text-[11px] text-neutral-400">Micro Revision Engine</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="group relative flex items-center gap-1.5 rounded-full border border-neutral-800/70 bg-neutral-900/60 px-3 py-1.5 text-xs font-medium text-amber-400 shadow-inner shadow-black/40">
            <Flame className="h-4 w-4 drop-shadow" />
            <span className="font-semibold tabular-nums tracking-wide">3</span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500 opacity-0 group-hover:opacity-100 transition">streak</span>
          </div>
          <Button
            variant="ghost"
            className="hidden sm:inline-flex h-9 rounded-full border border-neutral-800 bg-neutral-900/60 px-4 text-xs font-medium hover:bg-neutral-800/90"
          >
            Dashboard
          </Button>
          <Avatar className="h-11 w-11 ring-1 ring-neutral-700/60 shadow-lg shadow-black/40">
            <AvatarImage src="https://api.dicebear.com/7.x/thumbs/svg?seed=quest" alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="px-5 md:px-10 pb-24 space-y-12 max-w-6xl mx-auto">
        {/* HERO / REVISION BANNER */}
        <Card className="relative overflow-hidden border border-neutral-800/70 bg-neutral-950/70 backdrop-blur-xl rounded-3xl group">
          {/* FX */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_25%_20%,rgba(99,102,241,0.25),transparent_65%)]" />
            <div className="absolute inset-0 mix-blend-overlay bg-[linear-gradient(140deg,rgba(168,85,247,0.15),transparent_40%,transparent_60%,rgba(99,102,241,0.15))]" />
            <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-indigo-500/25 blur-3xl" />
            <div className="absolute -left-14 bottom-0 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute inset-0 rounded-3xl border border-white/5 [mask:linear-gradient(to_bottom,white,transparent_85%)]" />
          </div>

          <CardContent className="relative z-10 p-6 md:p-9 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

              {/* LEFT */}
              <div className="space-y-5 max-w-2xl">
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700/60 bg-neutral-800/70 px-3 py-1 text-[10px] font-medium tracking-wide text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Adaptive</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700/60 bg-neutral-800/70 px-3 py-1 text-[10px] font-medium tracking-wide text-purple-300">
              ⚡ Fast
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700/60 bg-neutral-800/70 px-3 py-1 text-[10px] font-medium tracking-wide text-amber-300">
              🔥 Streak+
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.1]">
            14m Blitz Sprint
          </h1>

          <p className="text-sm text-neutral-400 max-w-md">
            Tap in. We drop the cards you&apos;re about to forget. Lock the streak. Bounce.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-1 text-[12px]">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Timer className="h-4 w-4 text-indigo-400" />
              ~14m
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Flame className="h-4 w-4 text-amber-400" />
              +1 streak
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Zap className="h-4 w-4 text-purple-400" />
              Adaptive queue
            </div>
          </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-center md:items-end gap-5 w-full max-w-xs">
          <div className="flex items-center gap-6 w-full justify-between">

            {/* Retention Ring */}
            <div className="relative">
              <div className="h-24 w-24 rounded-full grid place-items-center relative">
                <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(var(--tw-gradient-from,#6366f1)_0deg, var(--tw-gradient-to,#a855f7)_266deg, rgba(63,63,70,0.2) 266deg)"
            }}
                />
                <div className="absolute inset-[6px] rounded-full bg-neutral-900/90 backdrop-blur" />
                <span className="relative text-lg font-semibold text-indigo-300">
            74<span className="text-xs ml-0.5 text-neutral-500">%</span>
                </span>
              </div>
            </div>

            <div className="space-y-2 text-right">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                Today
              </div>
              <div className="text-sm font-semibold text-neutral-200">
                Retention: <span className="text-indigo-300">74%</span>
              </div>
              <div className="text-[11px] text-neutral-500">
                Curve stabilizing
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="group w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-500 to-purple-500 text-white font-semibold shadow-[0_8px_32px_-8px_rgba(99,102,241,0.55)] hover:from-indigo-400 hover:via-indigo-500 hover:to-purple-500 transition relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Start Now
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.18),transparent_60%)]" />
            <span className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-indigo-400/25 blur-2xl" />
          </Button>

          <div className="flex items-center gap-3 text-[11px] text-neutral-500 w-full justify-center md:justify-end">
            <span className="flex items-center gap-1 text-indigo-300">
              • Smart pick
            </span>
            <span>• No filler</span>
            <span>• Just go</span>
          </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* STREAK / WEEKLY */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
              Weekly Flow
            </h2>
            <span className="text-[11px] text-neutral-500">
              Consistency &gt; intensity
            </span>
          </div>
          <div className="flex gap-3">
            {streakDays.map((d, idx) => {
              const active = d.done
              return (
                <div key={d.label + idx} className="flex flex-col items-center gap-1">
                  <div
                    className={[
                      "h-11 w-11 rounded-xl flex items-center justify-center text-xs font-semibold tracking-wide transition-all border",
                      active
                        ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-indigo-400/40 shadow-lg shadow-indigo-500/20"
                        : "bg-neutral-900 border-neutral-800 text-neutral-500"
                    ].join(" ")}
                  >
                    {d.label}
                  </div>
                  {active && (
                    <div className="h-1 w-5 rounded-full bg-indigo-500/70" />
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* DECKS */}
        <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
                Continue Decks
              </h2>
              <Button
                variant="ghost"
                className="h-8 px-3 text-[11px] font-medium rounded-full border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800"
              >
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {decks.map((deck) => {
                const Icon = deck.icon
                return (
                  <Card
                    key={deck.title}
                    className="group relative border border-neutral-800/70 bg-neutral-900/60 backdrop-blur-xl rounded-2xl overflow-hidden hover:border-neutral-700 transition"
                  >
                    <CardContent className="p-5 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="h-11 w-11 rounded-xl bg-neutral-800/70 flex items-center justify-center border border-neutral-700/60 text-neutral-200 group-hover:border-indigo-500/40 transition">
                          <Icon className="h-5 w-5 text-indigo-300" />
                        </div>
                        <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-neutral-800 text-neutral-400">
                          {deck.updated}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold tracking-tight text-sm">
                          {deck.title}
                        </h3>
                        <div>
                          <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                              style={{ width: `${deck.progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-1.5 text-[10px] text-neutral-500">
                            <span>Progress</span>
                            <span className="text-indigo-300 font-medium">
                              {deck.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="group/btn mt-auto justify-start px-0 h-8 text-xs font-medium text-indigo-300 hover:text-indigo-200 hover:bg-transparent"
                      >
                        Resume
                        <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
                        <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
        </section>
      </main>

      <footer className="px-5 md:px-10 pb-10 mt-4">
        <div className="text-[11px] text-neutral-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>Final Quest · Built for focused retention</span>
          <span className="text-neutral-700/80">
            v0.1 · feedback@finalquest.app
          </span>
        </div>
      </footer>
    </div>
    </>
  )
}
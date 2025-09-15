import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Flame, Sparkles, Timer, Zap } from "lucide-react";

const HeroCard = () => {
  return (
    <Card className="relative overflow-hidden border border-neutral-800/70 bg-neutral-950/70 backdrop-blur-xl rounded-3xl group mt-5">
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
              Tap in. We drop the cards you&apos;re about to forget. Lock the
              streak. Bounce.
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
                        "conic-gradient(var(--tw-gradient-from,#6366f1)_0deg, var(--tw-gradient-to,#a855f7)_266deg, rgba(63,63,70,0.2) 266deg)",
                    }}
                  />
                  <div className="absolute inset-[6px] rounded-full bg-neutral-900/90 backdrop-blur" />
                  <span className="relative text-lg font-semibold text-indigo-300">
                    74
                    <span className="text-xs ml-0.5 text-neutral-500">%</span>
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
  );
}
export default HeroCard
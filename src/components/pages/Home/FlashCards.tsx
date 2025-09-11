import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  ArrowRight,
  BookOpen,
  Brain,
  TrendingUp,
  Zap,
} from "lucide-react";
const decks = [
  { title: "History", icon: BookOpen, progress: 62, updated: "2d ago" },
  { title: "Polity", icon: Brain, progress: 34, updated: "5h ago" },
  { title: "Economy", icon: TrendingUp, progress: 12, updated: "1d ago" },
  { title: "Science", icon: Zap, progress: 78, updated: "3d ago" },
];

const FlashCards = () => {
  return (
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
          const Icon = deck.icon;
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
          );
        })}
      </div>
    </section>
  );
}
export default FlashCards
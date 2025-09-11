import { AvatarFallback, AvatarImage , Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

const Header = () => {
  return (
    <header className="px-5 md:px-10 py-5 flex items-center justify-between backdrop-blur supports-[backdrop-filter]:bg-white/0">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-indigo-500/30">
          FQ
        </div>
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight text-sm">
            Final Quest
          </span>
          <span className="text-[11px] text-neutral-400">
            Micro Revision Engine
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="group relative flex items-center gap-1.5 rounded-full border border-neutral-800/70 bg-neutral-900/60 px-3 py-1.5 text-xs font-medium text-amber-400 shadow-inner shadow-black/40">
          <Flame className="h-4 w-4 drop-shadow" />
          <span className="font-semibold tabular-nums tracking-wide">3</span>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500 opacity-0 group-hover:opacity-100 transition">
            streak
          </span>
        </div>
        <Button
          variant="ghost"
          className="hidden sm:inline-flex h-9 rounded-full border border-neutral-800 bg-neutral-900/60 px-4 text-xs font-medium hover:bg-neutral-800/90"
        >
          Dashboard
        </Button>
        <Avatar className="h-11 w-11 ring-1 ring-neutral-700/60 shadow-lg shadow-black/40">
          <AvatarImage
            src="/av-2.jpg"
            alt="User avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
export default Header
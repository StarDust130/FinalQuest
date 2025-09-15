import React from "react";

// Example data
const streakDays = ["M", "T", "W", "T", "F", "S", "S"].map((d, i) => ({
  label: d,
  done: i < 3,
}));

const colors = [
  "bg-pink-300",
  "bg-amber-300",
  "bg-lime-300",
  "bg-cyan-300",
  "bg-violet-300",
  "bg-rose-300",
  "bg-emerald-300",
];

const Streak: React.FC = () => {
  const doneCount = streakDays.filter((d) => d.done).length;
  const total = streakDays.length;
  const percent = Math.round((doneCount / total) * 100);
  const daysLeft = total - doneCount;

  // Extra (placeholder) meta values
  const longestStreak = 12; // could be replaced with real data later
  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "short",
  });

  return (
    <section id="streak" className="w-full max-w-full ">
      {/* New top meta bar (outside card) */}
      <div
        className="
          mb-3 mt-5 sm:mb-4 flex flex-wrap items-center justify-between gap-2
        "
      >
        <div className="flex items-center gap-2 ">
          <h1
            className="
              text-sm sm:text-base font-black tracking-tight
              flex items-center gap-1
            "
          >
            Weekly Streak
            <span className="text-lg sm:text-xl leading-none">🔥</span>
          </h1>
          <div
            className="
              px-2 py-1 rounded-lg border-2 border-black dark:border-neutral-700
              bg-yellow-300 dark:bg-yellow-400 text-[10px] sm:text-xs font-bold
              shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#222]
            "
          >
            {todayLabel}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="
              px-2 py-1 rounded-lg border-2 border-black dark:border-neutral-700
              bg-white dark:bg-neutral-900 text-[10px] sm:text-xs font-semibold
              shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#222]
            "
          >
            Max 🔥 {longestStreak}
          </div>
          <div
            className="
              px-2 py-1 rounded-lg border-2 border-black dark:border-neutral-700
              bg-emerald-300 dark:bg-emerald-400 text-[10px] sm:text-xs font-black
              shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#222]
            "
          >
            ⚡ {percent}%
          </div>
        </div>
      </div>

      <section
        className="
        rounded-2xl sm:rounded-3xl
        border-3 sm:border-4 border-black dark:border-neutral-800
        bg-neutral-50 dark:bg-neutral-900
        p-3 sm:p-5 space-y-4 sm:space-y-5
        shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#222]
        sm:shadow-[6px_6px_0_0_#000] sm:dark:shadow-[6px_6px_0_0_#222]
        transition-all
        max-w-full
      "
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <h2 className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.15em] text-black dark:text-white">
              Weekly Flow
            </h2>
            <p className="text-[10px] sm:text-[11px] font-medium text-neutral-600 dark:text-neutral-400 leading-none">
              Consistency &gt; intensity
            </p>
          </div>
          <div
            className="
            hidden xs:flex items-center gap-1 px-2 py-1 rounded-md
            border-2 border-black dark:border-neutral-700
            bg-white dark:bg-neutral-800 text-[9px] sm:text-[10px] font-semibold
            shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#222]
          "
          >
            <span className="text-[11px] sm:text-xs">🔥</span>
            <span>Streak</span>
          </div>
        </div>

        <div className="flex justify-between gap-1.5 sm:gap-2">
          {streakDays.map((d, idx) => {
            const active = d.done;
            const today =
              idx === new Date().getDay() - 1 ||
              (new Date().getDay() === 0 && idx === 6);
            // unify floating label (fix overlapping)
            let tag: string | null = null;
            if (today && active) tag = "TODAY";
            else if (today) tag = "NOW";
            else if (active) tag = "DONE";

            const baseColor = colors[idx % colors.length];
            return (
              <button
                key={d.label + idx}
                aria-pressed={active}
                aria-label={`${d.label} ${active ? "completed" : "pending"}`}
                className={[
                  "relative group flex flex-col items-center justify-between shrink-0",
                  "w-10 h-14 sm:w-12 sm:h-16",
                  "rounded-xl sm:rounded-2xl",
                  "border-3 sm:border-4 border-black dark:border-neutral-700",
                  "transition-all duration-200 touch-manipulation",
                  "shadow-[3px_3px_0_0_#000] dark:shadow-[3px_3px_0_0_#222]",
                  "focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-black/20 dark:focus:ring-white/10",
                  active
                    ? `${baseColor} text-black`
                    : "bg-white dark:bg-neutral-800 text-neutral-500",
                  "hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] dark:hover:shadow-[4px_4px_0_0_#222] sm:hover:-translate-y-1 sm:hover:shadow-[6px_6px_0_0_#000] sm:dark:hover:shadow-[6px_6px_0_0_#222]",
                  today && !active
                    ? "ring-2 ring-indigo-400 dark:ring-indigo-500"
                    : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "mt-0.5 text-[10px] sm:text-[11px] font-bold tracking-wide",
                    today && !active
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "",
                  ].join(" ")}
                >
                  {d.label}
                </span>

                <span className="text-lg sm:text-xl select-none leading-none">
                  {active ? "🔥" : today ? "⚪" : "·"}
                </span>

                <span
                  className={[
                    "mb-1 h-1 w-5 sm:w-6 rounded-full transition-all",
                    active
                      ? "bg-black/80 dark:bg-white/80"
                      : today
                      ? "bg-indigo-400/60 dark:bg-indigo-500/60"
                      : "bg-neutral-300 dark:bg-neutral-700",
                  ].join(" ")}
                />
                {tag && (
                  <span
                    className="
                    absolute -top-2.5 left-1/2 -translate-x-1/2
                    text-[8px] sm:text-[10px] font-black px-1 py-[2px] rounded
                    bg-yellow-300 border-2 border-black
                    shadow-[2px_2px_0_0_#000]
                    dark:bg-yellow-400 dark:border-neutral-700
                  "
                  >
                    {tag}
                  </span>
                )}
                {/* subtle decorative dot */}
                <span
                  className={[
                    "absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full",
                    active
                      ? "bg-black/50 dark:bg-white/60"
                      : today
                      ? "bg-indigo-400"
                      : "bg-neutral-300 dark:bg-neutral-600",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>

        {/* New progression bar */}
        <div className="space-y-2">
          <div
            className="
            w-full h-4 sm:h-5 rounded-xl border-3 sm:border-4 border-black dark:border-neutral-700
            bg-white dark:bg-neutral-800 overflow-hidden relative
            shadow-[3px_3px_0_0_#000] dark:shadow-[3px_3px_0_0_#222]
          "
            aria-label="Weekly progress"
          >
            <div
              className="
              absolute inset-y-0 left-0 flex
              transition-all duration-500
            "
              style={{ width: `${percent}%` }}
            >
              {streakDays.map((_, i) => (
                <div
                  key={i}
                  className={[
                    "h-full flex-1",
                    i < doneCount
                      ? colors[i % colors.length]
                      : "bg-neutral-200 dark:bg-neutral-700",
                    "border-r border-black/20 last:border-none",
                  ].join(" ")}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wide">
                {percent}% DONE
              </span>
            </div>
          </div>

          {/* Milestone pill */}
            <div className="flex items-center justify-between gap-2">
              <div
                className="
              flex items-center gap-1 px-2 py-1 rounded-lg
              border-2 border-black dark:border-neutral-700
              bg-emerald-300 dark:bg-emerald-400 text-[9px] sm:text-[10px] font-bold
              shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#222]
              animate-[pulse_2.4s_ease-in-out_infinite]
            "
              >
                🌱
                <span>
                  {doneCount} / {total}
                </span>
              </div>
              <div
                className={[
                  "px-2 py-1 rounded-lg border-2 border-black dark:border-neutral-700",
                  "bg-white dark:bg-neutral-800 text-[9px] sm:text-[10px] font-semibold",
                  "shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#222]",
                  daysLeft <= 2
                    ? "animate-[bounce_1.4s_ease-in-out_infinite]"
                    : "",
                ].join(" ")}
              >
                {daysLeft > 0 ? `🎁 ${daysLeft} to 7` : "🏆 Full Week!"}
              </div>
            </div>
        </div>

        <div className="flex items-center gap-2 pt-0.5 sm:pt-1">
          <div className="flex -space-x-1">
            {streakDays.slice(0, doneCount).map((_, i) => (
              <div
                key={i}
                className="
                h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-black text-[8px] sm:text-[9px]
                flex items-center justify-center
                text-white dark:bg-white dark:text-black
                border-2 border-black dark:border-neutral-700
              "
              >
                🔥
              </div>
            ))}
          </div>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-neutral-700 dark:text-neutral-400 truncate">
            {doneCount} day streak — {daysLeft > 0 ? "keep pushing" : "legend mode"}
          </span>
        </div>
      </section>
    </section>
  );
};

export default Streak;
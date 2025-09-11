
// Data
const streakDays = ["M", "T", "W", "T", "F", "S", "S"].map((d, i) => ({
  label: d,
  done: i < 3,
}));

const Streak = () => {
  return (
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
          const active = d.done;
          return (
            <div
              key={d.label + idx}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={[
                  "h-11 w-11 rounded-xl flex items-center justify-center text-xs font-semibold tracking-wide transition-all border",
                  active
                    ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-indigo-400/40 shadow-lg shadow-indigo-500/20"
                    : "bg-neutral-900 border-neutral-800 text-neutral-500",
                ].join(" ")}
              >
                {d.label}
              </div>
              {active && (
                <div className="h-1 w-5 rounded-full bg-indigo-500/70" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Streak
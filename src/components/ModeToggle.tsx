"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current =
    (mounted ? resolvedTheme : "light") === "dark" ? "dark" : "light";

  const Emoji = current === "dark" ? "🌙" : "☀️";
  const label = current === "dark" ? "Dark" : "Light";

  const toggleTheme = () => {
    const next = current === "dark" ? "light" : "dark";
    setAnimating(true);
    setTheme(next);
    window.setTimeout(() => setAnimating(false), 350);
  };

  return (
    <Button
      onClick={toggleTheme}
      aria-label={`Theme: ${label}. Tap to switch`}
      title={`Theme: ${label} (tap to switch)`}
      disabled={!mounted}
      className="h-auto cursor-pointer flex items-center gap-1 rounded-full px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors dark:text-white text-xs font-medium text-black"
    >
      <span
        key={current}
        aria-hidden="true"
        className={[
          "transform-gpu will-change-transform",
          "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "motion-reduce:transition-none motion-reduce:transform-none",
          animating
            ? "rotate-180 scale-90 opacity-90"
            : "rotate-0 scale-100 opacity-100",
        ].join(" ")}
      >
        {Emoji}
      </span>
      <span>{label}</span>
    </Button>
  );
}
export default ModeToggle;

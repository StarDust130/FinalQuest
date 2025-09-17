"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";

type ModeToggleVariant = "icon" | "text";

interface ModeToggleProps {
  variant?: ModeToggleVariant; // "icon" (default existing UI) or "text"
  className?: string;
}

export function ModeToggle({ variant = "icon", className }: ModeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = (mounted ? resolvedTheme : "light") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";

  const Emoji = current === "dark" ? "🌙" : "☀️";
  const label = current === "dark" ? "Dark" : "Light";

  const toggleTheme = () => {
    setAnimating(true);
    setTheme(next);
    window.setTimeout(() => setAnimating(false), 350);
  };

  if (variant === "text") {
    // Simple text version
    return (
      <button
        onClick={toggleTheme}
        disabled={!mounted}
        aria-label={`Current theme: ${label}. Switch to ${next} mode`}
        title={`Switch to ${next} mode`}
        className={`text-sm flex items-center gap-2 justify-between ${className || ""}`}
      >
        {current === "light" ? (
          <MoonIcon className="h-4 w-4 mr-2" />
        ) : (
          <SunIcon className="h-4 w-4 mr-2" />
        )}
        {next === "dark" ? "Dark" : "Light"} Mode
      </button>
    );
    }

    // Original (default) icon button version
    return (
      <Button
        onClick={toggleTheme}
        aria-label={`Theme: ${label}. Tap to switch`}
        title={`Theme: ${label} (tap to switch)`}
        disabled={!mounted}
        className={`h-auto cursor-pointer flex items-center gap-1 rounded-full px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors dark:text-white text-xs font-medium text-black ${
          className || ""
        }`}
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

  // Import the icons from react-lucide

  export default ModeToggle;

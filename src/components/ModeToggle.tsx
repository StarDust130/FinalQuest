"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Show only light/dark to the user. Default to light until mounted.
  const current = (mounted ? resolvedTheme : "light") === "dark" ? "dark" : "light";
  const Icon = current === "dark" ? Moon : Sun;
  const label = current === "dark" ? "Dark" : "Light";

  const toggleTheme = () => {
    const next = current === "dark" ? "light" : "dark";
    setAnimating(true);
    setTheme(next);
    // smooth, slightly longer animation
    window.setTimeout(() => setAnimating(false), 350);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Theme: ${label}. Tap to switch`}
      title={`Theme: ${label} (tap to switch)`}
      className="h-8 w-8 rounded-full"
      disabled={!mounted}
    >
      <Icon
        key={current}
        className={[
          "h-[1.1rem] w-[1.1rem]",
          "transform-gpu will-change-transform",
          "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "motion-reduce:transition-none motion-reduce:transform-none",
          animating ? "rotate-180 scale-90 opacity-90" : "rotate-0 scale-100 opacity-100",
        ].join(" ")}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

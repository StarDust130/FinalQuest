"use client";

import Link from "next/link";
import { memo, type MouseEvent } from "react";
import { ModeToggle } from "../ModeToggle";

type FooterLink = {
  href: string;
  label: string;
  icon?: string;
};

interface FooterProps {
  appName?: string;
  tagline?: string;
  version?: string;
  links?: FooterLink[];
  showThemeToggle?: boolean;
  className?: string;
}

const defaultLinks: FooterLink[] = [
  { href: "/privacy", label: "Privacy", icon: "🔒" },
  { href: "/terms", label: "Terms", icon: "📜" },
];

const Footer = memo<FooterProps>(
  ({
    appName = "Final Quest",
    tagline = "Your Final quest to achieve your Goal 🎯 ",
    version = "v0.1",
    links = defaultLinks,
    showThemeToggle = true,
    className = "",
  }) => {
    const year = new Date().getFullYear();

    const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (typeof window !== "undefined" && window.location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    return (
      <footer
        role="contentinfo"
        className={`relative w-full border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/80 backdrop-blur-md rounded-3xl shadow-inner shadow-black/10 dark:shadow-black/20 mt-12 sm:mt-24 ${className}`}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
          {/* Brand + Nav */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-7">
            {/* Logo + text (stacked) */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className="group inline-flex flex-col items-center sm:items-start gap-2 no-underline"
              aria-label={`${appName} home`}
              title={`${appName} — scroll to top ⤴️`}
            >
              <span className="relative inline-grid size-14 place-items-center rounded-2xl ring-1 ring-neutral-200/70 dark:ring-neutral-700/60 bg-white/80 dark:bg-neutral-900/60 shadow-sm overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-sky-500/10 to-fuchsia-500/25 opacity-90 transition-opacity group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 bg-[conic-gradient(var(--tw-gradient-stops))] from-indigo-500/20 via-sky-400/20 to-fuchsia-500/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity"
                />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="relative h-8 w-8 text-indigo-600 dark:text-indigo-400 drop-shadow-[0_1px_4px_rgba(79,70,229,0.35)]"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="7.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    opacity="0.85"
                  />
                  <path
                    d="M12 6.75v3.25m0 7.25v-3.25M17.25 12h-3.25M6.75 12h3.25"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <path d="M12 12l4.4-2.3-2.3 4.4L12 12z" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.7" fill="currentColor" />
                </svg>
              </span>

              <div className="leading-tight text-center sm:text-left">
                <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-xl sm:text-2xl tracking-tight">
                  <span className="inline-flex items-baseline gap-1">
                    {(() => {
                      const parts = appName.split(" ");
                      const last = parts.pop();
                      const first = parts.join(" ");
                      return (
                        <>
                          {first ? (
                            <span className="transition-colors">{first}</span>
                          ) : null}
                          {last ? (
                            <span className="relative bg-gradient-to-r from-indigo-600 via-sky-500 to-fuchsia-500 bg-clip-text text-transparent">
                              {last}
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/60 to-indigo-500/0 opacity-0 transition-opacity group-hover:opacity-100"
                              />
                            </span>
                          ) : null}
                        </>
                      );
                    })()}
                  </span>
                </div>
                <div className="mt-1 text-xs font-semibold sm:text-sm text-neutral-500 dark:text-neutral-400">
                  <span>{tagline}</span>
                </div>
              </div>
            </Link>

            {/* Navigation */}
            <nav
              aria-label="Footer"
              className="flex items-center gap-2 sm:gap-3 text-xs font-medium"
            >
              {links.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 border border-neutral-200/70 dark:border-neutral-700/60 bg-white/60 dark:bg-neutral-900/60 hover:bg-white/90 dark:hover:bg-neutral-900/80 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
                >
                  {icon ? (
                    <span aria-hidden="true">{icon}</span>
                  ) : (
                    <span aria-hidden="true">👉</span>
                  )}
                  <span>{label}</span>
                </Link>
              ))}
              {showThemeToggle ? <ModeToggle /> : null}
            </nav>
          </div>

          {/* Divider */}
          <hr className="mt-6 border-neutral-200 dark:border-neutral-800 border-dashed" />

          {/* Meta */}
          <div className="mt-4 flex flex-col items-center gap-1 text-[12px] text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <span>
                © <span suppressHydrationWarning>{year}</span> {appName} 🛡️
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="font-mono text-neutral-500 dark:text-neutral-500">
                {version}
              </span>
            </div>

            <p className="text-center text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
              🛠️ Side project by a CGPSC aspirant — MVP experiment in progress
              🚀
            </p>
            <p className="text-xs text-center mt-3">
              <span className="text-neutral-500 dark:text-neutral-400 font-bold ">
                Created by the one and only
              </span>{" "}
              <Link
                href="https://chandrashekhar.life"
                target="_blank"
                className="font-semibold text-neutral-800 dark:text-neutral-100 hover:text-red-500 dark:hover:text-red-400 transition-colors underline underline-offset-4 decoration-wavy"
              >
                ChandraShekhar 
              </Link>
            </p>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export default Footer;

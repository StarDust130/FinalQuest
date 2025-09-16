"use client";

import Link from "next/link";
import { memo, type MouseEvent } from "react";
import { ModeToggle } from "../ModeToggle";
import Image from "next/image";

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
  {
    href: "https://packaged-media.redd.it/8bzrms51gchb1/pb/m2-res_270p.mp4?m=DASHPlaylist.mpd&v=1&e=1758024000&s=7e9cf4f5bb65b0432a75e4e5202274cabba39f94",
    label: "Privacy",
    icon: "🔒",
  },
  {
    href: "https://packaged-media.redd.it/maa2nbolwsfb1/pb/m2-res_1080p.mp4?m=DASHPlaylist.mpd&v=1&e=1758034800&s=c7d0494ab415c3350298a05533dea613acd0c89d",
    label: "Terms",
    icon: "📜",
  },
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
        className={`relative max-w-[1390px] mx-auto border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/80 backdrop-blur-md rounded-3xl md:rounded-none shadow-inner shadow-black/10 dark:shadow-black/20 mt-12 sm:mt-24 ${className}`}
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
              <Image
              src="/icon.png"
              alt="logo"
              width={60}
              height={60}
              className="rounded-xl transition-transform duration-300 group-hover:scale-105"
              />

              <div className="leading-tight text-center sm:text-left">
              <div className="text-2xl  font-extrabold tracking-tight">
              <span>Final </span>
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Quest
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
              🛠️ Side project for aspirant — MVP experiment in progress
              🚀
            </p>
            <p className="text-xs text-center mt-3">
              <span className="text-neutral-500 dark:text-neutral-400 font-bold">
                Created by the one and only ✨
              </span>{" "}
              <Link
                href="https://chandrashekhar.life"
                target="_blank"
                className="font-semibold text-neutral-800 dark:text-neutral-100 hover:text-red-500 dark:hover:text-red-400 transition-colors underline underline-offset-4 decoration-wavy decoration-blue-500 dark:decoration-blue-400 animate-pulse"
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

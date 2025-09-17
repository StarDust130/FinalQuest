/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Layers, FileText, RefreshCcw, Users, GraduationCap } from "lucide-react";

type NavItem = {
    key: string;
    label: string;
    icon: React.ReactNode;
    href: string;
};

const navItems: NavItem[] = [
    { key: "home", label: "Home", icon: <Home size={20} strokeWidth={2} />, href: "/" },
    { key: "rewise", label: "Rewise", icon: <GraduationCap size={20} strokeWidth={2} />, href: "/rewise" },
    { key: "flash-cards", label: "Flash Cards", icon: <Layers size={20} strokeWidth={2} />, href: "/flash-cards" },
    // { key: "papers", label: "Papers", icon: <FileText size={20} strokeWidth={2} />, href: "/question-papers" },
    // { key: "friends", label: "Friends", icon: <Users size={20} strokeWidth={2} />, href: "/friends" },
];

function useScrollShow(threshold = 6) {
    const [visible, setVisible] = useState(true);
    const lastY = useRef(0);
    const ticking = useRef(false);
    const onScroll = useCallback(() => {
        if (ticking.current) return;
        ticking.current = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            if (Math.abs(y - lastY.current) > threshold) {
                setVisible(y < lastY.current || y < 24);
                lastY.current = y;
            }
            ticking.current = false;
        });
    }, [threshold]);
    useEffect(() => {
        lastY.current = window.scrollY;
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [onScroll]);
    return visible;
}

const NavBar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const visible = useScrollShow();

    const handleNav = (href: string) => {
        if (href === pathname) return;
        router.push(href);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className="fixed left-0 top-0 hidden h-full w-16 flex-col gap-2 border-r border-neutral-200 bg-white/70 px-1.5 py-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/70 md:flex"
                role="navigation"
                aria-label="Primary"
            >
                <div className="flex flex-col gap-1.5 cursor-pointer">
                    {navItems.map(item => {
                        const active = pathname === item.href;
                        return (
                          <button
                            key={item.key}
                            onClick={() => handleNav(item.href)}
                            aria-label={item.label}
                            aria-current={active ? "page" : undefined}
                            className={`group cursor-pointer relative flex flex-col items-center gap-1 rounded-xl px-1.5 py-2 text-[10px] font-medium tracking-wide transition-all
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-400/40 dark:focus-visible:ring-offset-neutral-950
                                    ${
                                      active
                                        ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-600"
                                        : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-neutral-50"
                                    }`}
                          >
                            <span
                              className={`relative grid h-7 w-7 place-items-center transition-transform ${
                                active
                                  ? "text-inherit"
                                  : "text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
                              }`}
                            >
                              <motion.span
                                whileTap={{ scale: 0.85 }}
                                animate={
                                  active
                                    ? { scale: 1.05, y: -1 }
                                    : { scale: 1, y: 0 }
                                }
                                transition={{
                                  type: "spring",
                                  stiffness: 480,
                                  damping: 26,
                                }}
                                className="flex"
                              >
                                {item.icon}
                              </motion.span>
                            </span>
                            <span className="relative leading-none">
                              {item.label}
                            </span>
                          </button>
                        );
                    })}
                </div>
            </aside>

            {/* Spacer */}
            <div className="hidden w-16 md:block" aria-hidden />

            {/* Mobile Bottom Nav */}
            <AnimatePresence>
                {visible && (
                    <motion.nav
                        key="mobile-nav"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 360, damping: 32 }}
                        className="fixed inset-x-0 bottom-0 z-40 md:hidden"
                        role="navigation"
                        aria-label="Primary"
                    >
                        <div className="w-full border-t border-neutral-200/60 dark:border-neutral-800/70 backdrop-blur-xl bg-neutral-50/90 dark:bg-neutral-950/70 supports-[backdrop-filter]:bg-neutral-50/75 dark:supports-[backdrop-filter]:bg-neutral-950/60 shadow-[0_-6px_18px_-8px_rgba(0,0,0,0.25)] dark:shadow-[0_-6px_22px_-10px_rgba(0,0,0,0.65)]">
                            <div className="mx-auto max-w-md flex">
                                {navItems.map(item => {
                                    const active = pathname === item.href;
                                    return (
                                        <button
                                            key={item.key}
                                            onClick={() => handleNav(item.href)}
                                            aria-label={item.label}
                                            aria-current={active ? "page" : undefined}
                                            className="relative flex-1 h-14 flex flex-col items-center justify-center gap-1 group select-none outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 dark:focus-visible:ring-neutral-200/40"
                                        >
                                            {active && (
                                                <motion.span
                                                    layoutId="mobile-active-pill"
                                                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                                    className="absolute top-1 left-1/2 -translate-x-1/2 h-12 w-16 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300 ring-1 ring-neutral-700/60 dark:ring-neutral-300/60 shadow-[0_4px_10px_-4px_rgba(0,0,0,0.45)] dark:shadow-[0_4px_12px_-6px_rgba(0,0,0,0.35)]"
                                                />
                                            )}
                                            <motion.span
                                                whileTap={{ scale: 0.9 }}
                                                animate={active ? { y: -1, scale: 1.03 } : { y: 0, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 480, damping: 30 }}
                                                className={`relative grid h-5 w-5 place-items-center text-[0px]
                                                    ${active
                                                        ? "text-neutral-50 dark:text-neutral-900"
                                                        : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-100"
                                                    }`}
                                            >
                                                <motion.span
                                                    whileHover={!active ? { y: -2 } : undefined}
                                                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                                                    className="flex [&>svg]:h-[20px] [&>svg]:w-[20px]"
                                                >
                                                    {item.icon}
                                                </motion.span>
                                            </motion.span>
                                            <span
                                                className={`relative z-10 text-[8px] font-medium tracking-wide leading-none
                                                    ${active
                                                        ? "text-neutral-50 dark:text-neutral-900"
                                                        : "text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-100"
                                                    }`}
                                            >
                                                {item.label}
                                            </span>
                                            {!active && (
                                                <span className="pointer-events-none absolute top-1 left-1/2 -translate-x-1/2 h-9 w-9 rounded-2xl opacity-0 group-hover:opacity-10 dark:group-hover:opacity-10 bg-neutral-950 transition-opacity" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="h-[calc(env(safe-area-inset-bottom))]" />
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
export default NavBar;

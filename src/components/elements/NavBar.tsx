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
    { key: "revision", label: "Revision", icon: <GraduationCap size={20} strokeWidth={2} />, href: "/revision" },
    { key: "flash", label: "Flash", icon: <Layers size={20} strokeWidth={2} />, href: "/flash-cards" },
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
                <div className="flex flex-col gap-1.5">
                    {navItems.map(item => {
                        const active = pathname === item.href;
                        return (
                            <button
                                key={item.key}
                                onClick={() => handleNav(item.href)}
                                aria-label={item.label}
                                aria-current={active ? "page" : undefined}
                                className={`group relative flex flex-col items-center gap-1 rounded-xl px-1.5 py-2 text-[10px] font-medium tracking-wide transition-all
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-400/40 dark:focus-visible:ring-offset-neutral-950
                                    ${active
                                        ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-600"
                                        : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-neutral-50"
                                    }`}
                            >
                                <span className={`relative grid h-7 w-7 place-items-center transition-transform ${active ? "text-inherit" : "text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100"}`}>
                                    <motion.span
                                        whileTap={{ scale: 0.85 }}
                                        animate={active ? { scale: 1.05, y: -1 } : { scale: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 480, damping: 26 }}
                                        className="flex"
                                    >
                                        {item.icon}
                                    </motion.span>
                                </span>
                                <span className="relative leading-none">{item.label}</span>
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
                        initial={{ y: 56, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 56, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/85 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/85 md:hidden"
                        role="navigation"
                        aria-label="Primary"
                    >
                        <div className="mx-auto flex max-w-xl gap-1.5 px-3 py-1.5">
                            {navItems.map(item => {
                                const active = pathname === item.href;
                                return (
                                    <button
                                        key={item.key}
                                        onClick={() => handleNav(item.href)}
                                        aria-label={item.label}
                                        aria-current={active ? "page" : undefined}
                                        className={`group relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1.5 py-2 text-[10px] font-medium transition-all
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-400/40 dark:focus-visible:ring-offset-neutral-950
                                            ${active
                                                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-600"
                                                : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-neutral-50"
                                            }`}
                                    >
                                        <motion.span
                                            whileTap={{ scale: 0.85 }}
                                            animate={active ? { y: -2, scale: 1.05 } : { y: 0, scale: 1 }}
                                            transition={{ type: "spring", stiffness: 480, damping: 26 }}
                                            className={`relative grid h-6 w-6 place-items-center ${active ? "text-inherit" : "text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100"}`}
                                        >
                                            {item.icon}
                                        </motion.span>
                                        <span className="relative leading-none">{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
export default NavBar;

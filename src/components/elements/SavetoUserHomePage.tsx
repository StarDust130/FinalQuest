/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

declare global {
    interface Window {
        __SAVE_CARD_MOUNTED__?: boolean;
    }
}

const detectPlatform = () => {
    const ua = navigator.userAgent.toLowerCase();
    const isIOS =
        /iphone|ipad|ipod/.test(ua) ||
        (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1);
    if (isIOS) return "ios";
    if (/android/.test(ua)) return "android";
    if (/windows/.test(ua)) return "windows";
    if (/macintosh|mac os x/.test(ua)) return "mac";
    if (/linux/.test(ua)) return "linux";
    return "other";
};

const getInstructions = (platform: string, hasPrompt: boolean) => {
    if (platform === "ios")
        return [
            "Tap the Share button",
            "Scroll down and tap 'Add to Home Screen'",
            "Tap 'Add' in the top right",
        ];
        if (platform === "android")
        return hasPrompt
            ? ["Tap the 'Install' button below", "Follow the on-screen prompts"]
            : [
              "Tap the ⋮ menu button in your browser",
              "Tap 'Add to Home Screen' or 'Install app'",
              "Confirm the action",
              ];
        if (platform === "windows" || platform === "mac" || platform === "linux")
        return hasPrompt
            ? [
              "Click the Install icon (+) in the address bar",
              "Confirm the installation",
              ]
            : [
              "Open your browser's menu (e.g., ⋮ or …)",
              "Find and click 'Install [App Name]' or 'Add to Dock'",
              "Follow the prompts to complete",
              ];
        return [
        "Open your browser's menu",
        "Look for 'Add to Home Screen' or 'Install'",
        "Confirm to finish",
        ];
    };

    const SaveToHomeCard: React.FC = () => {
        const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
        const [installed, setInstalled] = useState(false);
        const [platform, setPlatform] = useState<string>("");
        const [hidden, setHidden] = useState(false);

        useEffect(() => {
        if (window.__SAVE_CARD_MOUNTED__) return;
        window.__SAVE_CARD_MOUNTED__ = true;

        try {
            const dismissed = localStorage.getItem("add2hs_dismissed") === "1";
            if (dismissed) setHidden(true);
        } catch {}

        const standalone =
            (window.matchMedia &&
            window.matchMedia("(display-mode: standalone)").matches) ||
            (navigator as any).standalone;
        if (standalone) setInstalled(true);
        }, []);

        useEffect(() => {
        setPlatform(detectPlatform());
        const onBeforeInstall = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };
        const onInstalled = () => setInstalled(true);
        window.addEventListener("beforeinstallprompt", onBeforeInstall);
        window.addEventListener("appinstalled", onInstalled);
        return () => {
            window.removeEventListener("beforeinstallprompt", onBeforeInstall);
            window.removeEventListener("appinstalled", onInstalled);
        };
        }, []);

        const install = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        deferredPrompt.userChoice.finally(() => setDeferredPrompt(null));
        };

        const dismiss = () => {
        setHidden(true);
        try {
            localStorage.setItem("add2hs_dismissed", "1");
        } catch {}
        };

        if (installed || hidden) return null;

        const steps = getInstructions(platform, !!deferredPrompt);
        const platformBadge =
        platform === "ios"
            ? "For iPhone & iPad"
            : platform === "android"
            ? "For Android"
            : platform === "windows"
            ? "For Windows"
            : platform === "mac"
            ? "For macOS"
            : "For your device";

    return (
        <div className="w-full p-2 sm:p-4">
            <div className="relative rounded-xl border-2 border-black bg-white dark:bg-neutral-800 text-black dark:text-white shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#4ade80]">
                <button
                    aria-label="Hide"
                    onClick={dismiss}
                    className="absolute top-3 right-3 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white text-lg font-black border-2 border-black hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
            >
                &times;
            </button>

            <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-3">
                <span className="self-start px-3 py-1 text-xs font-bold uppercase bg-green-400 text-black border-2 border-black rounded-full">
                    {platformBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Get the App Experience
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 -mt-2">
                    Add this site to your home screen for quick and easy access.
                </p>
                </div>

                <ul className="mt-6 space-y-3 text-sm sm:text-base font-medium">
                {steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md bg-black dark:bg-green-400 text-white dark:text-black text-xs font-bold">
                        {i + 1}
                    </span>
                    <span>{s}</span>
                    </li>
                ))}
                </ul>

                <div className="mt-6 pt-6 border-t-2 border-dashed border-neutral-300 dark:border-neutral-600">
                {deferredPrompt && platform !== "ios" ? (
                    <button
                    onClick={install}
                    className="w-full rounded-lg bg-black dark:bg-white text-white dark:text-black font-bold text-base py-3 px-5 border-2 border-black dark:border-green-400 shadow-[4px_4px_0px_#9ca3af] dark:shadow-[4px_4px_0px_#4ade80] hover:shadow-[2px_2px_0px_#9ca3af] dark:hover:shadow-[2px_2px_0px_#4ade80] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                    Install App
                    </button>
                ) : (
                    <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                    {platform === "ios"
                        ? "Follow the instructions above using the Safari browser."
                        : "If the install button doesn't appear, follow the manual steps."}
                    </p>
                )}
                </div>
            </div>
            </div>
        </div>
        );
    };

    export default SaveToHomeCard;

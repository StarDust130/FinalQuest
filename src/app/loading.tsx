"use client";

const taglines = [
    "Believe you can and you're halfway there. 🚀",
    "The secret of getting ahead is getting started. 🏁",
    "It does not matter how slowly you go as long as you do not stop. 🐢",
    "The expert in anything was once a beginner. 🌱",
    "Education is the passport to the future. 🎟️",
    "Success is the sum of small efforts, repeated day in and day out. 🧱",
];

export default function Loading() {
    const phrase = taglines[Math.floor(Math.random() * taglines.length)];
    return (
        <div className="flex min-h-dvh items-center justify-center">
            <div role="status" aria-label="Loading" className="flex flex-col items-center gap-3">
                <div className="h-12 w-12">
                    <div className="h-12 w-12 animate-spin rounded-full border-2 border-neutral-300 dark:border-neutral-700 border-t-neutral-900 dark:border-t-neutral-200" />
                </div>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Loading<span className="animate-pulse">...</span>
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{phrase}</p>
            </div>
        </div>
    );
}

"use client";

export default function Loading() {
    return (
        <div className="flex h-dvh flex-col items-center justify-center gap-4 font-sans text-slate-700">
            <div
                className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500"
                aria-label="Loading"
            />
            <p className="m-0 text-[0.95rem] tracking-wider uppercase">Loading...</p>
        </div>
    );
}

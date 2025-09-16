

'use client';


type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {


    return (
        <div className="min-h-dvh w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black text-slate-800 dark:text-slate-200 flex items-center justify-center px-4">
            <div className="relative max-w-md w-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-xl dark:from-indigo-500/10 dark:via-fuchsia-500/10 dark:to-cyan-500/10 animate-pulse" />
                <div className="relative backdrop-blur-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 shadow-xl rounded-2xl p-8 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.6}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v4m0 4h.01M3.5 19h17l-8.5-14-8.5 14Z"
                                />
                            </svg>
                        </span>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Something went wrong
                        </h1>
                    </div>

                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            An unexpected error occurred while rendering this page. You can try again. If the problem persists, please contact support.
                        </p>

                    {error?.digest && (
                        <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 break-all">
                            Ref: {error.digest}
                        </p>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={() => reset()}
                            className="group inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-5 py-2.5 text-sm font-medium shadow hover:from-indigo-500 hover:to-fuchsia-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 dark:focus-visible:ring-fuchsia-500 transition"
                        >
                            Retry
                            <svg
                                className="h-4 w-4 transition group-hover:rotate-180"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 0 1 19 5" />
                            </svg>
                        </button>

                    </div>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400 dark:text-slate-600">
                        Error Page
                    </p>
                </div>
            </div>
        </div>
    );
}

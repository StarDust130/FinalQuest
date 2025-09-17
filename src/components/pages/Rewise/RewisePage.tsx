"use client";
import { useEffect, useMemo, useRef, useState, forwardRef, useLayoutEffect } from "react";

/* Types */
type Mode = "topic" | "chat";

type BaseMsg = { id: string; timestamp: number };
type ChatMessage =
  | (BaseMsg & { role: "ai"; text: string; suggestions?: string[] })
  | (BaseMsg & { role: "user"; text: string })
  | (BaseMsg & {
      role: "mcq";
      question: string;
      options: string[];
      selectedIndex?: number;
    });

/* Constants */
const TOTAL_SECONDS = 15 * 60;

/* Page */
export default function RewisePage() {
  const [mode, setMode] = useState<Mode>("topic");
  const [topic, setTopic] = useState("");
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // Util: always snap to bottom
  const scrollToBottom = (smooth = true) => {
    const el = chatScrollRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  // Start session
  const beginSession = () => {
    if (!topic.trim()) return;
    setMode("chat");
    setTimeLeft(TOTAL_SECONDS);

    const t = Date.now();
    setMessages([
      {
        id: "ai-1",
        role: "ai",
        text: `Great—let’s do a focused 15‑minute spar on “${topic.trim()}”. I’ll quiz you with quick checks and follow‑ups.`,
        suggestions: [
          "Give me a timeline",
          "Key causes",
          "Definitions",
          "Compare with another topic",
        ],
        timestamp: t,
      },
      {
        id: "mcq-1",
        role: "mcq",
        question: "Kickoff check: What angle do you want to start with?",
        options: [
          `Key figures + timeline of ${topic.trim()}`,
          `Causes and consequences around ${topic.trim()}`,
          `Core definitions and concepts in ${topic.trim()}`,
          `Compare ${topic.trim()} with a related topic`,
        ],
        timestamp: t + 1,
      },
    ]);
  };

  // End session
  const endSession = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setMode("topic");
    setTopic("");
    setMessages([]);
    setInput("");
    setIsTyping(false);
    setTimeLeft(TOTAL_SECONDS);
  };

  // Timer
  useEffect(() => {
    if (mode !== "chat") return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [mode]);

  // Auto-scroll chat log on new content
  useEffect(() => {
    if (mode !== "chat") return;
    scrollToBottom(true);
  }, [messages, isTyping, mode]);

  // Better snap when switching into chat or when viewport changes (mobile keyboard)
  useLayoutEffect(() => {
    if (mode !== "chat") return;
    scrollToBottom(false);

    const onResize = () => scrollToBottom(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mode]);

  const mmss = useMemo(() => {
    const m = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const s = (timeLeft % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [timeLeft]);

  const progressPct = useMemo(
    () => Math.max(0, Math.min(100, Math.round(((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100))),
    [timeLeft]
  );

  const handleSend = (custom?: string) => {
    const text = (custom ?? input).trim();
    if (!text) return;

    const now = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: `user-${now}`, role: "user", text, timestamp: now },
    ]);
    setInput("");

    // Simulate AI reply
    setIsTyping(true);
    setTimeout(() => {
      const aiNow = Date.now();
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${aiNow}`,
          role: "ai",
          text: "Nice. Push one step deeper—give a concrete example or quick fact.",
          suggestions: ["Ask me a MCQ", "Summarize it", "Challenge me"],
          timestamp: aiNow,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const selectOption = (id: string, idx: number) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.role === "mcq" && m.id === id ? { ...m, selectedIndex: idx } : m
      )
    );
    // Follow-up from AI
    setIsTyping(true);
    setTimeout(() => {
      const aiNow = Date.now();
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${aiNow}`,
          role: "ai",
          text: "Locked that. Why does that perspective matter? Give one reason.",
          timestamp: aiNow,
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-[#F4F4F4] dark:bg-[#0E1117] text-black dark:text-white px-3 sm:px-4 py-3 font-['Inter',sans-serif]">
      <div className="max-w-4xl mx-auto h-full flex flex-col gap-3">
        <Header
          mode={mode}
          timeLabel={mode === "topic" ? "15:00" : mmss}
          progress={mode === "chat" ? progressPct : undefined}
          onBack={() => window.history.back()}
          onEnd={endSession}
        />

        {mode === "topic" ? (
          <TopicEntry topic={topic} setTopic={setTopic} onStart={beginSession} />
        ) : (
          <div className="flex-1 min-h-0 flex flex-col">
            <ChatLog
              ref={chatScrollRef}
              messages={messages}
              isTyping={isTyping}
              onSelectOption={selectOption}
              onSuggestionClick={(s) => handleSend(s)}
            />

            <Composer
              value={input}
              onChange={setInput}
              onSend={() => handleSend()}
              onFocusInput={() => scrollToBottom(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* Header with progress */
function Header({
  mode,
  timeLabel,
  progress,
  onBack,
  onEnd,
}: {
  mode: Mode;
  timeLabel: string;
  progress?: number;
  onBack: () => void;
  onEnd: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {mode === "topic" ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-white dark:bg-[#141922] border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] px-3 py-2 font-bold active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-transform text-sm"
          >
            <BackArrowIcon />
            Back
          </button>
        ) : (
          <button
            onClick={onEnd}
            className="bg-[#EF4444] text-black dark:text-white border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] px-3 py-2 font-bold active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-transform text-sm"
          >
            End Session
          </button>
        )}

        <div className="bg-white dark:bg-[#141922] border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] px-3 py-2 font-extrabold text-sm">
          {timeLabel}
        </div>
      </div>

      {mode === "chat" && typeof progress === "number" && (
        <div className="w-full bg-white dark:bg-[#141922] border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] h-3 relative">
          <div
            className="h-full bg-[#0A74F0]"
            style={{ width: `${progress}%`, transition: "width 300ms ease" }}
          />
        </div>
      )}
    </div>
  );
}

/* Topic Entry – mobile-first, cleaner, better dark mode */
function TopicEntry({
  topic,
  setTopic,
  onStart,
}: {
  topic: string;
  setTopic: (v: string) => void;
  onStart: () => void;
}) {
  const suggestions = [
    "Photosynthesis",
    "The Gupta Empire",
    "Trigonometry basics",
    "WWII causes",
  ];
  return (
    <div className="flex-1 min-h-0 flex items-center justify-center">
      <div className="w-full max-w-xl bg-[#F4F4F4] dark:bg-transparent border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] p-5 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <div className="shrink-0">
            <BrainSparkSVG />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-extrabold leading-tight">
              Start a 15‑min Spar
            </h1>
            <p className="text-xs sm:text-sm opacity-80">
              Enter a topic. We’ll quiz, nudge, and sharpen your recall.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onStart()}
            placeholder="e.g., The Gupta Empire"
            className="flex-1 bg-white dark:bg-[#141922] text-black dark:text-white placeholder-black/60 dark:placeholder-white/60 px-3 py-3 border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] focus:outline-none text-sm"
          />
          <button
            onClick={onStart}
            className="whitespace-nowrap bg-[#FFD700] border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] px-4 sm:px-5 py-3 font-extrabold active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-transform text-sm"
          >
            Start 15‑min
          </button>
        </div>

        <p className="mt-3 text-sm sm:text-sm font-bold">Suggestions:</p>

        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-x-auto pb-1">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setTopic(s)}
              className="text-xs sm:text-sm bg-white dark:bg-[#0E1117] border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] px-3 py-1.5 font-bold shrink-0 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-transform"
            >
              {s}
            </button>
          ))}
        </div>

        <p className="mt-3 text-[11px] sm:text-xs opacity-70">
          Tip: Press Enter to start. You’ll get quick MCQs and follow‑ups.
        </p>
      </div>
    </div>
  );
}

/* Chat Log */
type ChatLogProps = {
  messages: ChatMessage[];
  isTyping: boolean;
  onSelectOption: (id: string, idx: number) => void;
  onSuggestionClick: (s: string) => void;
};
const ChatLog = forwardRef<HTMLDivElement, ChatLogProps>(function ChatLog(
  { messages, isTyping, onSelectOption, onSuggestionClick },
  ref
) {
  return (
    <div
      ref={ref}
      className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3 sm:space-y-4 overscroll-y-contain"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {messages.map((m) => {
        if (m.role === "user") {
          return (
            <UserBubble key={m.id} text={m.text} timestamp={m.timestamp} />
          );
        }
        if (m.role === "ai") {
          return (
            <AIBubble
              key={m.id}
              text={m.text}
              timestamp={m.timestamp}
              suggestions={m.suggestions}
              onSuggestionClick={onSuggestionClick}
            />
          );
        }
        return (
          <MCQBlock
            key={m.id}
            id={m.id}
            question={m.question}
            options={m.options}
            selectedIndex={m.selectedIndex}
            onSelect={(idx) => onSelectOption(m.id, idx)}
          />
        );
      })}

      {isTyping && <TypingIndicator />}
    </div>
  );
});

/* Composer (fixed at bottom of page container) */
function Composer({
  value,
  onChange,
  onSend,
  onFocusInput,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onFocusInput: () => void;
}) {
  return (
    <div className="pt-2">
      <div
        className="flex items-center gap-2 sm:gap-3 bg-[#F4F4F4] dark:bg-[#0E1117] border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] p-2 sm:p-3"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          onFocus={onFocusInput}
          placeholder="Type your message..."
          className="flex-1 bg-white dark:bg-[#141922] text-black dark:text-white placeholder-black/60 dark:placeholder-white/60 px-3 sm:px-4 py-3 border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] focus:outline-none text-sm"
        />
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center bg-[#0A74F0] text-white disabled:opacity-60 border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-transform"
          aria-label="Send"
          title="Send"
        >
          <PaperPlaneIcon />
        </button>
      </div>
    </div>
  );
}

/* Message Bubbles */
function AIBubble({
  text,
  timestamp,
  suggestions,
  onSuggestionClick,
}: {
  text: string;
  timestamp: number;
  suggestions?: string[];
  onSuggestionClick: (s: string) => void;
}) {
  return (
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="shrink-0">
        <RobotIcon />
      </div>
      <div className="max-w-[85%] sm:max-w-[70%]">
        <div className="bg-[#ECECEC] dark:bg-[#171C24] border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] p-3 sm:p-4">
          <p className="font-bold text-xs sm:text-sm">AI</p>
          <p className="mt-1 text-sm">{text}</p>

          {!!suggestions?.length && (
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={`${i}-${s}`}
                  onClick={() => onSuggestionClick(s)}
                  className="text-xs sm:text-sm bg-white dark:bg-[#0E1117] border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] px-3 py-1.5 font-bold active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-transform"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-xs opacity-60 mt-1">{fmtTime(timestamp)}</p>
      </div>
    </div>
  );
}

function UserBubble({ text, timestamp }: { text: string; timestamp: number }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] sm:max-w-[70%]">
        <div className="bg-[#0A74F0] text-white border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] p-3 sm:p-4">
          <p className="font-bold text-xs sm:text-sm">You</p>
          <p className="mt-1 text-sm">{text}</p>
        </div>
        <p className="text-right text-xs opacity-60 mt-1">{fmtTime(timestamp)}</p>
      </div>
    </div>
  );
}

/* MCQ Block */
function MCQBlock({
  id,
  question,
  options,
  selectedIndex,
  onSelect,
}: {
  id: string;
  question: string;
  options: string[];
  selectedIndex?: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="shrink-0">
        <RobotIcon />
      </div>
      <div className="w-full max-w-[700px] bg-[#ECECEC] dark:bg-[#171C24] border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] p-3 sm:p-4">
        <p className="font-bold text-xs sm:text-sm mb-2">Checkpoint</p>
        <p className="mb-3 text-sm">{question}</p>
        <div className="space-y-2">
          {options.map((opt, idx) => {
            const selected = selectedIndex === idx;
            return (
              <button
                key={`${id}-${idx}`}
                onClick={() => onSelect(idx)}
                className={`w-full text-left px-3 sm:px-4 py-2.5 border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] font-bold text-sm transition-transform active:shadow-none active:translate-x-[4px] active:translate-y-[4px] ${
                  selected ? "bg-[#FFD700]" : "bg-white dark:bg-[#0E1117] text-black dark:text-white"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Typing Indicator */
function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="shrink-0">
        <RobotIcon />
      </div>
      <div className="bg-[#ECECEC] dark:bg-[#171C24] border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] px-4 py-3">
        <div className="flex gap-1">
          <Dot />
          <Dot delay="150ms" />
          <Dot delay="300ms" />
        </div>
      </div>
    </div>
  );
}

/* Icons & Illustration */
function BackArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="fill-none stroke-black dark:stroke-white">
      <path d="M15 18l-6-6 6-6" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function PaperPlaneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="fill-black dark:fill-white">
      <path d="M2 21l20-9L2 3l4 7 8 2-8 2-4 7z" />
    </svg>
  );
}

function RobotIcon() {
  return (
    <div className="h-9 w-9 sm:h-10 sm:w-10 bg-white dark:bg-[#141922] border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] flex items-center justify-center">
      <svg width="18" height="18" viewBox="0 0 24 24" className="fill-black dark:fill-white">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <circle cx="9" cy="12" r="1.5" className="fill-[#F4F4F4] dark:fill-[#0E1117]" />
        <circle cx="15" cy="12" r="1.5" className="fill-[#F4F4F4] dark:fill-[#0E1117]" />
        <rect x="11" y="3" width="2" height="3" />
      </svg>
    </div>
  );
}

function BrainSparkSVG() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 120 120"
      className="border-2 border-black shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.55)] bg-white dark:bg-[#0E1117]"
    >
      <rect x="8" y="8" width="104" height="104" className="fill-[#F4F4F4] dark:fill-[#0E1117]" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="28" width="28" height="28" fill="#0A74F0" stroke="currentColor" strokeWidth="2" />
      <rect x="64" y="28" width="28" height="28" fill="#FFD700" stroke="currentColor" strokeWidth="2" />
      <rect x="46" y="64" width="28" height="28" className="fill-[#ECECEC] dark:fill-[#171C24]" stroke="currentColor" strokeWidth="2" />
      <path d="M62 20 L54 44 L66 44 L58 68 L86 36 L70 36 L78 20 Z" fill="#34D399" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/* Small utils */
function fmtTime(ts: number) {
  const d = new Date(ts);
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="inline-block h-2 w-2 bg-black dark:bg-white"
      style={{
        marginRight: 6,
        animation: "fq-bounce 1s infinite",
        animationDelay: delay,
        border: "2px solid currentColor",
        boxShadow: "4px 4px 0px currentColor",
      }}
    />
  );
}

/* Keyframes for typing indicator */
if (typeof document !== "undefined") {
  const id = "fq-bounce-keyframes";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes fq-bounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-4px); }
      }
    `;
    document.head.appendChild(style);
  }
}
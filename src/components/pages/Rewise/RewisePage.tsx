"use client";
import { useEffect, useMemo, useRef, useState, forwardRef, useLayoutEffect } from "react";

/* Types */
type Mode = "topic" | "chat" | "summary";

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

type SummaryData = {
  topic: string;
  score: number;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
  examReadiness: "Ready" | "Needs Review" | "More Practice";
};

/* Constants */
const DEFAULT_SESSION_DURATION = 15 * 60; // 15 minutes

/* Page */
export default function RewisePage() {
  const [mode, setMode] = useState<Mode>("topic");
  const [topic, setTopic] = useState("");
  const [sessionDuration, setSessionDuration] = useState(DEFAULT_SESSION_DURATION);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SESSION_DURATION);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);

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
  const beginSession = (duration: number) => {
    if (!topic.trim()) return;
    setSessionDuration(duration);
    setTimeLeft(duration);
    setMode("chat");

    const t = Date.now();
    setMessages([
      {
        id: "ai-1",
        role: "ai",
        text: `Great—let’s do a focused ${duration / 60}‑minute spar on “${topic.trim()}”. I’ll quiz you with quick checks and follow‑ups.`,
        suggestions: ["Give me a timeline", "Key causes", "Definitions"],
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
        ],
        timestamp: t + 1,
      },
    ]);
  };

  // End session and generate summary
  const endSession = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // Mock summary generation
    setSummaryData({
      topic: topic,
      score: 7,
      feedback: "You have a solid grasp of the core concepts but struggle with connecting them to broader historical events. Focus on the 'why' behind the facts.",
      strengths: ["Good recall of key figures.", "Understood the main timeline."],
      weaknesses: ["Connecting causes and effects.", "Nuance in definitions."],
      examReadiness: "Needs Review",
    });
    setMode("summary");
  };

  // Reset to start screen
  const resetSession = () => {
    setMode("topic");
    setTopic("");
    setMessages([]);
    setInput("");
    setIsTyping(false);
    setSummaryData(null);
    setSessionDuration(DEFAULT_SESSION_DURATION);
    setTimeLeft(DEFAULT_SESSION_DURATION);
  };

  // Timer
  useEffect(() => {
    if (mode !== "chat" || sessionDuration === 0) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          endSession(); // Automatically end session when time is up
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
  }, [mode, sessionDuration]);

  // Auto-scroll chat log on new content
  useEffect(() => {
    if (mode !== "chat") return;
    scrollToBottom(true);
  }, [messages, isTyping, mode]);

  // Better snap when switching into chat or when viewport changes
  useLayoutEffect(() => {
    if (mode !== "chat") return;
    scrollToBottom(false);
    const onResize = () => scrollToBottom(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mode]);

  const mmss = useMemo(() => {
    if (sessionDuration === 0) return "∞";
    const m = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const s = (timeLeft % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [timeLeft, sessionDuration]);

  const progressPct = useMemo(() => {
    if (sessionDuration === 0) return 0; // No progress for unlimited time
    return Math.max(0, Math.min(100, Math.round(((sessionDuration - timeLeft) / sessionDuration) * 100)));
  }, [timeLeft, sessionDuration]);

  const handleSend = (custom?: string) => {
    const text = (custom ?? input).trim();
    if (!text) return;

    const now = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: `user-${now}`, role: "user", text, timestamp: now },
    ]);
    setInput("");

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
    <div className="h-[100dvh] w-full overflow-hidden bg-[#F4F4F4] dark:bg-[#111] text-black dark:text-white px-3 sm:px-4 py-3 font-['Inter',sans-serif]">
      <div className="max-w-4xl mx-auto h-full flex flex-col gap-3">
        <Header
          mode={mode}
          timeLabel={mode === "topic" ? "Setup" : mmss}
          progress={mode === "chat" && sessionDuration > 0 ? progressPct : undefined}
          onBack={() => window.history.back()}
          onEnd={endSession}
        />

        {mode === "topic" && (
          <TopicEntry
            topic={topic}
            setTopic={setTopic}
            duration={sessionDuration}
            setDuration={setSessionDuration}
            onStart={() => beginSession(sessionDuration)}
          />
        )}

        {mode === "chat" && (
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

        {mode === "summary" && summaryData && (
          <SummaryScreen summary={summaryData} onRestart={resetSession} />
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
  const shadowClass = "shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#444]";
  const activeClass = "active:shadow-none active:translate-x-[4px] active:translate-y-[4px] dark:active:translate-x-0 dark:active:translate-y-0 dark:active:scale-[0.98]";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {mode === "topic" ? (
          <button
            onClick={onBack}
            className={`flex items-center gap-2 bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-500 ${shadowClass} px-3 py-2 font-bold ${activeClass} transition-transform text-sm`}
          >
            <BackArrowIcon />
            Back
          </button>
        ) : (
          <button
            onClick={onEnd}
            className={`bg-[#EF4444] text-white border-2 border-black dark:border-zinc-500 ${shadowClass} px-3 py-2 font-bold ${activeClass} transition-transform text-sm`}
          >
            End Session
          </button>
        )}

        <div className={`bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-500 ${shadowClass} px-3 py-2 font-extrabold text-sm`}>
          {timeLabel}
        </div>
      </div>

      {mode === "chat" && typeof progress === "number" && (
        <div className={`w-full bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-500 ${shadowClass} h-3 relative overflow-hidden`}>
          <div
            className="h-full bg-[#0A74F0]"
            style={{ width: `${progress}%`, transition: "width 300ms ease" }}
          />
        </div>
      )}
    </div>
  );
}

/* Topic Entry */
function TopicEntry({
  topic,
  setTopic,
  duration,
  setDuration,
  onStart,
}: {
  topic: string;
  setTopic: (v: string) => void;
  duration: number;
  setDuration: (d: number) => void;
  onStart: () => void;
}) {
  const timeOptions = [
    { label: "10 min", value: 10 * 60 },
    { label: "15 min", value: 15 * 60 },
    { label: "20 min", value: 20 * 60 },
    { label: "No Limit", value: 0 },
  ];
  const suggestions = ["Photosynthesis", "The Gupta Empire", "Trigonometry", "WWII causes"];
  const shadowClass = "shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#444]";
  const activeClass = "active:shadow-none active:translate-x-[4px] active:translate-y-[4px] dark:active:translate-x-0 dark:active:translate-y-0 dark:active:scale-[0.98]";
  const smallActiveClass = "active:shadow-none active:translate-x-[2px] active:translate-y-[2px] dark:active:translate-x-0 dark:active:translate-y-0 dark:active:scale-[0.98]";
  const smallShadowClass = "shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#444]";

  return (
    <div className="flex-1 min-h-0 flex items-center justify-center">
      <div className={`w-full max-w-xl bg-white/50 dark:bg-zinc-900/80 border-2 border-black dark:border-zinc-500 ${shadowClass} p-5 sm:p-6`}>
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <div className="shrink-0"><BrainSparkSVG /></div>
          <div>
            <h1 className="text-lg sm:text-2xl font-extrabold leading-tight">Start a Spar Session</h1>
            <p className="text-xs sm:text-sm opacity-80">Enter a topic. We’ll quiz, nudge, and sharpen your recall.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onStart()}
            placeholder="e.g., The Gupta Empire"
            className={`flex-1 bg-white dark:bg-zinc-900 text-black dark:text-white placeholder-black/60 dark:placeholder-white/60 px-3 py-3 border-2 border-black dark:border-zinc-500 ${shadowClass} focus:outline-none focus:ring-2 dark:focus:ring-blue-500 focus:ring-blue-600 text-sm`}
          />
          <button
            onClick={onStart}
            className={`whitespace-nowrap bg-[#FFD700] text-black border-2 border-black dark:border-zinc-500 ${shadowClass} px-4 sm:px-5 py-3 font-extrabold ${activeClass} transition-transform text-sm`}
          >
            Start
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm font-bold mb-2">Duration:</p>
          <div className="grid grid-cols-4 gap-2">
            {timeOptions.map(opt => (
              <button
                key={opt.label}
                onClick={() => setDuration(opt.value)}
                className={`text-xs sm:text-sm border-2 border-black dark:border-zinc-600 ${smallShadowClass} ${smallActiveClass} px-2 py-2 font-bold transition-all ${duration === opt.value ? 'bg-[#0A74F0] text-white dark:border-blue-500' : 'bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm font-bold">Suggestions:</p>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setTopic(s)}
              className={`text-xs sm:text-sm bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 border-2 border-black dark:border-zinc-600 ${smallShadowClass} px-3 py-1.5 font-bold shrink-0 ${smallActiveClass} transition-all`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Session Summary Screen */
function SummaryScreen({ summary, onRestart }: { summary: SummaryData; onRestart: () => void }) {
  const shadowClass = "shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#444]";
  const activeClass = "active:shadow-none active:translate-x-[4px] active:translate-y-[4px] dark:active:translate-x-0 dark:active:translate-y-0 dark:active:scale-[0.98]";
  const readinessColor = {
    "Ready": "bg-green-500",
    "Needs Review": "bg-yellow-500",
    "More Practice": "bg-red-500",
  }[summary.examReadiness];

  return (
    <div className="flex-1 min-h-0 flex items-center justify-center">
      <div className={`w-full max-w-2xl bg-white/50 dark:bg-zinc-900/80 border-2 border-black dark:border-zinc-500 ${shadowClass} p-5 sm:p-6`}>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center">Session Report</h1>
        <p className="text-center text-sm opacity-60 mb-4">Topic: {summary.topic}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold mb-2">Overall Score</p>
            <div className={`relative h-32 w-32 flex items-center justify-center font-extrabold text-4xl border-4 border-black dark:border-2 dark:border-zinc-400 rounded-full ${shadowClass}`}>
              {summary.score}<span className="text-lg opacity-70">/10</span>
            </div>
            <div className={`mt-4 px-3 py-1 text-sm font-bold text-black ${readinessColor} border-2 border-black dark:border-zinc-500 ${shadowClass}`}>
              {summary.examReadiness}
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="font-bold flex items-center gap-2"><CheckIcon /> Strengths</h3>
              <ul className="list-disc list-inside text-sm pl-2 mt-1 space-y-1 opacity-90">
                {summary.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-bold flex items-center gap-2"><CrossIcon /> Weaknesses</h3>
              <ul className="list-disc list-inside text-sm pl-2 mt-1 space-y-1 opacity-90">
                {summary.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className={`mt-5 bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-500 ${shadowClass} p-4`}>
          <h3 className="font-bold text-sm mb-1">AI Feedback</h3>
          <p className="text-sm opacity-90">{summary.feedback}</p>
        </div>

        <button
          onClick={onRestart}
          className={`w-full mt-5 bg-[#FFD700] text-black border-2 border-black dark:border-zinc-500 ${shadowClass} px-5 py-3 font-extrabold ${activeClass} transition-transform text-sm`}
        >
          Start Another Session
        </button>
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
          return <UserBubble key={m.id} text={m.text} timestamp={m.timestamp} />;
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

/* Composer */
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
  const shadowClass = "shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#444]";
  const activeClass = "active:shadow-none active:translate-x-[4px] active:translate-y-[4px] dark:active:translate-x-0 dark:active:translate-y-0 dark:active:scale-[0.98]";

  return (
    <div className="pt-2">
      <div
        className={`flex items-center gap-2 sm:gap-3 bg-[#F4F4F4] dark:bg-[#111] border-2 border-black dark:border-t dark:border-zinc-500 ${shadowClass} p-2 sm:p-3`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          onFocus={onFocusInput}
          placeholder="Type your message..."
          className={`flex-1 bg-white dark:bg-zinc-900 text-black dark:text-white placeholder-black/60 dark:placeholder-white/60 px-3 sm:px-4 py-3 border-2 border-black dark:border-zinc-500 ${shadowClass} focus:outline-none focus:ring-2 dark:focus:ring-blue-500 focus:ring-blue-600 text-sm`}
        />
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className={`h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center bg-[#0A74F0] text-white disabled:opacity-60 border-2 border-black dark:border-zinc-500 ${shadowClass} ${activeClass} transition-transform`}
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
  const shadowClass = "shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#444]";
  const smallShadowClass = "shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#444]";
  const smallActiveClass = "active:shadow-none active:translate-x-[2px] active:translate-y-[2px] dark:active:translate-x-0 dark:active:translate-y-0 dark:active:scale-[0.98]";

  return (
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="shrink-0"><RobotIcon /></div>
      <div className="max-w-[85%] sm:max-w-[70%]">
        <div className={`bg-[#ECECEC] dark:bg-zinc-900 border-2 border-black dark:border-zinc-500 ${shadowClass} p-3 sm:p-4`}>
          <p className="font-bold text-xs sm:text-sm">AI</p>
          <p className="mt-1 text-sm opacity-90">{text}</p>
          {!!suggestions?.length && (
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={`${i}-${s}`}
                  onClick={() => onSuggestionClick(s)}
                  className={`text-xs sm:text-sm bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 border-2 border-black dark:border-zinc-600 ${smallShadowClass} px-3 py-1.5 font-bold ${smallActiveClass} transition-all`}
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
  const shadowClass = "shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#444]";
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] sm:max-w-[70%]">
        <div className={`bg-[#0A74F0] text-white border-2 border-black dark:border-zinc-500 ${shadowClass} p-3 sm:p-4`}>
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
  const shadowClass = "shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#444]";
  const activeClass = "active:shadow-none active:translate-x-[4px] active:translate-y-[4px] dark:active:translate-x-0 dark:active:translate-y-0 dark:active:scale-[0.98]";

  return (
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="shrink-0"><RobotIcon /></div>
      <div className={`w-full max-w-[700px] bg-[#ECECEC] dark:bg-zinc-900 border-2 border-black dark:border-zinc-500 ${shadowClass} p-3 sm:p-4`}>
        <p className="font-bold text-xs sm:text-sm mb-2">Checkpoint</p>
        <p className="mb-3 text-sm opacity-90">{question}</p>
        <div className="space-y-2">
          {options.map((opt, idx) => {
            const selected = selectedIndex === idx;
            return (
              <button
                key={`${id}-${idx}`}
                onClick={() => onSelect(idx)}
                disabled={selectedIndex !== undefined}
                className={`w-full text-left px-3 sm:px-4 py-2.5 border-2 border-black dark:border-zinc-600 ${shadowClass} font-bold text-sm transition-all disabled:cursor-not-allowed ${!selected && selectedIndex !== undefined ? 'opacity-60' : ''} ${activeClass} ${selected ? "bg-[#FFD700] text-black dark:border-yellow-400" : "bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 text-black dark:text-white"}`}
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
      <div className="shrink-0"><RobotIcon /></div>
      <div className="bg-[#ECECEC] dark:bg-zinc-900 border-2 border-black dark:border-zinc-500 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#444] px-4 py-3">
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
    <svg width="18" height="18" viewBox="0 0 24 24" className="fill-none stroke-current">
      <path d="M15 18l-6-6 6-6" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function PaperPlaneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
      <path d="M2 21l20-9L2 3l4 7 8 2-8 2-4 7z" />
    </svg>
  );
}

function RobotIcon() {
  const shadowClass = "shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#444]";
  return (
    <div className={`h-9 w-9 sm:h-10 sm:w-10 bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-500 ${shadowClass} flex items-center justify-center`}>
      <svg width="18" height="18" viewBox="0 0 24 24" className="fill-black dark:fill-white">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <circle cx="9" cy="12" r="1.5" className="fill-[#F4F4F4] dark:fill-zinc-900" />
        <circle cx="15" cy="12" r="1.5" className="fill-[#F4F4F4] dark:fill-zinc-900" />
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
      className="border-2 border-black dark:border-zinc-500 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#444] bg-white dark:bg-zinc-900"
    >
      <rect x="8" y="8" width="104" height="104" className="fill-[#F4F4F4] dark:fill-zinc-900" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="28" width="28" height="28" fill="#0A74F0" stroke="currentColor" strokeWidth="2" />
      <rect x="64" y="28" width="28" height="28" fill="#FFD700" stroke="currentColor" strokeWidth="2" />
      <rect x="46" y="64" width="28" height="28" className="fill-[#ECECEC] dark:fill-zinc-800" stroke="currentColor" strokeWidth="2" />
      <path d="M62 20 L54 44 L66 44 L58 68 L86 36 L70 36 L78 20 Z" fill="#34D399" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

/* Small utils */
function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 bg-black dark:bg-white rounded-full"
      style={{
        animation: "fq-bounce 1.2s infinite ease-in-out",
        animationDelay: delay,
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
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1.0); }
      }
    `;
    document.head.appendChild(style);
  }
}
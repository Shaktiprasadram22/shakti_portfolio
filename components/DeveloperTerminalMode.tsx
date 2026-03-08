"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Terminal, X } from "lucide-react";
import {
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type TerminalEntry = {
  id: number;
  kind: "command" | "output";
  text: string;
};

type TypingJob = {
  entryId: number;
  fullText: string;
};

const initialOutput =
  "Developer Terminal initialized.\nType 'help' to explore Shakti's profile through commands.";

function getCommandOutput(command: string) {
  switch (command) {
    case "help":
      return [
        "Available commands:",
        "about      - Profile summary",
        "skills     - Technical strengths",
        "projects   - Featured projects",
        "contact    - Reach out details",
        "clear      - Clear terminal output",
      ].join("\n");
    case "about":
      return [
        "Shakti Prasad Ram",
        "Backend Developer | AI Systems Builder",
        "Location: Jalandhar, Punjab, India",
        "Focus: scalable APIs, distributed systems, and AI-powered applications.",
      ].join("\n");
    case "skills":
      return [
        "Core Skills:",
        "- Node.js + Express architecture",
        "- System Design and microservices",
        "- Distributed systems and concurrency",
        "- AI/RAG pipelines (LangChain, FAISS, ChromaDB)",
        "- Databases: MongoDB, PostgreSQL, MySQL, Redis",
      ].join("\n");
    case "projects":
      return [
        "Featured Projects:",
        "- SentinelDataCore",
        "- UMS Chatbot",
        "- Multi-Threaded Proxy Server with LRU Caching",
        "- TradeNexus",
      ].join("\n");
    case "contact":
      return [
        "Contact:",
        "Email: shaktiram.coc@gmail.com",
        "Phone: +91 8917583070",
        "GitHub: github.com/Shaktiprasadram22",
        "LinkedIn: linkedin.com/in/shaktiram22",
      ].join("\n");
    case "whoami":
      return "shakti@portfolio: backend-dev + ai-systems-builder";
    default:
      return `Command not found: ${command}\nType 'help' for available commands.`;
  }
}

export function DeveloperTerminalMode() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([
    { id: 1, kind: "output", text: initialOutput },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [typingJob, setTypingJob] = useState<TypingJob | null>(null);

  const nextIdRef = useRef(2);
  const queueRef = useRef<TypingJob[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const prompt = useMemo(() => "shakti@portfolio:~$", []);

  const enqueueOutput = (fullText: string) => {
    const entryId = nextIdRef.current;
    nextIdRef.current += 1;
    setEntries((prev) => [...prev, { id: entryId, kind: "output", text: "" }]);

    const job: TypingJob = { entryId, fullText };
    if (!typingJob && queueRef.current.length === 0) {
      setTypingJob(job);
      return;
    }

    queueRef.current.push(job);
  };

  const pushCommand = (command: string) => {
    const id = nextIdRef.current;
    nextIdRef.current += 1;
    setEntries((prev) => [...prev, { id, kind: "command", text: `${prompt} ${command}` }]);
  };

  const executeCommand = (rawInput: string) => {
    const command = rawInput.trim().toLowerCase();
    if (!command) {
      return;
    }

    pushCommand(command);
    setHistory((prev) => [...prev, command]);
    setHistoryIndex(null);

    if (command === "clear") {
      queueRef.current = [];
      setTypingJob(null);
      setEntries([]);
      return;
    }

    enqueueOutput(getCommandOutput(command));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input;
    setInput("");
    executeCommand(command);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) {
        return;
      }
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (history.length === 0 || historyIndex === null) {
        return;
      }
      if (historyIndex >= history.length - 1) {
        setHistoryIndex(null);
        setInput("");
        return;
      }
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }
  };

  useEffect(() => {
    if (typingJob || queueRef.current.length === 0) {
      return;
    }
    const next = queueRef.current.shift();
    if (next) {
      setTypingJob(next);
    }
  }, [typingJob, entries.length]);

  useEffect(() => {
    if (!typingJob) {
      return;
    }

    let index = 0;
    const chunk = Math.max(1, Math.floor(typingJob.fullText.length / 90));
    const interval = window.setInterval(() => {
      index = Math.min(typingJob.fullText.length, index + chunk);
      const currentText = typingJob.fullText.slice(0, index);
      setEntries((prev) =>
        prev.map((entry) => (entry.id === typingJob.entryId ? { ...entry, text: currentText } : entry))
      );

      if (index >= typingJob.fullText.length) {
        window.clearInterval(interval);
        setTypingJob(null);
      }
    }, 14);

    return () => window.clearInterval(interval);
  }, [typingJob]);

  useEffect(() => {
    if (!open) {
      return;
    }
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);

  useEffect(() => {
    if (!outputRef.current) {
      return;
    }
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [entries]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="dev-terminal-trigger fixed bottom-6 right-6 z-[80] inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium backdrop-blur-md"
      >
        <Terminal size={16} />
        Open Dev Terminal
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="terminal-overlay fixed inset-0 z-[90] backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="terminal-shell mx-auto mt-8 flex h-[85vh] w-[94vw] max-w-5xl flex-col overflow-hidden rounded-2xl"
            >
              <div className="terminal-header flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2 text-sm terminal-header-text">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-heading">Developer Terminal Mode</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="terminal-close rounded-md p-1.5 transition"
                  aria-label="Close terminal"
                >
                  <X size={15} />
                </button>
              </div>

              <div ref={outputRef} className="terminal-output flex-1 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed">
                {entries.map((entry) => (
                  <pre
                    key={entry.id}
                    className={`whitespace-pre-wrap break-words ${
                      entry.kind === "command" ? "terminal-command" : "terminal-text"
                    }`}
                  >
                    {entry.text}
                  </pre>
                ))}
              </div>

              <form onSubmit={onSubmit} className="terminal-input-wrap px-4 py-3">
                <label className="flex items-center gap-2 font-mono text-sm">
                  <span className="terminal-prompt">{prompt}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    className="terminal-input w-full bg-transparent outline-none"
                    placeholder="Type a command..."
                  />
                  <span className="terminal-cursor" />
                </label>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

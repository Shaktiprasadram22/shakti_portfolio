"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, FileCode2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { projects } from "@/lib/data";

const keywordByLanguage: Record<string, Set<string>> = {
  javascript: new Set([
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "try",
    "catch",
    "await",
    "async",
    "class",
    "new",
    "import",
    "from",
    "export",
    "for",
    "while",
    "null",
    "undefined",
  ]),
  typescript: new Set([
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "try",
    "catch",
    "await",
    "async",
    "class",
    "new",
    "import",
    "from",
    "export",
    "for",
    "while",
    "null",
    "undefined",
    "type",
    "interface",
    "private",
    "public",
  ]),
  python: new Set([
    "def",
    "return",
    "if",
    "elif",
    "else",
    "for",
    "while",
    "in",
    "from",
    "import",
    "class",
    "try",
    "except",
    "True",
    "False",
    "None",
    "with",
  ]),
  cpp: new Set([
    "void",
    "int",
    "auto",
    "struct",
    "class",
    "if",
    "else",
    "while",
    "for",
    "return",
    "const",
    "std",
    "include",
    "nullopt",
    "optional",
  ]),
};

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightLine(line: string, language: string) {
  const keywords = keywordByLanguage[language] ?? new Set<string>();
  const regex =
    /("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`|\/\/.*|#.*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b)/g;

  let lastIndex = 0;
  let html = "";
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    const token = match[0];
    const start = match.index;
    html += escapeHtml(line.slice(lastIndex, start));

    if (token.startsWith("//") || token.startsWith("#")) {
      html += `<span class="text-zinc-500 italic">${escapeHtml(token)}</span>`;
    } else if (
      token.startsWith('"') ||
      token.startsWith("'") ||
      token.startsWith("`")
    ) {
      html += `<span class="text-emerald-300">${escapeHtml(token)}</span>`;
    } else if (/^\d/.test(token)) {
      html += `<span class="text-amber-300">${escapeHtml(token)}</span>`;
    } else if (keywords.has(token)) {
      html += `<span class="text-sky-300">${escapeHtml(token)}</span>`;
    } else {
      html += `<span class="text-zinc-200">${escapeHtml(token)}</span>`;
    }

    lastIndex = regex.lastIndex;
  }

  html += escapeHtml(line.slice(lastIndex));
  return html.length > 0 ? html : "&nbsp;";
}

export function ProjectCodeWindow() {
  const projectsWithSnippets = useMemo(
    () => projects.filter((project) => project.snippets && project.snippets.length > 0),
    []
  );
  const [activeProjectTitle, setActiveProjectTitle] = useState(
    projectsWithSnippets[0]?.title ?? ""
  );
  const activeProject =
    projectsWithSnippets.find((project) => project.title === activeProjectTitle) ??
    projectsWithSnippets[0];
  const firstSnippetId = activeProject?.snippets?.[0]?.id ?? "";

  const [activeSnippetId, setActiveSnippetId] = useState(
    activeProject?.snippets?.[0]?.id ?? ""
  );
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  useEffect(() => {
    setActiveSnippetId(firstSnippetId);
  }, [firstSnippetId]);

  const activeSnippet =
    activeProject?.snippets?.find((snippet) => snippet.id === activeSnippetId) ??
    activeProject?.snippets?.[0];

  const copySnippet = async () => {
    if (!activeSnippet) return;
    await navigator.clipboard.writeText(activeSnippet.code);
    setCopiedSnippetId(activeSnippet.id);
    window.setTimeout(() => setCopiedSnippetId(null), 1400);
  };

  const snippetLines = activeSnippet ? activeSnippet.code.split("\n") : [];

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-950/70 p-5 shadow-glow">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-sky-300">Interactive Code Window</p>
          <h3 className="font-heading text-2xl text-white">Implementation Highlights</h3>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {projectsWithSnippets.map((project) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setActiveProjectTitle(project.title)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              activeProjectTitle === project.title
                ? "border-sky-300/60 bg-sky-400/20 text-sky-100"
                : "border-white/15 bg-white/5 text-zinc-300 hover:border-white/35 hover:text-zinc-100"
            }`}
          >
            {project.title}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {activeProject?.snippets?.map((snippet) => (
          <button
            key={snippet.id}
            type="button"
            onClick={() => setActiveSnippetId(snippet.id)}
            className={`rounded-lg border px-3 py-2 text-xs transition ${
              activeSnippet?.id === snippet.id
                ? "border-teal-300/60 bg-teal-400/15 text-teal-100"
                : "border-white/15 bg-zinc-900/70 text-zinc-300 hover:border-white/35 hover:text-zinc-100"
            }`}
          >
            {snippet.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSnippet && (
          <motion.div
            key={activeSnippet.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950/85 px-3 py-2">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 inline-flex items-center gap-1">
                  <FileCode2 size={13} />
                  {activeSnippet.title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => void copySnippet()}
                className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-zinc-900/90 px-2.5 py-1 text-xs text-zinc-200 transition hover:border-white/40"
              >
                {copiedSnippetId === activeSnippet.id ? <Check size={12} /> : <Copy size={12} />}
                {copiedSnippetId === activeSnippet.id ? "Copied" : "Copy"}
              </button>
            </div>

            {activeSnippet.description && (
              <div className="border-b border-white/10 px-3 py-2 text-xs text-zinc-400">
                {activeSnippet.description}
              </div>
            )}

            <div className="max-h-[420px] overflow-auto p-3 font-mono text-xs leading-6">
              {snippetLines.map((line, index) => (
                <div key={`${activeSnippet.id}-line-${index}`} className="grid grid-cols-[40px,1fr]">
                  <span className="select-none pr-3 text-right text-zinc-500">{index + 1}</span>
                  <code
                    className="whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={{
                      __html: highlightLine(line, activeSnippet.language),
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

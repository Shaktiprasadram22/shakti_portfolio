"use client";

import { motion } from "framer-motion";
import { Play, RefreshCw, Server } from "lucide-react";
import { useMemo, useState } from "react";
import { fadeInUp, sectionViewport } from "@/lib/animations";

type ApiEndpoint = {
  id: string;
  name: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  bodyTemplate?: string;
};

const endpoints: ApiEndpoint[] = [
  {
    id: "stocks",
    name: "Stock Feed",
    method: "GET",
    path: "/api/stocks",
    description: "Returns live-like market snapshot data similar to SentinelDataCore output.",
  },
  {
    id: "news",
    name: "News Feed",
    method: "GET",
    path: "/api/news",
    description: "Returns backend-generated news objects for analytics and dashboard streams.",
  },
  {
    id: "auth",
    name: "Auth Login",
    method: "POST",
    path: "/api/auth",
    description: "Validates credentials and returns token payload. Demo credentials are prefilled.",
    bodyTemplate: JSON.stringify(
      {
        email: "demo@portfolio.dev",
        password: "portfolio123",
      },
      null,
      2
    ),
  },
];

function highlightJson(json: string) {
  const escaped = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(
    /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          return `<span style="color:#7dd3fc">${match}</span>`;
        }
        return `<span style="color:#86efac">${match}</span>`;
      }
      if (/true|false/.test(match)) {
        return `<span style="color:#f9a8d4">${match}</span>`;
      }
      if (/null/.test(match)) {
        return `<span style="color:#fda4af">${match}</span>`;
      }
      return `<span style="color:#facc15">${match}</span>`;
    }
  );
}

function methodBadge(method: ApiEndpoint["method"]) {
  return method === "GET"
    ? "border-emerald-300/50 bg-emerald-400/15 text-emerald-200"
    : "border-amber-300/50 bg-amber-400/15 text-amber-100";
}

function statusColor(status: number | null) {
  if (status === null) {
    return "text-zinc-400";
  }
  if (status >= 200 && status < 300) {
    return "text-emerald-300";
  }
  if (status >= 400) {
    return "text-rose-300";
  }
  return "text-amber-300";
}

export function LiveApiPlayground() {
  const [activeId, setActiveId] = useState(endpoints[0].id);
  const activeEndpoint = useMemo(
    () => endpoints.find((endpoint) => endpoint.id === activeId) ?? endpoints[0],
    [activeId]
  );

  const [requestBody, setRequestBody] = useState(activeEndpoint.bodyTemplate ?? "");
  const [responseBody, setResponseBody] = useState<string>("");
  const [status, setStatus] = useState<number | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastEndpoint, setLastEndpoint] = useState(activeEndpoint.path);

  const responseMarkup = useMemo(() => {
    if (!responseBody) {
      return '<span style="color:#71717a">{\n  "message": "Run a request to inspect API output."\n}</span>';
    }
    return highlightJson(responseBody);
  }, [responseBody]);

  const runRequest = async (endpoint: ApiEndpoint, payload?: string) => {
    const body = payload ?? requestBody;
    const started = performance.now();
    setLoading(true);
    setLastEndpoint(endpoint.path);

    try {
      const init: RequestInit = {
        method: endpoint.method,
        headers: {
          Accept: "application/json",
        },
      };

      if (endpoint.method === "POST") {
        if (body.trim().length === 0) {
          setStatus(400);
          setResponseBody(JSON.stringify({ status: "error", message: "Request body is empty." }, null, 2));
          setLatencyMs(Number((performance.now() - started).toFixed(1)));
          return;
        }

        try {
          JSON.parse(body);
        } catch {
          setStatus(400);
          setResponseBody(
            JSON.stringify({ status: "error", message: "Invalid JSON in request body." }, null, 2)
          );
          setLatencyMs(Number((performance.now() - started).toFixed(1)));
          return;
        }

        init.headers = {
          ...init.headers,
          "Content-Type": "application/json",
        };
        init.body = body;
      }

      const response = await fetch(endpoint.path, init);
      const raw = await response.text();
      const duration = Number((performance.now() - started).toFixed(1));

      setStatus(response.status);
      setLatencyMs(duration);

      try {
        const parsed = JSON.parse(raw);
        setResponseBody(JSON.stringify(parsed, null, 2));
      } catch {
        setResponseBody(raw);
      }
    } catch {
      setStatus(500);
      setLatencyMs(Number((performance.now() - started).toFixed(1)));
      setResponseBody(
        JSON.stringify(
          {
            status: "error",
            message: "Request failed. Please retry.",
          },
          null,
          2
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const onSelectEndpoint = async (endpoint: ApiEndpoint) => {
    setActiveId(endpoint.id);
    const nextBody = endpoint.bodyTemplate ?? "";
    setRequestBody(nextBody);
    await runRequest(endpoint, nextBody);
  };

  return (
    <section id="playground" className="section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={fadeInUp}
        className="mb-10"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-sky-300">Live API Playground</p>
        <h2 className="font-heading text-3xl text-white md:text-4xl">Interactive Backend Demo</h2>
        <p className="mt-3 max-w-3xl text-sm text-zinc-400 md:text-base">
          Mini Postman-style interface to test production-like API endpoints and inspect real JSON payloads.
        </p>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-[0.95fr,1.05fr]">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          className="glass rounded-2xl p-5"
        >
          <h3 className="font-heading text-2xl text-zinc-100">Request Builder</h3>
          <p className="mt-2 text-sm text-zinc-400">Select an endpoint to send a live request instantly.</p>

          <div className="mt-5 space-y-3">
            {endpoints.map((endpoint) => {
              const active = endpoint.id === activeId;
              return (
                <button
                  key={endpoint.id}
                  type="button"
                  onClick={() => void onSelectEndpoint(endpoint)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-cyan-300/70 bg-cyan-400/15"
                      : "border-white/15 bg-zinc-900/65 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${methodBadge(endpoint.method)}`}
                    >
                      {endpoint.method}
                    </span>
                    <span className="text-xs text-zinc-500">{endpoint.path}</span>
                  </div>
                  <p className="mt-2 font-heading text-base text-zinc-100">{endpoint.name}</p>
                  <p className="mt-1 text-xs text-zinc-400">{endpoint.description}</p>
                </button>
              );
            })}
          </div>

          {activeEndpoint.method === "POST" && (
            <div className="mt-5">
              <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-zinc-400">Request Body</label>
              <textarea
                value={requestBody}
                onChange={(event) => setRequestBody(event.target.value)}
                rows={8}
                className="w-full rounded-xl border border-white/15 bg-zinc-950/80 px-3 py-2 font-mono text-xs text-zinc-200 outline-none transition focus:border-cyan-300"
              />
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void runRequest(activeEndpoint)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-teal-300 px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:opacity-70"
            >
              <Play size={14} />
              {loading ? "Sending..." : "Send Request"}
            </button>
            <button
              type="button"
              onClick={() => void runRequest(activeEndpoint)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/40"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          transition={{ delay: 0.08 }}
          className="glass rounded-2xl p-5"
        >
          <h3 className="font-heading text-2xl text-zinc-100">Response Viewer</h3>

          <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950/75 p-3">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className={`rounded-full border px-2 py-0.5 font-semibold ${methodBadge(activeEndpoint.method)}`}>
                {activeEndpoint.method}
              </span>
              <span className="font-mono text-zinc-300">{lastEndpoint}</span>
              <span className={`font-semibold ${statusColor(status)}`}>
                {status === null ? "Status: --" : `Status: ${status}`}
              </span>
              <span className="text-zinc-400">{latencyMs === null ? "-- ms" : `${latencyMs} ms`}</span>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/65 p-4">
            <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
              <Server size={14} />
              JSON Response
            </div>
            <pre className="max-h-[430px] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-zinc-950/90 p-4 font-mono text-xs leading-relaxed">
              <code dangerouslySetInnerHTML={{ __html: responseMarkup }} />
            </pre>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

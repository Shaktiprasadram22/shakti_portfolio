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
          return `<span class="json-key">${match}</span>`;
        }
        return `<span class="json-string">${match}</span>`;
      }
      if (/true|false/.test(match)) {
        return `<span class="json-boolean">${match}</span>`;
      }
      if (/null/.test(match)) {
        return `<span class="json-null">${match}</span>`;
      }
      return `<span class="json-number">${match}</span>`;
    }
  );
}

function methodBadge(method: ApiEndpoint["method"]) {
  return method === "GET" ? "method-badge method-get" : "method-badge method-post";
}

function statusColor(status: number | null) {
  if (status === null) {
    return "status-chip status-idle";
  }
  if (status >= 200 && status < 300) {
    return "status-chip status-ok";
  }
  if (status >= 400) {
    return "status-chip status-error";
  }
  return "status-chip status-warn";
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
      return '{\n  "message": "Run a request to inspect API output."\n}';
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
          className="playground-panel rounded-2xl p-5"
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
                  className={`endpoint-card w-full rounded-xl border p-4 text-left transition ${active ? "endpoint-card-active" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`${methodBadge(endpoint.method)} rounded-full px-2.5 py-1 text-[11px] font-semibold`}>
                      {endpoint.method}
                    </span>
                    <span className="endpoint-path text-xs">{endpoint.path}</span>
                  </div>
                  <p className="endpoint-title mt-2 font-heading text-base">{endpoint.name}</p>
                  <p className="endpoint-description mt-1 text-xs">{endpoint.description}</p>
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
                className="request-editor w-full rounded-xl border px-3 py-2 font-mono text-xs outline-none transition"
              />
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void runRequest(activeEndpoint)}
              disabled={loading}
              className="playground-btn playground-btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-70"
            >
              <Play size={14} />
              {loading ? "Sending..." : "Send Request"}
            </button>
            <button
              type="button"
              onClick={() => void runRequest(activeEndpoint)}
              disabled={loading}
              className="playground-btn playground-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm disabled:opacity-70"
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
          className="playground-panel rounded-2xl p-5"
        >
          <h3 className="font-heading text-2xl text-zinc-100">Response Viewer</h3>

          <div className="response-meta mt-4 rounded-xl p-3">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className={`${methodBadge(activeEndpoint.method)} rounded-full px-2.5 py-1 font-semibold`}>
                {activeEndpoint.method}
              </span>
              <span className="response-endpoint font-mono">{lastEndpoint}</span>
              <span className={statusColor(status)}>
                {status === null ? "Status: --" : `Status: ${status}`}
              </span>
              <span className="latency-chip">{latencyMs === null ? "-- ms" : `${latencyMs} ms`}</span>
            </div>
          </div>

          <div className="response-panel mt-4 rounded-xl p-4">
            <div className="mb-3 flex items-center gap-2 text-xs response-label">
              <Server size={14} />
              JSON Response
            </div>
            <pre className="response-json max-h-[430px] overflow-auto whitespace-pre-wrap break-words rounded-lg p-4 font-mono text-xs leading-relaxed">
              <code dangerouslySetInnerHTML={{ __html: responseMarkup }} />
            </pre>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Activity, AlertCircle, CalendarDays, Code2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fadeInUp, sectionViewport } from "@/lib/animations";

type HeatCell = {
  date: string;
  count: number;
};

type WeeklyPoint = {
  label: string;
  commits: number;
};

type LanguagePoint = {
  name: string;
  bytes: number;
  percentage: number;
};

type GitHubActivityPayload = {
  username: string;
  source: "github" | "fallback";
  generatedAt: string;
  stats: {
    publicRepos: number;
    stars: number;
    recentCommits: number;
  };
  heatmap: HeatCell[];
  weekly: WeeklyPoint[];
  languages: LanguagePoint[];
};

function heatColor(count: number, max: number) {
  if (count <= 0) return "bg-zinc-900/90 border-white/5";
  const ratio = max <= 0 ? 0 : count / max;
  if (ratio < 0.25) return "bg-cyan-500/25 border-cyan-300/20";
  if (ratio < 0.5) return "bg-cyan-400/45 border-cyan-300/40";
  if (ratio < 0.75) return "bg-teal-300/60 border-teal-200/55";
  return "bg-emerald-300/75 border-emerald-200/70";
}

export function GitHubActivity() {
  const [data, setData] = useState<GitHubActivityPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Track when section is in view to trigger animations
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/api/github-activity");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = (await response.json()) as GitHubActivityPayload;
        if (active) {
          setData(payload);
          setError(false);
          // Small delay then trigger inView so bars animate after data loads
          setTimeout(() => setInView(true), 100);
        }
      } catch {
        if (active) {
          setData(null);
          setError(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, []);

  const maxHeat = useMemo(() => {
    if (!data) return 0;
    return data.heatmap.reduce((max, cell) => Math.max(max, cell.count), 0);
  }, [data]);

  const filteredWeekly = useMemo(() => {
    if (!data) return [];
    const hasAny = data.weekly.some((w) => w.commits > 0);
    if (!hasAny) return data.weekly;
    return data.weekly.filter((w) => w.commits > 0);
  }, [data]);

  const maxWeekly = useMemo(() => {
    if (!filteredWeekly.length) return 0;
    return filteredWeekly.reduce(
      (max, point) => Math.max(max, point.commits),
      0,
    );
  }, [filteredWeekly]);

  return (
    <section id="github-activity" className="section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={fadeInUp}
        className="mb-10"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-emerald-300">
          GitHub Activity
        </p>
        <h2 className="font-heading text-3xl text-white md:text-4xl">
          Development Consistency Snapshot
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-zinc-400 md:text-base">
          Daily activity heatmap, commit trend, and language distribution from
          public GitHub activity.
        </p>
      </motion.div>

      {/* Error State */}
      {!loading && error && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-950/30 p-4 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            GitHub data load nahi ho saka.{" "}
            <code className="text-red-300">GITHUB_TOKEN</code> aur{" "}
            <code className="text-red-300">GITHUB_USERNAME</code> check karo{" "}
            <code className="text-red-300">.env.local</code> mein.
          </span>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.35fr,0.65fr]">
        {/* Heatmap */}
        <article className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-heading text-2xl text-zinc-100">
              Contribution Heatmap
            </h3>
            {data && (
              <span className="rounded-full border border-white/15 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300">
                @{data.username}
              </span>
            )}
          </div>

          {loading && (
            <div className="h-40 animate-pulse rounded-xl border border-white/10 bg-zinc-900/70" />
          )}
          {!loading && !data && (
            <div className="h-40 rounded-xl border border-white/10 bg-zinc-900/70" />
          )}
          {!loading && data && (
            <>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-950/70 p-3">
                <div className="grid min-w-[840px] grid-flow-col grid-rows-7 gap-1">
                  {data.heatmap.map((cell) => (
                    <div
                      key={cell.date}
                      title={`${cell.date}: ${cell.count} commit${cell.count === 1 ? "" : "s"}`}
                      className={`h-3 w-3 rounded-[3px] border ${heatColor(cell.count, maxHeat)} transition-colors duration-300`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
                      className={`h-3 w-3 rounded-[3px] border ${
                        level === 0
                          ? "bg-zinc-900/90 border-white/5"
                          : heatColor(level, 4).replace("/25", "/40")
                      }`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </>
          )}
        </article>

        {/* Key Stats */}
        <article className="glass rounded-2xl p-5">
          <h3 className="font-heading text-2xl text-zinc-100">Key Stats</h3>
          {loading && (
            <div className="mt-4 h-24 animate-pulse rounded-xl border border-white/10 bg-zinc-900/70" />
          )}
          {!loading && data && (
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-white/10 bg-zinc-950/75 p-3 text-sm text-zinc-300">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                  Public Repositories
                </p>
                <p className="mt-1 font-heading text-2xl text-zinc-100">
                  {data.stats.publicRepos}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-950/75 p-3 text-sm text-zinc-300">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                  Recent Commits (12 Weeks)
                </p>
                <p className="mt-1 font-heading text-2xl text-zinc-100">
                  {data.stats.recentCommits}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-950/75 p-3 text-sm text-zinc-300">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                  Total Stars
                </p>
                <p className="mt-1 font-heading text-2xl text-zinc-100">
                  {data.stats.stars}
                </p>
              </div>
            </div>
          )}
          {!loading && !data && (
            <div className="mt-4 space-y-3">
              {[
                "Public Repositories",
                "Recent Commits (12 Weeks)",
                "Total Stars",
              ].map((label) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-zinc-950/75 p-3"
                >
                  <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                    {label}
                  </p>
                  <p className="mt-1 font-heading text-2xl text-zinc-600">—</p>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Commit Frequency */}
        <article className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-sky-300" />
            <h3 className="font-heading text-xl text-zinc-100">
              Commit Frequency
            </h3>
          </div>
          {loading && (
            <div className="h-44 animate-pulse rounded-xl border border-white/10 bg-zinc-900/70" />
          )}
          {!loading && data && filteredWeekly.length > 0 && (
            <div className="flex h-48 items-end gap-2 rounded-xl border border-white/10 bg-zinc-950/70 p-3">
              {filteredWeekly.map((point, index) => {
                const heightPct =
                  maxWeekly > 0
                    ? Math.max(8, (point.commits / maxWeekly) * 100)
                    : 8;
                return (
                  <div
                    key={point.label}
                    className="flex h-full min-w-0 flex-1 flex-col"
                  >
                    {/* Use animate prop driven by inView state — no whileInView needed */}
                    <div className="flex flex-1 items-end">
                      <motion.div
                      initial={{ height: "0%", opacity: 0.4 }}
                      animate={
                        inView
                          ? { height: `${heightPct}%`, opacity: 1 }
                          : { height: "0%", opacity: 0.4 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: index * 0.06,
                        ease: "easeOut",
                      }}
                      title={`${point.label}: ${point.commits} commits`}
                      className="w-full rounded-md bg-gradient-to-t from-sky-500/70 to-teal-300/80 shadow-[0_0_20px_rgba(45,212,191,.25)]"
                      />
                    </div>
                    <span className="mt-2 text-center text-[10px] text-zinc-500">
                      {new Date(point.label).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {!loading && (!data || filteredWeekly.length === 0) && (
            <div className="h-48 rounded-xl border border-white/10 bg-zinc-950/70" />
          )}
        </article>

        {/* Language Usage */}
        <article className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-emerald-300" />
            <h3 className="font-heading text-xl text-zinc-100">
              Language Usage
            </h3>
          </div>
          {loading && (
            <div className="h-44 animate-pulse rounded-xl border border-white/10 bg-zinc-900/70" />
          )}
          {!loading && data && (
            <div className="space-y-3 rounded-xl border border-white/10 bg-zinc-950/70 p-4">
              {data.languages.map((language, index) => (
                <div key={language.name}>
                  <div className="mb-1 flex items-center justify-between text-xs text-zinc-300">
                    <span>{language.name}</span>
                    <span>{language.percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-900">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={
                        inView
                          ? { width: `${Math.max(4, language.percentage)}%` }
                          : { width: "0%" }
                      }
                      transition={{
                        duration: 0.5,
                        delay: index * 0.06,
                        ease: "easeOut",
                      }}
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && !data && (
            <div className="h-44 rounded-xl border border-white/10 bg-zinc-950/70" />
          )}
        </article>
      </div>

      {data && (
        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
          <CalendarDays size={13} />
          <span>
            Source:{" "}
            {data.source === "github"
              ? "GitHub public APIs"
              : "Fallback (GitHub unavailable)"}{" "}
            | Updated {new Date(data.generatedAt).toLocaleString("en-US")}
          </span>
        </div>
      )}
    </section>
  );
}

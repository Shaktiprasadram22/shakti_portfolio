// app/api/github-activity/route.ts

import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Shaktiprasadram22";
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;

type GitHubRepo = {
  name: string;
  stargazers_count: number;
  fork: boolean;
  languages_url: string;
};

type HeatCell = { date: string; count: number };
type WeeklyPoint = { label: string; commits: number };
type LanguagePoint = { name: string; bytes: number; percentage: number };

type ContribDay = { date: string; contributionCount: number };
type ContribWeek = { contributionDays: ContribDay[] };
type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: ContribWeek[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function normDate(d: Date) {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

function sundayOfWeek(dateStr: string) {
  // Parse as UTC to avoid timezone shift
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - d.getUTCDay());
  return isoDate(d);
}

function restHeaders() {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "Shakti-Portfolio",
  };
  if (process.env.GITHUB_TOKEN)
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

function gqlHeaders() {
  const h: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "Shakti-Portfolio",
  };
  if (process.env.GITHUB_TOKEN)
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function ghFetch<T>(url: string): Promise<T> {
  // cache: no-store — har request pe fresh data, no Next.js caching
  const res = await fetch(url, { headers: restHeaders(), cache: "no-store" });
  if (!res.ok) throw new Error(`GitHub REST ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

async function fetchContributionCalendar(): Promise<HeatCell[]> {
  const today = new Date();
  const yearAgo = new Date(today.getTime() - 364 * DAY_MS);

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: gqlHeaders(),
    body: JSON.stringify({
      query,
      variables: {
        username: GITHUB_USERNAME,
        from: yearAgo.toISOString(),
        to: today.toISOString(),
      },
    }),
    cache: "no-store", // no cache
  });

  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`);
  const json = (await res.json()) as GraphQLResponse;
  if (json.errors?.length)
    throw new Error(`GraphQL: ${json.errors[0].message}`);

  const weeks =
    json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const cells: HeatCell[] = [];
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      cells.push({ date: day.date, count: day.contributionCount });
    }
  }
  return cells.sort((a, b) => a.date.localeCompare(b.date));
}

// ─── Build weekly: last 12 ACTIVE weeks ──────────────────────────────────────

function buildWeeklyFromHeatmap(heatmap: HeatCell[]): WeeklyPoint[] {
  // Aggregate every day into its Sunday-week bucket
  const weekMap = new Map<string, number>();
  for (const cell of heatmap) {
    const sunday = sundayOfWeek(cell.date);
    weekMap.set(sunday, (weekMap.get(sunday) ?? 0) + cell.count);
  }

  // All weeks sorted ascending
  const allWeeks = Array.from(weekMap.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  // Only weeks with commits
  const activeWeeks = allWeeks.filter(([, c]) => c > 0);

  if (activeWeeks.length === 0) {
    // No activity at all — return last 12 calendar weeks as zeros
    return allWeeks.slice(-12).map(([label, commits]) => ({ label, commits }));
  }

  // Take the last 12 active weeks
  const picked = activeWeeks.slice(-12);

  // Build a CONTIGUOUS range from first to last picked week
  // so the chart shows weeks in order without gaps
  const startMs = new Date(picked[0][0] + "T00:00:00Z").getTime();
  const endMs = new Date(picked[picked.length - 1][0] + "T00:00:00Z").getTime();

  const result: WeeklyPoint[] = [];
  for (let t = startMs; t <= endMs; t += WEEK_MS) {
    const label = isoDate(new Date(t));
    result.push({ label, commits: weekMap.get(label) ?? 0 });
  }

  // If more than 12 weeks in range, just take last 12
  return result.slice(-12);
}

function buildHeatmapSkeleton(): HeatCell[] {
  const today = normDate(new Date());
  return Array.from({ length: 364 }, (_, i) => {
    const d = new Date(today.getTime() - (363 - i) * DAY_MS);
    return { date: isoDate(d), count: 0 };
  });
}

function buildWeeklySkeleton(): WeeklyPoint[] {
  const today = new Date();
  const thisSunday = sundayOfWeek(isoDate(today));
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(
      new Date(thisSunday + "T00:00:00Z").getTime() - (11 - i) * WEEK_MS,
    );
    return { label: isoDate(d), commits: 0 };
  });
}

async function buildLanguages(repos: GitHubRepo[]): Promise<LanguagePoint[]> {
  const topRepos = repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 15);

  const maps = await Promise.all(
    topRepos.map(async (repo) => {
      try {
        return await ghFetch<Record<string, number>>(repo.languages_url);
      } catch {
        return {} as Record<string, number>;
      }
    }),
  );

  const totals: Record<string, number> = {};
  for (const map of maps) {
    for (const [name, bytes] of Object.entries(map)) {
      totals[name] = (totals[name] ?? 0) + bytes;
    }
  }

  const grand = Object.values(totals).reduce((a, b) => a + b, 0);
  if (grand === 0) return [];

  return Object.entries(totals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Number(((bytes / grand) * 100).toFixed(1)),
    }));
}

function fallbackPayload() {
  return {
    username: GITHUB_USERNAME,
    source: "fallback" as const,
    generatedAt: new Date().toISOString(),
    stats: { publicRepos: 0, stars: 0, recentCommits: 0 },
    heatmap: buildHeatmapSkeleton(),
    weekly: buildWeeklySkeleton(),
    languages: [] as LanguagePoint[],
  };
}

export async function GET() {
  try {
    const [user, repos, heatmap] = await Promise.all([
      ghFetch<{ public_repos: number }>(
        `https://api.github.com/users/${GITHUB_USERNAME}`,
      ),
      ghFetch<GitHubRepo[]>(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      ),
      fetchContributionCalendar(),
    ]);

    const activeRepos = repos.filter((r) => !r.fork);
    const stars = activeRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

    const weekly = buildWeeklyFromHeatmap(heatmap);
    const recentCommits = weekly.reduce((sum, w) => sum + w.commits, 0);
    const languages = await buildLanguages(repos);

    return NextResponse.json({
      username: GITHUB_USERNAME,
      source: "github",
      generatedAt: new Date().toISOString(),
      stats: { publicRepos: user.public_repos, stars, recentCommits },
      heatmap,
      weekly,
      languages,
    });
  } catch (err) {
    console.error("[github-activity] Error:", err);
    return NextResponse.json(fallbackPayload());
  }
}

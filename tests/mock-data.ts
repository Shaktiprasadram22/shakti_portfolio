export const mockGitHubPayload = {
  username: "Shaktiprasadram22",
  source: "github" as const,
  generatedAt: "2026-03-10T01:20:00.000Z",
  stats: {
    publicRepos: 12,
    stars: 20,
    recentCommits: 42,
  },
  heatmap: [
    { date: "2026-03-01", count: 0 },
    { date: "2026-03-02", count: 2 },
    { date: "2026-03-03", count: 1 },
  ],
  weekly: [
    { label: "2026-01-11", commits: 3 },
    { label: "2026-01-18", commits: 5 },
    { label: "2026-01-25", commits: 2 },
  ],
  languages: [
    { name: "TypeScript", bytes: 1000, percentage: 50 },
    { name: "JavaScript", bytes: 600, percentage: 30 },
    { name: "Python", bytes: 400, percentage: 20 },
  ],
};

export const mockStocksPayload = {
  service: "SentinelDataCore",
  endpoint: "GET /api/stocks",
  status: "ok",
  generatedAt: "2026-03-10T01:20:00.000Z",
  data: [
    { symbol: "AAPL", price: 220, changePct: 0.5, volume: 1234567, currency: "USD" },
    { symbol: "MSFT", price: 430, changePct: -0.2, volume: 2234567, currency: "USD" },
  ],
};

export const mockAuthSuccess = {
  status: "ok",
  endpoint: "POST /api/auth",
  token: "demo.jwt.token.eyJwcm9maWxlIjoic2hha3RpIn0",
  expiresIn: "1h",
  user: {
    name: "Recruiter Demo",
    email: "demo@portfolio.dev",
    role: "viewer",
  },
};


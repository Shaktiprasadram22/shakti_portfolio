export const navigation = [
  { label: "Work", href: "#products" },
  { label: "Archive", href: "#archive" },
  { label: "Systems", href: "#systems" },
  { label: "Experience", href: "#journey" },
] as const;

export type Product = {
  name: string;
  eyebrow: string;
  metric: string;
  description: string;
  href: string;
  linkLabel: string;
  image?: string;
  status: "live" | "releasing";
  accent: "ember" | "alloy" | "cobalt";
  signals: readonly string[];
};

export const products: Product[] = [
  {
    name: "PDF for Free",
    eyebrow: "Privacy-first document tools",
    metric: "52 PDF & image tools",
    description:
      "A static, browser-side toolkit for conversion, OCR, forms, document editing, and local insights. Files stay on the user’s device—there is no upload hot path.",
    href: "https://pdfforfree.in",
    linkLabel: "Open live product",
    image: "/work/pdfforfree.png",
    status: "live",
    accent: "ember",
    signals: ["Local processing", "No account", "Direct download"],
  },
  {
    name: "Go Calculator",
    eyebrow: "India-first calculation library",
    metric: "129 private calculators",
    description:
      "Finance, education, health, construction, and everyday calculators generated as static pages, with tested TypeScript engines and visible formulas, assumptions, and source dates.",
    href: "https://gocalculator.in",
    linkLabel: "Open live product",
    image: "/work/gocalculator.png",
    status: "live",
    accent: "alloy",
    signals: ["Visible formulas", "Static delivery", "Private inputs"],
  },
  {
    name: "MyArcade",
    eyebrow: "Dependency-free browser games",
    metric: "46 route-split games",
    description:
      "An offline-capable arcade with deterministic levels, touch and keyboard controls, local progress, and one isolated static route per game.",
    href: "https://myarcade.in",
    linkLabel: "Play now",
    image: "/work/myarcade.png",
    status: "live",
    accent: "cobalt",
    signals: ["Offline capable", "Touch + keyboard", "Local progress"],
  },
];

export const systems = [
  {
    index: "01",
    name: "Northstar",
    category: "Distributed systems",
    description:
      "A multi-tenant feature flag control and data plane with deterministic rollouts, transactional outbox delivery, Redis Streams, SSE, RBAC, local SDK evaluation, and full observability.",
    proof: "1.269M local evaluations/sec in a documented 1,000,000-evaluation benchmark",
    stack: ["TypeScript", "Fastify", "MongoDB", "Redis", "OpenTelemetry", "Docker"],
    href: "https://github.com/Shaktiprasadram22/feature-flag-platform",
  },
  {
    index: "02",
    name: "DeviceLab",
    category: "Browser systems",
    description:
      "A privacy-first used-device inspection bench that runs diagnostics locally, keeps reports in IndexedDB, works offline, and requires no account or application backend.",
    proof: "30 hardware tests · 9 guided inspections · static edge delivery",
    stack: ["Astro", "TypeScript", "Web APIs", "IndexedDB", "PWA", "Cloudflare"],
    href: "https://github.com/Shaktiprasadram22/device-lab",
  },
  {
    index: "03",
    name: "ASUS TUF RGB",
    category: "Linux systems",
    description:
      "A dependency-free Linux CLI and GTK utility that controls supported ASUS TUF keyboard lighting through upstream kernel interfaces, safe session writes, and verified profiles.",
    proof: "Python + GTK 4 + sysfs + systemd, without a vendor daemon",
    stack: ["Python", "GTK 4", "Linux sysfs", "systemd", "CLI"],
    href: "https://github.com/Shaktiprasadram22/asus-tuf-rgb",
  },
] as const;

export const githubProjects = [
  {
    id: "northstar",
    name: "Northstar",
    fullName: "Feature Flag Platform",
    discipline: "Platform engineering",
    description:
      "A production-style, multi-tenant feature-management platform that separates authenticated configuration writes from low-latency local SDK decisions.",
    proof: "1,269,098 local evaluations/sec across a documented 1,000,000-evaluation run",
    stack: ["TypeScript", "Fastify", "MongoDB", "Redis Streams", "OpenTelemetry", "Playwright"],
    flow: ["Control plane", "Transactional outbox", "Redis distribution", "Local SDK"],
    href: "https://github.com/Shaktiprasadram22/feature-flag-platform",
  },
  {
    id: "ums-chatbot",
    name: "UMS Chatbot",
    fullName: "University RAG Assistant",
    discipline: "Applied AI",
    description:
      "A university assistant that routes student questions through a React interface, an Express service, and a Python retrieval pipeline grounded in an academic knowledge base.",
    proof: "LangChain retrieval · FAISS vector search · OpenAI embeddings",
    stack: ["React", "Node.js", "Python", "LangChain", "FAISS", "OpenAI"],
    flow: ["Student query", "Express bridge", "Python RAG", "Grounded answer"],
    href: "https://github.com/Shaktiprasadram22/Ums_chatbot_01",
  },
  {
    id: "proxy-server",
    name: "Proxy Server",
    fullName: "Multi-Threaded HTTP Proxy",
    discipline: "Systems programming",
    description:
      "A C++ HTTP proxy that accepts concurrent clients, forwards requests through worker threads, and protects an O(1) LRU cache with explicit synchronization.",
    proof: "std::thread workers · mutex-protected LRU · socket-level request forwarding",
    stack: ["C++", "POSIX sockets", "std::thread", "Mutexes", "LRU cache", "Make"],
    flow: ["Client socket", "Worker thread", "Shared LRU", "Origin server"],
    href: "https://github.com/Shaktiprasadram22/MultiThreadedProxyServer",
  },
  {
    id: "tradenexus",
    name: "TradeNexus",
    fullName: "RAG Market Analysis",
    discipline: "Multi-service AI",
    description:
      "A financial analysis prototype combining a React dashboard, Node.js data services, and a FastAPI retrieval service for contextual news and market analysis.",
    proof: "React surface · Node API · FastAPI RAG service · ChromaDB retrieval",
    stack: ["React", "Node.js", "FastAPI", "Python", "ChromaDB", "OpenAI"],
    flow: ["Market surface", "Node data API", "FastAPI retrieval", "Contextual analysis"],
    href: "https://github.com/Shaktiprasadram22/TradeNexus",
  },
  {
    id: "cache-lab",
    name: "Cache Lab",
    fullName: "Cache Strategy Demonstrator",
    discipline: "System design",
    description:
      "A focused Next.js system-design lab that makes cache-aside and pre-warming behavior visible across SQLite, Redis, TTLs, hits, and misses.",
    proof: "Lazy population · eager pre-warming · observable cache source and reset flows",
    stack: ["Next.js", "TypeScript", "Redis", "SQLite", "ioredis", "Docker"],
    flow: ["Request", "Redis lookup", "SQLite fallback", "TTL response"],
    href: "https://github.com/Shaktiprasadram22/System_Design_Cache",
  },
] as const;

export const journey = [
  {
    period: "2026 — Present",
    role: "Associate Developer",
    organisation: "Accenture",
    location: "Bhubaneswar, Odisha",
    description:
      "Working full-time on enterprise software while continuing to build and document production-minded systems independently.",
  },
  {
    period: "May — Aug 2025",
    role: "Software Developer Intern",
    organisation: "Vibeinn Technology",
    location: "Remote",
    description:
      "Built Node.js APIs, React interfaces, MongoDB query improvements, background workflows, and containerized cloud deployments.",
  },
  {
    period: "2022 — 2026",
    role: "B.Tech, Computer Science & Engineering",
    organisation: "Lovely Professional University",
    location: "Punjab, India",
    description:
      "Developed a foundation in data structures, systems, web engineering, cloud computing, and applied problem solving.",
  },
] as const;

export const capabilities = [
  {
    title: "Backend & platforms",
    items: ["Node.js", "Fastify", "Express", "FastAPI", "REST", "SSE", "RBAC", "JWT"],
  },
  {
    title: "Data & reliability",
    items: ["MongoDB", "Redis", "SQLite", "Outbox", "Idempotency", "Caching", "Load tests"],
  },
  {
    title: "AI & retrieval",
    items: ["RAG", "Embeddings", "FAISS", "ChromaDB", "Tool contracts", "Agent workflows"],
  },
  {
    title: "Web & delivery",
    items: ["React", "Next.js", "Astro", "TypeScript", "Docker", "Cloudflare", "CI/CD"],
  },
] as const;

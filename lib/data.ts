import {
  Achievement,
  Certification,
  Education,
  Experience,
  HowIThinkBreakdown,
  NavLink,
  Project,
  SkillGroup,
} from "@/types";

export const navLinks: NavLink[] = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#how-i-think", label: "How I Think" },
  { href: "#architecture", label: "Architecture" },
  { href: "#playground", label: "API Playground" },
  { href: "#github-activity", label: "GitHub Activity" },
  { href: "#education", label: "Education" },
  { href: "#achievements", label: "Achievements" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["JavaScript", "C++", "Java", "SQL"],
  },
  {
    title: "Backend & Web",
    skills: [
      "Node.js",
      "Express.js",
      "React.js",
      "FastAPI",
      "REST APIs",
      "WebSockets",
      "JWT",
    ],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["Docker", "AWS", "CI/CD"],
  },
  {
    title: "System Design",
    skills: [
      "Microservices",
      "LRU/Redis caching",
      "Async processing",
      "API security",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "SentinelDataCore",
    description:
      "Modular RESTful API delivering real-time mock stock market data with JWT authentication and LRU caching to reduce database load.",
    snippets: [
      {
        id: "sentinel-jwt",
        title: "JWT Authentication Middleware",
        language: "typescript",
        description: "Verifies bearer token and attaches user claims to the request context.",
        code: `import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as { id: string; role: string };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}`,
      },
      {
        id: "sentinel-lru",
        title: "LRU Cache (O(1) Lookup/Evict)",
        language: "typescript",
        description: "Hash map + doubly linked list based cache for low-latency stock API responses.",
        code: `class LRUCache<K, V> {
  private map = new Map<K, { value: V; prev?: K; next?: K }>();
  private head?: K;
  private tail?: K;

  constructor(private readonly capacity: number) {}

  get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node) return undefined;
    this.moveToFront(key);
    return node.value;
  }

  put(key: K, value: V) {
    if (this.map.has(key)) {
      this.map.get(key)!.value = value;
      this.moveToFront(key);
      return;
    }
    this.map.set(key, { value, next: this.head });
    if (this.head) this.map.get(this.head)!.prev = key;
    this.head = key;
    if (!this.tail) this.tail = key;
    if (this.map.size > this.capacity) this.evictTail();
  }

  private moveToFront(key: K) { /* relink in O(1) */ }
  private evictTail() { /* remove least recently used */ }
}`,
      },
    ],
    tech: ["Node.js", "Express", "MongoDB", "JWT", "LRU Cache"],
    github: "https://github.com/Shaktiprasadram22/Sentinel_DataCore",
  },
  {
    title: "UMS Chatbot",
    description:
      "University chatbot built with a RAG pipeline using LangChain and FAISS for semantic search across academic queries.",
    snippets: [
      {
        id: "ums-rag",
        title: "RAG Pipeline Logic",
        language: "python",
        description: "Embeds query, retrieves top-k chunks from FAISS, then generates grounded answer.",
        code: `from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from openai import OpenAI

embeddings = OpenAIEmbeddings()
db = FAISS.load_local("vector_index", embeddings, allow_dangerous_deserialization=True)
llm = OpenAI()

def answer_question(query: str):
    docs = db.similarity_search(query, k=4)
    context = "\\n\\n".join([d.page_content for d in docs])
    prompt = f"""You are a university assistant.
Use only this context:\\n{context}\\n\\nQuestion: {query}"""
    result = llm.responses.create(model="gpt-4o-mini", input=prompt)
    return {
        "query": query,
        "sources": len(docs),
        "answer": result.output_text
    }`,
      },
      {
        id: "ums-api",
        title: "Chat Endpoint Handler",
        language: "javascript",
        description: "Thin Node API route for invoking the Python RAG service.",
        code: `app.post("/api/chat", async (req, res) => {
  const { question } = req.body;
  const ragResponse = await fetch(process.env.RAG_SERVICE_URL + "/answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: question })
  });
  const data = await ragResponse.json();
  res.status(200).json(data);
});`,
      },
    ],
    tech: ["React", "Node.js", "Python", "OpenAI", "LangChain", "FAISS"],
    github: "https://github.com/Shaktiprasadram22/Ums_chatbot_01",
  },
  {
    title: "TradeNexus",
    description:
      "AI powered trading platform generating Buy/Sell/Hold recommendations using GPT and ChromaDB with real-time financial data analysis.",
    snippets: [
      {
        id: "tradenexus-signal",
        title: "Signal + Recommendation Orchestrator",
        language: "python",
        description: "Combines technical indicators with LLM reasoning for trading decisions.",
        code: `def generate_recommendation(candles, context_chunks):
    rsi = compute_rsi(candles["close"], period=14)
    macd = compute_macd(candles["close"])
    features = {
        "price": candles["close"][-1],
        "rsi": round(rsi[-1], 2),
        "macd": round(macd["hist"][-1], 4)
    }

    prompt = {
        "market_features": features,
        "retrieved_context": context_chunks,
        "task": "Return Buy, Sell or Hold with concise reasoning."
    }
    llm_output = ask_openai(prompt)
    return apply_risk_rules(llm_output, features)`,
      },
      {
        id: "tradenexus-api",
        title: "Recommendation API Route",
        language: "javascript",
        description: "Backend endpoint used by the React dashboard for live suggestions.",
        code: `router.get("/api/recommendation/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const marketData = await marketClient.fetchCandles(symbol);
  const context = await chromaStore.query({ symbol, limit: 5 });
  const recommendation = await aiEngine.generate(marketData, context);
  await historyRepo.insert({ symbol, recommendation });
  res.json({ symbol, recommendation });
});`,
      },
    ],
    tech: ["React", "Node.js", "Python", "OpenAI", "ChromaDB"],
    github: "https://github.com/Shaktiprasadram22/TradeNexus",
  },
  {
    title: "Multi-Threaded Proxy Server with LRU Caching",
    description:
      "Built a robust multi-threaded HTTP proxy server in C++ with cross-platform support and thread-safe concurrency primitives.",
    duration: "Apr 2025 - Jun 2025",
    highlights: [
      "Handled up to 10 concurrent clients using mutexes and condition variables.",
      "Implemented O(1) LRU cache via unordered_map + doubly linked list, achieving 70% faster response times.",
      "Improved throughput by 80% vs single-threaded design with logging and real-time cache hit/miss metrics.",
      "Demonstrated socket programming, concurrency, and system-level optimization expertise.",
    ],
    snippets: [
      {
        id: "proxy-worker",
        title: "Threaded Client Worker",
        language: "cpp",
        description: "Worker loop pops sockets from shared queue and handles requests concurrently.",
        code: `void workerLoop() {
  while (running) {
    int clientFd = -1;
    {
      std::unique_lock<std::mutex> lock(queueMutex);
      queueCv.wait(lock, [] { return !clientQueue.empty() || !running; });
      if (!running) break;
      clientFd = clientQueue.front();
      clientQueue.pop();
    }
    handleClient(clientFd);
    closesocket_or_close(clientFd);
  }
}`,
      },
      {
        id: "proxy-lru",
        title: "C++ LRU Cache Core",
        language: "cpp",
        description: "O(1) get/put using list + unordered_map to reduce origin fetch latency.",
        code: `struct Entry { std::string key; std::string value; };
std::list<Entry> order;
std::unordered_map<std::string, std::list<Entry>::iterator> index;

std::optional<std::string> get(const std::string& key) {
  auto it = index.find(key);
  if (it == index.end()) return std::nullopt;
  order.splice(order.begin(), order, it->second);
  return it->second->value;
}

void put(const std::string& key, const std::string& value) {
  auto it = index.find(key);
  if (it != index.end()) {
    it->second->value = value;
    order.splice(order.begin(), order, it->second);
    return;
  }
  order.push_front({key, value});
  index[key] = order.begin();
  if (index.size() > CAPACITY) {
    index.erase(order.back().key);
    order.pop_back();
  }
}`,
      },
    ],
    tech: ["C++", "STL", "POSIX", "WinAPI", "Multithreading", "LRU Cache", "Socket Programming"],
    github: "https://github.com/Shaktiprasadram22/MultiThreadedProxyServer",
  },
];

export const howIThinkBreakdowns: HowIThinkBreakdown[] = [
  {
    id: "mongo-query-optimization",
    title: "MongoDB Query Optimization Under Load",
    summary: "Reduced p95 API latency on filtered listings by reshaping queries and indexes.",
    stack: ["MongoDB", "Node.js", "Aggregation", "Indexing"],
    problem:
      "Filtered endpoints were doing collection scans on large datasets, causing slow responses and unstable latency during peak traffic.",
    approach: [
      "Captured slow query logs and analyzed execution plans to isolate expensive stages.",
      "Introduced compound indexes matching filter + sort patterns used by top API routes.",
      "Reworked aggregation pipelines to push $match and projection early, cutting scanned documents.",
    ],
    solution:
      "Shifted from broad scans to index-backed access paths and trimmed payload shape in the pipeline before expensive operations.",
    impact: "p95 latency dropped from ~420ms to ~160ms with noticeably lower database CPU spikes.",
    diagram: [
      { label: "Observe", detail: "Profiler + explain plans reveal scan-heavy queries" },
      { label: "Reshape", detail: "Compound indexes and stage ordering remove hot spots" },
      { label: "Validate", detail: "Benchmark and monitor p95 + CPU under peak traffic" },
    ],
  },
  {
    id: "lru-cache-layer",
    title: "Designing an Efficient LRU Caching Layer",
    summary: "Built an O(1) in-memory cache path to reduce repeated origin fetches.",
    stack: ["TypeScript", "LRU", "Express", "Concurrency Controls"],
    problem:
      "Repeated requests for identical market payloads were hitting upstream services and increasing response time variability.",
    approach: [
      "Implemented hash-map + doubly-linked-list LRU for constant-time get/put/evict.",
      "Added TTL and in-flight deduplication so concurrent misses collapse into one origin call.",
      "Instrumented hit ratio and eviction metrics to tune cache capacity from production traffic.",
    ],
    solution:
      "Inserted a cache-first read path with safe invalidation policy and fallback to origin on miss/expiry.",
    impact: "Cache hit ratio stabilized near 72%, with average response time improving by about 45%.",
    diagram: [
      { label: "Request", detail: "Lookup key and gate concurrent misses" },
      { label: "Cache Path", detail: "Hit returns instantly, miss hydrates once" },
      { label: "Evict + Serve", detail: "LRU updates order and prunes stale entries" },
    ],
  },
  {
    id: "ums-rag-pipeline",
    title: "RAG Pipeline Design for UMS Chatbot",
    summary: "Structured retrieval and grounding flow to answer academic questions reliably.",
    stack: ["Python", "LangChain", "FAISS", "OpenAI"],
    problem:
      "Direct LLM responses were inconsistent for university-specific policies and timelines without strong context retrieval.",
    approach: [
      "Chunked documents by semantic boundaries and embedded them into a FAISS index.",
      "Retrieved top-k context with similarity search and added query-aware prompt grounding rules.",
      "Evaluated answer quality with source coverage checks and fallback guidance when context was weak.",
    ],
    solution:
      "Built a retrieval-first pipeline that binds model output to relevant source chunks before generation.",
    impact: "Improved answer relevance and reduced hallucinated policy details in internal testing.",
    diagram: [
      { label: "Retrieve", detail: "Embed query and fetch top-k relevant chunks" },
      { label: "Ground", detail: "Compose context-constrained prompt with citations" },
      { label: "Respond", detail: "Generate answer with fallback when confidence is low" },
    ],
  },
];

export const experience: Experience[] = [
  {
    role: "Software Developer Intern",
    company: "Vibeinn Technology",
    duration: "May 2025 - Aug 2025",
    responsibilities: [
      "Built scalable REST APIs using Node.js and Express",
      "Reduced API response time by implementing caching and pagination",
      "Optimized MongoDB queries with indexes and aggregation pipelines",
      "Deployed services on AWS EC2",
      "Containerized applications using Docker",
      "Automated background jobs with cron schedulers",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Lovely Professional University",
    degree: "B.Tech in Computer Science & Engineering",
    duration: "2022 - 2026",
    score: "CGPA: 7.75",
    location: "Punjab",
  },
  {
    institution: "Odisha Adarsh Vidyalaya",
    degree: "Higher Secondary (Science)",
    duration: "2020 - 2022",
    score: "CGPA: 6.9",
    location: "Odisha",
  },
  {
    institution: "Shree Gurukul Public School",
    degree: "Matriculation",
    duration: "2019 - 2020",
    score: "CGPA: 8.0",
    location: "Odisha",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Top 5 Finalist - WebKaHackathon",
    description:
      "Built a ride-booking app with Google Maps API and Socket.io for real-time updates among 200+ participants; led team and presented the solution.",
  },
  {
    title: "Performance Optimization",
    description:
      "Implemented Google Authentication and multithreading for parallel request handling, improving API response by 40%.",
  },
  {
    title: "Problem Solving",
    description:
      "Solved 400+ problems on LeetCode and GeeksforGeeks, demonstrating strong debugging and scalable coding skills.",
  },
  {
    title: "Dockerized Node.js Redis Queue System",
    description:
      "Deployed a containerized task queue using Docker Compose to orchestrate Node.js producer, Redis broker, and Node.js consumer services, demonstrating CI/CD readiness and message-based architecture.",
    link: {
      label: "GitHub Repository",
      href: "https://github.com/Shaktiprasadram22/Dockerized-Node.js-Redis-Queue-System",
    },
  },
];

export const certifications: Certification[] = [
  {
    name: "Server-side JavaScript with Node.js",
    provider: "Coursera",
    date: "May 2024",
    href: "https://www.coursera.org/account/accomplishments/verify/MGLN4AGKXK22",
  },
  {
    name: "Data Structures and Algorithms",
    provider: "GeeksforGeeks",
    date: "July 2024",
    href: "https://www.geeksforgeeks.org/certificate/802960bf284438f99668fa7aae804aa4",
  },
  {
    name: "Cloud Computing",
    provider: "NPTEL",
    date: "Oct 2024",
    href: "https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs118/Course/NPTEL24CS118S167020244804432447.pdf",
  },
];

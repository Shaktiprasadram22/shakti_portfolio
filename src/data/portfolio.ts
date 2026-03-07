export interface Project {
  title: string;
  description: string;
  techStack: string[];
  github: string;
  liveDemo?: string;
  date: string;
  featured?: boolean;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  grade: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export const personalInfo = {
  name: "Shakti Prasad Ram",
  title: "Full-Stack Developer",
  taglines: [
    "Full Stack Engineer",
    "Backend Developer",
    "AI + RAG Builder",
  ],
  location: "Jalandhar, Punjab",
  phone: "+91-8917583070",
  email: "shaktiram.coc@gmail.com",
  linkedin: "https://linkedin.com/in/shaktiram22",
  github: "https://github.com/Shaktiprasadram22",
  bio: `I'm a passionate Computer Science student at Lovely Professional University, driven by the challenge of building software that scales. My journey started with curiosity about how systems work behind the scenes — from the databases that store our data to the APIs that power the applications we use every day.

Today, I specialize in full-stack development with a strong focus on backend engineering — designing RESTful APIs, optimizing database queries, and building fault-tolerant microservice architectures. I've worked with production systems serving real users, and I bring the same rigor to my personal projects.

When I'm not coding, I'm solving algorithmic challenges (400+ problems across LeetCode and GeeksforGeeks), exploring cloud infrastructure, or working on AI-powered applications that push the boundaries of what's possible.`,
};

export const experiences: Experience[] = [
  {
    company: "Vibeinn Technology",
    role: "Software Developer Intern",
    duration: "May 2025 — Aug 2025",
    location: "Remote",
    highlights: [
      "Built scalable REST APIs with Node.js and Express, adding pagination, rate limiting, and caching to cut response times by 35%.",
      "Developed React.js components with lazy loading and code splitting, improving load performance and UX.",
      "Optimized MongoDB schemas using indexes and aggregation pipelines, reducing complex query times by 40%.",
      "Deployed and maintained services on AWS EC2, used S3 for static assets, and set up CloudWatch monitoring.",
      "Automated background jobs with cron schedulers, reducing manual operational work across workflows.",
      "Containerized applications with Docker and collaborated via Git workflows including branching, PRs, and code reviews.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "TradeNexus",
    description:
      "A fintech trading platform with RAG-based Buy/Sell/Hold recommendations using OpenAI GPT and ChromaDB with 95% accuracy.",
    techStack: ["React", "Node.js", "Python", "OpenAI", "ChromaDB"],
    github: "https://github.com/Shaktiprasadram22/TradeNexus",
    date: "Jan 2025 — Jul 2025",
    featured: true,
    highlights: [
      "Built RAG-based Buy/Sell/Hold recommendations with 95% accuracy",
      "Developed batch processing for watchlists and individual article analysis",
      "Cloud-based continuous improvement pipeline",
    ],
  },
  {
    title: "UMS Chatbot",
    description:
      "A university chatbot using a custom RAG pipeline with FAISS for semantic search over academic and administrative queries.",
    techStack: ["React", "Node.js", "Express.js", "OpenAI", "LangChain", "FAISS"],
    github: "https://github.com/Shaktiprasadram22/Ums_chatbot_01",
    date: "May 2025 — Jul 2025",
    featured: true,
    highlights: [
      "Custom RAG pipeline with FAISS for semantic search",
      "React chat interface with Material UI",
      "Node.js + Python backend for real-time student query resolution",
    ],
  },
  {
    title: "SentinelDataCore",
    description:
      "A modular RESTful API delivering real-time mock stock market data with 99.9% uptime and LRU cache reducing MongoDB load by 60%.",
    techStack: ["Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/Shaktiprasadram22/Sentinel_DataCore",
    date: "Jun 2025 — Jul 2025",
    featured: true,
    highlights: [
      "Engineered modular RESTful API with 99.9% uptime",
      "LRU cache reducing MongoDB load by 60%",
      "JWT-based admin authentication and role-based access control",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    icon: "💻",
    skills: [
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "C++", level: 75 },
      { name: "Java", level: 70 },
      { name: "SQL", level: 85 },
      { name: "Python", level: 75 },
    ],
  },
  {
    title: "Web Development",
    icon: "🌐",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "FastAPI", level: 70 },
      { name: "REST APIs", level: 92 },
      { name: "WebSockets", level: 72 },
    ],
  },
  {
    title: "Databases",
    icon: "🗃️",
    skills: [
      { name: "MongoDB", level: 88 },
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 78 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    skills: [
      { name: "Docker", level: 78 },
      { name: "AWS (EC2, S3)", level: 75 },
      { name: "CI/CD", level: 70 },
      { name: "Kafka", level: 65 },
    ],
  },
  {
    title: "System Design",
    icon: "🏗️",
    skills: [
      { name: "Microservices", level: 80 },
      { name: "Caching (LRU, Redis)", level: 82 },
      { name: "API Security", level: 78 },
      { name: "Async Processing", level: 75 },
    ],
  },
  {
    title: "Tools",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 90 },
      { name: "VS Code", level: 92 },
      { name: "Postman", level: 85 },
      { name: "Agile Scrum", level: 78 },
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Lovely Professional University",
    degree: "B.Tech in Computer Science & Engineering",
    duration: "2022 — 2026",
    location: "Punjab",
    grade: "CGPA: 7.75",
  },
  {
    institution: "Odisha Adarsh Vidyalaya",
    degree: "Higher Secondary (Science)",
    duration: "2020 — 2022",
    location: "Odisha",
    grade: "CGPA: 6.9",
  },
  {
    institution: "Shree Gurukul Public School",
    degree: "Matriculation",
    duration: "2019 — 2020",
    location: "Odisha",
    grade: "CGPA: 8.0",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Top 5 Finalist — WebKaHackathon",
    description:
      "Built a ride-booking app with Google Maps API and Socket.io for real-time updates among 200+ participants; led team and presented solution.",
  },
  {
    title: "400+ Problems Solved",
    description:
      "Solved 400+ problems on LeetCode and GeeksforGeeks, demonstrating strong debugging and scalable coding skills.",
  },
];

export const certifications: Certification[] = [
  {
    title: "Data Structures and Algorithms",
    issuer: "GeeksforGeeks",
    date: "July 2024",
    link: "https://www.geeksforgeeks.org/certificate/802960bf284438f99668fa7aae804aa4",
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL",
    date: "Oct 2024",
    link: "https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs118/Course/NPTEL24CS118S167020244804432447.pdf",
  },
];

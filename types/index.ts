export type NavLink = {
  href: string;
  label: string;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type Project = {
  title: string;
  description: string;
  duration?: string;
  highlights?: string[];
  snippets?: CodeSnippet[];
  tech: string[];
  github: string;
};

export type CodeSnippet = {
  id: string;
  title: string;
  language: "typescript" | "javascript" | "python" | "cpp";
  description?: string;
  code: string;
};

export type Experience = {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
};

export type Education = {
  institution: string;
  degree: string;
  duration: string;
  score: string;
  location: string;
};

export type Achievement = {
  title: string;
  description: string;
  link?: {
    label: string;
    href: string;
  };
};

export type Certification = {
  name: string;
  provider: string;
  date: string;
  href: string;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  category: "frontend" | "api" | "service" | "cache" | "database" | "external" | "infra";
  x: number;
  y: number;
  role: string;
  tech: string[];
};

export type ArchitectureEdge = {
  id: string;
  from: string;
  to: string;
  flow: string;
  labelDx?: number;
  labelDy?: number;
  curve?: number;
};

export type ArchitectureProject = {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  canvas: { width: number; height: number };
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};

export type HowIThinkStep = {
  label: string;
  detail: string;
};

export type HowIThinkBreakdown = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  problem: string;
  approach: string[];
  solution: string;
  impact: string;
  diagram: HowIThinkStep[];
};

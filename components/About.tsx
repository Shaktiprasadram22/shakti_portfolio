"use client";

import { motion } from "framer-motion";
import {
  Braces,
  CloudCog,
  Code2,
  Database,
  Globe,
  Network,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";
import { fadeInUp, sectionViewport, staggerContainer } from "@/lib/animations";
import { skills } from "@/lib/data";

const categoryIcons = {
  Languages: Code2,
  "Backend & Web": Server,
  Databases: Database,
  "Cloud & DevOps": CloudCog,
  Tools: Wrench,
  "System Design": Network,
} as const;

const strengths = [
  { label: "Backend Engineering", value: 92, tone: "from-cyan-400 to-sky-300" },
  { label: "System Design", value: 88, tone: "from-emerald-400 to-teal-300" },
  { label: "AI/ML Systems", value: 84, tone: "from-blue-400 to-cyan-300" },
  { label: "Frontend Development", value: 79, tone: "from-sky-400 to-indigo-300" },
];

export function About() {
  return (
    <section id="about" className="section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={fadeInUp}
        className="mb-8"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-sky-300">About</p>
        <h2 className="font-heading text-3xl text-white md:text-4xl">Technical Strength Map</h2>
        <p className="mt-3 max-w-3xl text-sm text-zinc-400 md:text-base">
          A quick visual of where I spend most of my engineering effort and problem-solving depth.
        </p>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={{ duration: 0.45 }}
        className="glass mb-6 overflow-hidden rounded-2xl border border-cyan-300/20 p-5 md:p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <Braces className="h-4 w-4 text-cyan-300" />
          <h3 className="font-heading text-2xl text-zinc-100">Animated Skill Graph</h3>
        </div>

        <div className="space-y-4">
          {strengths.map((item, index) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
                <span>{item.label}</span>
                <span className="font-medium text-zinc-200">{item.value}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-zinc-950/80">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${item.value}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${item.tone}`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.article>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="glass mb-6 rounded-2xl border border-white/10 p-5 md:p-6"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
          Developer Snapshot
        </div>
        <p className="max-w-4xl text-sm leading-relaxed text-zinc-300 md:text-base">
          I am a Computer Science student at Lovely Professional University with practical experience in backend
          engineering, cloud infrastructure, and AI-based systems. My focus is building scalable APIs and distributed
          architectures that remain reliable under load, while keeping code maintainable and performance measurable.
        </p>
      </motion.article>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerContainer}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((group) => {
          const Icon = categoryIcons[group.title as keyof typeof categoryIcons] ?? Globe;
          return (
            <motion.article
              key={group.title}
              variants={fadeInUp}
              className="glass rounded-2xl p-5 shadow-glow transition hover:-translate-y-1"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-zinc-900/60 p-2">
                  <Icon className="h-4 w-4 text-sky-300" />
                </div>
                <h3 className="font-heading text-xl text-zinc-100">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((item, badgeIdx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: badgeIdx * 0.03, duration: 0.25 }}
                    className="rounded-full border border-white/10 bg-zinc-950/70 px-3 py-1 text-xs text-zinc-300"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

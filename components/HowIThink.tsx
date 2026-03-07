"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuit, ChevronDown, Database, Layers3, LucideIcon, Workflow } from "lucide-react";
import { useState } from "react";
import { fadeInUp, sectionViewport } from "@/lib/animations";
import { howIThinkBreakdowns } from "@/lib/data";

const iconById: Record<string, LucideIcon> = {
  "mongo-query-optimization": Database,
  "lru-cache-layer": Layers3,
  "ums-rag-pipeline": Workflow,
};

export function HowIThink() {
  const [openId, setOpenId] = useState<string | null>(howIThinkBreakdowns[0]?.id ?? null);

  return (
    <section id="how-i-think" className="section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={fadeInUp}
        className="mb-10"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-cyan-300">How I Think</p>
        <h2 className="font-heading text-3xl text-white md:text-4xl">Engineering Decisions, Not Just Deliverables</h2>
        <p className="mt-3 max-w-3xl text-sm text-zinc-400 md:text-base">
          These breakdowns show how I diagnose bottlenecks, choose implementation tradeoffs, and verify outcomes with
          measurable impact.
        </p>
      </motion.div>

      <div className="space-y-4">
        {howIThinkBreakdowns.map((item, index) => {
          const isOpen = openId === item.id;
          const Icon = iconById[item.id] ?? BrainCircuit;

          return (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={sectionViewport}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className={`glass overflow-hidden rounded-2xl border transition ${
                isOpen ? "border-cyan-300/40 bg-cyan-500/[0.04]" : "border-white/10"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                className="w-full px-5 py-5 text-left md:px-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300">
                      <Icon size={13} />
                      <span>Case Study</span>
                    </div>
                    <h3 className="font-heading text-2xl text-zinc-100">{item.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm text-zinc-400">{item.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/12 bg-zinc-900/75 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="mt-1 inline-flex rounded-lg border border-white/15 bg-zinc-900/75 p-2 text-zinc-300"
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`${item.id}-content`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 px-5 pb-5 pt-5 md:px-6 md:pb-6">
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="rounded-xl border border-rose-300/20 bg-rose-500/[0.08] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-rose-200">Problem</p>
                          <p className="mt-2 text-sm leading-relaxed text-zinc-200">{item.problem}</p>
                        </div>
                        <div className="rounded-xl border border-sky-300/20 bg-sky-500/[0.08] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-sky-200">Approach</p>
                          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-zinc-200">
                            {item.approach.map((step) => (
                              <li key={step} className="flex gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-xl border border-emerald-300/20 bg-emerald-500/[0.08] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-emerald-200">Solution</p>
                          <p className="mt-2 text-sm leading-relaxed text-zinc-200">{item.solution}</p>
                          <p className="mt-3 rounded-md border border-emerald-200/20 bg-emerald-500/[0.08] px-3 py-2 text-xs text-emerald-100">
                            Impact: {item.impact}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950/70 p-3">
                        <p className="mb-3 text-xs uppercase tracking-[0.12em] text-zinc-400">Decision Flow Diagram</p>
                        <div className="overflow-x-auto">
                          <div className="flex min-w-[640px] items-stretch gap-2">
                            {item.diagram.map((node, nodeIndex) => (
                              <div key={node.label} className="flex flex-1 items-stretch gap-2">
                                <div className="flex-1 rounded-lg border border-cyan-200/20 bg-cyan-500/[0.08] p-3">
                                  <p className="text-xs uppercase tracking-[0.12em] text-cyan-200">{node.label}</p>
                                  <p className="mt-1 text-xs leading-relaxed text-zinc-300">{node.detail}</p>
                                </div>
                                {nodeIndex < item.diagram.length - 1 && (
                                  <div className="my-auto h-[2px] w-8 shrink-0 rounded-full bg-gradient-to-r from-cyan-300/70 to-emerald-300/70" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

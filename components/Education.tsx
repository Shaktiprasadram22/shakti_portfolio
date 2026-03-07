"use client";

import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { cardRise, sectionViewport, staggerContainer } from "@/lib/animations";
import { education } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        className="mb-10"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-cyan-300">Education</p>
        <h2 className="font-heading text-3xl text-white md:text-4xl">Academic Background</h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerContainer}
        className="grid gap-4"
      >
        {education.map((item) => (
          <motion.article
            key={`${item.institution}-${item.duration}`}
            variants={cardRise}
            className="glass rounded-2xl p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-cyan-400/15 p-2">
                  <GraduationCap className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-zinc-100">{item.institution}</h3>
                  <p className="text-sm text-zinc-300">{item.degree}</p>
                </div>
              </div>
              <p className="text-xs uppercase tracking-wide text-zinc-400">{item.duration}</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              <span className="rounded-full border border-white/10 bg-zinc-950/60 px-3 py-1">{item.score}</span>
              {item.location && (
                <span className="rounded-full border border-white/10 bg-zinc-950/60 px-3 py-1">
                  {item.location}
                </span>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

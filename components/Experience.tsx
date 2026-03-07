"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { fadeInUp, sectionViewport } from "@/lib/animations";

export function Experience() {
  return (
    <section id="experience" className="section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={fadeInUp}
        className="mb-10"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-green-300">Experience</p>
        <h2 className="font-heading text-3xl text-white md:text-4xl">Timeline</h2>
      </motion.div>

      <div className="relative ml-2 border-l border-white/15 pl-8">
        {experience.map((item, idx) => (
          <motion.article
            key={`${item.company}-${item.duration}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={sectionViewport}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="glass relative mb-8 rounded-2xl p-5"
          >
            <div className="absolute -left-[2.1rem] top-6 h-3 w-3 rounded-full bg-gradient-to-r from-sky-400 to-teal-300 shadow-[0_0_20px_rgba(14,165,233,.6)]" />
            <p className="text-xs uppercase tracking-wide text-zinc-400">{item.duration}</p>
            <h3 className="mt-1 font-heading text-2xl text-white">{item.role}</h3>
            <p className="text-sm text-sky-300">{item.company}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {item.responsibilities.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

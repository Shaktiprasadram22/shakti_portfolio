"use client";

import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { achievements } from "@/lib/data";
import { cardRise, sectionViewport, staggerContainer } from "@/lib/animations";

export function Achievements() {
  return (
    <section id="achievements" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        className="mb-10"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-yellow-300">Achievements</p>
        <h2 className="font-heading text-3xl text-white md:text-4xl">Highlights</h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerContainer}
        className="grid gap-4 md:grid-cols-2"
      >
        {achievements.map((achievement) => (
          <motion.article
            key={achievement.title}
            variants={cardRise}
            className="glass flex gap-4 rounded-2xl p-5 text-zinc-200"
          >
            <div className="rounded-lg bg-yellow-400/15 p-2">
              <Trophy className="h-5 w-5 text-yellow-300" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-lg text-zinc-100">{achievement.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-300">{achievement.description}</p>
              {achievement.link && (
                <a
                  href={achievement.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm text-sky-300 transition hover:text-teal-300"
                >
                  {achievement.link.label}
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

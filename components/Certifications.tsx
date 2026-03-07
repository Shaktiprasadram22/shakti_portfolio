"use client";

import { Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { cardRise, sectionViewport, staggerContainer } from "@/lib/animations";
import { certifications } from "@/lib/data";

export function Certifications() {
  return (
    <section id="certifications" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        className="mb-10"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-emerald-300">Certifications</p>
        <h2 className="font-heading text-3xl text-white md:text-4xl">Verified Learning</h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerContainer}
        className="grid gap-4 md:grid-cols-2"
      >
        {certifications.map((cert) => (
          <motion.a
            key={cert.href}
            variants={cardRise}
            href={cert.href}
            target="_blank"
            rel="noreferrer"
            className="glass group rounded-2xl p-5 transition hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-400/15 p-2">
                  <Award className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-zinc-100">{cert.name}</h3>
                  <p className="text-sm text-zinc-300">{cert.provider}</p>
                </div>
              </div>
              <ExternalLink className="mt-1 h-4 w-4 text-zinc-400 transition group-hover:text-emerald-300" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-wide text-zinc-400">{cert.date}</p>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

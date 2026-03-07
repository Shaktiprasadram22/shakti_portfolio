"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences, achievements, certifications } from "@/data/portfolio";
import { FiBriefcase, FiAward, FiFileText, FiExternalLink } from "react-icons/fi";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-[var(--color-accent)] mb-4 tracking-wider uppercase"
          >
            // career
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[var(--color-gradient-start)] via-[var(--color-gradient-mid)] to-[var(--color-gradient-end)] origin-center"
          />
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative max-w-4xl mx-auto mb-24">
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-[22px] md:left-[30px] top-0 bottom-0 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end), transparent)",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative pl-16 md:pl-20 pb-14 last:pb-0"
            >
              {/* Animated dot */}
              <motion.div
                className="absolute left-[12px] md:left-[20px] top-2 w-[22px] h-[22px] rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-mid))",
                  boxShadow: "0 0 24px rgba(99,102,241,0.5), 0 0 60px rgba(99,102,241,0.15)",
                }}
                whileHover={{ scale: 1.5 }}
              >
                <FiBriefcase size={10} className="text-white" />
              </motion.div>

              <div className="glass rounded-3xl p-7 md:p-9 neon-glow-hover shine-sweep group relative overflow-hidden">
                {/* Corner decoration */}
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[50px] opacity-10 bg-[var(--color-gradient-start)] group-hover:opacity-20 transition-opacity" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-2">
                  <div>
                    <h3 className="text-xl font-black text-[var(--color-text-primary)] group-hover:gradient-text transition-all">
                      {exp.company}
                    </h3>
                    <p className="text-[var(--color-primary-light)] font-semibold mt-0.5">
                      {exp.role}
                    </p>
                  </div>
                  <div className="text-sm font-mono text-[var(--color-text-muted)] text-right">
                    <div className="text-[var(--color-accent)]">{exp.duration}</div>
                    <div>{exp.location}</div>
                  </div>
                </div>
                <ul className="space-y-4">
                  {exp.highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)] leading-relaxed"
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + j * 0.08 }}
                    >
                      <span className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-green)] flex-shrink-0 shadow-[0_0_6px_rgba(34,211,238,0.4)]" />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: h.replace(
                            /(\d+\.?\d*%|\d+\.?\d*x)/g,
                            '<span class="font-bold text-[var(--color-accent)]" style="text-shadow:0 0 8px rgba(34,211,238,0.3)">$1</span>'
                          ),
                        }}
                      />
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements & Certifications */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-black text-[var(--color-text-primary)] mb-7 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
                <FiAward size={18} />
              </span>
              Achievements
            </h3>
            <div className="space-y-5">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, type: "spring" }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="glass rounded-2xl p-6 neon-glow-hover shine-sweep group"
                >
                  <h4 className="font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary-light)] transition-colors">
                    {a.title}
                  </h4>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{a.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-black text-[var(--color-text-primary)] mb-7 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <FiFileText size={18} />
              </span>
              Certifications
            </h3>
            <div className="space-y-5">
              {certifications.map((c, i) => (
                <motion.a
                  key={c.title}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, type: "spring" }}
                  whileHover={{ y: -3, x: 4, transition: { duration: 0.2 } }}
                  className="block glass rounded-2xl p-6 neon-glow-hover shine-sweep group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-2">
                        {c.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                        <span className="font-semibold">{c.issuer}</span>
                        <span>·</span>
                        <span className="font-mono text-xs">{c.date}</span>
                      </div>
                    </div>
                    <FiExternalLink
                      size={16}
                      className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary-light)] transition-colors flex-shrink-0 mt-1"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

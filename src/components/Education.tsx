"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { education } from "@/data/portfolio";
import { FiBookOpen } from "react-icons/fi";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="relative py-24 md:py-32">
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
            // education
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Education</span>
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
        <div ref={ref} className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-[22px] md:left-[30px] top-0 bottom-0 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end), transparent)",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.18, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative pl-16 md:pl-20 pb-16 last:pb-0"
            >
              {/* Dot */}
              <motion.div
                className="absolute left-[12px] md:left-[20px] top-2 w-[22px] h-[22px] rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent), var(--color-neon-green))",
                  boxShadow: "0 0 20px rgba(34,211,238,0.4), 0 0 50px rgba(34,211,238,0.1)",
                }}
                whileHover={{ scale: 1.5 }}
              >
                <FiBookOpen size={10} className="text-white" />
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glass rounded-3xl p-7 md:p-8 neon-glow-hover shine-sweep group relative overflow-hidden"
              >
                <div className="absolute -top-14 -right-14 w-28 h-28 rounded-full blur-[40px] opacity-10 bg-[var(--color-accent)] group-hover:opacity-20 transition-opacity" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg font-black text-[var(--color-text-primary)] group-hover:gradient-text transition-all">
                    {edu.institution}
                  </h3>
                  <span className="text-sm font-mono text-[var(--color-accent)] sm:min-w-[120px] sm:text-right">
                    {edu.duration}
                  </span>
                </div>
                <p className="text-[var(--color-primary-light)] text-sm font-semibold mb-2">
                  {edu.degree}
                </p>
                <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                  <span className="font-bold text-[var(--color-neon-green)] bg-[var(--color-neon-green)]/10 px-2.5 py-0.5 rounded-full text-xs">
                    {edu.grade}
                  </span>
                  <span>·</span>
                  <span>{edu.location}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

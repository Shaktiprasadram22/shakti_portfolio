"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { skillCategories } from "@/data/portfolio";

/* ====== Animated Skill Bar with glow ====== */
function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="mb-4 last:mb-0">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-[var(--color-text-secondary)] font-medium">{name}</span>
        <motion.span
          className="text-xs font-mono text-[var(--color-accent)] font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="relative h-2.5 rounded-full bg-[var(--color-surface)]/80 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end))",
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.215, 0.61, 0.355, 1] }}
        />
        {/* Glow tip */}
        <motion.div
          className="absolute top-0 bottom-0 w-4 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.6), transparent)",
            filter: "blur(4px)",
          }}
          initial={{ left: "0%" }}
          animate={isInView ? { left: `${level - 1}%` } : { left: "0%" }}
          transition={{ duration: 1.2, delay, ease: [0.215, 0.61, 0.355, 1] }}
        />
      </div>
    </div>
  );
}

/* ====== Skill Category Card ====== */
function SkillCard({
  category,
  index,
  isActive,
  onActivate,
}: {
  category: (typeof skillCategories)[0];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      onClick={onActivate}
      className={`relative glass rounded-3xl p-7 cursor-pointer group transition-all duration-300 shine-sweep ${
        isActive ? "neon-glow ring-1 ring-[var(--color-primary)]/30" : "neon-glow-hover"
      }`}
    >
      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
        style={{
          background: "linear-gradient(90deg, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end))",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
      />

      {/* Header */}
      <div className="flex items-center gap-4 mb-7">
        <motion.span
          className="text-3xl"
          animate={isActive ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {category.icon}
        </motion.span>
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors">
            {category.title}
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] font-mono">{category.skills.length} skills</p>
        </div>
      </div>

      {/* Skills */}
      {category.skills.map((skill, si) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          delay={index * 0.1 + si * 0.06}
        />
      ))}

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[var(--color-gradient-start)]/[0.04] to-transparent" />
    </motion.div>
  );
}

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="skills" className="relative py-24 md:py-32">
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
            // tech stack
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Skills & Tools</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[var(--color-gradient-start)] via-[var(--color-gradient-mid)] to-[var(--color-gradient-end)] origin-center"
          />
          <p className="text-[var(--color-text-muted)] mt-5 max-w-xl mx-auto">
            Technologies I use to build scalable, production-grade applications.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {skillCategories.map((cat, i) => (
            <SkillCard
              key={cat.title}
              category={cat}
              index={i}
              isActive={activeIndex === i}
              onActivate={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

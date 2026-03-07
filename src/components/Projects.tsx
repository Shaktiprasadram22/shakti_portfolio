"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "@/data/portfolio";
import { FiGithub, FiExternalLink, FiStar } from "react-icons/fi";
import { useRef, type MouseEvent } from "react";

/* ====== 3D Tilt Project Card ====== */
function ProjectCard({
  project,
  index,
  large,
}: {
  project: (typeof projects)[0];
  index: number;
  large?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 180,
    damping: 20,
  });

  // Spotlight position
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  function onMouseMove(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    spotX.set(px * 100);
    spotY.set(py * 100);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
    spotX.set(50);
    spotY.set(50);
  }

  return (
    <motion.div
      ref={ref}
      className={`group relative rounded-3xl overflow-hidden ${
        large ? "lg:col-span-1" : ""
      }`}
      style={{
        perspective: 1200,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, type: "spring" }}
    >
      {/* Glass card */}
      <div className="relative glass rounded-3xl overflow-hidden neon-glow-hover shine-sweep">
        {/* Animated top gradient bar */}
        <motion.div
          className="h-1"
          style={{
            background: "linear-gradient(90deg, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end), var(--color-gradient-start))",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Spotlight overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: useTransform(
              [spotX, spotY],
              ([sx, sy]) =>
                `radial-gradient(400px circle at ${sx}% ${sy}%, rgba(99,102,241,0.08), transparent 60%)`
            ),
          }}
        />

        <div className="p-7 md:p-9 relative z-20">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1">
              {project.featured && (
                <motion.span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full mb-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <FiStar size={10} />
                  Featured
                </motion.span>
              )}
              <h3 className="text-2xl font-black text-[var(--color-text-primary)] group-hover:gradient-text transition-all duration-300">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-[var(--color-text-muted)] mt-1.5 tracking-wider">
                {project.date}
              </p>
            </div>
            <div className="flex gap-2.5 ml-4">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-[var(--color-surface)]/60 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-lighter)] transition-all border border-white/5 hover:border-white/10"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </motion.a>
              {project.liveDemo && (
                <motion.a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[var(--color-surface)]/60 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-lighter)] transition-all border border-white/5 hover:border-white/10"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Live Demo"
                >
                  <FiExternalLink size={18} />
                </motion.a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-[var(--color-text-secondary)] text-[0.9rem] leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Highlights */}
          <ul className="space-y-2.5 mb-7">
            {project.highlights.map((h, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i }}
              >
                <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] flex-shrink-0 shadow-[0_0_6px_rgba(99,102,241,0.4)]" />
                {h}
              </motion.li>
            ))}
          </ul>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map((tech, ti) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * ti }}
                className="px-3.5 py-1.5 text-xs font-mono font-semibold rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] border border-[var(--color-primary)]/15 hover:bg-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/30 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 md:py-32">
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
            // showcase
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[var(--color-gradient-start)] via-[var(--color-gradient-mid)] to-[var(--color-gradient-end)] origin-center"
          />
          <p className="text-[var(--color-text-muted)] mt-5 max-w-xl mx-auto">
            From AI-powered trading platforms to real-time APIs — here's what I've built.
          </p>
        </motion.div>

        {/* Featured — 2 columns large */}
        <div className="grid lg:grid-cols-2 gap-7 mb-8">
          {featuredProjects.slice(0, 2).map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} large />
          ))}
        </div>

        {/* Rest */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredProjects.slice(2).map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i + 2} />
          ))}
          {otherProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

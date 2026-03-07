"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { cardRise, sectionViewport, staggerContainer } from "@/lib/animations";
import { projects } from "@/lib/data";
import { ProjectCodeWindow } from "@/components/ProjectCodeWindow";

export function Projects() {
  return (
    <section id="projects" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-teal-300">Projects</p>
        <h2 className="font-heading text-3xl text-white md:text-4xl">Selected Work</h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerContainer}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={cardRise}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="glass group flex h-full flex-col rounded-2xl p-5"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-heading text-2xl text-white">{project.title}</h3>
                {project.duration && (
                  <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">{project.duration}</p>
                )}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} repository`}
                className="rounded-lg border border-white/10 p-2 text-zinc-300 transition hover:border-sky-300 hover:text-sky-300"
              >
                <Github size={16} />
              </a>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">{project.description}</p>
            {project.highlights && project.highlights.length > 0 && (
              <ul className="mt-4 space-y-2 text-xs text-zinc-300">
                {project.highlights.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gradient-to-r from-zinc-900 to-zinc-800 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-sky-300 transition group-hover:text-teal-300"
            >
              View on GitHub <ArrowUpRight size={14} />
            </a>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        <ProjectCodeWindow />
      </motion.div>
    </section>
  );
}

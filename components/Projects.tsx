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
        className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={cardRise}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="project-card project-card-hover group flex h-full flex-col"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-[2rem] leading-tight text-white">{project.title}</h3>
                {project.duration && (
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-zinc-500">{project.duration}</p>
                )}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} repository`}
                className="icon-action shrink-0 rounded-xl p-2.5"
              >
                <Github size={16} />
              </a>
            </div>
            <p className="project-description text-[15px] leading-8">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.tech.map((tag) => (
                <span key={tag} className="tech-pill">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-link mt-auto inline-flex items-center gap-2 pt-8 text-sm"
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

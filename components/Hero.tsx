"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-pattern opacity-40" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 -z-10 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl"
        animate={{ x: [0, 50, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-8 right-0 -z-10 h-72 w-72 rounded-full bg-teal-300/15 blur-3xl"
        animate={{ x: [0, -40, 20, 0], y: [0, 24, -10, 0] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="section flex flex-col items-start justify-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="mb-5 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-xs text-sky-300"
        >
          Jalandhar, Punjab, India
        </motion.div>

        <h1 className="font-heading text-4xl leading-tight text-white sm:text-5xl md:text-7xl">
          Shakti Prasad Ram
        </h1>
        <p className="mt-4 font-heading text-lg text-zinc-200 md:text-2xl">
          Backend Developer <span className="text-zinc-500">|</span>{" "}
          <span className="accent-text">AI Systems Builder</span>
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base">
          I build scalable backend systems, real-time APIs and AI powered applications.
        </p>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Building scalable APIs, distributed systems and AI-powered applications.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-xl bg-gradient-to-r from-sky-400 to-teal-300 px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="glass rounded-xl px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-white/25"
          >
            Contact Me
          </a>
          <a
            href="/resume/Shakti-Prasad-Ram-CV.pdf"
            download
            className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            Download Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
}

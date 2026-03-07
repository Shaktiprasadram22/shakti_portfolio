"use client";

import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { FiArrowRight, FiGithub, FiLinkedin } from "react-icons/fi";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

/* ====== Typing Animation ====== */
function TypingText({ texts }: { texts: string[] }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout: number;
    if (!deleting && charIndex < current.length) {
      timeout = window.setTimeout(() => setCharIndex((c) => c + 1), 55);
    } else if (!deleting && charIndex === current.length) {
      timeout = window.setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIndex > 0) {
      timeout = window.setTimeout(() => setCharIndex((c) => c - 1), 30);
    } else {
      setDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts]);

  return (
    <span className="code-text text-xl sm:text-2xl md:text-3xl">
      {texts[textIndex].slice(0, charIndex)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-[var(--color-accent)] ml-1 align-text-bottom rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"
      />
    </span>
  );
}

/* ====== 3D Floating Shapes ====== */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rotating wireframe cube */}
      <div className="absolute top-[15%] right-[12%] w-20 h-20 spin-slow opacity-20" style={{ perspective: "200px" }}>
        <div
          className="w-full h-full border border-[var(--color-primary)]/30 rounded-sm"
          style={{
            transform: "rotateX(45deg) rotateY(45deg)",
            boxShadow: "0 0 30px rgba(99,102,241,0.1)",
          }}
        />
      </div>

      {/* Morphing blob */}
      <motion.div
        className="absolute top-[60%] left-[8%] w-32 h-32 morph opacity-10"
        style={{
          background: "linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))",
          filter: "blur(1px)",
        }}
      />

      {/* Glowing ring */}
      <div className="absolute top-[25%] left-[18%]">
        <div className="w-16 h-16 rounded-full border border-[var(--color-accent)]/15 pulse-ring" />
      </div>

      {/* Floating diamond */}
      <motion.div
        className="absolute bottom-[20%] right-[20%] w-6 h-6 float-slow"
        style={{
          background: "linear-gradient(135deg, var(--color-neon-pink), var(--color-gradient-mid))",
          transform: "rotate(45deg)",
          borderRadius: "4px",
          opacity: 0.25,
          boxShadow: "0 0 20px rgba(236,72,153,0.3)",
        }}
      />

      {/* Small dots */}
      {[
        { top: "30%", left: "75%", delay: 0, size: 4, color: "var(--color-accent)" },
        { top: "70%", left: "65%", delay: 1, size: 3, color: "var(--color-primary-light)" },
        { top: "45%", left: "5%", delay: 2, size: 5, color: "var(--color-neon-pink)" },
        { top: "80%", left: "30%", delay: 0.5, size: 3, color: "var(--color-neon-green)" },
        { top: "10%", left: "50%", delay: 1.5, size: 4, color: "var(--color-gradient-mid)" },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: dot.color,
            boxShadow: `0 0 ${dot.size * 4}px ${dot.color}`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Orbit ring */}
      <svg
        className="absolute top-[40%] right-[5%] w-40 h-40 spin-slow opacity-10"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#orbit-grad)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
        <defs>
          <linearGradient id="orbit-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle cx="95" cy="50" r="2" fill="#6366f1">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Floating tech icons */}
      {[
        { label: "Node.js", top: "18%", left: "6%", delay: 0, color: "#10b981" },
        { label: "React", top: "12%", right: "22%", delay: 0.5, color: "#06b6d4" },
        { label: "MongoDB", bottom: "22%", left: "12%", delay: 1, color: "#10b981" },
        { label: "Docker", bottom: "15%", right: "8%", delay: 1.5, color: "#6366f1" },
        { label: "OpenAI", top: "35%", right: "3%", delay: 2, color: "#a855f7" },
      ].map((tech, i) => (
        <motion.div
          key={tech.label}
          className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-[0.65rem] font-mono font-medium tracking-wide"
          style={{
            top: tech.top,
            bottom: (tech as { bottom?: string }).bottom,
            left: tech.left,
            right: (tech as { right?: string }).right,
            color: tech.color,
            border: `1px solid ${tech.color}20`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: tech.delay,
            ease: "easeInOut",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: tech.color, boxShadow: `0 0 6px ${tech.color}` }}
          />
          {tech.label}
        </motion.div>
      ))}
    </div>
  );
}

/* ====== Character-by-character name reveal ====== */
function RevealText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.05 * i,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ====== Status Badge ====== */
function StatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass neon-glow text-sm text-[var(--color-text-secondary)] font-medium">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
        </span>
        Available for Opportunities
      </span>
    </motion.div>
  );
}

/* ====== Main Hero ====== */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[10%] -left-20 w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[140px]"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] -right-20 w-[500px] h-[500px] rounded-full opacity-[0.10] blur-[120px]"
          style={{ background: "linear-gradient(135deg, #06b6d4, #10b981)" }}
          animate={{
            x: [0, -70, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: "#ec4899" }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 3D Floating shapes (CSS) */}
      <FloatingShapes />

      {/* Three.js 3D Scene */}
      <HeroScene />

      {/* Content */}
      <div className="relative z-10 section-container text-center max-w-5xl mx-auto">
        <StatusBadge />

        {/* Pre-title code line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-[var(--color-text-muted)] mb-4"
        >
          <span className="text-[var(--color-neon-pink)]">const</span>{" "}
          <span className="text-[var(--color-accent)]">developer</span>{" "}
          <span className="text-[var(--color-text-muted)]">=</span>{" "}
          <span className="text-[var(--color-neon-green)]">&#123;</span>
        </motion.p>

        {/* Name — character by character reveal */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight mb-4 leading-[0.95]">
          <RevealText text={personalInfo.name} className="gradient-text" />
        </h1>

        {/* Title + Typing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-2 font-light"
        >
          {personalInfo.title}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-3"
        >
          <TypingText texts={personalInfo.taglines} />
        </motion.div>

        {/* Closing brace */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-mono text-sm text-[var(--color-neon-green)] mb-10"
        >
          &#125;;
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            className="group relative flex items-center gap-2 px-9 py-4 rounded-2xl font-semibold text-base text-white overflow-hidden"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Animated gradient BG */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(99,102,241,0.5),0_0_60px_rgba(168,85,247,0.3)]" />
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </motion.a>

          <motion.a
            href="#contact"
            className="group flex items-center gap-2 px-9 py-4 rounded-2xl glass neon-glow-hover font-semibold text-base text-[var(--color-text-primary)] transition-all duration-300"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-14 flex justify-center gap-4"
        >
          {[
            { icon: <FiGithub size={22} />, href: personalInfo.github, label: "GitHub" },
            { icon: <FiLinkedin size={22} />, href: personalInfo.linkedin, label: "LinkedIn" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl glass neon-glow-hover text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-all duration-300"
              whileHover={{ scale: 1.15, y: -4, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono text-[var(--color-text-muted)] tracking-widest uppercase">scroll</span>
            <div className="w-5 h-9 rounded-full border-2 border-[var(--color-surface-lighter)] flex items-start justify-center p-1.5">
              <motion.div
                className="w-1 h-2 rounded-full bg-[var(--color-primary)]"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ boxShadow: "0 0 6px rgba(99,102,241,0.5)" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

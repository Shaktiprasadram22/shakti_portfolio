"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(168,85,247,0.3), rgba(6,182,212,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <motion.span
              className="text-2xl font-bold gradient-text font-mono tracking-tight"
              whileHover={{ scale: 1.05 }}
            >
              &lt;SPR /&gt;
            </motion.span>
            <p className="text-sm text-[var(--color-text-muted)] mt-3 flex items-center gap-1 justify-center md:justify-start">
              Crafted with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FiHeart className="text-red-400" size={14} />
              </motion.span>
              using React & Framer Motion
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { icon: <FiGithub size={18} />, href: personalInfo.github },
              { icon: <FiLinkedin size={18} />, href: personalInfo.linkedin },
              { icon: <FiMail size={18} />, href: `mailto:${personalInfo.email}` },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Back to top + Copyright */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <motion.button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl glass neon-glow-hover text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-all cursor-pointer"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <FiArrowUp size={18} />
            </motion.button>
            <p className="text-sm text-[var(--color-text-muted)] font-mono">
              © {currentYear} {personalInfo.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

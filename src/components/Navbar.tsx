"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => document.querySelector(l.href));
      let current = "";
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) current = `#${section.id}`;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold gradient-text font-mono tracking-tight"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            &lt;SPR /&gt;
          </motion.a>

          {/* Desktop Nav — increased gap */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${
                  activeSection === link.href
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                {/* Active pill background */}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-white/[0.07] border border-white/[0.1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {/* Underline hover effect */}
                <motion.div
                  className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{ originX: 0.5 }}
                />
              </motion.button>
            ))}
            {/* Resume button with glow */}
            <motion.a
              href="/ShaktiPrasadRam_Resume.pdf"
              target="_blank"
              className="relative ml-4 px-6 py-2.5 text-sm font-semibold rounded-xl text-white overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.2)]"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.4), 0 0 60px rgba(168,85,247,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)",
                  backgroundSize: "200% 200%",
                }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <span className="relative z-10">Resume</span>
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden text-[var(--color-text-primary)] p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.85, rotate: 90 }}
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, height: "auto", backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, height: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className="md:hidden glass-strong overflow-hidden"
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.215, 0.61, 0.355, 1] }}
                  className={`block w-full text-left px-5 py-3.5 rounded-2xl transition-colors cursor-pointer ${
                    activeSection === link.href
                      ? "text-[var(--color-text-primary)] bg-white/[0.05]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="font-mono text-xs text-[var(--color-primary)] mr-2">0{i + 1}.</span>
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

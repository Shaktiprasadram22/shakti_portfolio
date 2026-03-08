"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { useTheme } from "@/components/theme/ThemeProvider";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = mounted ? theme === "dark" : true;
  const themeLabel = mounted
    ? isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle theme";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4 md:px-8">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 md:px-6">
        <a href="#hero" className="font-heading text-sm tracking-wide text-zinc-200 transition-colors">
          SHAKTI / DEV
        </a>

        <ul className="hidden items-center gap-6 text-xs text-zinc-300 md:flex">
          {navLinks.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-zinc-100 shadow-[0_2px_16px_rgba(15,23,42,0.22)] transition hover:border-cyan-300/70 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
          >
            <Sun
              size={16}
              className={`absolute transition-all duration-300 ${isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
            />
            <Moon
              size={16}
              className={`absolute transition-all duration-300 ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`}
            />
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-lg border border-white/10 p-2 text-zinc-100 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden"
        >
          <ul className="space-y-3 text-sm text-zinc-300">
            {navLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="block hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}

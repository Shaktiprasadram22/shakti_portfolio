"use client";

import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4 md:px-8">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 md:px-6">
        <a href="#hero" className="font-heading text-sm tracking-wide text-zinc-200">
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

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-lg border border-white/10 p-2 text-zinc-100 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
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

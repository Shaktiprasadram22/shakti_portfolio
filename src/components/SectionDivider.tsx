"use client";

import { motion } from "framer-motion";

interface Props {
  gradient?: string;
}

/**
 * A glowing gradient beam divider between sections.
 */
export default function SectionDivider({ gradient }: Props) {
  return (
    <div className="relative w-full flex items-center justify-center py-2">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-2xl h-px origin-center"
        style={{
          background:
            gradient ||
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(168,85,247,0.5), rgba(6,182,212,0.5), transparent)",
        }}
      />
      {/* Center glow dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring" }}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: "linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))",
          boxShadow: "0 0 20px rgba(99,102,241,0.6), 0 0 60px rgba(99,102,241,0.2)",
        }}
      />
    </div>
  );
}

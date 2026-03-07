"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.12
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-sky-400 via-teal-300 to-green-400"
      style={{ scaleX }}
    />
  );
}

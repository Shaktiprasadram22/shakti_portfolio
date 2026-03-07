"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { personalInfo } from "@/data/portfolio";
import { FiMapPin } from "react-icons/fi";

const journeySteps = [
  {
    year: "2019",
    title: "The Beginning",
    desc: "Started coding with curiosity about how technology shapes the world.",
    color: "#10b981",
  },
  {
    year: "2022",
    title: "B.Tech @ LPU",
    desc: "Enrolled in CSE at Lovely Professional University. Deep dove into DSA and core CS.",
    color: "#6366f1",
  },
  {
    year: "2024",
    title: "Backend & Databases",
    desc: "Mastered Node.js, Express, MongoDB, PostgreSQL. Built production-grade APIs.",
    color: "#a855f7",
  },
  {
    year: "2025",
    title: "Full-Stack + AI",
    desc: "Shipped AI-powered products. Interned at Vibeinn Technology. Cloud infrastructure.",
    color: "#06b6d4",
  },
];

function useCardTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return { rotateX, rotateY, onMove, onLeave };
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2000 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  if (isInView) motionVal.set(value);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function About() {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const tilt = useCardTilt();

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-[var(--color-accent)] mb-4 tracking-wider uppercase"
          >
            // who am I
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[var(--color-gradient-start)] via-[var(--color-gradient-mid)] to-[var(--color-gradient-end)] origin-center"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Bio Card with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              perspective: 1000,
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={tilt.onMove}
            onMouseLeave={tilt.onLeave}
          >
            <div className="glass rounded-3xl p-8 md:p-10 neon-glow shine-sweep relative overflow-hidden">
              {/* Decorative corner gradient */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-20 bg-[var(--color-gradient-mid)]" />

              <div className="flex items-center gap-2 mb-8 text-sm text-[var(--color-text-muted)]">
                <FiMapPin size={14} className="text-[var(--color-accent)]" />
                {personalInfo.location}
              </div>
              {personalInfo.bio.split("\n\n").map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="text-[var(--color-text-secondary)] leading-[1.85] mb-6 last:mb-0 text-[0.95rem]"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Stats — animated counters */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: "Problems Solved", value: 400, suffix: "+" },
                { label: "Projects Built", value: 5, suffix: "+" },
                { label: "Response Time Cut", value: 35, suffix: "%" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, type: "spring" }}
                  className="glass rounded-2xl p-5 text-center neon-glow-hover group cursor-default"
                >
                  <div className="text-3xl font-black gradient-text mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[0.7rem] text-[var(--color-text-muted)] uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Journey Timeline — enhanced */}
          <div ref={timelineRef} className="relative">
            {/* Vertical glow line */}
            <motion.div
              className="absolute left-[18px] top-0 bottom-0 w-[2px]"
              style={{
                background: "linear-gradient(to bottom, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end), transparent)",
              }}
              initial={{ scaleY: 0 }}
              animate={timelineInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
              // transform origin top
              data-origin="top"
            />

            {journeySteps.map((step, i) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: 50 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                className="relative pl-14 pb-16 last:pb-0 group"
              >
                {/* Animated dot */}
                <motion.div
                  className="absolute left-[9px] top-2 w-[20px] h-[20px] rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, transparent)`,
                    boxShadow: `0 0 20px ${step.color}40`,
                  }}
                  whileHover={{ scale: 1.4 }}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </motion.div>

                {/* Year pill */}
                <motion.span
                  className="inline-block font-mono text-xs font-bold px-3 py-1 rounded-full mb-3"
                  style={{
                    background: `${step.color}15`,
                    color: step.color,
                    border: `1px solid ${step.color}25`,
                  }}
                >
                  {step.year}
                </motion.span>

                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1.5 group-hover:text-[var(--color-primary-light)] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

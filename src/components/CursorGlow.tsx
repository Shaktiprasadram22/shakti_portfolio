"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 150, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 150, mass: 0.5 });
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const onMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!visible) setVisible(true);
    trailRef.current.push({ x: e.clientX, y: e.clientY });
    if (trailRef.current.length > 20) trailRef.current.shift();
  }, [cursorX, cursorY, visible]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", () => setVisible(false));
    document.body.addEventListener("mouseenter", () => setVisible(true));

    // Trail canvas animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const trail = trailRef.current;
      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const alpha = (i / trail.length) * 0.15;
          const size = (i / trail.length) * 3;
          ctx.beginPath();
          ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.fill();
        }
      }
      animRef.current = requestAnimationFrame(drawTrail);
    };
    drawTrail();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [onMouseMove]);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999]"
        aria-hidden="true"
        style={{ opacity: visible ? 1 : 0 }}
      />
      {/* Main glow */}
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{
          x: springX,
          y: springY,
          width: 500,
          height: 500,
          marginLeft: -250,
          marginTop: -250,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(168,85,247,0.04) 30%, transparent 70%)",
          borderRadius: "50%",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {/* Inner intense glow */}
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{
          x: springX,
          y: springY,
          width: 80,
          height: 80,
          marginLeft: -40,
          marginTop: -40,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
    </>
  );
}

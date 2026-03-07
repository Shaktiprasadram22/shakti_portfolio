"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a canvas of slowly drifting star particles.
 * Subtle, performant, and adds depth to the dark background.
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: { x: number; y: number; r: number; speed: number; opacity: number }[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create stars
    const count = Math.min(200, Math.floor((window.innerWidth * window.innerHeight) / 8000));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.15 + 0.02,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (const star of stars) {
        star.y -= star.speed;
        if (star.y < -2) {
          star.y = canvas!.height + 2;
          star.x = Math.random() * canvas!.width;
        }
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(148, 163, 184, ${star.opacity})`;
        ctx!.fill();
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="star-field"
      aria-hidden="true"
    />
  );
}

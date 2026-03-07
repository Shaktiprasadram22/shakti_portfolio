"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const SceneBackground = dynamic(
  () => import("./SceneBackground").then((mod) => mod.SceneBackground),
  { ssr: false }
);

export function GlobalBackground() {
  const [simplified, setSimplified] = useState(true);
  const [mounted, setMounted] = useState(false);
  const trailCount = simplified ? 4 : 7;
  const pointer = useRef({ x: 0, y: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const pointerPxTarget = useRef({ x: 0, y: 0 });
  const pointerPxFast = useRef({ x: 0, y: 0 });
  const pointerPxSlow = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<Array<{ x: number; y: number }>>([]);
  const pointerActive = useRef(false);
  const nearGlowRef = useRef<HTMLDivElement>(null);
  const farGlowRef = useRef<HTMLDivElement>(null);
  const cursorCoreRef = useRef<HTMLDivElement>(null);
  const cursorTailRef = useRef<HTMLDivElement>(null);
  const cursorHeadRef = useRef<HTMLDivElement>(null);
  const trailNodeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");

    const evaluate = () => {
      setSimplified(reducedMotion.matches || mobile.matches);
      setMounted(true);
    };

    evaluate();
    reducedMotion.addEventListener("change", evaluate);
    mobile.addEventListener("change", evaluate);
    return () => {
      reducedMotion.removeEventListener("change", evaluate);
      mobile.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const centerX = window.innerWidth * 0.5;
    const centerY = window.innerHeight * 0.5;
    pointerPxTarget.current.x = centerX;
    pointerPxTarget.current.y = centerY;
    pointerPxFast.current.x = centerX;
    pointerPxFast.current.y = centerY;
    pointerPxSlow.current.x = centerX;
    pointerPxSlow.current.y = centerY;
    trailPositions.current = Array.from({ length: trailCount }, () => ({ x: centerX, y: centerY }));

    const handlePointerMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      pointerTarget.current.x = nx;
      pointerTarget.current.y = -ny;
      pointerPxTarget.current.x = event.clientX;
      pointerPxTarget.current.y = event.clientY;
      pointerActive.current = true;
    };

    const handlePointerLeave = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
      pointerActive.current = false;
    };

    let raf = 0;
    const animate = () => {
      pointer.current.x += (pointerTarget.current.x - pointer.current.x) * 0.08;
      pointer.current.y += (pointerTarget.current.y - pointer.current.y) * 0.08;
      pointerPxFast.current.x += (pointerPxTarget.current.x - pointerPxFast.current.x) * 0.18;
      pointerPxFast.current.y += (pointerPxTarget.current.y - pointerPxFast.current.y) * 0.18;
      pointerPxSlow.current.x += (pointerPxFast.current.x - pointerPxSlow.current.x) * 0.09;
      pointerPxSlow.current.y += (pointerPxFast.current.y - pointerPxSlow.current.y) * 0.09;

      const deltaX = pointerPxTarget.current.x - pointerPxFast.current.x;
      const deltaY = pointerPxTarget.current.y - pointerPxFast.current.y;
      const velocity = Math.min(Math.hypot(deltaX, deltaY), 60);
      const glowScale = simplified ? 0.9 : 1 + velocity / 300;
      const glowOpacity = pointerActive.current ? (simplified ? 0.22 : 0.32) : 0;
      const trailOpacity = pointerActive.current ? (simplified ? 0.1 : 0.18) : 0;
      const headOpacity = pointerActive.current ? (simplified ? 0.65 : 0.8) : 0;
      const dotTrailBaseOpacity = pointerActive.current ? (simplified ? 0.28 : 0.4) : 0;

      if (nearGlowRef.current) {
        const x = pointer.current.x * (simplified ? 9 : 16);
        const y = pointer.current.y * (simplified ? 7 : 12);
        nearGlowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (farGlowRef.current) {
        const x = pointer.current.x * (simplified ? -4 : -8);
        const y = pointer.current.y * (simplified ? -3 : -6);
        farGlowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (cursorCoreRef.current) {
        cursorCoreRef.current.style.transform = `translate3d(${pointerPxFast.current.x}px, ${pointerPxFast.current.y}px, 0) translate(-50%, -50%) scale(${glowScale})`;
        cursorCoreRef.current.style.opacity = String(glowOpacity);
      }

      if (cursorTailRef.current) {
        cursorTailRef.current.style.transform = `translate3d(${pointerPxSlow.current.x}px, ${pointerPxSlow.current.y}px, 0) translate(-50%, -50%)`;
        cursorTailRef.current.style.opacity = String(trailOpacity);
      }

      if (cursorHeadRef.current) {
        cursorHeadRef.current.style.transform = `translate3d(${pointerPxFast.current.x}px, ${pointerPxFast.current.y}px, 0) translate(-50%, -50%)`;
        cursorHeadRef.current.style.opacity = String(headOpacity);
      }

      if (trailPositions.current.length !== trailCount) {
        trailPositions.current = Array.from({ length: trailCount }, () => ({
          x: pointerPxFast.current.x,
          y: pointerPxFast.current.y
        }));
      }

      if (trailPositions.current.length > 0) {
        const leadEase = simplified ? 0.2 : 0.26;
        trailPositions.current[0].x += (pointerPxFast.current.x - trailPositions.current[0].x) * leadEase;
        trailPositions.current[0].y += (pointerPxFast.current.y - trailPositions.current[0].y) * leadEase;

        for (let i = 1; i < trailPositions.current.length; i += 1) {
          const followEase = Math.max(0.09, (simplified ? 0.18 : 0.22) - i * 0.02);
          trailPositions.current[i].x +=
            (trailPositions.current[i - 1].x - trailPositions.current[i].x) * followEase;
          trailPositions.current[i].y +=
            (trailPositions.current[i - 1].y - trailPositions.current[i].y) * followEase;
        }
      }

      for (let i = 0; i < trailCount; i += 1) {
        const node = trailNodeRefs.current[i];
        const point = trailPositions.current[i];
        if (!node || !point) {
          continue;
        }
        const opacity = dotTrailBaseOpacity * (1 - i / (trailCount + 1));
        node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
        node.style.opacity = String(opacity);
      }

      raf = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.cancelAnimationFrame(raf);
    };
  }, [mounted, simplified, trailCount]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        ref={farGlowRef}
        className="absolute inset-0 transition-transform duration-500 will-change-transform bg-[radial-gradient(circle_at_18%_15%,rgba(14,165,233,0.20),transparent_36%),radial-gradient(circle_at_78%_12%,rgba(20,184,166,0.16),transparent_34%),radial-gradient(circle_at_52%_85%,rgba(34,197,94,0.13),transparent_36%)]"
      />
      <div
        ref={nearGlowRef}
        className="absolute inset-0 transition-transform duration-500 will-change-transform bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.10),transparent_30%),radial-gradient(circle_at_88%_68%,rgba(45,212,191,0.09),transparent_30%)]"
      />
      <div
        ref={cursorTailRef}
        className="absolute left-0 top-0 h-[280px] w-[280px] rounded-full opacity-0 will-change-transform [background:radial-gradient(circle,rgba(45,212,191,0.24)_0%,rgba(45,212,191,0.08)_35%,transparent_72%)] blur-3xl transition-opacity duration-300"
      />
      <div
        ref={cursorCoreRef}
        className="absolute left-0 top-0 h-[160px] w-[160px] rounded-full opacity-0 will-change-transform [background:radial-gradient(circle,rgba(56,189,248,0.42)_0%,rgba(56,189,248,0.14)_36%,transparent_74%)] blur-2xl mix-blend-screen transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.55),rgba(9,9,11,0.9))]" />
      {mounted && <SceneBackground simplified={simplified} pointer={pointer} />}
      <div
        ref={cursorHeadRef}
        className="absolute left-0 top-0 z-20 h-4 w-4 rounded-full border border-sky-200/60 bg-sky-300/35 opacity-0 will-change-transform blur-[1px] transition-opacity duration-300"
      />
      {Array.from({ length: trailCount }).map((_, idx) => {
        const size = Math.max(5, 12 - idx);
        return (
          <div
            key={`cursor-trail-${idx}`}
            ref={(node) => {
              trailNodeRefs.current[idx] = node;
            }}
            style={{ width: `${size}px`, height: `${size}px` }}
            className="absolute left-0 top-0 z-20 rounded-full border border-cyan-200/30 bg-cyan-300/25 opacity-0 will-change-transform blur-[0.5px] transition-opacity duration-300"
          />
        );
      })}
    </div>
  );
}

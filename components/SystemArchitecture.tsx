"use client";

import { motion } from "framer-motion";
import { Minus, Move, Plus, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cardRise, sectionViewport, staggerContainer } from "@/lib/animations";
import { architectureProjects } from "@/lib/architecture-data";
import { ArchitectureEdge, ArchitectureNode } from "@/types";

const MIN_SCALE = 0.68;
const MAX_SCALE = 1.85;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function categoryClasses(category: ArchitectureNode["category"]) {
  switch (category) {
    case "frontend":
      return "border-sky-300/60 bg-sky-400/15 text-sky-100";
    case "api":
      return "border-cyan-300/60 bg-cyan-400/15 text-cyan-100";
    case "service":
      return "border-teal-300/60 bg-teal-400/15 text-teal-100";
    case "cache":
      return "border-emerald-300/60 bg-emerald-400/15 text-emerald-100";
    case "database":
      return "border-lime-300/60 bg-lime-400/15 text-lime-100";
    case "external":
      return "border-fuchsia-300/60 bg-fuchsia-400/15 text-fuchsia-100";
    default:
      return "border-zinc-300/40 bg-zinc-400/15 text-zinc-100";
  }
}

export function SystemArchitecture() {
  const [activeProjectId, setActiveProjectId] = useState(architectureProjects[0].id);
  const activeProject = useMemo(
    () => architectureProjects.find((project) => project.id === activeProjectId) ?? architectureProjects[0],
    [activeProjectId]
  );

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(activeProject.nodes[0]?.id ?? null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setHoveredNodeId(null);
    setSelectedNodeId(activeProject.nodes[0]?.id ?? null);
  }, [activeProject]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const dx = event.clientX - dragStartRef.current.x;
      const dy = event.clientY - dragStartRef.current.y;
      setPan({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy,
      });
    };

    const onUp = () => setDragging(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);

  const nodesById = useMemo(
    () =>
      activeProject.nodes.reduce<Record<string, ArchitectureNode>>((acc, node) => {
        acc[node.id] = node;
        return acc;
      }, {}),
    [activeProject.nodes]
  );

  const selectedNode = selectedNodeId ? nodesById[selectedNodeId] : null;
  const selectedConnections = useMemo(() => {
    if (!selectedNode) {
      return [];
    }
    return activeProject.edges
      .filter((edge) => edge.from === selectedNode.id || edge.to === selectedNode.id)
      .map((edge) => {
        const targetId = edge.from === selectedNode.id ? edge.to : edge.from;
        return { edge, node: nodesById[targetId] };
      });
  }, [activeProject.edges, nodesById, selectedNode]);

  const handleWheelZoom = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? -0.08 : 0.08;
    setScale((current) => clamp(current + direction, MIN_SCALE, MAX_SCALE));
  };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = event.target as HTMLElement;
    if (element.closest("[data-arch-node='true']")) {
      return;
    }
    dragStartRef.current = { x: event.clientX, y: event.clientY };
    panStartRef.current = { ...pan };
    setDragging(true);
  };

  const zoomIn = () => setScale((current) => clamp(current + 0.12, MIN_SCALE, MAX_SCALE));
  const zoomOut = () => setScale((current) => clamp(current - 0.12, MIN_SCALE, MAX_SCALE));
  const resetView = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const mapTransform = `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${scale})`;

  const edgeIsHighlighted = (edge: ArchitectureEdge) => {
    const focus = hoveredNodeId ?? selectedNodeId;
    return focus ? edge.from === focus || edge.to === focus : false;
  };

  return (
    <section id="architecture" className="section">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        className="mb-8"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-cyan-300">System Architecture</p>
        <h2 className="font-heading text-3xl text-white md:text-4xl">Interactive Engineering Maps</h2>
        <p className="mt-3 max-w-3xl text-sm text-zinc-400 md:text-base">
          Explore service boundaries, data pathways and infrastructure composition for each flagship project.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerContainer}
        className="mb-5 flex flex-wrap gap-2"
      >
        {architectureProjects.map((project) => (
          <motion.button
            key={project.id}
            variants={cardRise}
            type="button"
            onClick={() => setActiveProjectId(project.id)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeProjectId === project.id
                ? "border-cyan-300/70 bg-cyan-400/20 text-cyan-100"
                : "border-white/15 bg-white/5 text-zinc-300 hover:border-white/35 hover:text-zinc-100"
            }`}
          >
            {project.title}
          </motion.button>
        ))}
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-[1.45fr,0.55fr]">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          className="glass rounded-2xl p-4 md:p-5"
        >
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-2xl text-zinc-100">{activeProject.title}</h3>
              <p className="text-sm text-cyan-300">{activeProject.subtitle}</p>
              <p className="mt-2 max-w-3xl text-xs text-zinc-400 md:text-sm">{activeProject.overview}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={zoomOut}
                className="rounded-lg border border-white/20 bg-zinc-900/80 p-2 text-zinc-200 transition hover:border-white/40"
                aria-label="Zoom out architecture map"
              >
                <Minus size={15} />
              </button>
              <button
                type="button"
                onClick={zoomIn}
                className="rounded-lg border border-white/20 bg-zinc-900/80 p-2 text-zinc-200 transition hover:border-white/40"
                aria-label="Zoom in architecture map"
              >
                <Plus size={15} />
              </button>
              <button
                type="button"
                onClick={resetView}
                className="rounded-lg border border-white/20 bg-zinc-900/80 p-2 text-zinc-200 transition hover:border-white/40"
                aria-label="Reset architecture map view"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <Move size={14} />
              Drag to pan
            </span>
            <span>Scroll to zoom</span>
            <span>Hover node for quick tooltip</span>
            <span>Click node for deep details</span>
          </div>

          <div
            onWheel={handleWheelZoom}
            onPointerDown={startDrag}
            className={`relative h-[500px] overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70 ${
              dragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div
              className="absolute left-1/2 top-1/2 h-[720px] w-[1200px] origin-center transition-transform duration-100"
              style={{ transform: mapTransform }}
            >
              <svg
                width={activeProject.canvas.width}
                height={activeProject.canvas.height}
                className="absolute inset-0"
                aria-hidden
              >
                <defs>
                  <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(125,211,252,0.45)" />
                    <stop offset="100%" stopColor="rgba(45,212,191,0.5)" />
                  </linearGradient>
                </defs>
                {activeProject.edges.map((edge) => {
                  const fromNode = nodesById[edge.from];
                  const toNode = nodesById[edge.to];
                  if (!fromNode || !toNode) {
                    return null;
                  }
                  const highlighted = edgeIsHighlighted(edge);
                  return (
                    <g key={edge.id}>
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={highlighted ? "rgba(94,234,212,0.9)" : "url(#edgeGradient)"}
                        strokeWidth={highlighted ? 2.6 : 1.4}
                        strokeLinecap="round"
                      />
                      <text
                        x={(fromNode.x + toNode.x) / 2}
                        y={(fromNode.y + toNode.y) / 2 - 8}
                        textAnchor="middle"
                        fill="rgba(161,161,170,0.9)"
                        fontSize="10"
                        letterSpacing="0.04em"
                      >
                        {edge.flow}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {!reducedMotion &&
                activeProject.edges.map((edge, index) => {
                  const fromNode = nodesById[edge.from];
                  const toNode = nodesById[edge.to];
                  if (!fromNode || !toNode) {
                    return null;
                  }
                  const distance = Math.hypot(toNode.x - fromNode.x, toNode.y - fromNode.y);
                  const duration = Math.max(2.8, distance / 135);
                  return (
                    <motion.div
                      key={`${edge.id}-packet`}
                      className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,.9)]"
                      animate={{
                        x: [fromNode.x, toNode.x],
                        y: [fromNode.y, toNode.y],
                        opacity: [0, 1, 1, 0],
                        scale: [0.6, 1, 1, 0.65],
                      }}
                      transition={{
                        duration,
                        delay: (index % 5) * 0.25,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 0.2,
                        ease: "linear",
                      }}
                    />
                  );
                })}

              {activeProject.nodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isHovered = hoveredNodeId === node.id;
                return (
                  <motion.button
                    key={node.id}
                    data-arch-node="true"
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId((current) => (current === node.id ? null : current))}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`group absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 text-left shadow-[0_0_20px_rgba(34,211,238,.08)] transition ${
                      isSelected || isHovered
                        ? "border-cyan-200/80 bg-cyan-300/15"
                        : `${categoryClasses(node.category)}`
                    }`}
                    style={{ transform: `translate(${node.x}px, ${node.y}px) translate(-50%, -50%)` }}
                  >
                    <span className="block font-heading text-xs tracking-wide text-white">{node.label}</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.12em] text-zinc-300">
                      {node.category}
                    </span>
                    <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-52 -translate-x-1/2 rounded-lg border border-white/20 bg-zinc-900/95 p-2 text-[11px] text-zinc-200 shadow-xl group-hover:block">
                      {node.role}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.article>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          transition={{ delay: 0.08 }}
          className="glass rounded-2xl p-5"
        >
          {selectedNode ? (
            <>
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300">Component Insight</p>
              <h3 className="mt-2 font-heading text-2xl text-zinc-100">{selectedNode.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{selectedNode.role}</p>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">Tech Stack</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedNode.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/15 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">Service Interactions</p>
                <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                  {selectedConnections.map(({ edge, node }) => (
                    <li key={edge.id} className="rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2">
                      <p className="font-medium text-zinc-200">{node?.label ?? "Unknown Node"}</p>
                      <p className="text-xs text-zinc-400">{edge.flow}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-sm text-zinc-400">Select a component node to inspect its responsibilities.</p>
          )}
        </motion.aside>
      </div>
    </section>
  );
}

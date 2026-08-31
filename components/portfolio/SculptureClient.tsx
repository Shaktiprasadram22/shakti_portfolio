"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const layerCopy = [
  ["products", "Releases", "Public tools shaped around privacy, speed, and useful constraints."],
  ["platforms", "Systems", "APIs, data, queues, observability, and explicit failure paths."],
  ["delivery", "Proof", "Accessible interfaces, measured performance, and resilient cloud delivery."],
] as const;

type LayerId = (typeof layerCopy)[number][0];

function StaticSculpture() {
  const [active, setActive] = useState<LayerId>("platforms");
  const selected = layerCopy.find(([id]) => id === active) ?? layerCopy[1];

  return (
    <div className="sculpture-shell" data-webgl="fallback" data-active={active}>
      <div
        className="sculpture-viewport"
        role="img"
        aria-label="A diagonal software blade with selectable release, systems, and proof layers."
      >
        <div className="sculpture-static" aria-hidden="true"><i /><i /><i /><b /></div>
      </div>
      <div className="layer-console">
        <div className="layer-console-copy" aria-live="polite"><strong>{selected[1]}</strong><p>{selected[2]}</p></div>
        <div className="layer-controls" role="group" aria-label="Inspect system layer">
          {layerCopy.map(([id, label]) => (
            <button key={id} type="button" aria-pressed={active === id} onClick={() => setActive(id)}>
              <span aria-hidden="true" />{label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const InteractiveSculpture = dynamic(
  () => import("./SystemSculpture").then((module) => module.SystemSculpture),
  { ssr: false, loading: () => <StaticSculpture /> },
);

export function SculptureClient() {
  const [enhance, setEnhance] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 721px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnhance(desktop.matches && !reduced.matches);

    const requestIdle = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => window.setTimeout(callback, 180));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const idleId = requestIdle(update);
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);

    return () => {
      cancelIdle(idleId);
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return enhance ? <InteractiveSculpture /> : <StaticSculpture />;
}

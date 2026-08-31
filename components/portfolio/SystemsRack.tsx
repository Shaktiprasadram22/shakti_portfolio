"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { systems } from "@/lib/portfolio-data";

export function SystemsRack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = systems[activeIndex];

  const handleKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % systems.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + systems.length) % systems.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = systems.length - 1;
    if (next === index) return;
    event.preventDefault();
    setActiveIndex(next);
    document.getElementById(`system-tab-${next}`)?.focus();
  };

  return (
    <div className="systems-rack">
      <div className="rack-selector" role="tablist" aria-label="Engineering systems">
        {systems.map((system, index) => (
          <button
            id={`system-tab-${index}`}
            key={system.name}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls="active-system-panel"
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeys(event, index)}
          >
            <span>{system.index}</span>
            <strong>{system.name}</strong>
            <small>{system.category}</small>
          </button>
        ))}
      </div>

      <div
        className="rack-panel"
        id="active-system-panel"
        role="tabpanel"
        aria-labelledby={`system-tab-${activeIndex}`}
        key={active.name}
      >
        <div className="rack-visual" aria-label={`${active.name} technology flow`}>
          <ol>
            {active.stack.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
        </div>

        <div className="rack-copy">
          <h3>{active.name}</h3>
          <p>{active.description}</p>
          <div className="rack-proof">
            <span>Recorded evidence</span>
            <strong>{active.proof}</strong>
          </div>
          <a href={active.href} target="_blank" rel="noreferrer">
            Inspect repository <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight, GitBranch, Workflow } from "lucide-react";
import { githubProjects } from "@/lib/portfolio-data";

export function CodeArchive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = githubProjects[activeIndex];

  const handleKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % githubProjects.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + githubProjects.length) % githubProjects.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = githubProjects.length - 1;
    if (next === index) return;
    event.preventDefault();
    setActiveIndex(next);
    document.getElementById(`archive-tab-${next}`)?.focus();
  };

  return (
    <div className="archive-board">
      <div className="archive-selector" role="tablist" aria-label="Selected GitHub projects" aria-orientation="vertical">
        {githubProjects.map((project, index) => (
          <button
            id={`archive-tab-${index}`}
            key={project.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls="archive-active-panel"
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeys(event, index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{project.name}</strong>
            <small>{project.discipline}</small>
          </button>
        ))}
      </div>

      <div
        className="archive-panel"
        id="archive-active-panel"
        role="tabpanel"
        aria-labelledby={`archive-tab-${activeIndex}`}
        key={active.id}
      >
        <span className="archive-watermark" aria-hidden="true">{active.name.slice(0, 1)}</span>
        <header className="archive-panel-head">
          <div>
            <h3>{active.name}</h3>
            <p>{active.fullName} · {active.discipline}</p>
          </div>
          <GitBranch aria-hidden="true" size={28} strokeWidth={1.5} />
        </header>

        <p className="archive-description">{active.description}</p>

        <div className="archive-flow" aria-label={`${active.name} system flow`}>
          <Workflow aria-hidden="true" size={18} strokeWidth={1.7} />
          <ol>
            {active.flow.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>

        <ul className="archive-stack" aria-label={`${active.name} technologies`}>
          {active.stack.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>

        <div className="archive-proof">
          <span>Repository evidence</span>
          <strong>{active.proof}</strong>
        </div>

        <a href={active.href} target="_blank" rel="noreferrer">
          Open repository <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
        </a>
      </div>
    </div>
  );
}

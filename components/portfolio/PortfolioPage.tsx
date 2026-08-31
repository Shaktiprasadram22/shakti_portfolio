import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { capabilities, journey, navigation, products } from "@/lib/portfolio-data";
import { SculptureClient } from "./SculptureClient";
import { SystemsRack } from "./SystemsRack";
import { CodeArchive } from "./CodeArchive";

const externalLinkProps = { target: "_blank", rel: "noreferrer" } as const;

function InkLandscape({ className = "" }: { className?: string }) {
  return (
    <svg className={`ink-landscape ${className}`} viewBox="0 0 1600 520" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="ink-soften" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.035" numOctaves="2" seed="17" result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="9" />
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        <linearGradient id="ink-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2b2b" stopOpacity="0.08" />
          <stop offset="1" stopColor="#2b2b2b" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path filter="url(#ink-soften)" fill="url(#ink-fade)" d="M0 386 128 319l93 38 145-161 113 128 89-79 92 87 120-197 103 194 79-64 99 105 89-173 91 113 107-72 88 102 113-82v262H0Z" />
      <path fill="none" stroke="#2b2b2b" strokeOpacity=".26" strokeWidth="5" d="M0 404c91-52 148-61 229-33 95 33 165-4 238-72 102-95 167 84 264 25 82-50 98-161 180-98 76 58 122 164 225 82 104-83 155-10 228 25 67 33 135-19 236-88" />
      <path fill="#f3ece1" fillOpacity=".58" d="M0 445c211-54 330 44 521-4 202-51 329 47 522 2 213-50 374 20 557-11v88H0Z" />
    </svg>
  );
}

export function PortfolioPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="Shakti Prasad Ram, back to top">
            <strong>SPR</strong>
            <span>Software<br />engineer</span>
          </a>
          <nav aria-label="Primary navigation">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <a className="header-contact" href="mailto:shaktiram.coc@gmail.com" aria-label="Email Shakti">Talk <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} /></a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero-stage" id="top">
          <InkLandscape className="hero-mountains" />
          <div className="paper-grain" aria-hidden="true" />
          <div className="hero-grid section-width">
            <div className="hero-copy">
              <div className="hero-seal" aria-hidden="true"><span>SPR</span></div>
              <h1>Useful software<br /><em>should hold up.</em></h1>
              <p className="hero-summary">
                I’m Shakti Prasad Ram—Associate Developer at Accenture, building dependable
                products from browser surface to backend system.
              </p>
              <div className="hero-actions">
                <a className="primary-action" href="#products">
                  Enter the releases <ArrowDown aria-hidden="true" size={17} strokeWidth={1.8} />
                </a>
                <a className="text-action" href="https://github.com/Shaktiprasadram22" {...externalLinkProps}>
                  Inspect source <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
                </a>
              </div>
            </div>

            <div className="hero-art">
              <SculptureClient />
              <p className="vertical-mantra" aria-hidden="true"><span>BUILD</span><span>BREAK</span><span>PROVE</span></p>
              <span className="blade-note" aria-hidden="true">Drag to inspect · Select a discipline</span>
            </div>

            <dl className="hero-record">
              <div><dt>Now playing</dt><dd>Associate Developer · Accenture, Bhubaneswar</dd></div>
              <div><dt>Released</dt><dd>3 public products · 227 tools &amp; experiences</dd></div>
              <div><dt>Range</dt><dd>Browser → API → queue → cloud</dd></div>
            </dl>
          </div>
        </section>

        <section className="products-section" id="products">
          <InkLandscape className="product-mountains" />
          <header className="section-heading product-intro section-width">
            <h2>Three public releases.<br /><em>Built to be used.</em></h2>
            <div className="product-intro-copy">
              <p>
                Each act opens on the real product, then names its constraint, its operating
                qualities, and the scope you can verify yourself.
              </p>
              <dl className="dossier-register" aria-label="Deployment record summary">
                <div><dt>Feature</dt><dd>SPR / Public Works</dd></div>
                <div><dt>Acts</dt><dd>03 live systems</dd></div>
                <div><dt>Running time</dt><dd>227 tools &amp; experiences</dd></div>
              </dl>
            </div>
          </header>

          <div className="product-stages" aria-label="Selected product case files">
            {products.map((product, index) => (
              <article
                className="product-release"
                data-accent={product.accent}
                data-index={String(index + 1).padStart(2, "0")}
                key={product.name}
              >
                <div className="product-stage-inner">
                  <div className="case-register" aria-hidden="true">
                    <span>PUBLIC RELEASE / ACT {String(index + 1).padStart(2, "0")}</span>
                    <i />
                    <span>WRITTEN · BUILT · SHIPPED BY SHAKTI</span>
                  </div>
                  <div className="act-number" aria-hidden="true">0{index + 1}</div>
                  <div className="product-copy">
                    <h3>{product.name}</h3>
                    <div className="product-meta">
                      <span>{product.eyebrow}</span>
                      <span><i aria-hidden="true" /> Now live</span>
                    </div>
                    <p className="product-description">{product.description}</p>
                    <ul className="product-signals" aria-label={`${product.name} product qualities`}>
                      {product.signals.map((signal, signalIndex) => (
                        <li key={signal}>
                          <span aria-hidden="true">{String(signalIndex + 1).padStart(2, "0")}</span>
                          {signal}
                        </li>
                      ))}
                    </ul>
                    <div className="product-metric">
                      <span>Release billing</span>
                      <strong>{product.metric}</strong>
                    </div>
                    <a className="product-link" href={product.href} {...externalLinkProps}>
                      {product.linkLabel} <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
                    </a>
                  </div>

                  <figure className="product-media">
                    <div className="capture-register" aria-hidden="true">
                      <span>PUBLIC PRINT</span>
                      <span>SPR · ACT {String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="browser-chrome" aria-hidden="true">
                      <span /><span /><span /><b>{product.href.replace("https://", "")}</b>
                    </div>
                    <div className="product-frame">
                      <Image
                        src={product.image ?? "/work/myarcade.png"}
                        alt={`${product.name} homepage captured from the live product`}
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1100px) 60vw, 58vw"
                        className="product-screenshot"
                      />
                    </div>
                    <figcaption>
                      <span>Captured from the live release</span>
                      <span>{product.href.replace("https://", "")}</span>
                    </figcaption>
                  </figure>

                  <div className="case-footer" aria-hidden="true">
                    <span>Shakti Prasad Ram</span>
                    <span>Independent product engineering</span>
                    <span>Act {String(index + 1).padStart(2, "0")} / 03</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="archive-section" id="archive">
          <div className="archive-ink-stroke" aria-hidden="true" />
          <div className="section-width archive-inner">
            <header className="archive-heading">
              <h2>Five more systems.<br /><em>Choose your evidence.</em></h2>
              <div>
                <p>
                  The public products are only the front of the house. These repositories expose
                  the platform, retrieval, concurrency, service, and caching work underneath.
                </p>
                <a href="https://github.com/Shaktiprasadram22?tab=repositories" {...externalLinkProps}>
                  View the full GitHub archive <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
                </a>
              </div>
            </header>
            <CodeArchive />
          </div>
        </section>

        <section className="systems-section" id="systems">
          <div className="section-width systems-inner">
            <header className="systems-bridge">
              <h2>Every release has<br /><em>fight choreography.</em></h2>
              <p>
                Choose a system to reveal the sequence underneath: contracts, state,
                delivery, failure paths, and the proof left behind.
              </p>
            </header>

            <SystemsRack />
            <a className="all-repositories" href="https://github.com/Shaktiprasadram22?tab=repositories" {...externalLinkProps}>
              Enter the complete code archive <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
          </div>
        </section>

        <section className="method-section section-width">
          <div className="method-statement">
            <h2>Four movements.<br /><em>One standard.</em></h2>
            <p>I make ownership, trust boundaries, and recovery paths explicit before production makes their absence expensive.</p>
          </div>
          <ol className="method-sequence">
            <li><span>01</span><strong>Model</strong><p>Define the problem, boundary, and constraint.</p></li>
            <li><span>02</span><strong>Build</strong><p>Keep contracts and ownership visible.</p></li>
            <li><span>03</span><strong>Break</strong><p>Exercise failure and recovery paths.</p></li>
            <li><span>04</span><strong>Measure</strong><p>Record evidence and limitations.</p></li>
          </ol>
        </section>

        <section className="journey-section section-width" id="journey">
          <header className="section-heading">
            <h2>The story so far.</h2>
            <p>Enterprise delivery, independent products, and the foundations underneath both.</p>
          </header>
          <div className="timeline">
            {journey.map((item, index) => (
              <article key={`${item.period}-${item.organisation}`}>
                <span className="timeline-node" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p className="timeline-period">{item.period}</p>
                <div className="timeline-role"><h3>{item.role}</h3><p>{item.organisation} · {item.location}</p></div>
                <p className="timeline-description">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-section section-width" id="about">
          <div className="profile-copy">
            <h2>Technique,<br /><em>not decoration.</em></h2>
            <p>
              I work from browser APIs to queues and databases. The common thread is operational
              reality: privacy, latency, accessibility, search, and recoverable failure.
            </p>
            <p className="achievement-line">Top-5 WebKaHackathon finalist · 400+ DSA problems solved</p>
          </div>
          <div className="capability-list" aria-label="Technical capabilities">
            {capabilities.map((group, index) => (
              <div key={group.title} data-index={String(index + 1).padStart(2, "0")}>
                <h3>{group.title}</h3>
                <p>{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-width contact-inner">
            <div className="closing-seal" aria-hidden="true">SPR</div>
            <h2>Bring me the problem<br />that has to <em>hold up.</em></h2>
            <a className="contact-email" href="mailto:shaktiram.coc@gmail.com">
              shaktiram.coc@gmail.com <ArrowUpRight aria-hidden="true" size={28} strokeWidth={1.5} />
            </a>
            <div className="contact-links">
              <a href="https://github.com/Shaktiprasadram22" {...externalLinkProps}>GitHub</a>
              <a href="https://www.linkedin.com/in/shaktiram22/" {...externalLinkProps}>LinkedIn</a>
              <a href="#top">Back to top</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-width"><span>© 2026 Shakti Prasad Ram</span><span>Built in public · Proven in the work</span></div>
      </footer>
    </>
  );
}

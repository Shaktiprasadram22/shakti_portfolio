import type { Metadata } from "next";
import { Barlow, Knewave } from "next/font/google";
import "./globals.css";

const body = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const display = Knewave({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Impact", "Arial Black", "sans-serif"],
});

const designContract = `<!--
THESIS: Shakti’s portfolio behaves like a hand-painted release hoarding: each shipped system is one held action scene, refusing both dark-neon developer templates and quiet editorial case sheets.
OWN-WORLD: Bleached sky paper, cinnabar painted fields, ink-wash mountains, brush-gold accents, dry brush edges; square painted controls; a brush display face with a sober readable sans.
STORY: Meet Shakti through a software-blade composition, then follow three painted product acts, architecture choreography, method, employment billing, and contact.
FIRST VIEWPORT: Left vertical navigation; central oversized brush statement; diagonal 3D system blade across the upper right; gold vertical lettering; ink mountains; cinnabar factual billing band at the foot. The primary CTA is a painted cinnabar stroke.
FORM: Painted martial-arts release hoarding, user-selected challenger, seed 27f331d9, code-led build.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export const metadata: Metadata = {
  metadataBase: new URL("https://dev.shaktiram.workers.dev"),
  title: "Shakti Prasad Ram — Software Engineer",
  description:
    "Software engineer and Associate Developer at Accenture building reliable backend systems, practical AI, and privacy-first web products.",
  keywords: [
    "Shakti Prasad Ram",
    "software engineer",
    "backend developer",
    "Accenture",
    "distributed systems",
    "AI engineer",
    "TypeScript",
    "Node.js",
  ],
  authors: [{ name: "Shakti Prasad Ram" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Shakti Prasad Ram — Software Engineer",
    description: "Reliable systems, practical AI, and privacy-first products.",
    url: "/",
    siteName: "Shakti Prasad Ram",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shakti Prasad Ram — Software Engineer",
    description: "Reliable systems, practical AI, and privacy-first products.",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable}`}>
        <template dangerouslySetInnerHTML={{ __html: designContract }} />
        {children}
      </body>
    </html>
  );
}

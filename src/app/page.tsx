"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

const StarField = dynamic(() => import("@/components/StarField"), {
  ssr: false,
});
const CursorGlow = dynamic(() => import("@/components/CursorGlow"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[var(--color-surface)]">
      {/* Background layers */}
      <StarField />
      <div className="fixed inset-0 animated-grid pointer-events-none z-[1]" />

      {/* Cursor */}
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-[2]">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

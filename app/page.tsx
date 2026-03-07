import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { DeveloperTerminalMode } from "@/components/DeveloperTerminalMode";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Hero } from "@/components/Hero";
import { HowIThink } from "@/components/HowIThink";
import { LiveApiPlayground } from "@/components/LiveApiPlayground";
import { Navbar } from "@/components/Navbar";
import { PageShell } from "@/components/PageShell";
import { Projects } from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SystemArchitecture } from "@/components/SystemArchitecture";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <DeveloperTerminalMode />
      <PageShell>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <HowIThink />
        <SystemArchitecture />
        <LiveApiPlayground />
        <GitHubActivity />
        <Education />
        <Achievements />
        <Certifications />
        <Contact />
        <Footer />
      </PageShell>
    </>
  );
}

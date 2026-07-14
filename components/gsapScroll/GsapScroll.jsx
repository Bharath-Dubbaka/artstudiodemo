import HeroBanner from "@/components/gsapScroll/HeroBanner";
import TextReveal from "@/components/gsapScroll/TextReveal";
import PinnedProjects from "@/components/gsapScroll/PinnedProjects";

export default function GsapScroll() {
  return (
    <main className="min-h-screen bg-wall select-none overflow-x-hidden">
      {/* 1. Hero header zoom animation */}
      <HeroBanner />

      {/* 2. Text elements scroll reveal */}
      <TextReveal />

      {/* Spacer to give the page breathing room between interactions */}
      {/* <div className="h-[20vh]" /> */}

      {/* 3. Sticky pinned project showcase */}
      <PinnedProjects />

      {/* Bottom spacer to let the final project list scroll out nicely */}
      <div className="h-[30vh]" />
    </main>
  );
}

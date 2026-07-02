"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function DoorHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Layers move at different speeds — closer layers move faster,
  // like your own body walking forward past a doorframe.
  const farWallY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const doorFrameY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Ouroboros ring: closes from a 20% gap to a full loop as you scroll in.
  const CIRCUMFERENCE = 2 * Math.PI * 54;
  const dashOffset = useTransform(
    scrollYProgress,
    [0, 0.8],
    [CIRCUMFERENCE * 0.2, 0]
  );

  return (
    <section ref={ref} className="relative h-[220vh] w-full bg-wall" aria-label="Entrance">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Far wall — barely moves */}
        <motion.div
          style={{ y: farWallY }}
          className="absolute inset-0 bg-gradient-to-b from-[#1a1512] via-[#0C0A08] to-[#0C0A08]"
        />

        {/* Door frame — the literal doorway you're walking through */}
        <motion.div
          style={{ y: doorFrameY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[85vh] w-[70vw] max-w-3xl rounded-t-[140px] border-[14px] border-bronze-deep/60 bg-gradient-to-b from-[#241a12] to-transparent" />
        </motion.div>

        {/* Title + ouroboros ring */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8 px-6 text-center"
        >
          <div className="relative flex h-40 w-40 items-center justify-center">
            <svg viewBox="0 0 120 120" className="absolute h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#5C3A21" strokeWidth="1.5" opacity="0.4" />
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#B8763E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                style={{ strokeDashoffset: dashOffset }}
              />
            </svg>
            <span className="font-mono text-[10px] tracking-[0.3em] text-stone uppercase">
              enter
            </span>
          </div>

          <h1 className="font-display text-6xl font-medium leading-[0.95] text-paper md:text-8xl">
            Ouroboros
          </h1>
          <p className="max-w-md font-mono text-sm tracking-wide text-stone">
            every ending is where the next piece begins — scroll to walk in
          </p>
        </motion.div>

        {/* Foreground vignette — moves fastest, closest to viewer */}
        <motion.div
          style={{ y: foregroundY }}
          className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,#0C0A08_85%)]"
        />
      </div>
    </section>
  );
}
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function RevealFrame({ eyebrow, title, children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center bg-black"
    >
      <div className="mb-16 flex flex-col items-center gap-4 px-6 text-center relative top-20 md:top-40 lg:top-50 z-10">
        <span className="font-mono text-bold text-md uppercase tracking-[0.3em] text-bronze">
          {eyebrow}
        </span>
        <h2 className="max-w-4xl text-4xl md:text-[4rem] lg:text-[6rem] font-light text-paper font-mono">
          {title}
        </h2>
      </div>

      <div style={{ perspective: "1200px" }} className="w-full px-6">
        <motion.div
          style={{
            rotateX,
            scale,
            y: translateY,
            transformOrigin: "top center",
          }}
          className="mx-auto max-w-5xl rounded-2xl border border-bronze-deep/50 bg-[#141009] p-3 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]"
        >
          <div className="overflow-hidden rounded-xl border border-bronze-deep/30">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

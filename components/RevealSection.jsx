"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const phrases = [
  "It is a long established fact",
  "that a reader will be distracted",
  "by the readable content of a page",
  "when looking at its layout.",
];

export default function RevealSection() {
  return (
    <div className="flex flex-col items-center gap-[20vw] my-[300px] bg-wall">
      <MaskText />
      <MaskText />
    </div>
  );
}

export function MaskText() {
  const containerRef = useRef(null);

  // Framer Motion native visibility tracker setup
  const isInView = useInView(containerRef, {
    amount: 0.55, // Replaces threshold
  });

  const animation = {
    initial: { y: "100%" },
    enter: (i) => ({
      y: "0%",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className="text-[5vw] font-bold text-paper font-world uppercase leading-none"
    >
      {phrases.map((phrase, index) => (
        <div key={index} className="overflow-hidden block py-1">
          <motion.p
            custom={index}
            variants={animation}
            initial="initial"
            animate={isInView ? "enter" : "initial"}
            className="m-0"
          >
            {phrase}
          </motion.p>
        </div>
      ))}
    </div>
  );
}

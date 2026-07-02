"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "motion/react";

export default function IntroLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  const CIRCUMFERENCE = 2 * Math.PI * 46;
  const dashOffset = useTransform(count, (v) => CIRCUMFERENCE * (1 - v / 100));

  useEffect(() => {
    const unsub = count.on("change", (v) => setDisplay(Math.round(v)));

    // Slowmo feel: a long duration + an ease that decelerates hard at the
    // end, like a heavy door settling into place rather than a linear timer.
    const controls = animate(count, 100, {
      duration: 3.4,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        setTimeout(() => setVisible(false), 350);
      },
    });

    return () => {
      unsub();
      controls.stop();
    };
  }, [count]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-wall"
        >
          <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
            <svg
              viewBox="0 0 100 100"
              className="absolute h-full w-full -rotate-90"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#5C3A21"
                strokeWidth="0.6"
                opacity="0.3"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#B8763E"
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                style={{ strokeDashoffset: dashOffset }}
              />
            </svg>
            <span className="font-mono text-2xl text-paper tabular-nums sm:text-3xl">
              {display}
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-stone">
            setting up the studio
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

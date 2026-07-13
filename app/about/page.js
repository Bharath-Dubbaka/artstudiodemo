"use client";

import { motion } from "motion/react";

export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-32 pt-40 sm:pt-48">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-[0.3em] text-bronze"
      >
        About
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-4 font-display text-4xl font-medium text-paper sm:text-6xl"
      >
        A room that folds back into itself
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-10 space-y-5 text-stone leading-relaxed"
      >
        <p>
          DBK Art Hub started as a question: what would a gallery feel like if
          it never really ended.. — web animation featuring a 3d perspective
          scroll with images rotating on scroll. lorem
        </p>
        <p>
          We work as sculptors, filmmakers, and performers... web animation
          featuring a 3d perspective scroll with images rotating on scroll
        </p>
        <p>
          Replace this placeholder copy with your real founding story, mission,
          or artist statement.
        </p>
      </motion.div>
    </main>
  );
}

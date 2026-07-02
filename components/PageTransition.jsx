"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

// Curtain wipe — same visual language as the mobile menu and the loader,
// so navigating feels like the same "door" mechanism throughout the site.
const variants = {
  initial: { clipPath: "inset(0 0 0 100%)" },
  animate: {
    clipPath: "inset(0 0 0 0%)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: "inset(0 100% 0 0)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

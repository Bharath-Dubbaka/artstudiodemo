"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

const PIECES = [
  {
    id: "01",
    title: "ESCAPE",
    artist: "Mallala",
    year: "2024",
    medium: "oil on canvas",
    imageUrl: "/gallery/01.jpg",
  },
  {
    id: "02",
    title: "Recursion",
    artist: "W. Dubbbaka",
    year: "2026",
    medium: "bronze, cast",
    imageUrl: "/gallery/02.jpg",
  },
  {
    id: "03",
    title: "Stand OUT",
    artist: "Infinite",
    year: "2025",
    medium: "mixed media",
    imageUrl: "/gallery/03.jpg",
  },
  {
    id: "04",
    title: "Connor McGregor",
    artist: "UFC 329",
    year: "2022",
    medium: "charcoal on paper",
    imageUrl: "/gallery/04.jpg",
  },
  {
    id: "05",
    title: "Undone",
    artist: "Zetrov",
    year: "2021",
    medium: "chard",
    imageUrl: "/gallery/02.jpg",
  },
  {
    id: "06",
    title: "Un-spoken",
    artist: "XAZA",
    year: "2021",
    medium: "chard",
    imageUrl: "/gallery/01.jpg",
  },
  {
    id: "07",
    title: "Undone",
    artist: "AA. Detrov",
    year: "2021",
    medium: "chard",
    imageUrl: "/gallery/04.jpg",
  },
];

export default function GalleryRoom() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["2%", `-${PIECES.length * 10}%`],
  );

  // Thin bronze line filling as you move through the room — same "progress
  // toward the loop closing" idea as the ring in the hero/loader.
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const inView = useInView(targetRef, {
    amount: 0.2, // This replaces 'threshold'
    once: false, // Set to true if you want 'triggerOnce' behavior
  });
  return (
    <motion.div
      ref={targetRef}
      id="gallery"
      className="relative h-[400vh] bg-wall pt-40 font-world"
      aria-label="Gallery room"
    >
      <motion.div>
        {/* Header */}
        <div className="mb-16 pt-20">
          <motion.p
            ref={targetRef}
            className="text-sm md:text-base text-gray-500 uppercase tracking-wider mb-3 pl-12"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            WHAT THE HECK IS THIS?
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight pl-20"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gray-600">I'M A GROWTH</span>
            <br />
            <span className="text-blue-600">PARTNER</span>
            <br />
            <span className="text-gray-600">AND PROBLEM-</span>
            <br />
            <span className="text-blue-600">BUILDS WHAT I DESIGN</span>
          </motion.h2>
        </div>
      </motion.div>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 md:gap-16 pl-[10vw]">
          {PIECES.map((piece, i) => (
            <PieceCard
              key={piece.id}
              piece={piece}
              index={i}
              total={PIECES.length}
            />
          ))}
        </motion.div>

        {/* Room progress line — bottom of the sticky viewport */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-bronze-deep/40">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-bronze"
          />
        </div>
      </div>
    </motion.div>
  );
}

function PieceCard({ piece, index, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex w-[100vw] md:w-[45vw] lg:w-[70vw] max-w-xl shrink-0 flex-col gap-5 border-l-2 border-bronze/60 "
    >
      <div className="relative aspect-[4/5] max-h-[30rem] w-[90%] overflow-hidden rounded-2xl bg-[#1a1512]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={piece.imageUrl}
          alt={piece.title}
          className="h-full w-full object-cover"
        />
        {/* Numbered corner tag — echoes the 01–06 index in the hero */}
        <span className="absolute right-3 top-3 font-mono text-[10px] tracking-[0.2em] text-paper/70">
          {piece.id} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="border-l-2 border-bronze/60 pl-4 font-mono text-xs leading-relaxed text-stone">
        <div className="text-paper text-sm tracking-wide">{piece.title}</div>
        <div>
          {piece.artist} — {piece.year}
        </div>
        <div className="text-bronze">{piece.medium}</div>
      </div>
    </motion.div>
  );
}

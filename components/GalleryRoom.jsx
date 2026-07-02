"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const PIECES = [
  {
    id: "01",
    title: "Threshold",
    artist: "M. Okafor",
    year: "2024",
    medium: "oil on canvas",
    imageUrl: "/gallery/01.webp",
  },
  {
    id: "02",
    title: "Recursion",
    artist: "L. Ferreira",
    year: "2023",
    medium: "bronze, cast",
    imageUrl: "/gallery/02.webp",
  },
  {
    id: "03",
    title: "Coil",
    artist: "S. Yamada",
    year: "2024",
    medium: "mixed media",
    imageUrl: "/gallery/03.webp",
  },
  {
    id: "04",
    title: "Undone",
    artist: "A. Petrov",
    year: "2022",
    medium: "charcoal on paper",
    imageUrl: "/gallery/04.webp",
  },
  {
    id: "05",
    title: "Undone",
    artist: "AA. Detrov",
    year: "2021",
    medium: "chard",
    imageUrl: "/gallery/02.webp",
  },
  {
    id: "06",
    title: "Undone",
    artist: "AA. Detrov",
    year: "2021",
    medium: "chard",
    imageUrl: "/gallery/01.webp",
  },
  {
    id: "07",
    title: "Undone",
    artist: "AA. Detrov",
    year: "2021",
    medium: "chard",
    imageUrl: "/gallery/04.webp",
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

  return (
    <motion.div
      ref={targetRef}
      id="gallery"
      className="relative h-[400vh] bg-wall pt-10"
      aria-label="Gallery room"
    >
      <div className="pl-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block font-mono text-xs uppercase tracking-[0.3em] text-bronze"
        >
          Collection I
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 block max-w-4xl font-display text-2xl md:text-4xl lg:text-6xl font-light uppercase text-paper underline decoration-bronze/60 underline-offset-8 md:text-[5rem]"
        >
          Fresh on the air
        </motion.span>
      </div>

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
      className="flex w-[100vw] md:w-[45vw] lg:w-[60vw] max-w-xl shrink-0 flex-col gap-5 border-l-2 border-bronze/60 "
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

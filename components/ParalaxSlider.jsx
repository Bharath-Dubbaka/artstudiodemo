"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";
import Lenis from "lenis";

// Updated to standard Next.js public absolute path references
import Picture1 from "../public/gallery/01.jpg";
import Picture2 from "../public/gallery/02.jpg";
import Picture3 from "../public/gallery/03.jpg";

export default function ParallaxSlider() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="overflow-hidden bg-black">
      <div ref={container} className="relative z-10 flex flex-col gap-4 md:gap-8 py-40">
        {/* Pass custom lists of phrases to each row */}
        <Slide
          src={Picture1}
          direction="left"
          left="-30%"
          progress={scrollYProgress}
          phrases={["UI/UX", "Creative"]}
        />
        <Slide
          src={Picture2}
          direction="right"
          left="-40%"
          progress={scrollYProgress}
          phrases={["GSAP", "Three.js"]}
        />
        <Slide
          src={Picture3}
          direction="left"
          left="-50%"
          progress={scrollYProgress}
          phrases={["StandOut", "Graphics"]}
        />
      </div>
    </main>
  );
}

const Slide = ({ src, direction, left, progress, phrases }) => {
  const dirMultiplier = direction === "left" ? -1 : 1;
  // Dynamic transform mapping scroll states to X offset adjustments
  const translateX = useTransform(
    progress,
    [0, 1],
    [150 * dirMultiplier, -150 * dirMultiplier],
  );

  return (
    <motion.div
      style={{ x: translateX, left }}
      className="relative flex whitespace-nowrap will-change-transform gap-5"
    >
      {/* Duplicate the array loop to make the horizontal scroll infinite/seamless */}
      {[...phrases, ...phrases].map((text, idx) => (
        <Phrase key={idx} text={text} src={src} />
      ))}
    </motion.div>
  );
};

const Phrase = ({ text, src }) => {
  return (
    <div className="px-5 flex gap-5 items-center select-none">
      {/* Applied your custom PP Neue World Font utility here */}
      <p className="font-world text-[7.5vw] font-light tracking-tight text-paper leading-none">
        {text}
      </p>
      <div className="relative h-[6vw] aspect-[4/2] rounded-full overflow-hidden bg-paper/5">
        <Image
          src={src}
          alt="Parallax preview graphic"
          fill
          className="object-cover"
          sizes="20vw"
        />
      </div>
    </div>
  );
};

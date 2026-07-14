"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";
import Lenis from "lenis";

// Modernized static projects data configuration pointing directly to your assets
export const projects = [
  {
    title: "Matthias Leidinger",
    description:
      "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: "/gallery/01.jpg",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
    color: "#BBACAF",
  },
  {
    title: "Clément Chapillon",
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes—so French photographer Clément Chapillon describes his latest highly captivating project Les rochers fauves.",
    src: "/gallery/02.jpg",
    link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
    color: "#977F6D",
  },
  {
    title: "Zissou",
    description:
      "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
    src: "/gallery/03.jpg",
    link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    color: "#C2491D",
  },
  {
    title: "Mathias Svold and Ulrik Hasemann",
    description:
      "The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.",
    src: "/gallery/01.jpg",
    link: "https://www.ignant.com/2019/03/13/a-photographic-series-depicting-the-uncertain-future-of-denmarks-treasured-coastlines/",
    color: "#B62429",
  },
  {
    title: "Mark Rammers",
    description:
      "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.",
    src: "/gallery/02.jpg",
    link: "https://www.ignant.com/2023/04/12/mark-rammers-all-over-again-is-a-study-of-regret-and-the-willingness-to-move-forward/",
    color: "#88A28D",
  },
];

export default function CardHolder() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy(); // Safely clean up the animation loop
  }, []);

  return (
    <main ref={container} className="relative bg-wall py-[10vh]">
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <Card
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}

function Card({
  i,
  title,
  description,
  src,
  link,
  color,
  progress,
  range,
  targetScale,
}) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Scale calculations for parallax visual effect inside the mask
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[500px] w-[1000px] max-w-[95vw] rounded-[25px] p-6 md:p-[50px] origin-top shadow-2xl text-stone-900 font-montreal"
      >
        <h2 className="text-center m-0 text-xl md:text-[28px] font-world uppercase tracking-tight">
          {title}
        </h2>

        <div className="flex flex-col md:flex-row h-full mt-6 md:mt-[50px] gap-6 md:gap-[50px] overflow-hidden">
          {/* Description Panel */}
          <div className="w-full md:w-[40%] relative md:top-[10%] flex flex-col justify-between">
            <p className="text-sm md:text-base leading-relaxed font-light">
              <span className="font-world text-3xl font-normal leading-none pr-1 uppercase">
                {description.charAt(0)}
              </span>
              {description.slice(1)}
            </p>

            <span className="flex items-center gap-2 mt-4 md:mt-0">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] underline cursor-pointer font-medium hover:opacity-75"
              >
                See more
              </a>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-3"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>

          {/* Masked Parallax Image Wrapper */}
          <div className="relative w-full md:w-[60%] h-[200px] md:h-full rounded-[25px] overflow-hidden bg-black/10">
            <motion.div
              className="w-full h-full will-change-transform"
              style={{ scale: imageScale }}
            >
              <Image
                fill
                src={src}
                alt={`${title} project spotlight`}
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

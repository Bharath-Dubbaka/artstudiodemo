"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";

// Relative path fixes based on your project tree structure
import Picture1 from "../public/gallery/new_f.png";
import Picture2 from "../public/gallery/02.jpg";
import Picture3 from "../public/gallery/03.jpg";
// Fallbacks if 4, 5, 6, 7 match standard naming conventions
import Picture4 from "../public/gallery/01.jpg";
import Picture5 from "../public/gallery/02.jpg";
import Picture6 from "../public/gallery/03.jpg";
import Picture7 from "../public/gallery/04.jpg";

export default function ZoomGallery() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Scale map ranges
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // Integrated individual container styling configurations right into data list
  const pictures = [
    { src: Picture1, scale: scale4, styles: "w-[25vw] h-[25vh]" },
    {
      src: Picture2,
      scale: scale5,
      styles: "w-[35vw] h-[30vh] -top-[30vh] left-[5vw]",
    },
    {
      src: Picture3,
      scale: scale6,
      styles: "w-[20vw] h-[45vh] -top-[10vh] -left-[25vw]",
    },
    { src: Picture4, scale: scale5, styles: "w-[25vw] h-[25vh] left-[27.5vw]" },
    {
      src: Picture5,
      scale: scale6,
      styles: "w-[20vw] h-[25vh] top-[27.5vh] left-[5vw]",
    },
    {
      src: Picture6,
      scale: scale8,
      styles: "w-[30vw] h-[25vh] top-[27.5vh] -left-[22.5vw]",
    },
    {
      src: Picture7,
      scale: scale9,
      styles: "w-[15vw] h-[15vh] top-[22.5vh] left-[25vw]",
    },
  ];

  return (
    <div ref={container} className="h-[300vh] relative bg-wall pt-40">
      {/* Sticky Frame Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {pictures.map(({ src, scale, styles }, index) => (
          <motion.div
            key={index}
            style={{ scale }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center will-change-transform"
          >
            <div className={`relative ${styles} bg-paper/5 overflow-hidden`}>
              <Image
                src={src}
                fill
                alt={`Gallery image preview ${index + 1}`}
                className="object-cover"
                sizes="(max-width: 768px) 35vw, 25vw"
                priority={index === 0}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

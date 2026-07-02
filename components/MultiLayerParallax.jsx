"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function MultiLayerParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity: frameOpacity }}
      className="w-full h-screen overflow-hidden relative grid place-items-center "
    >
      <motion.h1
        style={{ y: textY }}
        className="font-bold text-bronze text-7xl md:text-[10rem] relative z-50 bottom-10 border-2 border-gray-200"
      >
        OUROBOROS
      </motion.h1>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(gallery/new_f.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(gallery/new_b.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
      {/* Bottom info bar — trimmed down on mobile, full on desktop */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-[3%] z-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-mono text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-200"
        >
          amalgamation of Performances, Workshops, Film Screenings, Art
          Exhibitions{" "}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="hidden sm:flex items-center gap-3"
        >
          {["Art", "Studio", "Theater", "Hub"].map((n, i) => (
            <span
              key={n}
              className={`font-mono text-xs ${i === 0 ? "text-paper" : "text-stone/50"}`}
            >
              {n}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "motion/react";

// export default function HeroStage() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });
//   const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
//   const frameOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//   return (
//     <div
//       ref={ref}
//       className="w-full min-h-screen flex items-center justify-center bg-wall py-8 sm:py-0"
//     >
//       <motion.div
//         style={{ opacity: frameOpacity }}
//         className="relative w-full h-[80vh] sm:w-[94vw] sm:max-w-[1600px] sm:aspect-[16/10] lg:aspect-[2.05/1] sm:h-auto overflow-hidden"
//       >
//         {/*
//           Art direction: two DIFFERENT crops, not one image squeezed to fit.
//           Mobile gets a tighter, more vertical composition zoomed toward the
//           screen/stage. Desktop gets the full cinematic wide shot.
//           Only one image downloads per device — the browser picks.
//         */}
//         <picture className="absolute inset-0 block h-full w-full">
//           <source
//             media="(min-width: 640px)"
//             srcSet="/gallery/new_f.png"
//           />
//           <img
//             src="/gallery/02.webp"
//             alt="Ouroboros — a room mid-performance"
//             className="h-full w-full object-cover"
//           />
//         </picture>

//         <div className="absolute inset-0 bg-gradient-to-t from-wall/85 via-transparent to-wall/20" />

//         {/* Title box hugs the text (w-fit) instead of a fixed width fighting the word length */}
//         <div className="absolute left-[6%] top-[10%] sm:left-[10%] sm:top-[12%] w-fit max-w-[88%]">
//           <div className="overflow-hidden border border-bronze/70 px-3 py-2 sm:px-4 sm:py-3">
//             <motion.h1
//               style={{ y: textY }}
//               initial={{ y: "110%" }}
//               animate={{ y: "0%" }}
//               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
//               className="font-display font-semibold uppercase text-paper leading-[0.9] whitespace-nowrap
//                          text-[11vw] sm:text-[7.5vw] lg:text-[6.2vw]"
//             >
//               Ouroboros
//             </motion.h1>
//           </div>
//         </div>

//         {/* Bottom info bar — trimmed down on mobile, full on desktop */}
//         <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-[3%]">
//           <motion.span
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.6 }}
//             className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-stone"
//           >
//             Now showing — Collection I
//           </motion.span>

//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.7 }}
//             className="hidden sm:flex items-center gap-3"
//           >
//             {["01", "02", "03", "04", "05", "06"].map((n, i) => (
//               <span
//                 key={n}
//                 className={`font-mono text-xs ${i === 0 ? "text-paper" : "text-stone/50"}`}
//               >
//                 {n}
//               </span>
//             ))}
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

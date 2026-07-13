// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// const LINKS = [
//   { title: "Home", href: "/", src: "gallery/01.jpg" },
//   { title: "Shop", href: "/shop", src: "gallery/02.jpg" },
//   { title: "About Us", href: "/about", src: "gallery/03.jpg" },
//   { title: "Lookbook", href: "/lookbook", src: "gallery/04.jpg" },
//   { title: "Contact", href: "/contact", src: "gallery/01.jpg" },
// ];

// // Animation configs from your old anim.js
// const heightAnim = {
//   initial: { height: 0 },
//   enter: {
//     height: "auto",
//     transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
//   },
//   exit: { height: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
// };

// const blurAnim = {
//   initial: { filter: "blur(0px)", opacity: 1 },
//   open: { filter: "blur(4px)", opacity: 0.4, transition: { duration: 0.3 } },
//   closed: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.3 } },
// };

// const opacityAnim = {
//   initial: { opacity: 0 },
//   open: { opacity: 1, transition: { duration: 0.35 } },
//   closed: { opacity: 0, transition: { duration: 0.35 } },
// };

// export default function Header() {
//   const [isActive, setIsActive] = useState(false);
//   const [selectedLink, setSelectedLink] = useState({
//     isActive: false,
//     index: 0,
//   });

//   return (
//     <div className="fixed top-0 left-0 z-50 w-full bg-[#f4f0ea] px-6 py-4 box-border border-b border-neutral-200">
//       {/* Top Bar Layout */}
//       <div className="relative flex justify-center items-center text-[12px] font-normal uppercase text-black tracking-wider h-6">
//         {/* Brand */}
//         <Link
//           href="/"
//           className="absolute left-0 no-underline text-black font-semibold"
//         >
//           STUDEO
//         </Link>

//         {/* Center Toggle Button */}
//         <div
//           onClick={() => setIsActive(!isActive)}
//           className="flex items-center gap-2 cursor-pointer select-none py-1 h-full relative"
//         >
//           {/* Hamburger / X graphic indicator */}
//           <div className="w-4 h-4 relative flex items-center justify-center mr-1">
//             <span
//               className={`absolute h-0.5 w-4 bg-black transition-transform duration-300 ${isActive ? "rotate-45" : "-translate-y-1"}`}
//             />
//             <span
//               className={`absolute h-0.5 w-4 bg-black transition-transform duration-300 ${isActive ? "-rotate-45" : "translate-y-1"}`}
//             />
//           </div>

//           <div className="relative w-12 h-4">
//             <motion.p
//               className="absolute m-0"
//               variants={opacityAnim}
//               animate={!isActive ? "open" : "closed"}
//             >
//               Menu
//             </motion.p>
//             <motion.p
//               className="absolute m-0"
//               variants={opacityAnim}
//               animate={isActive ? "open" : "closed"}
//             >
//               Close
//             </motion.p>
//           </div>
//         </div>
//       </div>

//       {/* Main Fullscreen Nav Dropdown Overlay */}
//       <AnimatePresence mode="wait">
//         {isActive && (
//           <motion.div
//             variants={heightAnim}
//             initial="initial"
//             animate="enter"
//             exit="exit"
//             className="overflow-hidden w-full bg-[#f4f0ea]"
//           >
//             {/* Split layout: Links Area vs Image box */}
//             <div className="flex flex-col min-[1000px]:flex-row gap-8 justify-between pt-12 pb-6 items-start">
//               {/* Left Column: Menu Links + Footer Footer block */}
//               <div className="flex flex-col justify-between flex-1 w-full min-h-[450px]">
//                 {/* Large Text Navigation Grid */}
//                 <div className="flex flex-wrap max-w-[800px] items-baseline content-start gap-y-2">
//                   {LINKS.map((link, index) => (
//                     <Link
//                       key={index}
//                       href={link.href}
//                       className="no-underline text-black uppercase"
//                     >
//                       <motion.p
//                         onMouseOver={() =>
//                           setSelectedLink({ isActive: true, index })
//                         }
//                         onMouseLeave={() =>
//                           setSelectedLink({ isActive: false, index })
//                         }
//                         variants={blurAnim}
//                         animate={
//                           selectedLink.isActive && selectedLink.index !== index
//                             ? "open"
//                             : "closed"
//                         }
//                         className="m-0 inline-flex text-4xl sm:text-5xl min-[1000px]:text-[5.5vw] font-light tracking-tight pr-6 sm:pr-8 uppercase select-none leading-none transition-all cursor-pointer"
//                       >
//                         {link.title.replace(/\s+/g, "")}
//                       </motion.p>
//                     </Link>
//                   ))}
//                 </div>

//                 {/* Bottom Metadata row */}
//                 <div className="grid grid-cols-2 min-[1000px]:flex min-[1000px]:justify-between items-end gap-4 text-[10px] uppercase text-black tracking-wider pt-12 border-t border-neutral-300/40">
//                   <div>
//                     <span className="text-[#9f9689] mr-1">Made by:</span>Studio
//                     Lumio
//                   </div>
//                   <div>
//                     <span className="text-[#9f9689] mr-1">Typography:</span>
//                     Google Fonts
//                   </div>
//                   <div>
//                     <span className="text-[#9f9689] mr-1">Images:</span>Freepik,
//                     Envato
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <Link href="/privacy" className="hover:underline">
//                       Privacy Policy
//                     </Link>
//                     <Link href="/terms" className="hover:underline">
//                       Terms & Conditions
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column: Hover Image Box preview */}
//               <motion.div
//                 variants={opacityAnim}
//                 animate={selectedLink.isActive ? "open" : "closed"}
//                 className="hidden min-[1000px]:block relative w-[480px] h-[400px] shrink-0 bg-neutral-100"
//               >
//                 <Image
//                   src={`/${LINKS[selectedLink.index].src}`}
//                   fill
//                   className="object-cover"
//                   alt="Navigation Preview"
//                   sizes="480px"
//                   priority
//                 />
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { title: "Home", href: "/", src: "gallery/01.jpg" },
  { title: "Shop", href: "/contact", src: "gallery/02.jpg" },
  { title: "About Us", href: "/about", src: "gallery/03.jpg" },
  { title: "Lookbook", href: "/", src: "gallery/04.jpg" },
  { title: "Contact", href: "/contact", src: "gallery/01.jpg" },
];

const heightAnim = {
  initial: { height: 0 },
  enter: {
    height: "auto",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
  exit: { height: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
};

const blurAnim = {
  initial: { filter: "blur(0px)", opacity: 1 },
  open: { filter: "blur(4px)", opacity: 0.4, transition: { duration: 0.3 } },
  closed: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.3 } },
};

const opacityAnim = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.35 } },
  closed: { opacity: 0, transition: { duration: 0.35 } },
};

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });

  // Handle scroll tracking
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Condition to turn header background from transparent to blur/color
  const shouldApplyBlur = scrolled || isHovered || isActive;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 z-50 w-full px-6 py-4 box-border border-b transition-all duration-500 ease-in-out ${
        shouldApplyBlur
          ? "backdrop-blur-sm border-neutral-50/10"
          : "bg-transparent border-transparent"
      }`}
    >
      {/* Top Bar Layout */}
      <div className="relative flex justify-center items-center text-[12px] font-normal text-gray-50 tracking-wider h-6 uppercase">
        <Link
          href="/"
          className="absolute left-0 no-underline text-white font-semibold"
        >
          WebArts      </Link>

        {/* Center Toggle Button */}
        <div
          onClick={() => setIsActive(!isActive)}
          className="flex items-center gap-2 cursor-pointer select-none py-1 h-full relative"
        >
          <div className="w-4 h-4 relative flex items-center justify-center mr-1">
            <span
              className={`absolute h-0.5 w-4 bg-white transition-transform duration-300 ${isActive ? "rotate-45" : "-translate-y-1"}`}
            />
            <span
              className={`absolute h-0.5 w-4 bg-white font-montreal transition-transform duration-300 ${isActive ? "-rotate-45" : "translate-y-1"}`}
            />
          </div>

          <div className="relative w-12 h-4">
            <motion.p
              className="absolute m-0"
              variants={opacityAnim}
              animate={!isActive ? "open" : "closed"}
            >
              Menu
            </motion.p>
            <motion.p
              className="absolute m-0"
              variants={opacityAnim}
              animate={isActive ? "open" : "closed"}
            >
              Close
            </motion.p>
          </div>
        </div>
      </div>

      {/* Dropdown Menu Container */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            variants={heightAnim}
            initial="initial"
            animate="enter"
            exit="exit"
            className="overflow-hidden w-full bg-[#f4f0ea]"
          >
            <div className="flex flex-col min-[1000px]:flex-row gap-8 justify-between pt-12 pb-6 px-6 items-start">
              <div className="flex flex-col justify-between flex-1 w-full min-h-[450px]">
                {/* Large Links Area: Intercepts onClick to automatically hide menu */}
                <div
                  onClick={() => setIsActive(false)}
                  className="flex flex-wrap max-w-[800px] items-baseline content-start gap-y-2"
                >
                  {LINKS.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="no-underline text-black uppercase"
                    >
                      <motion.p
                        onMouseOver={(e) => {
                          e.stopPropagation(); // Stop bubbling to prevent parent hover triggers
                          setSelectedLink({ isActive: true, index });
                        }}
                        onMouseLeave={(e) => {
                          e.stopPropagation();
                          setSelectedLink({ isActive: false, index });
                        }}
                        variants={blurAnim}
                        animate={
                          selectedLink.isActive && selectedLink.index !== index
                            ? "open"
                            : "closed"
                        }
                        className="m-0 inline-flex text-4xl sm:text-5xl min-[1000px]:text-[5.5vw] font-light tracking-tight pr-6 sm:pr-8 uppercase select-none leading-none transition-all cursor-pointer"
                      >
                        {link.title.replace(/\s+/g, "")}
                      </motion.p>
                    </Link>
                  ))}
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 min-[1000px]:flex min-[1000px]:justify-between items-end gap-4 text-[10px] uppercase text-black tracking-wider pt-12 border-t border-neutral-300/40">
                  <div>
                    <span className="text-[#9f9689] mr-1">Made by:</span>Studio
                    Lumio
                  </div>
                  <div>
                    <span className="text-[#9f9689] mr-1">Typography:</span>
                    Google Fonts
                  </div>
                  <div>
                    <span className="text-[#9f9689] mr-1">Images:</span>Freepik,
                    Envato
                  </div>
                  <div
                    className="flex flex-col gap-1"
                    onClick={() => setIsActive(false)}
                  >
                    {/* <Link href="/privacy" className="hover:underline">
                      Privacy Policy
                    </Link> */}
                    <Link href="/terms" className="hover:underline">
                      Terms & Conditions
                    </Link>
                  </div>
                </div>
              </div>

              {/* Image Preview Window */}
              <motion.div
                variants={opacityAnim}
                animate={selectedLink.isActive ? "open" : "closed"}
                className="hidden min-[1000px]:block relative w-[480px] h-[400px] shrink-0 bg-neutral-100"
              >
                <Image
                  src={`/${LINKS[selectedLink.index].src}`}
                  fill
                  className="object-cover"
                  alt="Navigation Preview"
                  sizes="480px"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

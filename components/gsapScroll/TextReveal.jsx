"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const phrases = [
  "Los Flamencos National Reserve",
  "is a nature reserve located",
  "in the commune of San Pedro de Atacama",
  "The reserve covers a total area",
  "of 740 square kilometres (290 sq mi)",
];

export default function TextReveal() {
  return (
    <div className="relative text-paper text-[3vw] uppercase mt-[10vw] ml-[10vw] flex flex-col gap-2 font-world">
      {phrases.map((phrase, index) => (
        <AnimatedText key={index}>{phrase}</AnimatedText>
      ))}
    </div>
  );
}

function AnimatedText({ children }) {
  const text = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const anim = gsap.fromTo(
      text.current,
      { opacity: 0, x: -200 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: text.current,
          scrub: true,
          start: "top bottom",
          end: "bottom+=400px bottom",
        },
        ease: "power3.out",
      },
    );

    return () => anim.scrollTrigger?.kill();
  }, []);

  return (
    <p ref={text} className="relative m-0 will-change-transform">
      {children}
    </p>
  );
}

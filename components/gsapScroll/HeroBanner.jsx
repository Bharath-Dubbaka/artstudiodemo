"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BackgroundImg from "../../public/gallery/01.jpg";
import IntroImg from "../../public/gallery/02.jpg";

export default function HeroBanner() {
  const background = useRef(null);
  const introImage = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: "top top",
        end: "+=1000px", // Increased range slightly for smoother motion
      },
    });

    timeline
      // 1. Unclip the background while subtly sliding it downward (parallax)
      .fromTo(
        background.current,
        { clipPath: "inset(15%)", yPercent: 0 },
        { clipPath: "inset(0%)", yPercent: 15, ease: "none" },
        0,
      )
      // 2. Shrink the intro image container height AND push it up/down
      .to(introImage.current, { height: "200px", y: -80, ease: "none" }, 0)
      // 3. Move the text at a completely different rate to create the 3D layer depth
      .to("h1", { y: -150, ease: "none" }, 0);

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <div className="relative w-full flex justify-center bg-wall">
      {/* Background Image Container */}
      <div
        ref={background}
        className="w-full h-[140vh] absolute top-0 left-0 brightness-60 will-change-transform"
      >
        <Image
          src={BackgroundImg}
          fill
          alt="Atmospheric background landscape"
          className="object-cover"
          priority
        />
      </div>

      {/* Intro Overlay content */}
      <div className="flex justify-center relative mt-[35vh] z-10 pb-[20vh]">
        {/* <div
          ref={introImage}
          className="brightness-70 w-[350px] h-[475px] absolute overflow-hidden bg-paper/5"
        >
          <Image
            src={IntroImg}
            alt="Intro portrait display"
            fill
            className="object-cover object-top"
            priority
          />
        </div> */}
        <h1 className="text-paper text-[7vw] font-world uppercase tracking-wider z-20 text-center whitespace-nowrap mt-[200px]">
          SMOOTH SCROLL
        </h1>
      </div>
    </div>
  );
}

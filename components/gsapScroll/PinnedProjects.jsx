"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Picture1 from "../../public/gallery/01.jpg";
import Picture2 from "../../public/gallery/02.jpg";
import Picture3 from "../../public/gallery/03.jpg";

const projects = [
  { title: "Salar de Atacama", src: Picture1 },
  { title: "Valle de la luna", src: Picture2 },
  { title: "Miscanti Lake", src: Picture3 },
  { title: "Miniques Lagoons", src: Picture1 },
];

export default function PinnedProjects() {
  const [selectedProject, setSelectedProject] = useState(0);
  const container = useRef(null);
  const imageContainer = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pin = ScrollTrigger.create({
      trigger: imageContainer.current,
      pin: true,
      start: "top top+=100px",
      endTrigger: container.current,
      end: "bottom bottom-=300px", // Adjusted end anchor relative to main wrapper
    });

    return () => pin.kill();
  }, []);

  return (
    <div
      ref={container}
      className="relative text-paper mt-[25vh] px-[10%] pb-[10vh] bg-wall font-montreal"
    >
      {/* Upper Info Grid Container */}
      <div className="flex h-[700px] justify-between gap-[5%]">
        <div
          ref={imageContainer}
          className="relative h-3/4 w-[60%] md:h-full md:w-[40%]  bg-paper/5 overflow-hidden will-change-transform"
        >
          <Image
            src={projects[selectedProject].src}
            fill
            alt="Selected dynamic exhibition"
            className="object-cover transition-all duration-500 ease-out"
            priority
          />
        </div>
        <div className="flex h-full w-[20%] text-[2.1vw] md:text-[1.6vw] leading-relaxed">
          <p>
            The flora is characterized by the presence of high elevation
            wetland, as well as yellow straw, broom sedge, tola de agua and tola
            amaia.
          </p>
        </div>
        <div className="flex h-full w-[20%] text-[2.4vw] md:text-[1vw] items-end leading-relaxed text-paper/70">
          <p>
            Some, like the southern viscacha, vicuña and Darwins rhea, are
            classified as endangered species. Others, such as Andean goose,
            horned coot, Andean gull, puna tinamou and the three flamingo
            species inhabiting in Chile are considered vulnerable.
          </p>
        </div>
      </div>

      {/* Hover Selection list */}
      <div className="flex flex-col relative mt-[200px] border-t border-paper/10">
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseOver={() => setSelectedProject(index)}
            className="w-full text-paper uppercase text-[3vw] border-b border-paper/20 flex justify-end group cursor-pointer transition-colors hover:text-bronze"
          >
            <h2 className="m-0 mt-10 mb-5 font-light tracking-tight transition-transform duration-300 group-hover:translate-x-[-10px]">
              {project.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

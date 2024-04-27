import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

const GenerativeArt = () => {
  return (
    <div>
      <Navbar fixed={true} />
      <h1 className="text-center pt-20">Generative Art</h1>
      <p className="text-center my-4">
        Generative art projects I&apos;m doing for fun using the p5js library.
        Some of the projects are interactive, requiring the keyboard or mouse.
      </p>
      <div className="flex flex-col">
        <Link
          href="/GenerativeArt/Dune"
          className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-lg py-3 px-4 font-bold mx-auto my-4 transition-all w-48 text-center"
        >
          <button>Dune</button>
        </Link>
        <Link
          href="/GenerativeArt/Bubbles"
          className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-lg py-3 px-4 font-bold mx-auto my-4 transition-all w-48 text-center"
        >
          <button>Bubbles</button>
        </Link>
        <Link
          href="/GenerativeArt/BouncingParticles"
          className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-lg py-3 px-4 font-bold mx-auto my-4 transition-all w-48 text-center"
        >
          <button>Bouncing Particles</button>
        </Link>
        <Link
          href="/GenerativeArt/CellularAutomata"
          className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-lg py-3 px-4 font-bold mx-auto my-4 transition-all w-48 text-center"
        >
          <button>Cellular Automata</button>
        </Link>
        <Link
          href="/GenerativeArt/ParticleLife"
          className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-lg py-3 px-4 font-bold mx-auto my-4 transition-all w-48 text-center"
        >
          <button>Particle Life</button>
        </Link>
      </div>
    </div>
  );
};

export default GenerativeArt;

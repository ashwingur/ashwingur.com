import React from "react";
import Navbar from "../components/navbars/Navbar";
import Link from "next/link";
import GenerativeArtProjects from "../components/GenerativeArtProjects";

const GenerativeArt = () => {
  return (
    <div className="mb-12">
      <Navbar fixed={true} />

      <h1 className="text-center pt-20">Generative Art</h1>
      <p className="text-center my-4 px-4">
        Generative art projects I&apos;m doing for fun using the p5js library.
        Some of the projects are interactive, requiring the keyboard or mouse.
      </p>
      <GenerativeArtProjects />
    </div>
  );
};

export default GenerativeArt;

/* eslint-disable react/no-unescaped-entities */
import React from "react";
import TypewriterComponent from "typewriter-effect";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import Link from "next/link";

const HomeSection = () => {
  return (
    <div id="home" className="pt-24">
      <div className="text-2xl md:text-4xl lg:text-6xl font-mono text-center">
        <TypewriterComponent
          onInit={(typewriter) => {
            typewriter.typeString("> Hello, I'm Ashwin Gur").start();
          }}
        />
      </div>
      <p className="text-center text-lg mt-8 mx-8 md:mx-20">
        I am studying Bachelor of Mechatronics Engineering (Major: Space
        Engineering) and Bachelor of Science (Major: Computer Science) at The
        University of Sydney.
      </p>

      <div className="flex items-center justify-center gap-4 my-8">
        <a
          href="https://github.com/ashwingur"
          target="_blank"
          rel="noreferrer"
          className="hover:bg-background-hover p-2 transition rounded-md group relative flex justify-center"
        >
          <span className="absolute top-20 scale-0 transition-all rounded bg-gray-800 dark:bg-black p-2 text-xs text-white group-hover:scale-100">
            Github
          </span>
          <BsGithub size={50} />
        </a>
        <a
          href="https://www.linkedin.com/in/ashwingur/?originalSubdomain=au"
          target="_blank"
          rel="noreferrer"
          className="hover:bg-background-hover p-2 transition rounded-md group relative flex justify-center"
        >
          <span className="absolute top-20 scale-0 transition-all rounded bg-gray-800 dark:bg-black p-2 text-xs text-white group-hover:scale-100">
            LinkedIn
          </span>
          <BsLinkedin size={50} />
        </a>

        <Link
          href="/Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="hover:bg-background-hover p-2 transition rounded-md group relative flex justify-center"
        >
          <span className="absolute top-20 scale-0 transition-all rounded bg-gray-800 dark:bg-black p-2 text-xs text-white group-hover:scale-100">
            Resume
          </span>
          <IoDocumentText size={50} />
        </Link>
      </div>
    </div>
  );
};

export default HomeSection;

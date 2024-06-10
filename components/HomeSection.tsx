/* eslint-disable react/no-unescaped-entities */
import React from "react";
import TypewriterComponent from "typewriter-effect";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import Link from "next/link";
import Card from "@components/Card";

const HomeSection = () => {
  return (
    <div
      id="home"
      className="pt-24 flex flex-col items-center justify-center px-4"
    >
      <div className="text-2xl md:text-4xl lg:text-6xl font-mono text-center">
        <TypewriterComponent
          onInit={(typewriter) => {
            typewriter.typeString("> Hello, I'm Ashwin Gur").start();
          }}
        />
      </div>

      <Card
        firstLayer={true}
        className="flex flex-col items-center justify-center w-full lg:w-4/5 xl:w-3/5 2xl:w-2/5 mt-4 lg:!px-8"
      >
        <h2 className="text-2xl">About Me</h2>
        <div>
          <span className="font-bold">Degree:</span> Bachelor of Mechatronics
          Engineering + Computer Science double degree (University of Sydney)
        </div>
        <div>
          <span className="font-bold">Interests:</span> Coding, reading, gaming,{" "}
          <Link
            href={"https://www.worldcubeassociation.org/persons/2018GURA03"}
            target="_blank"
            className="text-text-hover"
          >
            solving Rubik's cubes
          </Link>
        </div>
        <h2 className="text-2xl mt-4 lg:mt-8">Links</h2>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="https://github.com/ashwingur"
            target="_blank"
            rel="noreferrer"
            className="hover:bg-accent hover:text-text-accent p-2 transition rounded-md group relative flex justify-center"
          >
            <span className="absolute top-[4.5rem] scale-0 transition-all rounded bg-accent px-2 py-1 text-xs text-text-accent group-hover:scale-100">
              Github
            </span>
            <BsGithub size={50} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/ashwingur/?originalSubdomain=au"
            target="_blank"
            rel="noreferrer"
            className="hover:bg-accent hover:text-text-accent p-2 transition rounded-md group relative flex justify-center"
          >
            <span className="absolute top-[4.5rem] scale-0 transition-all rounded bg-accent px-2 py-1 text-xs text-text-accent group-hover:scale-100">
              LinkedIn
            </span>
            <BsLinkedin size={50} />
          </Link>

          <Link
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hover:bg-accent hover:text-text-accent p-2 transition rounded-md group relative flex justify-center"
          >
            <span className="absolute top-[4.5rem] scale-0 transition-all rounded bg-accent px-2 py-1 text-xs text-text-accent group-hover:scale-100">
              Resume
            </span>
            <IoDocumentText size={50} />
          </Link>
        </div>
        <h2 className="text-2xl mt-8">About this website</h2>
        <p>
          I originally made this website to learn about React and to display my
          projects. However, it has since evolved into a hobby project that I
          continuously work on. In addition to the projects I have linked, there
          are many other pages, such as Media Reviews, which feature
          non-technical content. I have also spent a lot of time working on the
          styling and added multiple interesting themes that you can select from
          in the top right. Below is a list of apps on this website, with a
          brief overview.
        </p>
      </Card>
    </div>
  );
};

export default HomeSection;

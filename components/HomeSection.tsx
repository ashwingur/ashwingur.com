/* eslint-disable react/no-unescaped-entities */
import React from "react";
import TypewriterComponent from "typewriter-effect";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import Link from "next/link";
import Card from "@components/Card";
import { MdOutlineRateReview } from "react-icons/md";
import clsx from "clsx";
import {
  FaCar,
  FaChartLine,
  FaCloudMoonRain,
  FaCode,
  FaFileImage,
  FaGamepad,
  FaPaintbrush,
} from "react-icons/fa6";
import { RiSwordFill } from "react-icons/ri";
import { BsGrid3X3 } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { TbTicTac } from "react-icons/tb";
import { ToggleThemeButton } from "./ToggleThemeButton";

interface App {
  name: string;
  url: string;
  description: string;
  icon: (className?: string) => JSX.Element;
}

const appsList: App[] = [
  {
    name: "Media Reviews",
    url: "/MediaReviews",
    description:
      "My personal reviews and ratings of books, movies, shows and games that I have consumed.",
    icon: (className?: string) => (
      <MdOutlineRateReview className={clsx(className)} />
    ),
  },
  {
    name: "Ashwin's Weather Hub",
    url: "/Weather",
    description:
      "A weather monitoring system setup in my backyard, providing the latest and historical data.",
    icon: (className?: string) => (
      <FaCloudMoonRain className={clsx(className)} />
    ),
  },
  {
    name: "Tron Arcade",
    url: "/Tron",
    description: "An online multiplayer 2D game based on Tron.",
    icon: (className?: string) => <FaGamepad className={clsx(className)} />,
  },
  {
    name: "Generative Art",
    url: "/GenerativeArt",
    description:
      "A collection of generative artworks I have made with the p5.js library.",
    icon: (className?: string) => <FaPaintbrush className={clsx(className)} />,
  },
  {
    name: "Code Editor",
    url: "/Code",
    description:
      "A online code editor that supports many languages. The Piston API is used to safely execute code.",
    icon: (className?: string) => <FaCode className={clsx(className)} />,
  },
  {
    name: "NSW Live Car Park",
    url: "/NSWCarPark",
    description:
      "A public commuter carpark tracker using the Transport Opendata API.",
    icon: (className?: string) => <FaCar className={clsx(className)} />,
  },
  {
    name: "Clash of Clans Tracker",
    url: "/ClashOfClans",
    description:
      "Uses the Clash of Clans API to view and track the stats of any player or clan.",
    icon: (className?: string) => <RiSwordFill className={clsx(className)} />,
  },
  {
    name: "File Tools",
    url: "/FileTools",
    description:
      "A tool for file conversion between png, jpg, webp and pdf. Note this tool requires a login.",
    icon: (className?: string) => <FaFileImage className={clsx(className)} />,
  },
  {
    name: "Cube Timer",
    url: "/CubeTimer",
    description:
      "Rubik's Cube timer that also provides scrambles for a 3×3 cube. Hold space to activate.",
    icon: (className?: string) => <BsGrid3X3 className={clsx(className)} />,
  },
  {
    name: "Diskord",
    url: "/Diskord",
    description: "An open anonymous chatroom.",
    icon: (className?: string) => (
      <IoChatboxEllipsesOutline className={clsx(className)} />
    ),
  },
  {
    name: "Tic Tac Toe",
    url: "/TicTacToe",
    description: "An online multiplayer Tic Tac Toe game",
    icon: (className?: string) => <TbTicTac className={clsx(className)} />,
  },
  {
    name: "Site Analytics",
    url: "/Analytics",
    description:
      "Live and historical analytics of this website, including both frontend routes visited and api requests made.",
    icon: (className?: string) => <FaChartLine className={clsx(className)} />,
  },
];

const HomeSection = () => {
  const appCards = appsList.map((app, index) => {
    return (
      <Card firstLayer={false} key={index}>
        <div className="flex flex-col items-center justify-between h-full">
          <div>
            <h3 className="text-center">{app.name}</h3>
            <p className="text-sm">{app.description}</p>
          </div>
          <Link
            href={app.url}
            className="btn text-2xl w-20 flex justify-center mt-2"
          >
            {app.icon()}
          </Link>
        </div>
      </Card>
    );
  });

  return (
    <div
      id="home"
      className="pt-24 flex flex-col items-center justify-center px-4"
    >
      <div className="text-2xl md:text-4xl lg:text-5xl font-mono text-center">
        <TypewriterComponent
          onInit={(typewriter) => {
            typewriter.typeString("> Hello, I'm Ashwin Gur").start();
          }}
        />
      </div>

      <Card
        firstLayer={true}
        className="flex flex-col items-center justify-center w-full lg:w-4/5 xl:w-3/5 2xl:w-1/2 mt-4 lg:mt-8 lg:!px-8"
      >
        <h2 className="text-2xl mb-2">About Me</h2>
        <div className="flex gap-2 md:w-4/5 xl:w-3/5">
          <span className="font-bold w-28 md:w-24">Degree:</span>{" "}
          <span className="w-full">
            Bachelor of Mechatronics Engineering + Computer Science double
            degree (University of Sydney)
          </span>
        </div>
        <div className="flex gap-2 md:w-4/5 xl:w-3/5">
          <span className="font-bold w-28 md:w-24">Interests:</span>
          <span className="w-full">
            Coding, reading, gaming,{" "}
            <Link
              href={"https://www.worldcubeassociation.org/persons/2018GURA03"}
              target="_blank"
              className="text-text-hover"
            >
              solving Rubik's Cubes
            </Link>
            , and eating tasty food
          </span>
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
        <h2 className="text-2xl mt-8 mb-2">About this Website</h2>
        <p className="lg:px-8 xl:px-24 w-full">
          I originally made this website to learn about React and to display my
          projects. However, it has since evolved into a hobby project that I
          continuously work on. In addition to the projects I have linked, there
          are many other pages, such as Media Reviews, which feature
          non-technical content.
        </p>
        <p className="lg:px-8 xl:px-24 w-full mt-2">
          I have also spent a lot of time working on the styling and added
          multiple interesting themes that you can select from in the top right
          or from the following button:
        </p>
        <ToggleThemeButton className="text-xl" centerOptions={true} />
        <p className="lg:px-8 xl:px-24 w-full mt-2">
          Below are a list of all my apps and pages on this website.
        </p>
        <h2 className="text-2xl mt-8 mb-2">Apps and Pages</h2>
        <div className="grid md:grid-cols-2 gap-4 2xl:grid-cols-3">
          {appCards}
        </div>
      </Card>
    </div>
  );
};

export default HomeSection;

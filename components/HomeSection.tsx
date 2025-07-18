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
    name: "Ashwin's Weather Hub",
    url: "/Weather",
    description:
      "A weather monitoring system setup in my backyard, providing the latest and historical data.",
    icon: (className?: string) => (
      <FaCloudMoonRain className={clsx(className)} />
    ),
  },

  {
    name: "Media Reviews",
    url: "/MediaReviews",
    description:
      "My personal reviews of books, movies, shows, games and music I've consumed. It has full database integration, detailed filtering and statistics.",
    icon: (className?: string) => (
      <MdOutlineRateReview className={clsx(className)} />
    ),
  },
  {
    name: "Site Analytics",
    url: "/Analytics",
    description:
      "Live and historical analytics of this website, including both frontend routes visited and api requests made.",
    icon: (className?: string) => <FaChartLine className={clsx(className)} />,
  },
  {
    name: "Live Car Park",
    url: "/LiveCarPark",
    description:
      "A public commuter carpark tracker using the Transport Opendata API.",
    icon: (className?: string) => <FaCar className={clsx(className)} />,
  },
  {
    name: "Clash of Clans",
    url: "/ClashOfClans",
    description:
      "Uses the Clash of Clans API to view and track the stats of any player or clan.",
    icon: (className?: string) => <RiSwordFill className={clsx(className)} />,
  },
  {
    name: "Generative Art",
    url: "/GenerativeArt",
    description:
      "A collection of generative artworks I have made with the p5.js library.",
    icon: (className?: string) => <FaPaintbrush className={clsx(className)} />,
  },
  {
    name: "Tron Arcade",
    url: "/Tron",
    description: "An online multiplayer 2D game based on Tron.",
    icon: (className?: string) => <FaGamepad className={clsx(className)} />,
  },
  {
    name: "Code Editor",
    url: "/Code",
    description:
      "A online code editor that supports many languages. The Piston API is used to safely execute code.",
    icon: (className?: string) => <FaCode className={clsx(className)} />,
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
    name: "Media Reviews (OLD)",
    url: "/MediaReviewsOld",
    description:
      "My original personal reviews and ratings of books, movies, shows and games that I have consumed.",
    icon: (className?: string) => (
      <MdOutlineRateReview className={clsx(className)} />
    ),
  },
];

const HomeSection = () => {
  const appCards = appsList.map((app, index) => {
    return (
      <Card firstLayer={false} key={index}>
        <div className="flex h-full flex-col items-center justify-between">
          <div>
            <h3 className="text-center">{app.name}</h3>
            <p className="text-sm">{app.description}</p>
          </div>
          <Link
            href={app.url}
            className="btn mt-2 flex w-20 justify-center text-2xl"
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
      className="flex flex-col items-center justify-center px-4 pt-24 md:px-8"
    >
      <div className="text-center font-mono text-2xl md:text-4xl lg:text-5xl">
        <TypewriterComponent
          onInit={(typewriter) => {
            typewriter.typeString("> Hello, I'm Ashwin Gur").start();
          }}
        />
      </div>

      <Card
        firstLayer={true}
        className="mt-4 flex w-full flex-col items-center justify-center lg:mt-8 lg:w-4/5 lg:!px-8 2xl:w-2/3"
      >
        <h2 className="mb-2 text-2xl">About Me</h2>
        <div className="flex gap-2 md:w-4/5 xl:w-3/5">
          <span className="w-28 font-bold md:w-24">Degree:</span>{" "}
          <span className="w-full">
            Bachelor of Mechatronics Engineering Honours + Computer Science
            Double Degree (University of Sydney) (
            <Link
              href={"/AshwinGur_PrivacyPreseringSimThesis.pdf"}
              target="_blank"
              className="text-text-hover"
            >
              thesis
            </Link>
            )
          </span>
        </div>
        <div className="flex gap-2 md:w-4/5 xl:w-3/5">
          <span className="w-28 font-bold md:w-24">Interests:</span>
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
        <h2 className="mt-4 text-2xl lg:mt-8">Links</h2>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="https://github.com/ashwingur"
            target="_blank"
            rel="noreferrer"
            className="group relative flex justify-center rounded-md p-2 transition hover:bg-accent hover:text-text-accent"
          >
            <span className="absolute top-[4.5rem] scale-0 rounded bg-accent px-2 py-1 text-xs text-text-accent transition-all group-hover:scale-100">
              Github
            </span>
            <BsGithub size={50} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/ashwingur/?originalSubdomain=au"
            target="_blank"
            rel="noreferrer"
            className="group relative flex justify-center rounded-md p-2 transition hover:bg-accent hover:text-text-accent"
          >
            <span className="absolute top-[4.5rem] scale-0 rounded bg-accent px-2 py-1 text-xs text-text-accent transition-all group-hover:scale-100">
              LinkedIn
            </span>
            <BsLinkedin size={50} />
          </Link>

          <Link
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="group relative flex justify-center rounded-md p-2 transition hover:bg-accent hover:text-text-accent"
          >
            <span className="absolute top-[4.5rem] scale-0 rounded bg-accent px-2 py-1 text-xs text-text-accent transition-all group-hover:scale-100">
              Resume
            </span>
            <IoDocumentText size={50} />
          </Link>
        </div>
        <h2 className="mb-2 mt-8 text-2xl">About this Website</h2>
        <p className="w-full lg:px-8 xl:px-24">
          I originally made this website to learn about React and to display my
          projects. However, it has since evolved into a hobby project that I
          continuously work on. In addition to the projects I have linked, there
          are many other pages, such as Media Reviews, which feature
          non-technical content.
        </p>
        <p className="mt-2 w-full lg:px-8 xl:px-24">
          I have also spent a lot of time working on the styling and added
          multiple interesting themes that you can select from in the top right
          or from the following button:
        </p>
        <ToggleThemeButton className="text-xl" centerOptions={true} />
        <p className="mt-2 w-full lg:px-8 xl:px-24">
          Below are a list of all my apps and pages on this website.
        </p>
        <h2 className="mb-2 mt-8 text-2xl">Apps and Pages</h2>
        <div className="grid gap-4 md:mb-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {appCards}
        </div>
      </Card>
    </div>
  );
};

export default HomeSection;

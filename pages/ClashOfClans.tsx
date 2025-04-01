import CocNavBar from "../components/clashofclans/CocNavBar";
import CocButton from "../components/clashofclans/CocButton";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import axios from "axios";
import { formatToISO8601, useGoldPass } from "shared/queries/clashofclans";
import { useEffect, useState } from "react";

// https://coc.guide/troop for the icons

// My profile: #YLPGLJOV

interface Tags {
  playerTag: string;
  clanTag: string;
}

const theOrganisationTag = "220QP2GGU";

const fetchTheOrganisation = () =>
  axios.get(`/api/clashofclans/clan/220QP2GGU`).then(({ data }) => data);

const ClashOfClans = () => {
  const [remainingTime, setRemainingTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  //  Caching TheOrganisation clan since it is more frequently accessed
  useQuery({
    queryKey: ["clan", theOrganisationTag],
    queryFn: () => fetchTheOrganisation(),
  });

  const { data: goldPass, isError } = useGoldPass();

  useEffect(() => {
    if (goldPass?.endTime) {
      const intervalId = setInterval(() => {
        const endTime = new Date(formatToISO8601(goldPass.endTime)).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = endTime - currentTime;

        if (timeDifference <= 0) {
          clearInterval(intervalId); // Stop the countdown if the end time has passed
        } else {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          setRemainingTime({ days, hours, minutes, seconds });
        }
      }, 100);

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [goldPass?.endTime]);
  return (
    <div className="bg-clash min-h-screen pb-8">
      <CocNavBar />
      <div className="w- flex flex-col items-center">
        <h2 className="clash-font-style pt-20 text-center font-thin">
          Clash of Clans
        </h2>

        <p className="coc-font-style mt-4 flex items-center gap-2">
          {" "}
          Season End:{" "}
          {goldPass !== undefined &&
            remainingTime.days +
              remainingTime.hours +
              remainingTime.minutes +
              remainingTime.seconds !==
              0 && (
              <span className="w-52 text-2xl text-yellow-100">
                {remainingTime.days > 0 && `${remainingTime.days}d`}{" "}
                {remainingTime.hours}h {remainingTime.minutes}m{" "}
                {remainingTime.seconds}s
              </span>
            )}
          {isError && (
            <span className="w-52 text-2xl text-yellow-100">N/A</span>
          )}
        </p>
        <p className="coc-font-style m-4 text-center md:w-[70%] md:text-xl lg:w-3/5 lg:text-2xl">
          Welcome to the Clash of Clans page. Search any player or clan by their
          tag in the navigation bar. This site uses the official Clash of Clans
          API to provide up to date data. Below are some quick links to my
          profile and clan:
        </p>
        <div className="mb-4 flex h-16 items-center">
          <Link href={"/ClashOfClans/player/YLPGLJ0V"}>
            <CocButton
              className="w-80 hover:w-72"
              text={"Unknown Virus"}
              innerColour="bg-orange-500 dark:bg-orange-600"
              middleColour="bg-orange-600 dark:bg-orange-700"
              outerColour="bg-orange-700 dark:bg-orange-900"
            />
          </Link>
        </div>
        <div className="mb-4 flex h-16 items-center">
          <Link href={"/ClashOfClans/clan/220QP2GGU"}>
            <CocButton
              className="w-80 hover:w-72"
              text={"TheOrganisation"}
              innerColour="bg-purple-500"
              middleColour="bg-purple-600"
              outerColour="bg-purple-700"
            />
          </Link>
        </div>
        <div className="flex h-16 items-center">
          <Link href={"/ClashOfClans/Progress"}>
            <CocButton
              className="w-80 hover:w-72"
              text={"Progress Tracker"}
              innerColour="bg-green-500"
              middleColour="bg-green-600"
              outerColour="bg-green-700"
            />
          </Link>
        </div>
      </div>
      <div className="relative mx-auto my-8 h-72 w-72 md:h-96 md:w-96">
        <Image
          src={`/assets/coc/CocBackground.webp`}
          alt={`Clash of Clans Background`}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default ClashOfClans;

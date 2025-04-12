import CocNavBar from "../components/clashofclans/CocNavBar";
import CocButton from "../components/clashofclans/CocButton";
import Image from "next/image";
import Link from "next/link";
import {
  formatToISO8601,
  useGetCocPlayers,
  useGetFullClan,
  useGoldPass,
} from "shared/queries/clashofclans";
import { useEffect, useState } from "react";
import { useCocPlayerFavourites } from "shared/clashofclansfavourites";
import PlayerSelectorCard from "@components/clashofclans/PlayerSelectorCard";
import clsx from "clsx";

// https://coc.guide/troop for the icons

// My profile: #YLPGLJOV

interface Tags {
  playerTag: string;
  clanTag: string;
}

const theOrganisationTag = "220QP2GGU";

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
  useGetCocPlayers(); // To update the favourites values if they've changed

  const { favourites, remove } = useCocPlayerFavourites();

  //  Caching TheOrganisation clan since it is more frequently accessed
  useGetFullClan(theOrganisationTag);

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
      <div className="flex flex-col items-center">
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
        {favourites.length > 0 && (
          <>
            <h3 className="clash-font-style mb-2 mt-4 text-center text-xl font-thin">
              Favourite Players
            </h3>
            <div
              className={clsx(
                "mb-4 grid items-center justify-center gap-2",
                favourites.length === 1 && "grid-cols-1",
                favourites.length === 2 && "md:grid-cols-2",
                favourites.length === 3 && "md:grid-cols-2 lg:grid-cols-3",
                favourites.length >= 4 &&
                  "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              )}
            >
              {favourites.map((player) => (
                <PlayerSelectorCard
                  key={player.tag}
                  player={player}
                  isFavourite={true}
                  onToggleFavourite={() => remove(player.tag)}
                />
              ))}
            </div>
          </>
        )}
        <h3 className="clash-font-style mb-2 mt-4 text-center text-xl font-thin">
          Quick Links
        </h3>
        <div className="mb-4 flex h-16 items-center">
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
        {/* <div className="mb-4 flex h-16 items-center">
          <Link href={"/ClashOfClans/player/YLPGLJ0V"}>
            <CocButton
              className="w-80 hover:w-72"
              text={"Unknown Virus"}
              innerColour="bg-orange-500 dark:bg-orange-600"
              middleColour="bg-orange-600 dark:bg-orange-700"
              outerColour="bg-orange-700 dark:bg-orange-900"
            />
          </Link>
        </div> */}
      </div>
      <p className="coc-font-style mx-auto p-4 text-left md:w-[80%] md:text-xl lg:text-2xl 2xl:w-3/5">
        Welcome to the Clash of Clans page. Search any player or clan by their
        tag in the navigation bar. This site uses the official Clash of Clans
        API to provide updated data. There is also a progress tracker for
        players in TheOrganisation clan.
      </p>
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

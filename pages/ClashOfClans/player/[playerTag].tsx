import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { SpinningCircles } from "react-loading-icons";
import CocNavBar from "@components/clashofclans/CocNavBar";
import CocPlayerAchievements from "@components/clashofclans/CocPlayerAchievements";
import CocPlayerArmy from "@components/clashofclans/CocPlayerArmy";
import CocPlayerClan from "@components/clashofclans/CocPlayerClan";
import CocPlayerSummary from "@components/clashofclans/CocPlayerSummary";
import CocPlayerTownHall from "@components/clashofclans/CocPlayerTownHall";
import CocTrophyDetails from "@components/clashofclans/CocTrophyDetails";
import { Player } from "shared/interfaces/coc.interface";
import { useQuery } from "react-query";
import CocLoadingOrError from "@components/clashofclans/CocLoadingOrError";
import Link from "next/link";
import CocButton from "@components/clashofclans/CocButton";
import CocPlayerStats from "@components/clashofclans/CocPlayerStats";
import {
  useGetCocPlayer,
  useIncrementViewCount,
} from "shared/queries/clashofclans";
import Image from "next/image";
import { formatLastOnline } from "@components/clashofclans/PlayerSelectorCard";

const title = "Player Details";

const fetchPlayer = (playerTag: string) =>
  axios.get(`/api/clashofclans/player/${playerTag}`).then(({ data }) => data);

const PlayerPage = () => {
  const router = useRouter();
  const playerTag =
    typeof router.query?.playerTag === "string"
      ? router.query.playerTag
      : undefined;

  const { isLoading, error, data } = useQuery<Player>({
    queryKey: ["player", playerTag],
    queryFn: () => fetchPlayer(playerTag!),
    enabled: !!playerTag,
  });

  useIncrementViewCount(playerTag);
  const { data: cocPlayer } = useGetCocPlayer(playerTag);

  if (error instanceof Error)
    return CocLoadingOrError({
      heading: title,
      info: (
        <p className="coc-font-style m-8 text-center text-2xl">
          Unable to player data: {error.message}
        </p>
      ),
    });
  if (isLoading || data === undefined)
    return CocLoadingOrError({
      heading: title,
      info: <SpinningCircles className="mx-auto mt-8" />,
    });

  return (
    <div className="bg-clash min-h-screen pb-8">
      <CocNavBar />
      <h2 className="clash-font-style mb-4 px-4 pt-20 text-center text-2xl font-thin md:mb-0 lg:text-3xl">
        Player Profile - {data.name}
      </h2>
      {cocPlayer && (
        <>
          <p className="coc-font-style right-4 top-[2px] mt-2 flex items-center justify-center gap-2 text-lg">
            <span className="">{cocPlayer.view_count.toLocaleString()}</span>
            <Image
              unoptimized
              alt="gem"
              src={"/assets/coc/gem.webp"}
              width={0}
              height={0}
              className="h-6 w-6"
            />
          </p>
          {cocPlayer.activity_change_date && (
            <p className="mt-1 text-center font-coc text-sm font-thin text-gray-100">
              Last online: {formatLastOnline(cocPlayer.activity_change_date)}
            </p>
          )}
        </>
      )}

      <div className="flex flex-col lg:mx-auto lg:w-5/6">
        {data.clan && data.clan.name === "TheOrganisation" && (
          <div className="mx-auto mb-4 flex items-center justify-center gap-2 pt-4 md:gap-4">
            <div className="flex w-40 items-center justify-center md:h-16 md:w-60">
              <Link href={"/ClashOfClans/Progress"}>
                <CocButton
                  className="w-40 hover:w-36 md:w-60 md:hover:w-56"
                  text={"Clan Members"}
                  innerColour="bg-green-500"
                  middleColour="bg-green-600"
                  outerColour="bg-green-700"
                  textClassName="text-xs md:text-base md:hover:text-sm"
                />
              </Link>
            </div>
            <div className="flex w-40 items-center justify-center md:h-16 md:w-60">
              <Link href={`/ClashOfClans/Progress/${playerTag}`} className="">
                <CocButton
                  className="w-40 hover:w-36 md:w-60 md:hover:w-56"
                  text="Progress"
                  innerColour="bg-blue-500"
                  middleColour="bg-blue-600"
                  outerColour="bg-blue-700"
                  textClassName="text-xs md:text-base md:hover:text-sm"
                />
              </Link>
            </div>
          </div>
        )}
        <div>
          <div className="grid-cols-2 xl:grid">
            <div className="m-4 grid grid-cols-1 items-center justify-center rounded-lg border-2 border-black bg-[#695d96] pt-2 dark:bg-[#473e63] md:grid-cols-2 md:pt-0 lg:flex-row xl:grid-cols-2">
              <CocPlayerSummary player={data} />
              <CocPlayerTownHall player={data} />
              {data.hasOwnProperty("clan") && <CocPlayerClan player={data} />}

              <CocTrophyDetails player={data} />
            </div>
            <CocPlayerStats player={data} />
          </div>
          <div className="mx-4 mb-4 rounded-lg border-2 border-black bg-indigo-900">
            <h2 className="clash-font-style mt-4 text-center text-3xl font-thin">
              Army
            </h2>
            <CocPlayerArmy player={data} />
          </div>
          <CocPlayerAchievements player={data} />
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;

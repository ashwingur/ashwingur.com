import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { SpinningCircles } from "react-loading-icons";
import CocNavBar from "../../../components/clashofclans/CocNavBar";
import CocPlayerAchievements from "../../../components/clashofclans/CocPlayerAchievements";
import CocPlayerArmy from "../../../components/clashofclans/CocPlayerArmy";
import CocPlayerClan from "../../../components/clashofclans/CocPlayerClan";
import CocPlayerSummary from "../../../components/clashofclans/CocPlayerSummary";
import CocPlayerTownHall from "../../../components/clashofclans/CocPlayerTownHall";
import CocTrophyDetails from "../../../components/clashofclans/CocTrophyDetails";
import { Player } from "../../../shared/interfaces/coc.interface";
import { useQuery } from "react-query";
import CocLoadingOrError from "../../../components/clashofclans/CocLoadingOrError";
import Link from "next/link";
import CocButton from "../../../components/clashofclans/CocButton";
import CocPlayerStats from "../../../components/clashofclans/CocPlayerStats";

const title = "Player";

const fetchPlayer = (playerTag: string) =>
  axios.get(`/api/clashofclans/player/${playerTag}`).then(({ data }) => data);

const PlayerPage = () => {
  const router = useRouter();
  const playerTag =
    typeof router.query?.playerTag === "string" ? router.query.playerTag : "";

  const { isLoading, error, data } = useQuery<Player>({
    queryKey: ["player", playerTag],
    queryFn: () => fetchPlayer(playerTag),
    enabled: router.isReady,
  });

  if (error instanceof Error)
    return CocLoadingOrError({
      heading: title,
      info: (
        <p className="text-center coc-font-style m-8 text-2xl">
          Unable to fetch clan war data: {error.message}
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
      <h2 className="text-center pt-20 clash-font-style font-thin mb-4 md:mb-0">
        Player
      </h2>

      <div className="flex flex-col">
        {data.clan.name === "TheOrganisation" && (
          <div className="h-16 flex items-center mx-auto mt-4">
            <Link href={`/ClashOfClans/Progress/${playerTag}`}>
              <CocButton
                className="w-80 hover:w-72"
                text={"Progress"}
                innerColour="bg-blue-500"
                middleColour="bg-blue-600"
                outerColour="bg-blue-700"
              />
            </Link>
          </div>
        )}
        <div>
          <div className="flex flex-col md:flex-row md:justify-around items-center rounded-lg border-2 border-black m-4 pt-2 md:pt-0 bg-[#695d96] dark:bg-[#473e63]">
            <CocPlayerSummary player={data} />
            <CocPlayerTownHall player={data} />
            {data.hasOwnProperty("clan") && <CocPlayerClan player={data} />}

            <CocTrophyDetails player={data} />
          </div>
          <CocPlayerStats player={data} />
          <div className="border-2 border-black rounded-lg mx-4 mb-4 bg-indigo-900">
            <h2 className="text-center clash-font-style font-thin text-3xl mt-4">
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

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SpinningCircles } from "react-loading-icons";
import CocNavBar from "../../../components/clashofclans/CocNavBar";
import CocPlayerArmy from "../../../components/clashofclans/CocPlayerArmy";
import CocPlayerClan from "../../../components/clashofclans/CocPlayerClan";
import CocPlayerSummary from "../../../components/clashofclans/CocPlayerSummary";
import CocPlayerTownHall from "../../../components/clashofclans/CocPlayerTownHall";
import CocTrophyDetails from "../../../components/clashofclans/CocTrophyDetails";
import { Player } from "../../../shared/interfaces/coc.interface";

const PlayerPage = () => {
  const router = useRouter();
  const { playerTag } = router.query;

  const [playerData, setPlayerData] = useState<Player>();

  useEffect(() => {
    if (typeof playerTag === "string") {
      searchForPlayer(playerTag);
    }
  }, [playerTag]);

  const searchForPlayer = (playerTag: string) => {
    axios
      .get(`/api/clashofclans/player/${playerTag}`)
      .then((response) => {
        const player: Player = response.data;
        setPlayerData(player);
      })
      .catch((error) => console.log("Player fetch error: " + error));
  };

  return (
    <div className="bg-gradient-to-b from-[#8c94ac] to-[#6c779b] min-h-screen pb-8">
      <CocNavBar />
      <h2 className="text-center pt-20 clash-font-style font-thin mb-4 md:mb-0">
        Player Search
      </h2>

      <div>
        {playerData && (
          <div>
            <div className="flex flex-col md:flex-row md:justify-around items-center">
              <CocPlayerSummary player={playerData} />
              <CocPlayerTownHall player={playerData} />
              {playerData.hasOwnProperty("clan") && (
                <CocPlayerClan player={playerData} />
              )}

              <CocTrophyDetails player={playerData} />
            </div>
            <CocPlayerArmy player={playerData} />
          </div>
        )}
        {!playerData && <SpinningCircles className="mx-auto mt-8" />}
      </div>
    </div>
  );
};

export default PlayerPage;

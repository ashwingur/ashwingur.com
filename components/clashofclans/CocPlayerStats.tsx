import React from "react";
import { Player } from "../../shared/interfaces/coc.interface";

const HorizontalBar = () => {
  return (
    <div className="my-1">
      <div className="h-[1px] bg-gray-600" />
      <div className="h-[1px] bg-gray-400" />
    </div>
  );
};

const Gap = () => {
  return <div className="h-8"></div>;
};

const Stat = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="coc-font-style flex w-72 flex-col text-sm md:w-96 md:text-base lg:w-[30rem]">
      <div className="flex justify-between">
        <div className="flex flex-wrap">{name}</div>
        <div className="w-28 text-right lg:w-36">{value}</div>
      </div>
      <HorizontalBar />
    </div>
  );
};

const CocPlayerStats = ({ player }: { player: Player }) => {
  return (
    <div className="m-4 flex flex-col items-center rounded-lg border-2 border-black bg-[#695d96] py-4 dark:bg-[#473e63]">
      <h2 className="clash-font-style text-center text-3xl font-thin">Stats</h2>
      <div className="coc-font-style w-72 md:w-96 lg:w-[30rem]">
        <Stat name={"Trophies"} value={player.trophies.toString()} />
        <Stat name={"Best Trophies"} value={player.bestTrophies.toString()} />
        <Stat
          name={"Builder Base Trophies"}
          value={player.builderBaseTrophies.toString()}
        />
        <Stat
          name={"Best Builder Base Trophies"}
          value={player.bestBuilderBaseTrophies.toString()}
        />
        <Gap />
        <Stat
          name={"Clan Capital Contributions"}
          value={player.clanCapitalContributions.toLocaleString()}
        />
        <Stat name={"War Stars"} value={player.warStars.toString()} />
        <Gap />
        <Stat name={"Donations"} value={player.donations.toString()} />
        <Stat
          name={"Donations Received"}
          value={player.donationsReceived.toString()}
        />
        <Gap />
        <Stat name={"Attack Wins"} value={player.attackWins.toString()} />
        <Stat name={"Defense Wins"} value={player.defenseWins.toString()} />
        <Gap />
        <Stat name={"Townhall Level"} value={player.townHallLevel.toString()} />
        <Stat
          name={"Builderhall Level"}
          value={player.builderHallLevel.toString()}
        />
        <Gap />
        <Stat
          name={"League"}
          value={player.league === undefined ? "N/A" : player.league?.name}
        />
        <Stat
          name={"Builder Base League"}
          value={
            player.builderBaseLeague === undefined
              ? "N/A"
              : player.builderBaseLeague?.name
          }
        />
      </div>
    </div>
  );
};

export default CocPlayerStats;

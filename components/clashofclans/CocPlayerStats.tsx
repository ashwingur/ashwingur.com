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

const Stat = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="coc-font-style text-lg w-72 md:w-96 flex flex-col">
      <div className="flex justify-between">
        <div>{name}</div>
        <div>{value}</div>
      </div>
      <HorizontalBar />
    </div>
  );
};

const CocPlayerStats = ({ player }: { player: Player }) => {
  return (
    <div className=" border-black border-2 m-4 rounded-lg bg-[#695d96] flex flex-col items-center py-4">
      <h2 className="text-center clash-font-style font-thin text-3xl">Stats</h2>
      <div className="coc-font-style text-lg w-72 md:w-96">
        <Stat name={"Trophies"} value={player.trophies.toString()} />
        <Stat name={"Best Trophies"} value={player.bestTrophies.toString()} />
        <Stat
          name={"Versus Trophies"}
          value={player.versusTrophies.toString()}
        />
        <Stat
          name={"Best Versus Trophies"}
          value={player.bestVersusTrophies.toString()}
        />
        <Stat
          name={"Clan Capital Contributions"}
          value={player.clanCapitalContributions.toString()}
        />
      </div>
    </div>
  );
};

export default CocPlayerStats;

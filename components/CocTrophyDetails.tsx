import React from "react";
import { Player } from "../shared/interfaces/coc.interface";
import Image from "next/image";

interface CocTrophyDetailsProps {
  player: Player;
}

const CocTrophyDetails = ({ player }: CocTrophyDetailsProps) => {
  return (
    <div className="font-clash clash-font-style pb-10 md:pb-0 ml-4 md:ml-0">
      <div className="flex items-center relative">
        <Image
          alt={player.league.name}
          src={player.league.iconUrls.medium}
          width={140}
          height={140}
          className="absolute left-[-65px]"
        />
        <div className="flex flex-col items-center bg-gradient-to-r from-black">
          <div className="pl-20 py-1">{player.league.name}</div>
          <div className="flex items-center bg-gradient-to-r from-[#931ae7] to-[rgba(0, 0, 0, 0)] pl-20 pr-10 py-1">
            <Image
              alt="trophy"
              src={"/assets/coc/cocTrophy.webp"}
              width={30}
              height={30}
            />
            {player.trophies}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocTrophyDetails;

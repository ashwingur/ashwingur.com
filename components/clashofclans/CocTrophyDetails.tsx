import React from "react";
import { Player } from "../../shared/interfaces/coc.interface";
import Image from "next/image";

interface CocTrophyDetailsProps {
  player: Player;
}

const CocTrophyDetails = ({ player }: CocTrophyDetailsProps) => {
  return (
    <div className="font-clash clash-font-style pb-10 md:pb-0 md:ml-0">
      {player.hasOwnProperty("league") == true ? (
        <div className="flex items-center relative">
          <div className="absolute w-32 md:w-36 h-32 md:h-36 left-[-45px] md:left-[-68px] bottom-[-20px]">
            <Image
              alt={player.league.name}
              src={player.league.iconUrls.medium}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
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
      ) : (
        <div className="flex items-center">
          <Image
            alt="trophy"
            src={"/assets/coc/cocTrophy.webp"}
            width={30}
            height={30}
          />
          {player.trophies}
        </div>
      )}
    </div>
  );
};

export default CocTrophyDetails;

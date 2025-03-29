import React from "react";
import { Player } from "../../shared/interfaces/coc.interface";
import Image from "next/image";

interface CocTrophyDetailsProps {
  player: Player;
}

const CocTrophyDetails = ({ player }: CocTrophyDetailsProps) => {
  return (
    <div className="clash-font-style flex justify-center pb-10 font-clash md:ml-0 md:pb-0">
      {player.league !== undefined ? (
        <div className="relative flex items-center">
          <div className="absolute bottom-[-10px] left-[-45px] h-24 w-24 md:bottom-[-20px] md:left-[-58px] md:h-32 md:w-32">
            <Image
              unoptimized
              alt={player.league.name}
              src={player.league.iconUrls.medium}
              fill={true}
              width={0}
              height={0}
              className="h-auto w-full"
            />
          </div>
          <div className="flex flex-col items-center bg-gradient-to-r from-black">
            <div className="py-1 pl-20 text-sm md:text-base">
              {player.league.name}
            </div>
            <div className="to-[rgba(0, 0, 0, 0)] flex items-center gap-1 bg-gradient-to-r from-[#931ae7] py-1 pl-20 pr-10 text-sm md:text-base">
              <Image
                unoptimized
                alt="trophy"
                src={"/assets/coc/cocTrophy.webp"}
                width={0}
                height={0}
                className="h-6 w-full"
              />
              {player.trophies}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <Image
            unoptimized
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

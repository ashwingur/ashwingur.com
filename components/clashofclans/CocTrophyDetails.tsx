import React from "react";
import Image from "next/image";
import { CocPlayerProfile } from "shared/validations/CocPlayerProfileSchema";

interface CocTrophyDetailsProps {
  player: CocPlayerProfile;
}

const CocTrophyDetails = ({ player }: CocTrophyDetailsProps) => {
  return (
    <div className="clash-font-style flex justify-center pb-10 font-clash md:ml-0 md:pb-0">
      {player.leagueTier !== undefined ? (
        <div className="relative flex items-center">
          <div className="absolute bottom-[-16px] left-[-45px] h-24 w-24 md:bottom-[-20px] md:left-[-36px]">
            <Image
              unoptimized
              alt={player.leagueTier.name}
              src={
                player.leagueTier.iconUrls.large ??
                player.leagueTier.iconUrls.small
              }
              fill={true}
              width={0}
              height={0}
              className="h-auto w-full"
            />
          </div>
          <div className="flex flex-col items-center bg-gradient-to-r from-black">
            <div className="py-1 pl-20 text-sm md:text-base">
              {player.leagueTier.name}
            </div>
            <div className="to-[rgba(0, 0, 0, 0)] flex items-center gap-1 bg-gradient-to-r from-[#931ae7] py-1 pl-20 pr-10 text-sm md:text-base">
              <Image
                unoptimized
                alt="trophy"
                src={"/assets/coc/cocTrophy.webp"}
                width={0}
                height={0}
                className="h-6 w-6"
              />
              {player.trophies}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <Image
            unoptimized
            alt="trophy"
            src={"/assets/coc/cocTrophy.webp"}
            width={0}
            height={0}
            className="h-6 w-6"
          />
          {player.trophies}
        </div>
      )}
    </div>
  );
};

export default CocTrophyDetails;

import Image from "next/image";
import React from "react";
import { CocPlayerProfile } from "shared/validations/CocPlayerProfileSchema";

interface CocPlayerTownHallProps {
  player: CocPlayerProfile;
}

const CocPlayerTownHall = ({ player }: CocPlayerTownHallProps) => {
  return (
    <div className="my-4 flex flex-col items-center">
      <div className="clash-font-style mb-2">
        Town Hall {player.townHallLevel}
      </div>
      <Image
        unoptimized
        src={`/assets/coc/townhalls/${player.townHallLevel}.webp`}
        alt={`Townhall level ${player.townHallLevel}`}
        width={90}
        height={90}
        priority={true}
      />
      {player.hasOwnProperty("townHallWeaponLevel") && (
        <div className="clash-font-style mb-2">
          Weapon Level {player.townHallWeaponLevel}
        </div>
      )}
    </div>
  );
};

export default CocPlayerTownHall;

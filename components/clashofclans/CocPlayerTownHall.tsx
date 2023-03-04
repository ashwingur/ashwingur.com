import Image from "next/image";
import React from "react";
import { Player } from "../../shared/interfaces/coc.interface";

interface CocPlayerTownHallProps {
  player: Player;
}

const CocPlayerTownHall = ({ player }: CocPlayerTownHallProps) => {
  return (
    <div className="my-4 flex flex-col items-center">
      <div className="clash-font-style mb-2">
        Town Hall {player.townHallLevel}
      </div>
      <Image
        src={`/assets/coc/townhalls/${player.townHallLevel}.png`}
        width={90}
        height={90}
        alt={`Townhall level ${player.townHallLevel}`}
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

import Image from "next/image";
import React from "react";
import { Player } from "../../shared/interfaces/coc.interface";

interface CocPlayerTownHallProps {
  player: Player;
}

const CocPlayerTownHall = ({ player }: CocPlayerTownHallProps) => {
  return (
    <div className="my-4">
      <Image
        src={`/assets/coc/townhalls/${player.townHallLevel}.png`}
        width={100}
        height={100}
        alt={`Townhall level ${player.townHallLevel}`}
      />
    </div>
  );
};

export default CocPlayerTownHall;

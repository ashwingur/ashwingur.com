import React from "react";
import { Player } from "../shared/interfaces/coc.interface";
import Image from "next/image";

interface CocPlayerClanProps {
  player: Player;
}

const CocPlayerClan = ({ player }: CocPlayerClanProps) => {
  return (
    <div className="font-clash text-white clash-font-style py-4">
      <div>{player.clan.name}</div>
      <Image
        alt={player.clan.name}
        src={player.clan.badgeUrls.large}
        width={150}
        height={150}
      />
    </div>
  );
};

export default CocPlayerClan;

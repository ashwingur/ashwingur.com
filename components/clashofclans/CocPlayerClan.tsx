import React from "react";
import { Player } from "../../shared/interfaces/coc.interface";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

interface CocPlayerClanProps {
  player: Player;
}

const CocPlayerClan = ({ player }: CocPlayerClanProps) => {
  return (
    <div className="flex justify-center">
      <Link
        className="clash-font-style my-1 flex flex-col items-center rounded-md px-2 py-4 font-clash text-white transition-all hover:bg-black/20"
        href={`/ClashOfClans/clan/${player.clan.tag.substring(1)}`}
      >
        <div>{player.clan.name}</div>
        <Image
          unoptimized
          alt={player.clan.name}
          src={player.clan.badgeUrls.large}
          width={0}
          height={0}
          className="h-auto w-32"
        />
      </Link>
    </div>
  );
};

export default CocPlayerClan;

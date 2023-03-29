import React from "react";
import { Player } from "../../shared/interfaces/coc.interface";
import Image from "next/image";
import { useRouter } from "next/router";

interface CocPlayerClanProps {
  player: Player;
}

const CocPlayerClan = ({ player }: CocPlayerClanProps) => {
  const router = useRouter();

  const clanMemberClick = () => {
    router.push(`/ClashOfClans/clan/${player.clan.tag.substring(1)}`);
  };

  return (
    <div
      className="font-clash text-white clash-font-style py-4 cursor-pointer hover:bg-black/20 rounded-md my-1 px-2 transition-all"
      onClick={clanMemberClick}
    >
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

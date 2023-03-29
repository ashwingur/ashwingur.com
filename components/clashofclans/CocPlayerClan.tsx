import React from "react";
import { Player } from "../../shared/interfaces/coc.interface";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

interface CocPlayerClanProps {
  player: Player;
}

const CocPlayerClan = ({ player }: CocPlayerClanProps) => {
  const router = useRouter();

  const clanMemberClick = () => {
    router.push(`/ClashOfClans/clan/${player.clan.tag.substring(1)}`);
  };

  return (
    <Link
      className="font-clash text-white clash-font-style py-4 hover:bg-black/20 rounded-md my-1 px-2 transition-all"
      href={`/ClashOfClans/clan/${player.clan.tag.substring(1)}`}
    >
      <div>{player.clan.name}</div>
      <Image
        alt={player.clan.name}
        src={player.clan.badgeUrls.large}
        width={150}
        height={150}
      />
    </Link>
  );
};

export default CocPlayerClan;

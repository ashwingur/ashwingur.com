import React from "react";
import { ClanWar } from "../../shared/interfaces/coc.interface";
import Image from "next/image";
import Link from "next/link";

interface CocWarStatusProps {
  clanWar: ClanWar;
}

const ClanStatus = (
  name: string,
  tag: string,
  teamSize: number,
  stars: number,
  attacks: number,
  attacksPerMember: number,
) => {
  return (
    <div className="clash-font-style flex flex-col gap-2">
      <Link href={`/ClashOfClans/clan/${tag.substring(1)}`}>
        <div className="text-yellow-100">{name}</div>
      </Link>
      <div className="flex items-center gap-2">
        <div className="relative h-6 w-6 md:h-8 md:w-8">
          <Image
            unoptimized
            src={`/assets/coc/stars/silver_star.png`}
            alt={`Sword`}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div>
          {stars}/{3 * teamSize}
        </div>
      </div>
      <div className="coc-font-style flex items-center gap-2 md:text-xl">
        <div className="relative h-6 w-6 md:h-8 md:w-8">
          <Image
            unoptimized
            src={`/assets/coc/sword.png`}
            alt={`Sword`}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div>
          {attacks}/{attacksPerMember * teamSize}
        </div>
      </div>
    </div>
  );
};

const CocWarStatus = ({ clanWar }: CocWarStatusProps) => {
  const warState = clanWar.state
    .replace(/([A-Z]+)/g, " $1")
    .replace(/([A-Z][a-z])/g, " $1");

  const myClanStatus = ClanStatus(
    clanWar.clan.name,
    clanWar.clan.tag,
    clanWar.teamSize,
    clanWar.clan.stars,
    clanWar.clan.attacks,
    clanWar.hasOwnProperty("attacksPerMember") ? clanWar.attacksPerMember : 1,
  );

  const otherClanStatus = ClanStatus(
    clanWar.opponent.name,
    clanWar.opponent.tag,
    clanWar.teamSize,
    clanWar.opponent.stars,
    clanWar.opponent.attacks,
    clanWar.hasOwnProperty("attacksPerMember") ? clanWar.attacksPerMember : 1,
  );

  return (
    <div>
      <div className="mt-4 flex flex-col items-center gap-2 rounded-lg border-2 border-white bg-black/30 p-2">
        <div className="flex gap-4 md:gap-16">
          {myClanStatus}
          {otherClanStatus}
        </div>
        <div className="coc-font-style capitalize">
          <span className="text-red-500">{warState}</span>
        </div>
      </div>
    </div>
  );
};

export default CocWarStatus;

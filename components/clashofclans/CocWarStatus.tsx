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
  attacksPerMember: number
) => {
  return (
    <div className="flex flex-col clash-font-style gap-2">
      <Link href={`/ClashOfClans/clan/${tag.substring(1)}`}>
        <div className="text-yellow-100">{name}</div>
      </Link>
      <div className="flex gap-2 items-center">
        <div className="w-6 h-6 relative md:w-8 md:h-8">
          <Image
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
        <div className="w-6 h-6 relative md:w-8 md:h-8">
          <Image
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
    clanWar.attacksPerMember
  );

  const otherClanStatus = ClanStatus(
    clanWar.opponent.name,
    clanWar.opponent.tag,
    clanWar.teamSize,
    clanWar.opponent.stars,
    clanWar.opponent.attacks,
    clanWar.attacksPerMember
  );

  return (
    <div>
      <div className="flex flex-col items-center gap-2 mt-4 border-2 border-white rounded-lg p-2 bg-black/30">
        <div className="flex gap-4 md:gap-16">
          {myClanStatus}
          {otherClanStatus}
        </div>
        <div className="capitalize coc-font-style">
          <span className="text-red-500">{warState}</span>
        </div>
      </div>
    </div>
  );
};

export default CocWarStatus;

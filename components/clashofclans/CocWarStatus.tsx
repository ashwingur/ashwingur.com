import React from "react";
import { ClanWar } from "../../shared/interfaces/coc.interface";

interface CocWarStatusProps {
  clanWar: ClanWar;
}

const ClanStatus = (
  name: string,
  teamSize: number,
  stars: number,
  attacks: number,
  attacksPerMember: number
) => {
  return (
    <div className="flex flex-col clash-font-style ">
      <div className="text-yellow-100">{name}</div>
      <div>
        {stars}/{3 * teamSize} Stars
      </div>
      <div>
        {attacks}/{attacksPerMember * teamSize}
      </div>
    </div>
  );
};

const CocWarStatus = ({ clanWar }: CocWarStatusProps) => {
  const myClanStatus = ClanStatus(
    clanWar.clan.name,
    clanWar.teamSize,
    clanWar.clan.stars,
    clanWar.clan.attacks,
    clanWar.attacksPerMember
  );

  const otherClanStatus = ClanStatus(
    clanWar.opponent.name,
    clanWar.teamSize,
    clanWar.opponent.stars,
    clanWar.opponent.attacks,
    clanWar.attacksPerMember
  );

  return (
    <div className="flex gap-2">
      {myClanStatus}
      {otherClanStatus}
    </div>
  );
};

export default CocWarStatus;

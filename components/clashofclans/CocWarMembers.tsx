import React from "react";
import { ClanWar, ClanWarMember } from "../../shared/interfaces/coc.interface";
import Image from "next/image";

interface CocWarMembersProps {
  clanWar: ClanWar;
}

interface WarMemberProps {
  member: ClanWarMember;
}

const WarMembersList = (members: ClanWarMember[]) => {
  const memberElements = members
    .sort((a, b) => a.mapPosition - b.mapPosition)
    .map((item, index) => <WarMemberElement key={index} member={item} />);
  return <div className="flex flex-col gap-4">{memberElements}</div>;
};

const WarMemberElement = ({ member }: WarMemberProps) => {
  const blackStar = "/assets/coc/stars/war_black_star.png";
  const silverStar = "/assets/coc/stars/war_silver_star.png";
  return (
    <div className="coc-font-style flex flex-col items-center">
      {member.opponentAttacks > 0 ? (
        <div className="flex items-center h-8">
          <div className="relative w-6 h-6">
            <Image
              src={
                member.opponentAttacks > 0 &&
                member.bestOpponentAttack.stars > 0
                  ? silverStar
                  : blackStar
              }
              alt={`Member stars`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="relative w-6 h-6 mb-4">
            <Image
              src={
                member.opponentAttacks > 0 &&
                member.bestOpponentAttack.stars > 1
                  ? silverStar
                  : blackStar
              }
              alt={`Member stars`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="relative w-6 h-6">
            <Image
              src={
                member.opponentAttacks > 0 &&
                member.bestOpponentAttack.stars > 2
                  ? silverStar
                  : blackStar
              }
              alt={`Member stars`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      ) : (
        <div className="h-8" />
      )}
      <div className="text-stone-300">
        {member.mapPosition}. {member.name}
      </div>
      <div className="relative w-16 h-16 md:w-24 md:h-24">
        <Image
          src={`/assets/coc/townhalls/${member.townhallLevel}.png`}
          alt={`Townhall level ${member.townhallLevel}`}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

const CocWarMembers = ({ clanWar }: CocWarMembersProps) => {
  const alliesList = WarMembersList(clanWar.clan.members);
  const opponentList = WarMembersList(clanWar.opponent.members);
  return (
    <div className="flex gap-4 md:gap-28 lg:gap-48 mb-4">
      <div>{alliesList}</div>
      <div>{opponentList}</div>
    </div>
  );
};

export default CocWarMembers;

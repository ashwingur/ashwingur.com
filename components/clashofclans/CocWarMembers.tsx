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
  return <div>{memberElements}</div>;
};

const WarMemberElement = ({ member }: WarMemberProps) => {
  return (
    <div className="coc-font-style">
      <div className="text-stone-300">
        {member.mapPosition}. {member.name}
      </div>
      <div className="relative w-12 h-12 md:w-16 md:h-16">
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
    <div className="flex">
      <div>{alliesList}</div>
      <div>{opponentList}</div>
    </div>
  );
};

export default CocWarMembers;

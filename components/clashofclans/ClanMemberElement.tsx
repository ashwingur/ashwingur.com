import React from "react";
import { ClanMember } from "../../shared/interfaces/coc.interface";
import Image from "next/image";
import { useRouter } from "next/router";

interface ClanMemberElementProps {
  clanMember: ClanMember;
}

const ClanMemberElement = ({ clanMember }: ClanMemberElementProps) => {
  const router = useRouter();

  const clanMemberClick = () => {
    router.push(`/ClashOfClans/player/${clanMember.tag.substring(1)}`);
  };

  return (
    <div
      className="bg-gray-50 flex my-2 cursor-pointer"
      onClick={clanMemberClick}
    >
      <div className="flex">
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          <Image
            alt={clanMember.league.name}
            src={
              clanMember.league.name === "Unranked"
                ? "/assets/coc/Unranked_League.webp"
                : clanMember.league.iconUrls.medium
            }
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <div>{clanMember.name}</div>
          <div>{mapPlayerRole(clanMember.role)}</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

const mapPlayerRole = (role: string) => {
  switch (role) {
    case "leader":
      return "Leader";
    case "coLeader":
      return "Co-leader";
    case "admin":
      return "Elder";
    case "member":
      return "Member";
  }
  return "";
};

export default ClanMemberElement;

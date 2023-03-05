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
      className="bg-gray-100 flex my-2 cursor-pointer rounded-lg border-gray-800 border-2 hover:py-1 transition-all"
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
        <div className="w-[1px] my-1 mx-2 bg-gray-400"></div>
        <div>
          <div className="text-white font-clash [text-shadow:_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_-1px_2px_black]">
            {clanMember.name}
          </div>

          <div className="text-slate-700 font-coc font-thin">
            {mapPlayerRole(clanMember.role)}
          </div>
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

import React from "react";
import { ClanMember } from "../../shared/interfaces/coc.interface";
import Image from "next/image";
import Link from "next/link";

interface ClanMemberElementProps {
  clanMember: ClanMember;
}

const ClanMemberElement = ({ clanMember }: ClanMemberElementProps) => {
  return (
    <Link
      className="bg-gray-200 dark:bg-gray-400 flex flex-col md:flex-row justify-between my-2 px-2 py-2 md:py-0 cursor-pointer rounded-lg border-gray-800 border-2 hover:bg-gray-300 dark:hover:bg-gray-300 transition-all"
      href={`/ClashOfClans/player/${clanMember.tag.substring(1)}`}
    >
      <div className="flex mx-auto md:mx-0 md:py-1">
        <div className="self-center md:w-6 text-white font-clash [text-shadow:_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_-1px_2px_black]">
          {clanMember.clanRank}.
        </div>
        <div className="w-[1px] my-1 mx-2 md:bg-gray-400" />
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
        <div className="w-[1px] my-1 mx-2 md:bg-gray-400" />
        <div>
          <div className="text-white font-clash [text-shadow:_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_-1px_2px_black]">
            {clanMember.name}
          </div>

          <div className="text-slate-700 font-coc font-thin">
            {mapPlayerRole(clanMember.role)}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center md:flex-row gap-2 md:gap-0">
        <div className="flex flex-col items-center px-8">
          <div className="font-coc font-thin text-slate-700">
            Troops donated:
          </div>
          <div className="font-coc font-thin bg-white dark:bg-slate-800 w-full text-center rounded-md">
            {clanMember.donations}
          </div>
        </div>
        <div className="flex flex-col items-center mx-8">
          <div className="font-coc font-thin text-slate-700">
            Troops received:
          </div>
          <div className="font-coc font-thin bg-white dark:bg-slate-800 w-full text-center rounded-md">
            {clanMember.donationsReceived}
          </div>
        </div>

        <div className="flex items-center border-2 border-white dark:border-gray-300 rounded-md px-4 bg-gradient-to-b from-yellow-100 to-yellow-300 dark:from-yellow-500 dark:to-yellow-700 w-28">
          <div className="mr-2 text-white font-clash [text-shadow:_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_-1px_2px_black]">
            {clanMember.trophies}
          </div>
          <Image
            alt="trophy"
            src={"/assets/coc/cocTrophy.webp"}
            width={24}
            height={24}
          />
        </div>
      </div>
    </Link>
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

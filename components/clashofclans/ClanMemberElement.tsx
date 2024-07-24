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
      className="my-2 flex cursor-pointer flex-col justify-between rounded-lg border-2 border-gray-800 bg-gray-200 px-2 py-2 transition-all hover:bg-gray-300 dark:bg-gray-400 dark:hover:bg-gray-300 md:flex-row md:py-0"
      href={`/ClashOfClans/player/${clanMember.tag.substring(1)}`}
    >
      <div className="mx-auto flex md:mx-0 md:py-1">
        <div className="self-center font-clash text-white [text-shadow:_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_-1px_2px_black] md:w-6">
          {clanMember.clanRank}.
        </div>
        <div className="mx-2 my-1 w-[1px] md:bg-gray-400" />
        <div className="relative h-12 w-12 md:h-16 md:w-16">
          <Image
            unoptimized
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
        <div className="mx-2 my-1 w-[1px] md:bg-gray-400" />
        <div>
          <div className="font-clash text-white [text-shadow:_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_-1px_2px_black]">
            {clanMember.name}
          </div>

          <div className="font-coc font-thin text-slate-700">
            {mapPlayerRole(clanMember.role)}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-0">
        <div className="flex flex-col items-center px-8">
          <div className="font-coc font-thin text-slate-700">
            Troops donated:
          </div>
          <div className="w-full rounded-md bg-white text-center font-coc font-thin dark:bg-slate-800">
            {clanMember.donations}
          </div>
        </div>
        <div className="mx-8 flex flex-col items-center">
          <div className="font-coc font-thin text-slate-700">
            Troops received:
          </div>
          <div className="w-full rounded-md bg-white text-center font-coc font-thin dark:bg-slate-800">
            {clanMember.donationsReceived}
          </div>
        </div>

        <div className="flex w-28 items-center rounded-md border-2 border-white bg-gradient-to-b from-yellow-100 to-yellow-300 px-4 dark:border-gray-300 dark:from-yellow-500 dark:to-yellow-700">
          <div className="mr-2 font-clash text-white [text-shadow:_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_-1px_2px_black]">
            {clanMember.trophies}
          </div>
          <Image
            unoptimized
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

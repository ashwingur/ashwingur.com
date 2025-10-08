import React from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { MemberSchema } from "shared/validations/ClashOfClansSchemas";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import clsx from "clsx";

interface ClanMemberElementProps {
  clanMember: z.infer<typeof MemberSchema>;
}

const ClanMemberElement = ({ clanMember }: ClanMemberElementProps) => {
  const rankChange = clanMember.previousClanRank - clanMember.clanRank;
  return (
    <Link
      className="my-2 flex cursor-pointer flex-col justify-between rounded-lg border-2 border-gray-800 bg-gray-200 px-2 py-2 transition-all hover:bg-gray-300 dark:bg-gray-400 dark:hover:bg-gray-300 md:flex-row md:py-0"
      href={`/ClashOfClans/player/${clanMember.tag.substring(1)}`}
    >
      <div className="mx-auto flex md:mx-0 md:py-1">
        <div className="mx-auto flex items-center justify-between gap-1 self-center text-white md:w-12">
          <p className="font-clash [text-shadow:_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_2px_1px_black,_0_-1px_2px_black]">
            {clanMember.clanRank}.
          </p>
          {rankChange !== 0 && (
            <div
              className={clsx(
                "flex flex-col items-center font-coc text-sm font-thin",
              )}
            >
              <div
                className={clsx(
                  rankChange > 0 ? "text-green-500" : "text-red-500",
                )}
              >
                {clanMember.previousClanRank - clanMember.clanRank > 0 ? (
                  <TbTriangleFilled />
                ) : (
                  <TbTriangleInvertedFilled />
                )}
              </div>
              <p
                className={clsx(
                  rankChange > 0 ? "text-green-700" : "text-red-700",
                )}
              >
                {Math.abs(rankChange)}
              </p>
            </div>
          )}
        </div>
        <div className="mx-2 my-1 w-[1px] md:bg-gray-400" />
        <div className="relative h-12 w-12 md:h-16 md:w-16">
          <Image
            unoptimized
            alt={clanMember.leagueTier?.name ?? "Unranked"}
            src={
              clanMember.leagueTier?.name === "Unranked"
                ? "/assets/coc/Unranked_League.webp"
                : (clanMember.leagueTier?.iconUrls.large ?? "")
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
      <div className="flex flex-col items-center justify-center gap-2 text-xs text-black sm:flex-row md:gap-0 lg:text-base">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <p className="font-coc font-thin text-slate-700">Troops donated:</p>
            <p className="w-full rounded-md bg-white text-center font-coc font-thin dark:bg-slate-800">
              {clanMember.donations}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 md:px-8">
            <p className="font-coc font-thin text-slate-700">
              Troops received:
            </p>
            <p className="w-full rounded-md bg-white text-center font-coc font-thin dark:bg-slate-800">
              {clanMember.donationsReceived}
            </p>
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

import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import CocSmallButton from "./CocSmallButton";
import Link from "next/link";
import {
  WarClanMemberSchema,
  WarSchema,
} from "shared/validations/ClashOfClansSchemas";
import { z } from "zod";

const blackStar = "/assets/coc/stars/war_black_star.png";
const silverStar = "/assets/coc/stars/war_silver_star.png";
const miniBarb = "/assets/coc/miniBarb.png";

type ClanWarMember = z.infer<typeof WarClanMemberSchema>;

interface CocWarMembersProps {
  clanWar: z.input<typeof WarSchema>;
  clanWarLeague: boolean;
}

interface WarMemberProps {
  member: ClanWarMember;
  setSelectedMember: Dispatch<SetStateAction<ClanWarMember | undefined>>;
}

interface MemberPopupProps {
  member: ClanWarMember;
  allMemberList: ClanWarMember[];
  setSelectedMember: Dispatch<SetStateAction<ClanWarMember | undefined>>;
  router: NextRouter;
}

const CocWarMembers = ({ clanWar, clanWarLeague }: CocWarMembersProps) => {
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState<ClanWarMember>();
  const totalAttacks = clanWarLeague ? 1 : 2;

  const WarMemberElement = ({ member, setSelectedMember }: WarMemberProps) => {
    const attacksRemaining = totalAttacks - (member.attacks?.length ?? 0);

    return (
      <div
        className="coc-font-style flex flex-col items-center rounded-md px-2 pb-6 transition-all hover:cursor-pointer hover:bg-black/20"
        onClick={() => setSelectedMember(member)}
      >
        {member.bestOpponentAttack ? (
          <div className="flex h-8 items-center">
            <div className="relative h-6 w-6">
              <Image
                unoptimized
                src={
                  member.bestOpponentAttack.stars > 0 ? silverStar : blackStar
                }
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="relative mb-4 h-6 w-6">
              <Image
                unoptimized
                src={
                  member.bestOpponentAttack.stars > 1 ? silverStar : blackStar
                }
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="relative h-6 w-6">
              <Image
                unoptimized
                src={
                  member.bestOpponentAttack.stars > 2 ? silverStar : blackStar
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
        <div className="text-xs text-stone-300 md:text-sm lg:text-base">
          {member.mapPosition}. {member.name}
        </div>
        <div className="relative h-12 w-12 md:h-20 md:w-20">
          <Image
            unoptimized
            src={`/assets/coc/townhalls/${member.townhallLevel}.webp`}
            alt={`Townhall level ${member.townhallLevel}`}
            width={0}
            height={0}
            className="h-auto w-full"
          />
        </div>
        <div className="mt-1 flex h-8 gap-2 md:h-12">
          {attacksRemaining > 0 && (
            <div className="relative bottom-0 h-4 w-4 md:h-6 md:w-6">
              <Image
                unoptimized
                src={miniBarb}
                width={0}
                height={0}
                className="h-auto w-full"
                alt={"attacks remaining"}
              />
            </div>
          )}
          {attacksRemaining > 1 && (
            <div className="relative bottom-0 h-4 w-4 md:h-6 md:w-6">
              <Image
                unoptimized
                src={miniBarb}
                width={0}
                height={0}
                className="h-auto w-full"
                alt={"attacks remaining"}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const WarMembersList = (
    members: ClanWarMember[],
    setSelectedMember: Dispatch<SetStateAction<ClanWarMember | undefined>>,
  ) => {
    const memberElements = members
      .sort((a, b) => a.mapPosition - b.mapPosition)
      .map((item, index) => (
        <WarMemberElement
          key={index}
          member={item}
          setSelectedMember={setSelectedMember}
        />
      ));
    return <div className="flex flex-col md:gap-2">{memberElements}</div>;
  };

  const MemberPopup = ({
    member,
    allMemberList,
    setSelectedMember,
  }: MemberPopupProps) => {
    const attacksRemaining = totalAttacks - (member.attacks?.length ?? 0);

    const bestAttackMember = allMemberList.find(
      (ally) =>
        member.opponentAttacks > 0 &&
        ally.tag === member.bestOpponentAttack?.attackerTag,
    );

    const attacksDone = (member.attacks ?? []).map((attack, idx) => {
      const target = allMemberList.find(
        (opponent) => opponent.tag == attack.defenderTag,
      );
      return (
        <div key={idx} className="flex flex-col items-center">
          <div className="coc-font-style flex gap-8">
            <p>
              <span>{target?.mapPosition}. </span>
              <span>{target?.name}</span>
            </p>
            <div>{attack.destructionPercentage}%</div>
          </div>
          <div className="flex h-8 items-center">
            <div className="relative h-6 w-6">
              <Image
                unoptimized
                src={attack.stars > 0 ? silverStar : blackStar}
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="relative h-6 w-6">
              <Image
                unoptimized
                src={attack.stars > 1 ? silverStar : blackStar}
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="relative h-6 w-6">
              <Image
                unoptimized
                src={attack.stars > 2 ? silverStar : blackStar}
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="clash-font-style flex flex-col items-center rounded-lg border-2 border-white bg-black/60 p-2">
        <button
          className="absolute right-2 top-2 h-8 w-8 transition-all hover:h-7 hover:w-7"
          onClick={() => setSelectedMember(undefined)}
        >
          <Image
            unoptimized
            src={`/assets/coc/buttons/x.png`}
            alt={`Escape Button`}
            fill
            style={{ objectFit: "contain" }}
          />
        </button>

        <div className="text-red-500">
          {member.mapPosition}. {member.name}
        </div>
        <div className="coc-font-style text-xl">
          <span className="mr-1 text-red-700">Attacks remaining</span>{" "}
          <span className="text-yellow-600">{attacksRemaining}</span>
        </div>
        {attacksDone.length > 0 && (
          <div>
            <p className="text-blue-400">Outgoing attacks:</p>
            {attacksDone}
          </div>
        )}
        <div className="my-2 h-[2px] min-w-full bg-white" />
        {member.bestOpponentAttack && (
          <div>
            <p className="text-blue-400">Best incoming attack:</p>
            <div className="flex flex-col items-center">
              <div className="coc-font-style flex gap-8">
                <p>
                  <span>{bestAttackMember?.mapPosition}. </span>
                  <span>{bestAttackMember?.name}</span>
                </p>
                <div>{member.bestOpponentAttack.destructionPercentage}%</div>
              </div>
              <div className="flex h-8 items-center">
                <div className="relative h-6 w-6">
                  <Image
                    unoptimized
                    src={
                      member.bestOpponentAttack.stars > 0
                        ? silverStar
                        : blackStar
                    }
                    alt={`Member stars`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="relative h-6 w-6">
                  <Image
                    unoptimized
                    src={
                      member.bestOpponentAttack.stars > 1
                        ? silverStar
                        : blackStar
                    }
                    alt={`Member stars`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="relative h-6 w-6">
                  <Image
                    unoptimized
                    src={
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
            </div>
          </div>
        )}
        <div className="flex h-16 items-center">
          <Link href={`/ClashOfClans/player/${member.tag.slice(1)}`}>
            <CocSmallButton
              className="w-36 hover:w-32"
              text={"Profile"}
              innerColour="bg-blue-500"
              middleColour="bg-blue-600"
              outerColour="bg-blue-700"
              onClick={() => {}}
            />
          </Link>
        </div>
      </div>
    );
  };

  const alliesList = WarMembersList(
    clanWar.clan.members || [],
    setSelectedMember,
  );
  const opponentList = WarMembersList(
    clanWar.opponent.members || [],
    setSelectedMember,
  );
  return (
    <div className="mb-4 mt-2 flex gap-4 md:gap-28 lg:gap-48">
      <div>{alliesList}</div>
      <div>{opponentList}</div>
      <div className="fixed bottom-0 left-1/2 mb-4 w-4/5 -translate-x-1/2 md:w-2/3 lg:w-1/2">
        {selectedMember && (
          <MemberPopup
            member={selectedMember}
            allMemberList={(clanWar.clan.members || []).concat(
              clanWar.opponent.members || [],
            )}
            setSelectedMember={setSelectedMember}
            router={router}
          />
        )}
      </div>
    </div>
  );
};

export default CocWarMembers;

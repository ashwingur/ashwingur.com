import React, { Dispatch, SetStateAction, useState } from "react";
import { ClanWar, ClanWarMember } from "../../shared/interfaces/coc.interface";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import CocSmallButton from "./CocSmallButton";
import Link from "next/link";

const blackStar = "/assets/coc/stars/war_black_star.png";
const silverStar = "/assets/coc/stars/war_silver_star.png";
const miniBarb = "/assets/coc/miniBarb.png";

interface CocWarMembersProps {
  clanWar: ClanWar;
  clanWarLeague: boolean;
}

interface WarMemberProps {
  member: ClanWarMember;
  setSelectedMember: Dispatch<SetStateAction<ClanWarMember | undefined>>;
}

interface MemberPopupProps {
  member: ClanWarMember;
  memberList: ClanWarMember[];
  setSelectedMember: Dispatch<SetStateAction<ClanWarMember | undefined>>;
  router: NextRouter;
}

const CocWarMembers = ({ clanWar, clanWarLeague }: CocWarMembersProps) => {
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState<ClanWarMember>();
  const totalAttacks = clanWarLeague ? 1 : 2;

  const WarMemberElement = ({ member, setSelectedMember }: WarMemberProps) => {
    const attacksRemaining = member.hasOwnProperty("attacks")
      ? totalAttacks - member.attacks.length
      : totalAttacks;

    return (
      <div
        className="coc-font-style flex flex-col pb-8 px-2 pt-2 rounded-md items-center hover:cursor-pointer hover:bg-black/20 transition-all"
        onClick={() => setSelectedMember(member)}
      >
        {member.opponentAttacks > 0 ? (
          <div className="flex items-center h-8">
            <div className="relative w-6 h-6">
              <Image
                src={
                  member.bestOpponentAttack.stars > 0 ? silverStar : blackStar
                }
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="relative w-6 h-6 mb-4">
              <Image
                src={
                  member.bestOpponentAttack.stars > 1 ? silverStar : blackStar
                }
                alt={`Member stars`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="relative w-6 h-6">
              <Image
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
        <div className="flex h-8 md:h-12 mt-1">
          {attacksRemaining > 0 && (
            <div className="relative bottom-0 w-8 h-8 md:h-12 md:w-12">
              <Image
                src={miniBarb}
                style={{ objectFit: "contain" }}
                fill
                alt={"attacks remaining"}
              />
            </div>
          )}
          {attacksRemaining > 1 && (
            <div className="relative bottom-0 w-8 h-8 md:h-12 md:w-12">
              <Image
                src={miniBarb}
                style={{ objectFit: "contain" }}
                fill
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
    setSelectedMember: Dispatch<SetStateAction<ClanWarMember | undefined>>
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
    return <div className="flex flex-col gap-4">{memberElements}</div>;
  };

  const MemberPopup = ({
    member,
    memberList: allyList,
    setSelectedMember,
  }: MemberPopupProps) => {
    const attacksRemaining = member.hasOwnProperty("attacks")
      ? totalAttacks - member.attacks.length
      : totalAttacks;

    const bestAttackMember = allyList.find(
      (ally) =>
        member.opponentAttacks > 0 &&
        ally.tag === member.bestOpponentAttack.attackerTag
    );

    return (
      <div className="border-2 border-white rounded-lg p-2 bg-black/60 clash-font-style flex flex-col items-center">
        <button
          className="h-8 w-8 hover:h-7 hover:w-7 transition-all absolute top-2 right-2"
          onClick={() => setSelectedMember(undefined)}
        >
          <Image
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
          <span className="text-red-700 mr-1">Attacks remaining</span>{" "}
          <span className="text-yellow-600">{attacksRemaining}</span>
        </div>
        <div className="h-[2px] bg-white my-1 min-w-full" />
        {member.bestOpponentAttack && (
          <div>
            <div className="text-blue-400">Clan best attack:</div>
            <div className="flex items-center flex-col">
              <div className="coc-font-style flex gap-8">
                <div>
                  <span>{bestAttackMember?.mapPosition}. </span>
                  <span>{bestAttackMember?.name}</span>
                </div>
                <div>{member.bestOpponentAttack.destructionPercentage}%</div>
              </div>
              <div className="flex items-center h-8">
                <div className="relative w-6 h-6">
                  <Image
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
                <div className="relative w-6 h-6">
                  <Image
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
                <div className="relative w-6 h-6">
                  <Image
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
        <div className="h-16 flex items-center">
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

  const alliesList = WarMembersList(clanWar.clan.members, setSelectedMember);
  const opponentList = WarMembersList(
    clanWar.opponent.members,
    setSelectedMember
  );
  return (
    <div className="flex gap-4 md:gap-28 lg:gap-48 mb-4 mt-2">
      <div>{alliesList}</div>
      <div>{opponentList}</div>
      <div className="fixed left-1/2 -translate-x-1/2 bottom-0 mb-4 w-4/5 md:w-2/3 lg:w-1/2">
        {selectedMember && (
          <MemberPopup
            member={selectedMember}
            memberList={clanWar.clan.members.concat(clanWar.opponent.members)}
            setSelectedMember={setSelectedMember}
            router={router}
          />
        )}
      </div>
    </div>
  );
};

export default CocWarMembers;

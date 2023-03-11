import React, { Dispatch, SetStateAction, useState } from "react";
import {
  ClanMember,
  ClanWar,
  ClanWarMember,
} from "../../shared/interfaces/coc.interface";
import Image from "next/image";
import CocButton from "./CocButton";

const blackStar = "/assets/coc/stars/war_black_star.png";
const silverStar = "/assets/coc/stars/war_silver_star.png";

interface CocWarMembersProps {
  clanWar: ClanWar;
}

interface WarMemberProps {
  member: ClanWarMember;
  setSelectedMember: Dispatch<SetStateAction<ClanWarMember | undefined>>;
}

interface OpponentMemberPopupProps {
  member: ClanWarMember;
  allyList: ClanWarMember[];
  setSelectedMember: Dispatch<SetStateAction<ClanWarMember | undefined>>;
}

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

const WarMemberElement = ({ member, setSelectedMember }: WarMemberProps) => {
  return (
    <div
      className="coc-font-style flex flex-col pb-8 px-2 pt-2 items-center hover:cursor-pointer hover:bg-black/20 transition-all"
      onClick={() => setSelectedMember(member)}
    >
      {member.opponentAttacks > 0 ? (
        <div className="flex items-center h-8">
          <div className="relative w-6 h-6">
            <Image
              src={member.bestOpponentAttack.stars > 0 ? silverStar : blackStar}
              alt={`Member stars`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="relative w-6 h-6 mb-4">
            <Image
              src={member.bestOpponentAttack.stars > 1 ? silverStar : blackStar}
              alt={`Member stars`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="relative w-6 h-6">
            <Image
              src={member.bestOpponentAttack.stars > 2 ? silverStar : blackStar}
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

const OpponentMemberPopup = ({
  member,
  allyList,
  setSelectedMember,
}: OpponentMemberPopupProps) => {
  const attacksRemaining = member.hasOwnProperty("attacks")
    ? 2 - member.attacks.length
    : 2;
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
                <span>{member.bestOpponentAttack.order}. </span>
                <span>
                  {
                    allyList.find(
                      (ally) =>
                        ally.tag === member.bestOpponentAttack.attackerTag
                    )?.name
                  }
                </span>
              </div>
              <div>{member.bestOpponentAttack.destructionPercentage}%</div>
            </div>
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
              <div className="relative w-6 h-6">
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
          </div>
        </div>
      )}
    </div>
  );
};

const CocWarMembers = ({ clanWar }: CocWarMembersProps) => {
  const [selectedMember, setSelectedMember] = useState<ClanWarMember>();

  const alliesList = WarMembersList(clanWar.clan.members, setSelectedMember);
  const opponentList = WarMembersList(
    clanWar.opponent.members,
    setSelectedMember
  );
  return (
    <div className="flex gap-4 md:gap-28 lg:gap-48 mb-4">
      <div>{alliesList}</div>
      <div>{opponentList}</div>
      <div className="fixed left-1/2 -translate-x-1/2 bottom-0 mb-4 w-4/5 md:w-2/3 lg:w-1/2">
        {selectedMember && (
          <OpponentMemberPopup
            member={selectedMember}
            allyList={clanWar.clan.members}
            setSelectedMember={setSelectedMember}
          />
        )}
      </div>
    </div>
  );
};

export default CocWarMembers;

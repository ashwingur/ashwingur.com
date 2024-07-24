import React from "react";
import { Clan } from "../../shared/interfaces/coc.interface";
import Image from "next/image";

interface CocClanDetailsProps {
  clan: Clan;
}

const HorizontalBar = () => {
  return (
    <div className="my-1">
      <div className="h-[1px] bg-gray-600" />
      <div className="h-[1px] bg-gray-400" />
    </div>
  );
};

const CocClanDetails = ({ clan }: CocClanDetailsProps) => {
  const type_space = clan.type.replace(/([A-Z])/g, " $1");
  const type_case = type_space.charAt(0).toUpperCase() + type_space.slice(1);

  return (
    <div className="coc-font-style w-72 text-lg md:w-96">
      <div className="flex justify-between">
        <div>Clan War League:</div>
        <div>{clan.warLeague.name}</div>
      </div>
      <HorizontalBar />
      <div className="flex justify-between">
        <div>Total points:</div>
        <div>
          <div className="flex justify-between gap-2">
            {clan.clanPoints}
            <Image
              unoptimized
              alt="trophy"
              src={"/assets/coc/cocTrophy.webp"}
              width={24}
              height={24}
            />
          </div>
          <div className="mt-1 flex justify-between gap-2">
            {clan.clanVersusPoints}
            <Image
              unoptimized
              alt="trophy"
              src={"/assets/coc/versusTrophy.png"}
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      {clan.hasOwnProperty("location") && (
        <div>
          <HorizontalBar />
          <div className="flex justify-between">
            <div>Clan Location:</div>
            <div>{clan.location.name}</div>
          </div>
        </div>
      )}
      <HorizontalBar />
      <div className="flex justify-between">
        <div>Type:</div>
        <div>{type_case}</div>
      </div>
      <HorizontalBar />
      <div className="flex justify-between">
        <div>Required trophies:</div>
        <div>
          <div className="flex justify-between gap-2">
            {clan.requiredTrophies}
            <Image
              unoptimized
              alt="trophy"
              src={"/assets/coc/cocTrophy.webp"}
              width={24}
              height={24}
            />
          </div>
          <div className="mt-1 flex justify-between gap-2">
            {clan.requiredBuilderBaseTrophies}
            <Image
              unoptimized
              alt="trophy"
              src={"/assets/coc/versusTrophy.png"}
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <HorizontalBar />
      <div className="flex justify-between">
        <div>Required Town Hall Level:</div>
        <div>{clan.requiredTownhallLevel}</div>
      </div>
      <HorizontalBar />
      <div className="flex justify-between">
        <div>War Wins:</div>
        <div>{clan.warWins}</div>
      </div>
      <HorizontalBar />
      <div className="flex justify-between">
        <div>War Win Streak:</div>
        <div>{clan.warWinStreak}</div>
      </div>
      <HorizontalBar />
      <div className="flex justify-between">
        <div>Members:</div>
        <div>{clan.members} / 50</div>
      </div>
      <HorizontalBar />
    </div>
  );
};

export default CocClanDetails;

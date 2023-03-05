import React from "react";
import { Clan } from "../../shared/interfaces/coc.interface";
import Image from "next/image";

interface CocClanDetailsProps {
  clan: Clan;
}

const CocClanDetails = ({ clan }: CocClanDetailsProps) => {
  const type_space = clan.type.replace(/([A-Z])/g, " $1");
  const type_case = type_space.charAt(0).toUpperCase() + type_space.slice(1);

  return (
    <div className="coc-font-style text-lg w-72 md:w-96">
      <div className="flex justify-between">
        <div>Clan War League:</div>
        <div>{clan.warLeague.name}</div>
      </div>
      <div className="flex justify-between">
        <div>Total points:</div>
        <div>
          <div className="flex gap-2 justify-between">
            {clan.clanPoints}
            <Image
              alt="trophy"
              src={"/assets/coc/cocTrophy.webp"}
              width={24}
              height={24}
            />
          </div>
          <div className="flex gap-2 justify-between mt-1">
            {clan.clanVersusPoints}
            <Image
              alt="trophy"
              src={"/assets/coc/versusTrophy.png"}
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div>Clan Location:</div>
        <div>{clan.location.name}</div>
      </div>
      <div className="flex justify-between">
        <div>Type:</div>
        <div>{type_case}</div>
      </div>
      <div className="flex justify-between">
        <div>Required trophies:</div>
        <div>
          <div className="flex gap-2 justify-between">
            {clan.requiredTrophies}
            <Image
              alt="trophy"
              src={"/assets/coc/cocTrophy.webp"}
              width={24}
              height={24}
            />
          </div>
          <div className="flex gap-2 justify-between mt-1">
            {clan.requiredVersusTrophies}
            <Image
              alt="trophy"
              src={"/assets/coc/versusTrophy.png"}
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div>Required Town Hall Level:</div>
        <div>{clan.requiredTownhallLevel}</div>
      </div>
    </div>
  );
};

export default CocClanDetails;

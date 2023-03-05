import React from "react";
import { Clan } from "../../shared/interfaces/coc.interface";

interface CocClanDetailsProps {
  clan: Clan;
}

const CocClanDetails = ({ clan }: CocClanDetailsProps) => {
  const type_space = clan.type.replace(/([A-Z])/g, " $1");
  const type_case = type_space.charAt(0).toUpperCase() + type_space.slice(1);

  return (
    <div className="coc-font-style text-lg w-80 md:w-96">
      <div className="flex justify-between">
        <div>Clan War League:</div>
        <div>{clan.warLeague.name}</div>
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
        <div>Required Town Hall Level:</div>
        <div>{clan.requiredTownhallLevel}</div>
      </div>
    </div>
  );
};

export default CocClanDetails;

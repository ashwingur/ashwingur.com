import React from "react";
import { Player } from "../shared/interfaces/coc.interface";

interface CocPlayerSummaryProps {
  player: Player;
}

const CocPlayerSummary = ({ player }: CocPlayerSummaryProps) => {
  return (
    <div>
      <div className="flex items-center gap-4 font-clash text-white [text-shadow:_0_2px_2px_black,_0_2px_2px_black,_0_2px_2px_black,_0_2px_2px_black,_0_2px_2px_black]">
        {player.expLevel}
        <div>
          <div>{player.name}</div>
          <div>{player.tag}</div>
          <div>{player.role}</div>
        </div>
      </div>
    </div>
  );
};

export default CocPlayerSummary;

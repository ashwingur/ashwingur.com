import Image from "next/image";
import React from "react";
import { Clan } from "../../shared/interfaces/coc.interface";

interface CocClanSummaryProps {
  clan: Clan;
}

const CocClanSummary = ({ clan }: CocClanSummaryProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 font-clash clash-font-style">
        <div className="w-20 h-20 md:w-40 md:h-40 relative">
          <Image
            src={clan.badgeUrls.large}
            fill
            style={{ objectFit: "cover" }}
            alt="Badge Url"
          />
        </div>
        <div>
          <div className="text-xl">{clan.name}</div>
          <div className="text-gray-300 font-thin text-sm">{clan.tag}</div>
          <div className="text-sm font-thin font-coc">{clan.description}</div>
        </div>
      </div>
      <div className="flex gap-4">{}</div>
    </div>
  );
};

export default CocClanSummary;

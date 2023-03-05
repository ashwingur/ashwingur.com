import Image from "next/image";
import React from "react";
import { Clan } from "../../shared/interfaces/coc.interface";

interface CocClanSummaryProps {
  clan: Clan;
}

const CocClanSummary = ({ clan }: CocClanSummaryProps) => {
  const labels = clan.labels.map((label, index) => {
    return (
      <div key={index} className="relative w-12 h-12 md:w-16 md:h-16">
        <Image
          key={index}
          alt={label.name}
          src={label.iconUrls.medium}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  });

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
          <div className="text-xl text-yellow-100">{clan.name}</div>
          <div className="font-thin font-coc text-lg">{clan.tag}</div>
          <div className="text-lg font-thin font-coc">{clan.description}</div>
        </div>
      </div>
      <div className="flex gap-4">{labels}</div>
    </div>
  );
};

export default CocClanSummary;

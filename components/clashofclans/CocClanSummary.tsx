import Image from "next/image";
import React from "react";
import { Clan } from "../../shared/interfaces/coc.interface";
import { FullClanSchema } from "shared/validations/ClashOfClansSchemas";
import { z } from "zod";

interface CocClanSummaryProps {
  clan: z.infer<typeof FullClanSchema>;
}

const CocClanSummary = ({ clan }: CocClanSummaryProps) => {
  const labels = clan.labels.map((label, index) => {
    return (
      <div key={index} className="relative h-12 w-12 md:h-16 md:w-16">
        <Image
          unoptimized
          key={index}
          alt={label.name}
          src={label.iconUrls.medium ?? ""}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="clash-font-style flex items-center gap-4 font-clash">
        <div className="relative h-16 w-16 md:h-40 md:w-40">
          <Image
            unoptimized
            src={clan.badgeUrls.large}
            fill
            style={{ objectFit: "cover" }}
            alt="Badge Url"
          />
        </div>
        <div>
          <div className="text-xl text-yellow-100">{clan.name}</div>
          <div className="font-coc text-lg font-thin">{clan.tag}</div>
          <div className="w-48 font-coc text-sm md:text-base lg:text-lg font-thin lg:w-96">
            {clan.description}
          </div>
        </div>
      </div>
      <div className="flex gap-4">{labels}</div>
    </div>
  );
};

export default CocClanSummary;

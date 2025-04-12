import React from "react";
import { Clan, District } from "../../shared/interfaces/coc.interface";
import Image from "next/image";
import { FullClanSchema } from "shared/validations/ClashOfClansSchemas";
import { z } from "zod";

interface ClanCapitalDetailsProps {
  clan: z.output<typeof FullClanSchema>;
}

const HorizontalBar = () => {
  return (
    <div className="my-1">
      <div className="h-[1px] bg-gray-800" />
      <div className="h-[1px] bg-green-600" />
    </div>
  );
};

interface DistrictHallCardProps {
  district: District;
}

const HallLevelCard = ({ district }: DistrictHallCardProps) => {
  return (
    <div className="my-2 flex items-center gap-4 md:my-4">
      <div className="">
        <Image
          unoptimized
          alt={district.name}
          src={
            district.name === "Capital Peak"
              ? `/assets/coc/clancapital/capital-hall-${district.districtHallLevel}.png`
              : `/assets/coc/clancapital/district-hall-${district.districtHallLevel}.png`
          }
          width={0}
          height={0}
          className="w-16 lg:w-20"
        />
      </div>
      <div className="coc-font-style">
        <div className="text-xl">{district.name}</div>
        <div>Level {district.districtHallLevel}</div>
      </div>
    </div>
  );
};

const ClanCapitalDetails = ({ clan }: ClanCapitalDetailsProps) => {
  const districtHalls = clan.clanCapital.districts.map((item, index) => (
    <HallLevelCard district={item} key={index} />
  ));

  return (
    <div className="m-4 rounded-lg border-2 border-black bg-green-900">
      <div className="clash-font-style my-4 text-center text-2xl font-thin">
        Clan Capital
      </div>
      <div className="flex flex-col-reverse items-center justify-around px-4 md:flex-row">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {districtHalls}
        </div>
        <div className="coc-font-style w-72 text-lg md:w-96">
          <div className="flex justify-between">
            <div>Capital League:</div>
            <div>{clan.capitalLeague.name}</div>
          </div>
          <HorizontalBar />
          <div className="flex justify-between">
            <div>Clan Capital Points:</div>
            <div>{clan.clanCapitalPoints}</div>
          </div>
          <HorizontalBar />
        </div>
      </div>
    </div>
  );
};

export default ClanCapitalDetails;

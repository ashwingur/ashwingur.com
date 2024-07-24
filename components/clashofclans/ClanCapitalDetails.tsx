import React from "react";
import { Clan, District } from "../../shared/interfaces/coc.interface";
import Image from "next/image";

interface ClanCapitalDetailsProps {
  clan: Clan;
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
      <div className="relative h-16 w-16 md:h-32 md:w-32">
        <Image
          unoptimized
          alt={district.name}
          src={
            district.name === "Capital Peak"
              ? `/assets/coc/clancapital/capital-hall-${district.districtHallLevel}.png`
              : `/assets/coc/clancapital/district-hall-${district.districtHallLevel}.png`
          }
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="coc-font-style">
        <div className="text-xl md:text-2xl">{district.name}</div>
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
      <div className="clash-font-style my-4 text-center text-3xl">
        Clan Capital
      </div>
      <div className="flex flex-col-reverse items-center justify-around px-4 md:flex-row">
        <div>{districtHalls}</div>
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

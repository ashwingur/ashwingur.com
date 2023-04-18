import React, { useEffect, useState } from "react";
import CocNavBar from "../components/clashofclans/CocNavBar";
import CocButton from "../components/clashofclans/CocButton";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import axios from "axios";

// https://coc.guide/troop for the icons

// My profile: #YLPGLJOV

interface Tags {
  playerTag: string;
  clanTag: string;
}

const theOrganisationTag = "220QP2GGU";

const fetchTheOrganisation = () =>
  axios.get(`/api/clashofclans/clan/220QP2GGU`).then(({ data }) => data);

const ClashOfClans = () => {
  //  Caching TheOrganisation clan since it is more frequently accessed
  useQuery({
    queryKey: ["clan", theOrganisationTag],
    queryFn: () => fetchTheOrganisation(),
  });

  return (
    <div className="bg-gradient-to-b from-[#8c94ac] to-[#6c779b] min-h-screen pb-8">
      <CocNavBar />
      <div className="flex flex-col items-center w-">
        <h2 className="text-center pt-20 clash-font-style font-thin">
          Clash of Clans
        </h2>
        <p className="text-center coc-font-style m-8 md:w-[60%] text-xl md:text-2xl">
          Welcome to the Clash of Clans page. Search any player or clan by their
          tag in the navigation bar. This site uses the official Clash of Clans
          API to provide up to date data. Below are some quick links to my
          profile and clan:
        </p>
        <div className="h-16 flex items-center mb-4">
          <Link href={"/ClashOfClans/player/YLPGLJOV"}>
            <CocButton
              className="w-80 hover:w-72"
              text={"Unknown Virus"}
              innerColour="bg-orange-500"
              middleColour="bg-orange-600"
              outerColour="bg-orange-700"
            />
          </Link>
        </div>
        <div className="h-16 flex items-center mb-4">
          <Link href={"/ClashOfClans/clan/220QP2GGU"}>
            <CocButton
              className="w-80 hover:w-72"
              text={"TheOrganisation"}
              innerColour="bg-green-500"
              middleColour="bg-green-600"
              outerColour="bg-green-700"
            />
          </Link>
        </div>
        <div className="h-16 flex items-center">
          <Link href={"/ClashOfClans/Progress"}>
            <CocButton
              className="w-80 hover:w-72"
              text={"Progress"}
              innerColour="bg-blue-500"
              middleColour="bg-blue-600"
              outerColour="bg-blue-700"
            />
          </Link>
        </div>
      </div>
      <div className="w-72 h-72 md:w-96 md:h-96 relative mx-auto my-8">
        <Image
          src={`/assets/coc/ElectroBarb.png`}
          alt={`Electrobarb`}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default ClashOfClans;

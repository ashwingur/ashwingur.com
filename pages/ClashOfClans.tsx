import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicNavbar from "../components/BasicNavbar";
import { BiHash, BiSearchAlt2 } from "react-icons/bi";
import { Player } from "../shared/interfaces/coc.interface";
import CocPlayerSummary from "../components/clashofclans/CocPlayerSummary";
import CocPlayerClan from "../components/clashofclans/CocPlayerClan";
import CocTrophyDetails from "../components/clashofclans/CocTrophyDetails";
import CocPlayerArmy from "../components/clashofclans/CocPlayerArmy";
import CocPlayerTownHall from "../components/clashofclans/CocPlayerTownHall";
import CocNavBar from "../components/clashofclans/CocNavBar";
import CocButton from "../components/clashofclans/CocButton";
import { useRouter } from "next/router";

// https://coc.guide/troop for the icons

// My profile: #YLPGLJOV
// Cardo: #2JJQU28GR
// Shao: QGG8LL0JJ

interface Tags {
  playerTag: string;
  clanTag: string;
}

const ClashOfClans = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-[#8c94ac] to-[#6c779b] min-h-screen pb-8">
      <CocNavBar />
      <div className="flex flex-col items-center w-">
        <h2 className="text-center pt-20 clash-font-style font-thin">
          Clash of Clans
        </h2>
        <p className="text-center coc-font-style m-8 text-2xl">
          Welcome to the Clash of Clans page. Search any player or clan by their
          tag in the navigation bar. This site uses the official Clash of Clans
          API to provide up to date data. Below are some quick links:
        </p>
        <div className="h-16 flex items-center mb-4">
          <CocButton
            className="w-80 hover:w-72"
            text={"Unknown Virus"}
            innerColour="bg-orange-500"
            middleColour="bg-orange-600"
            outerColour="bg-orange-700"
            onClick={() => {
              router.push(`/ClashOfClans/player/YLPGLJOV`);
            }}
          />
        </div>
        <div className="h-16 flex items-center">
          <CocButton
            className="w-80 hover:w-72"
            text={"TheOrganisation"}
            innerColour="bg-green-500"
            middleColour="bg-green-600"
            outerColour="bg-green-700"
            onClick={() => {
              router.push(`/ClashOfClans/clan/220QP2GGU`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClashOfClans;

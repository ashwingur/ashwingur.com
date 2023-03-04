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

// https://coc.guide/troop for the icons

// My profile: #YLPGLJOV
// Cardo: #2JJQU28GR
// Shao: QGG8LL0JJ

interface Tags {
  playerTag: string;
  clanTag: string;
}

const ClashOfClans = () => {
  const [playerData, setPlayerData] = useState<Player>();

  // The current value of the input fields
  const [inputFieldTags, setInputFieldTags] = useState<Tags>({
    playerTag: "",
    clanTag: "",
  });

  // The current value of the actual tags
  const [tags, setTags] = useState<Tags>({
    playerTag: "",
    clanTag: "",
  });

  const searchForPlayer = (playerTag: string) => {
    axios
      .get(`/api/clashofclans/player/${playerTag}`)
      .then((response) => {
        const player: Player = response.data;
        setPlayerData(player);
      })
      .catch((error) => console.log("Player fetch error: " + error));
  };

  const updateTagInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFieldTags((prevValue: Tags) => {
      return { ...prevValue, [name]: value };
    });
  };

  const setPlayerTag = (value: string) => {
    setTags((prevValue: Tags) => {
      return { ...prevValue, playerTag: value };
    });
    searchForPlayer(value);
  };

  const setClanTag = (value: string) => {
    setTags((prevValue: Tags) => {
      return { ...prevValue, clanTag: value };
    });
  };

  return (
    <div className="bg-gradient-to-b from-[#8c94ac] to-[#6c779b] min-h-screen pb-8">
      <CocNavBar />
      <h2 className="text-center pt-20 clash-font-style font-thin">
        Clash of Clans
      </h2>
    </div>
  );
};

export default ClashOfClans;

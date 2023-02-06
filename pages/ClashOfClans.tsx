import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicNavbar from "../components/BasicNavbar";
import { BiHash, BiSearchAlt2 } from "react-icons/bi";
import { Player } from "../shared/interfaces/coc.interface";
import CocPlayerSummary from "../components/CocPlayerSummary";

// https://coc.guide/troop

// My profile: #YLPGLJOV

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
    console.log("sending player tag " + playerTag);
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
    console.log(inputFieldTags);
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
    <div>
      <BasicNavbar absolute={false} />
      {/* {JSON.stringify(playerData)} */}
      <h2 className="text-center my-2">Clash of Clans</h2>
      {/* Input Fields */}
      <div className="flex justify-center gap-8 my-8">
        <div className="flex items-center">
          <BiHash size={25} />
          <input
            className="border-2 w-60 rounded-sm py-1 px-2"
            placeholder="PLAYER TAG"
            value={inputFieldTags.playerTag}
            onChange={updateTagInput}
            name="playerTag"
          />
          <button
            onClick={() => {
              setPlayerTag(inputFieldTags.playerTag);
            }}
            className="bg-black p-1 rounded-lg ml-2 text-yellow-500 hover:text-red-600 transition-all"
          >
            <BiSearchAlt2 size={30} />
          </button>
        </div>

        <div className="flex items-center">
          <BiHash size={25} />
          <input
            className="border-2 w-60 rounded-sm py-1 px-2"
            placeholder="CLAN TAG"
            value={inputFieldTags.clanTag}
            onChange={updateTagInput}
            name="clanTag"
          />
          <button
            onClick={() => {
              setClanTag(inputFieldTags.playerTag);
            }}
            className="bg-black p-1 rounded-lg ml-2 text-yellow-500 hover:text-red-600 transition-all"
          >
            <BiSearchAlt2 size={30} />
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-b from-blue-100 to-blue-400">
        {playerData && <CocPlayerSummary player={playerData} />}
      </div>
    </div>
  );
};

export default ClashOfClans;

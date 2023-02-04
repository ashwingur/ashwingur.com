import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicNavbar from "../components/BasicNavbar";
// import { Player } from "clashofclans.js";

// My profile: #YLPGLJOV

// Model from the   documentation
interface Player {
  role: string;
  warPreference: string;
  attackWins: number;
  defenseWins: number;
  townHallLevel: number;
  townHallWeaponLevel: number;
  versusBattleWins: number;
  name: string;
}

const ClashOfClans = () => {
  const [playerData, setPlayerData] = useState<Player>();
  useEffect(() => {
    axios
      .get("/api/clashofclans/player")
      .then((response) => {
        setPlayerData(response.data);
      })
      .catch((error) => console.log("Player fetch error: " + error));
  }, []);
  return (
    <div>
      <BasicNavbar absolute={false} />
      {JSON.stringify(playerData?.name)}
    </div>
  );
};

export default ClashOfClans;

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CocNavBar from "../../../../components/clashofclans/CocNavBar";
import CocWarMembers from "../../../../components/clashofclans/CocWarMembers";
import CocWarStatus from "../../../../components/clashofclans/CocWarStatus";
import { ClanWar } from "../../../../shared/interfaces/coc.interface";

const CurrentWar = () => {
  const router = useRouter();
  const { clanTag } = router.query;

  const [clanWar, setClanWar] = useState<ClanWar>();

  useEffect(() => {
    if (typeof clanTag === "string") {
      getCurrentWar(clanTag);
    }
  }, [clanTag]);

  const getCurrentWar = (clanTag: string) => {
    axios
      .get(`/api/clashofclans/clan/${clanTag}/currentwar`)
      .then((response) => {
        const clanWarData: ClanWar = response.data;
        setClanWar(clanWarData);
      })
      .catch((error) => console.log("Clan fetch error: " + error));
  };

  return (
    <div className="bg-gradient-to-b from-[#8c94ac] to-[#6c779b] min-h-screen pb-4">
      <CocNavBar />
      <h2 className="text-center pt-20 clash-font-style font-thin">Clan War</h2>
      {clanWar && (
        <div className="flex flex-col items-center my-4 mx-2 md:mx-4 rounded-lg border-2 border-black bg-gradient-to-b from-[#7d643c] to-[#9f815e]">
          <CocWarStatus clanWar={clanWar} />
          <CocWarMembers clanWar={clanWar} />
        </div>
      )}
    </div>
  );
};

export default CurrentWar;

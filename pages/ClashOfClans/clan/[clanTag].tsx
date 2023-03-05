import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CocClanDetails from "../../../components/clashofclans/CocClanDetails";
import CocClanSummary from "../../../components/clashofclans/CocClanSummary";
import CocNavBar from "../../../components/clashofclans/CocNavBar";
import { Clan } from "../../../shared/interfaces/coc.interface";

// Example clan ID: #220qp2ggu

const ClanPage = () => {
  const router = useRouter();
  const { clanTag } = router.query;

  const [clanData, setClanData] = useState<Clan>();

  useEffect(() => {
    if (typeof clanTag === "string") {
      searchForClan(clanTag);
    }
  }, [clanTag]);

  const searchForClan = (clanTag: string) => {
    axios
      .get(`/api/clashofclans/clan/${clanTag}`)
      .then((response) => {
        const clan: Clan = response.data;
        setClanData(clan);
      })
      .catch((error) => console.log("Clan fetch error: " + error));
  };

  return (
    <div className="bg-gradient-to-b from-[#8c94ac] to-[#6c779b] min-h-screen pb-8">
      <CocNavBar />
      <h2 className="text-center pt-20 clash-font-style font-thin">
        Clan Search
      </h2>

      <div>
        {clanData && (
          <div>
            <div className="flex flex-col md:flex-row md:justify-around items-center">
              <CocClanSummary clan={clanData} />
              <CocClanDetails clan={clanData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClanPage;

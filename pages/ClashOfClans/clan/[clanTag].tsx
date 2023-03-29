import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SpinningCircles } from "react-loading-icons";
import ClanCapitalDetails from "../../../components/clashofclans/ClanCapitalDetails";
import ClanMemberElement from "../../../components/clashofclans/ClanMemberElement";
import CocButton from "../../../components/clashofclans/CocButton";
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

  const clanMembers = clanData?.memberList.map((item, index) => (
    <ClanMemberElement key={index} clanMember={item} />
  ));

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
            <div className="flex flex-col gap-4 md:flex-row md:justify-around items-center bg-[#787b60] mx-4 p-4 mt-4 rounded-lg border-2 border-black">
              <CocClanSummary clan={clanData} />
              <CocClanDetails clan={clanData} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <Link
                href={`/ClashOfClans/clan/${clanTag}/CurrentWar`}
                className="h-16 w-80 flex items-center justify-center"
              >
                <CocButton
                  className="w-80 hover:w-72 mx-auto mt-4"
                  text={"Current War"}
                  innerColour="bg-green-500"
                  middleColour="bg-green-600"
                  outerColour="bg-green-700"
                  onClick={() => {
                    router.push(`/ClashOfClans/clan/${clanTag}/CurrentWar`);
                  }}
                />
              </Link>
              <Link
                href={`/ClashOfClans/clan/${clanTag}/ClanWarLeague`}
                className="h-16 w-80 flex items-center justify-center"
              >
                <CocButton
                  className="w-80 hover:w-72 mx-auto mt-4"
                  text={"Clan War League"}
                  innerColour="bg-green-500"
                  middleColour="bg-green-600"
                  outerColour="bg-green-700"
                  onClick={() => {}}
                />
              </Link>
            </div>
            <ClanCapitalDetails clan={clanData} />
            <div className="mx-4 my-4">{clanMembers}</div>
          </div>
        )}
        {!clanData && <SpinningCircles className="mx-auto mt-8" />}
      </div>
    </div>
  );
};

export default ClanPage;

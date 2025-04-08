import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SpinningCircles } from "react-loading-icons";
import ClanCapitalDetails from "@components/clashofclans/ClanCapitalDetails";
import ClanMemberElement from "@components/clashofclans/ClanMemberElement";
import CocButton from "@components/clashofclans/CocButton";
import CocClanDetails from "@components/clashofclans/CocClanDetails";
import CocClanSummary from "@components/clashofclans/CocClanSummary";
import CocNavBar from "@components/clashofclans/CocNavBar";
import CocLoadingOrError from "@components/clashofclans/CocLoadingOrError";
import { useGetFullClan } from "shared/queries/clashofclans";
import ClanWarLeagueInfo from "@components/clashofclans/ClanWarLeagueInfo";


const title = "Clan";

const ClanPage = () => {
  const router = useRouter();
  const clanTag =
    typeof router.query?.clanTag === "string" ? router.query.clanTag : "";

  const { isLoading, error, data } = useGetFullClan(clanTag);

  if (error instanceof Error)
    return CocLoadingOrError({
      heading: title,
      info: (
        <p className="coc-font-style m-8 text-center text-2xl">
          Unable to fetch clan data: {error.message}
        </p>
      ),
    });

  if (isLoading || data === undefined)
    return CocLoadingOrError({
      heading: title,
      info: <SpinningCircles className="mx-auto mt-8" />,
    });

  const clanMembers = data.memberList.map((item, index) => (
    <ClanMemberElement key={index} clanMember={item} />
  ));

  return (
    <div className="bg-clash min-h-screen pb-8">
      <CocNavBar />
      <h2 className="clash-font-style pt-20 text-center font-thin">{title}</h2>

      <div className="mx-auto xl:w-4/5">
        <div className="mx-4 mt-4 flex flex-col items-center gap-4 rounded-lg border-2 border-black bg-[#787b60] p-4 md:flex-row md:justify-around">
          <CocClanSummary clan={data} />
          <CocClanDetails clan={data} />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link
            href={`/ClashOfClans/clan/${clanTag}/CurrentWar`}
            className="flex h-16 w-80 items-center justify-center"
          >
            <CocButton
              className="mx-auto mt-4 w-80 hover:w-72"
              text={"Current War"}
              innerColour="bg-green-500 dark:bg-green-600"
              middleColour="bg-green-600 dark:bg-green-700"
              outerColour="bg-green-700 dark:bg-green-900"
              onClick={() => {
                router.push(`/ClashOfClans/clan/${clanTag}/CurrentWar`);
              }}
            />
          </Link>
          <Link
            href={`/ClashOfClans/clan/${clanTag}/ClanWarLeague`}
            className="flex h-16 w-80 items-center justify-center"
          >
            <CocButton
              className="mx-auto mt-4 w-80 hover:w-72"
              text={"Clan War League"}
              innerColour="bg-green-500 dark:bg-green-600"
              middleColour="bg-green-600 dark:bg-green-700"
              outerColour="bg-green-700 dark:bg-green-900"
            />
          </Link>
        </div>
        <ClanCapitalDetails clan={data} />
        {data.cwl_war_rounds && (
          <ClanWarLeagueInfo className="m-4" clan={data} />
        )}
        <div className="mx-4 my-4 grid">{clanMembers}</div>
      </div>

      {!data && <SpinningCircles className="mx-auto mt-8" />}
    </div>
  );
};

export default ClanPage;

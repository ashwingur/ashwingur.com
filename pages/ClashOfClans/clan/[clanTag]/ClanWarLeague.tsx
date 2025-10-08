import { useRouter } from "next/router";
import React from "react";
import CocNavBar from "@components/clashofclans/CocNavBar";
import { SpinningCircles } from "react-loading-icons";
import CocLoadingOrError from "@components/clashofclans/CocLoadingOrError";
import { useGetFullClan } from "shared/queries/clashofclans";
import ClanWarLeagueInfo from "@components/clashofclans/ClanWarLeagueInfo";

interface ClanWarLeagueRound {
  warTags: String[];
}

export interface RoundProps {
  round: ClanWarLeagueRound;
  round_number: number;
}

const title = "Clan War League";

const ClanWarLeague = () => {
  const router = useRouter();
  const clanTag =
    typeof router.query?.clanTag === "string"
      ? router.query.clanTag
      : undefined;

  const { isLoading, error, data } = useGetFullClan(clanTag);

  if (error instanceof Error)
    return CocLoadingOrError({
      heading: title,
      info: (
        <p className="coc-font-style m-8 text-center text-2xl">
          Unable to fetch clan war league data: {error.message}
        </p>
      ),
    });

  if (isLoading || data === undefined) return;
  <div className="coc-font-style rounded-lg border-2 border-black bg-gradient-to-b from-[#9f815e] to-[#7d643c]">
    <h3 className="mt-4 text-center text-2xl">Clan War League</h3>
    <SpinningCircles className="mx-auto mt-8" />
  </div>;

  return (
    <div className="bg-clash min-h-screen pb-4">
      <CocNavBar />
      <div className="mx-4 pt-20 xl:mx-auto xl:w-4/5">
        <ClanWarLeagueInfo clan={data} />
      </div>
    </div>
  );
};

export default ClanWarLeague;

import { useRouter } from "next/router";
import React from "react";
import { SpinningCircles } from "react-loading-icons";
import CocNavBar from "../../../../components/clashofclans/CocNavBar";
import CocWarMembers from "../../../../components/clashofclans/CocWarMembers";
import CocWarStatus from "../../../../components/clashofclans/CocWarStatus";
import CocLoadingOrError from "../../../../components/clashofclans/CocLoadingOrError";
import { useGetRegularClanWar } from "shared/queries/clashofclans";

const title = "Clan War";

const CurrentWar = () => {
  const router = useRouter();
  const clanTag =
    typeof router.query?.clanTag === "string" ? router.query.clanTag : "";

  const { isLoading, error, data } = useGetRegularClanWar(clanTag);

  if (error instanceof Error)
    return CocLoadingOrError({
      heading: title,
      info: (
        <p className="coc-font-style m-8 text-center text-2xl">
          Unable to fetch clan war data: {error.message}
        </p>
      ),
    });

  if (isLoading || data === undefined)
    return CocLoadingOrError({
      heading: title,
      info: <SpinningCircles className="mx-auto mt-8" />,
    });

  return (
    <div className="bg-clash min-h-screen pb-4">
      <CocNavBar />
      <h2 className="clash-font-style pt-20 text-center font-thin">{title}</h2>
      {data.state !== "notInWar" && (
        <div className="mx-2 my-4 flex flex-col items-center rounded-lg border-2 border-black bg-gradient-to-b from-[#7d643c] to-[#9f815e] md:mx-4">
          <CocWarStatus clanWar={data} />
          <CocWarMembers clanWar={data} clanWarLeague={false} />
        </div>
      )}
      {data.state === "notInWar" && (
        <p className="coc-font-style m-8 text-center text-2xl">
          Clan is not currently in a war
        </p>
      )}
    </div>
  );
};

export default CurrentWar;

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SpinningCircles } from "react-loading-icons";
import CocNavBar from "../../../../components/clashofclans/CocNavBar";
import CocWarMembers from "../../../../components/clashofclans/CocWarMembers";
import CocWarStatus from "../../../../components/clashofclans/CocWarStatus";
import { ClanWar } from "../../../../shared/interfaces/coc.interface";
import { useQuery } from "react-query";
import CocLoadingOrError from "../../../../components/clashofclans/CocLoadingOrError";

const fetchWar = (clanTag: string) =>
  axios
    .get(`/api/clashofclans/clan/${clanTag}/currentwar`)
    .then(({ data }) => data);

const CurrentWar = () => {
  const router = useRouter();
  const clanTag =
    typeof router.query?.clanTag === "string" ? router.query.clanTag : "";

  const { isLoading, error, data } = useQuery<ClanWar>({
    queryKey: ["player", clanTag],
    queryFn: () => fetchWar(clanTag),
    enabled: router.isReady,
  });

  if (error instanceof Error)
    return CocLoadingOrError({
      heading: "Clan War",
      info: (
        <p className="text-center coc-font-style m-8 text-2xl">
          Unable to fetch clan war league data: {error.message}
        </p>
      ),
    });

  if (isLoading || data === undefined)
    return CocLoadingOrError({
      heading: "Clan War",
      info: <SpinningCircles className="mx-auto mt-8" />,
    });

  return (
    <div className="bg-gradient-to-b from-[#8c94ac] to-[#6c779b] min-h-screen pb-4">
      <CocNavBar />
      <h2 className="text-center pt-20 clash-font-style font-thin">Clan War</h2>
      {data.state !== "notInWar" && (
        <div className="flex flex-col items-center my-4 mx-2 md:mx-4 rounded-lg border-2 border-black bg-gradient-to-b from-[#7d643c] to-[#9f815e]">
          <CocWarStatus clanWar={data} />
          <CocWarMembers clanWar={data} />
        </div>
      )}
      {data.state === "notInWar" && (
        <p className="text-center coc-font-style m-8 text-2xl">
          Clan is currently not in a war
        </p>
      )}
    </div>
  );
};

export default CurrentWar;

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SpinningCircles } from "react-loading-icons";
import CocNavBar from "../../../components/clashofclans/CocNavBar";
import CocWarMembers from "../../../components/clashofclans/CocWarMembers";
import CocWarStatus from "../../../components/clashofclans/CocWarStatus";
import { ClanWar } from "../../../shared/interfaces/coc.interface";
import { useQuery } from "react-query";
import CocLoadingOrError from "../../../components/clashofclans/CocLoadingOrError";

const title = "Clan League War";

const fetchWar = (warTag: string) =>
  axios
    .get(`/api/clashofclans/clanwarleague/${warTag}`)
    .then(({ data }) => data);

const ClanWarComponent = () => {
  const router = useRouter();
  const warTag =
    typeof router.query?.warTag === "string" ? router.query.warTag : "";

  const { isLoading, error, data } = useQuery<ClanWar>({
    queryKey: ["player", warTag],
    queryFn: () => fetchWar(warTag),
    enabled: router.isReady,
  });

  if (error instanceof Error)
    return CocLoadingOrError({
      heading: title,
      info: (
        <p className="coc-font-style m-8 text-center text-2xl">
          Unable to fetch clan war league data: {error.message}
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
          <CocWarMembers clanWar={data} clanWarLeague={true} />
        </div>
      )}
      {data.state === "notInWar" && (
        <p className="coc-font-style m-8 text-center text-2xl">
          Clan is currently not in a war
        </p>
      )}
    </div>
  );
};

export default ClanWarComponent;

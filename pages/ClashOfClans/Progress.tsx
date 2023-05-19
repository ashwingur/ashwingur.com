import React from "react";
import CocNavBar from "../../components/clashofclans/CocNavBar";
import axios from "axios";
import { useQuery } from "react-query";
import { Clan } from "../../shared/interfaces/coc.interface";
import TheOrginization from "../../data/TheOrganization.json";
import { SpinningCircles } from "react-loading-icons";
import CocButton from "../../components/clashofclans/CocButton";
import Link from "next/link";

const title = "Progress Tracker";
const clanTag = "220QP2GGU";

const fetchClan = () =>
  axios.get(`/api/clashofclans/clan/220QP2GGU`).then(({ data }) => data);

const AvailablePlayers = () => {
  const { isLoading, error, data } = useQuery<Clan>({
    queryKey: ["clan", clanTag],
    queryFn: () => fetchClan(),
    // initialData: TheOrginization as Clan,
  });

  if (error instanceof Error) {
    return (
      <p className="text-center coc-font-style m-8 text-2xl">
        Unable to fetch updated clan data: {error.message}
      </p>
    );
  }
  if (isLoading || data === undefined) {
    return <SpinningCircles className="mx-auto mt-8" />;
  }

  const members = data.memberList
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((player, index) => (
      <Link
        key={index}
        href={`/ClashOfClans/Progress/${player.tag.replace("#", "")}`}
        className="flex items-center justify-center h-16"
      >
        <CocButton
          text={player.name}
          className="w-80 hover:w-72"
          innerColour="bg-orange-500 dark:bg-orange-600"
          middleColour="bg-orange-600 dark:bg-orange-700"
          outerColour="bg-orange-700 dark:bg-orange-900"
        />
      </Link>
    ));

  return (
    <div>
      <h2 className="text-center clash-font-style font-thin text-3xl mt-8 mb-4">
        Players
      </h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2 items-center">
        {members}
      </div>
    </div>
  );
};

const Progress = () => {
  return (
    <div className="bg-clash">
      <CocNavBar />
      <div className="flex flex-col items-center">
        <h2 className="text-center pt-20 clash-font-style font-thin">
          {title}
        </h2>
        <p className="text-center coc-font-style mt-8 mx-4 w-3/5 text-xl md:text-2xl">
          Note that this progress tracker only tracks players who are part of
          TheOrganization. It tracks all available information in the Player API
          such as trophies, troop/hero/spell levels and achievements. New data
          is fetched once a day at 00:00.
        </p>

        <AvailablePlayers />
      </div>
    </div>
  );
};

export default Progress;

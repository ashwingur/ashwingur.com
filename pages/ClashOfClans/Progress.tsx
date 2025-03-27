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
      <p className="coc-font-style m-8 text-center text-2xl">
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
        className="flex h-16 items-center justify-center"
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
      <h2 className="clash-font-style mb-4 mt-8 text-center text-3xl font-thin">
        Players
      </h2>
      <div className="grid items-center gap-2 md:grid-cols-3 lg:grid-cols-4">
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
        <h2 className="clash-font-style pt-20 text-center font-thin">
          {title}
        </h2>
        <p className="coc-font-style mx-4 mt-8 w-3/5 text-center text-xl md:text-2xl">
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

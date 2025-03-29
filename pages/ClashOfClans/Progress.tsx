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
      <div
        key={index}
        className="rounded-lg border-2 border-black bg-[#5d6b96]"
      >
        <h3 className="coc-font-style text-center">{player.name}</h3>
        <div className="flex text-sm">
          <Link
            href={`/ClashOfClans/player/${player.tag.replace("#", "")}`}
            className="flex h-16 w-40 items-center justify-center"
          >
            <CocButton
              text="Profile"
              className="w-32 hover:w-28"
              textClassName="text-sm hover:text-xs"
              innerColour="bg-orange-500"
              middleColour="bg-orange-600"
              outerColour="bg-orange-700"
            />
          </Link>
          <Link
            href={`/ClashOfClans/Progress/${player.tag.replace("#", "")}`}
            className="flex h-16 w-40 items-center justify-center"
          >
            <CocButton
              text="Progress"
              className="w-32 hover:w-28"
              textClassName="text-sm hover:text-xs"
              innerColour="bg-blue-500"
              middleColour="bg-blue-600"
              outerColour="bg-blue-700"
            />
          </Link>
        </div>
      </div>
    ));

  return (
    <div>
      <h2 className="clash-font-style mb-4 mt-8 text-center text-3xl font-thin">
        Players
      </h2>
      <div className="grid items-center gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members}
      </div>
    </div>
  );
};

const Progress = () => {
  return (
    <div className="bg-clash">
      <CocNavBar />
      <div className="flex flex-col items-center px-4 md:px-8 lg:px-12">
        <h2 className="clash-font-style pt-20 text-center font-thin">
          {title}
        </h2>
        <p className="coc-font-style mt-8 text-center md:w-4/5 md:text-2xl">
          Note this progress tracker only tracks players who are part of
          TheOrganisation. It tracks all available information in the Player API
          such as trophies, troop/hero/spell/equipment levels and achievements.
          New data is fetched once a day at 00:00.
        </p>

        <AvailablePlayers />
      </div>
    </div>
  );
};

export default Progress;

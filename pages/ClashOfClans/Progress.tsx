import React, { useEffect, useState } from "react";
import CocNavBar from "../../components/clashofclans/CocNavBar";
import { SpinningCircles } from "react-loading-icons";
import { useGetCocPlayers } from "shared/queries/clashofclans";
import {
  CocPlayer,
  useCocPlayerFavourites,
} from "shared/clashofclansfavourites";
import PlayerSelectorCard from "@components/clashofclans/PlayerSelectorCard";
import CocButton from "@components/clashofclans/CocButton";

const title = "Progress Tracker";

interface AvailablePlayersProps {
  inTheOrganisation: boolean;
  recentlyActive: boolean;
}

const AvailablePlayers: React.FC<AvailablePlayersProps> = ({
  inTheOrganisation,
  recentlyActive,
}) => {
  const { isLoading, error, data } = useGetCocPlayers();
  const { favourites, add, remove, isFavourite } = useCocPlayerFavourites();

  const RECENTLY_ACTIVE_DAYS_AGO = 14;

  if (error instanceof Error) {
    return (
      <p className="coc-font-style m-8 text-center text-2xl">
        Unable to fetch clan members: {error.message}
      </p>
    );
  }
  if (isLoading || data === undefined) {
    return <SpinningCircles className="mx-auto mt-8" />;
  }

  const handleToggleFavourite = (player: CocPlayer) => {
    isFavourite(player.tag) ? remove(player.tag) : add(player);
  };

  const sortedPlayers = [...data].sort((a, b) => a.name.localeCompare(b.name));
  const favouritePlayers = sortedPlayers
    .filter((p) => isFavourite(p.tag))
    .sort(
      (a, b) =>
        favourites.findIndex((item) => item.tag === a.tag) -
        favourites.findIndex((item) => item.tag === b.tag),
    );
  const otherPlayers = sortedPlayers.filter((p) => {
    // Apply playerFilters if they are set to true
    if (inTheOrganisation && p.clan_tag !== "#220QP2GGU") {
      return false;
    } else if (
      recentlyActive &&
      !(
        p.activity_change_date &&
        new Date().getTime() - RECENTLY_ACTIVE_DAYS_AGO * 24 * 60 * 60 * 1000 <
          new Date(p.activity_change_date).getTime()
      )
    ) {
      return false;
    } else if (isFavourite(p.tag)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h2 className="clash-font-style mt-4 text-center text-3xl font-thin">
        Players
      </h2>
      {favouritePlayers.length > 0 && (
        <h3 className="clash-font-style mb-2 mt-2 text-center text-xl font-thin">
          Favourites
        </h3>
      )}
      <div className="mb-4 grid items-center gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favouritePlayers.map((player) => (
          <PlayerSelectorCard
            key={player.tag}
            player={player}
            isFavourite={true}
            onToggleFavourite={handleToggleFavourite}
          />
        ))}
      </div>
      <h3 className="clash-font-style mb-2 text-center text-xl font-thin">
        Others
      </h3>
      <div className="grid items-center gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {otherPlayers.map((player) => (
          <PlayerSelectorCard
            key={player.tag}
            player={player}
            isFavourite={false}
            onToggleFavourite={handleToggleFavourite}
          />
        ))}
      </div>
    </div>
  );
};

const Progress = () => {
  const [playerFilter, setPlayerFilter] = useState({
    inTheOrganisation: true,
    recentlyActive: false,
  });
  return (
    <div className="bg-clash">
      <CocNavBar />
      <div className="flex flex-col items-center px-4 md:px-8 lg:px-12">
        <h2 className="clash-font-style pt-20 text-center font-thin">
          {title}
        </h2>
        <p className="coc-font-style mt-8 text-center md:w-4/5 md:text-2xl">
          Members of TheOrganisation are tracked once a day at 12am AEST. It
          tracks general details, army levels and achievements. The gem counter
          is the number of views a profile has received.
        </p>

        <div className="mt-4 flex flex-col items-end md:flex-row">
          <div className="flex h-16 items-center justify-center gap-2">
            <CocButton
              text={playerFilter.inTheOrganisation ? "✔" : "✘"}
              className="w-14"
              textClassName="text-sm"
              innerColour={
                playerFilter.inTheOrganisation ? "bg-green-500" : "bg-red-500"
              }
              middleColour={
                playerFilter.inTheOrganisation ? "bg-green-600" : "bg-red-600"
              }
              outerColour={
                playerFilter.inTheOrganisation ? "bg-green-700" : "bg-red-700"
              }
              onClick={() =>
                setPlayerFilter({
                  ...playerFilter,
                  inTheOrganisation: !playerFilter.inTheOrganisation,
                })
              }
            />
            <p className="coc-font-style w-40">In TheOrganisation</p>
          </div>
          <div className="flex h-16 items-center justify-center gap-2">
            <CocButton
              text={playerFilter.recentlyActive ? "✔" : "✘"}
              className="w-14"
              textClassName="text-sm"
              innerColour={
                playerFilter.recentlyActive ? "bg-green-500" : "bg-red-500"
              }
              middleColour={
                playerFilter.recentlyActive ? "bg-green-600" : "bg-red-600"
              }
              outerColour={
                playerFilter.recentlyActive ? "bg-green-700" : "bg-red-700"
              }
              onClick={() =>
                setPlayerFilter({
                  ...playerFilter,
                  recentlyActive: !playerFilter.recentlyActive,
                })
              }
            />
            <p className="coc-font-style w-40">Recently Active</p>
          </div>
        </div>

        <AvailablePlayers {...playerFilter} />
      </div>
    </div>
  );
};

export default Progress;

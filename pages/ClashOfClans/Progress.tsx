import React, { useEffect } from "react";
import CocNavBar from "../../components/clashofclans/CocNavBar";
import { SpinningCircles } from "react-loading-icons";
import { useGetCocPlayers } from "shared/queries/clashofclans";
import {
  CocPlayer,
  useCocPlayerFavourites,
} from "shared/clashofclansfavourites";
import PlayerSelectorCard from "@components/clashofclans/PlayerSelectorCard";

const title = "Progress Tracker";

const AvailablePlayers = () => {
  const { isLoading, error, data } = useGetCocPlayers();
  const { favourites, add, remove, isFavourite } = useCocPlayerFavourites();

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
  const otherPlayers = sortedPlayers.filter((p) => !isFavourite(p.tag));

  return (
    <div>
      <h2 className="clash-font-style mt-8 text-center text-3xl font-thin">
        Players
      </h2>
      {favouritePlayers.length > 0 && (
        <h3 className="clash-font-style mb-2 mt-4 text-center text-xl font-thin">
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

        <AvailablePlayers />
      </div>
    </div>
  );
};

export default Progress;

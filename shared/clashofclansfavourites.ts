import { z } from "zod";
import { CocPlayerSchema } from "./validations/ClashOfClansSchemas";
import { useEffect, useState } from "react";

// Custom hook for adding, removing and getting favourite players
// The favourites usestate auto-updates with a listener when the API call is made

const FAVOURITES_KEY = "favourite_coc_players";

export type CocPlayer = z.infer<typeof CocPlayerSchema>;

type FavouritesListener = () => void;

const listeners = new Set<FavouritesListener>();

const favouritesEvents = {
  subscribe: (listener: FavouritesListener) => {
    listeners.add(listener);
    return () => listeners.delete(listener); // unsubscribe
  },
  emit: () => {
    listeners.forEach((listener) => listener());
  },
};

const getFavourites = (): CocPlayer[] => {
  const raw = localStorage.getItem(FAVOURITES_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    // Validate using the schema
    const result = z.array(CocPlayerSchema).safeParse(parsed);
    return result.success ? result.data : [];
  } catch {
    return [];
  }
};

const saveFavourites = (players: CocPlayer[]) => {
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(players));
  favouritesEvents.emit();
};

const addFavourite = (player: CocPlayer) => {
  const favourites = getFavourites();
  const exists = favourites.some((p) => p.tag === player.tag);
  if (!exists) {
    favourites.push(player);
    saveFavourites(favourites);
  }
};

export const updateFavourite = (...players: CocPlayer[]) => {
  const favourites = getFavourites();
  let updated = false;

  players.forEach((updatedPlayer) => {
    const index = favourites.findIndex((p) => p.tag === updatedPlayer.tag);
    if (index !== -1) {
      favourites[index] = updatedPlayer;
      updated = true;
    }
  });

  if (updated) {
    saveFavourites(favourites);
  }
};

const removeFavourite = (tag: string) => {
  const favourites = getFavourites().filter((p) => p.tag !== tag);
  saveFavourites(favourites);
};

const isFavourite = (tag: string): boolean => {
  return getFavourites().some((p) => p.tag === tag);
};

export const useCocPlayerFavourites = () => {
  const [favourites, setFavourites] = useState<CocPlayer[]>([]);

  useEffect(() => {
    setFavourites(getFavourites());
    const unsubscribe = favouritesEvents.subscribe(() => {
      setFavourites(getFavourites());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const add = (player: CocPlayer) => {
    addFavourite(player);
    setFavourites(getFavourites());
  };

  const remove = (tag: string) => {
    removeFavourite(tag);
    setFavourites(getFavourites());
  };

  const update = (...players: CocPlayer[]) => {
    updateFavourite(...players);
    setFavourites(getFavourites());
  };

  return { favourites, add, remove, update, isFavourite };
};

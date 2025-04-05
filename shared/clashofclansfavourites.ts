import { z } from "zod";
import { CocPlayerSchema } from "./validations/ClashOfClansSchemas";
import { useEffect, useState } from "react";

const FAVOURITES_KEY = "favourite_coc_players";

export type CocPlayer = z.infer<typeof CocPlayerSchema>;

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
};

const addFavourite = (player: CocPlayer) => {
  const favourites = getFavourites();
  const exists = favourites.some((p) => p.tag === player.tag);
  if (!exists) {
    favourites.push(player);
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
  }, []);

  const add = (player: CocPlayer) => {
    addFavourite(player);
    setFavourites(getFavourites());
  };

  const remove = (tag: string) => {
    removeFavourite(tag);
    setFavourites(getFavourites());
  };

  return { favourites, add, remove, isFavourite };
};

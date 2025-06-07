import {
  ClanCapitalSeasonsSchema,
  CocPlayerDataSchema,
  CocPlayerSchema,
  FullClanSchema,
  GoldPassSchema,
  WarLogSchema,
  WarSchema,
} from "shared/validations/ClashOfClansSchemas";
import { apiFetch, CustomQueryParam } from "./api-fetch";
import { useInfiniteQuery, useQuery } from "react-query";
import { z } from "zod";
import { updateFavourite } from "shared/clashofclansfavourites";

const COC_PLAYER_HISTORY_QUERY_KEY = "coc_player_history";
const GOLD_PASS_QUERY_KEY = "coc_gold_pass";
const INCREMENT_VIEW_COUNT_KEY = "coc_increment_view_count";
const COC_PLAYERS_KEY = "coc_players";
const COC_FULL_CLAN_KEY = "coc_full_clan";
const CAPITAL_RAID_SEASONS_KEY = "capital_raid_seasons";
const REGULAR_WAR_KEY = "clan_war";
const CWL_WAR_KEY = "cwl_war";
const WAR_LOG_KEY = "war_log";

// Helper function to convert the custom date format into ISO 8601 format
export function formatToISO8601(endTime: string): string {
  // Convert "20250401T080000.000Z" to "2025-04-01T08:00:00Z"
  return `${endTime.substring(0, 4)}-${endTime.substring(4, 6)}-${endTime.substring(6, 8)}T${endTime.substring(9, 11)}:${endTime.substring(11, 13)}:${endTime.substring(13, 15)}Z`;
}

export const usePlayerHistory = (tag: string, start: Date, end: Date) => {
  const getPlayerHistory = async (tag: string, start: Date, end: Date) => {
    const queryParams: CustomQueryParam[] = [];
    queryParams.push(
      { key: "start", val: start.toISOString() },
      { key: "end", val: end.toISOString() },
    );
    return await apiFetch({
      endpoint: `/clashofclans/player_data/%23${tag}`,
      responseSchema: CocPlayerDataSchema,
      customParams: queryParams,
    });
  };
  return useQuery({
    queryKey: [COC_PLAYER_HISTORY_QUERY_KEY, tag, start, end],
    queryFn: () => getPlayerHistory(tag, start, end),
    staleTime: 10 * 60 * 1000, // 10 minute
    cacheTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
    enabled: !!tag,
  });
};

export const useGoldPass = () => {
  const getGoldPass = async () => {
    return await apiFetch({
      endpoint: "/clashofclans/goldpass",
      responseSchema: GoldPassSchema,
    });
  };
  return useQuery({
    queryKey: [GOLD_PASS_QUERY_KEY],
    queryFn: getGoldPass,
    staleTime: 10 * 60 * 1000,
    keepPreviousData: true,
    retry: 1,
  });
};

export const useIncrementViewCount = (tag?: string) => {
  const incrementViewCount = async (tag: string) => {
    return await apiFetch({
      endpoint: `/clashofclans/player_data/increment_view_count/%23${tag}`,
      responseSchema: z.object({ success: z.boolean() }),
      options: {
        method: "PATCH",
      },
    });
  };
  return useQuery({
    queryKey: [INCREMENT_VIEW_COUNT_KEY, tag],
    queryFn: () => incrementViewCount(tag!),
    staleTime: 60 * 5100,
    cacheTime: 60 * 5100,
    enabled: !!tag,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetCocPlayers = () => {
  const getCocPlayers = async () => {
    const res = await apiFetch({
      endpoint: "/clashofclans/players",
      responseSchema: z.array(CocPlayerSchema),
    });
    updateFavourite(...res);
    return res;
  };
  return useQuery({
    queryKey: [COC_PLAYERS_KEY],
    queryFn: getCocPlayers,
  });
};

export const useGetCocPlayer = (tag?: string) => {
  const getCocPlayer = async (tag: string) => {
    const res = await apiFetch({
      endpoint: `/clashofclans/players/%23${tag}`,
      responseSchema: CocPlayerSchema,
    });
    updateFavourite(res);
    return res;
  };
  return useQuery({
    queryKey: [COC_PLAYERS_KEY, tag],
    queryFn: () => getCocPlayer(tag!),
    enabled: !!tag,
  });
};

export const useGetFullClan = (tag?: string) => {
  const getFullClan = async (tag: string) => {
    return await apiFetch({
      endpoint: `/clashofclans/fullclan/%23${tag}`,
      responseSchema: FullClanSchema,
    });
  };
  return useQuery({
    queryKey: [COC_FULL_CLAN_KEY, tag],
    queryFn: () => getFullClan(tag!),
    enabled: !!tag,
    retry: 1,
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export const useGetClanWarLog = (tag?: string) => {
  const getClanWarLog = async (tag: string) => {
    return await apiFetch({
      endpoint: `/clashofclans/clan/%23${tag}/warlog`,
      responseSchema: WarLogSchema,
    });
  };
  return useQuery({
    queryKey: [REGULAR_WAR_KEY, tag],
    queryFn: () => getClanWarLog(tag!),
    enabled: !!tag,
    retry: 1,
    staleTime: 120 * 1000,
    cacheTime: 120 * 1000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export const useGetRegularClanWar = (tag?: string) => {
  const getRegularClanWar = async (tag: string) => {
    return await apiFetch({
      endpoint: `/clashofclans/clan/%23${tag}/currentwar`,
      responseSchema: WarSchema,
    });
  };
  return useQuery({
    queryKey: [REGULAR_WAR_KEY, tag],
    queryFn: () => getRegularClanWar(tag!),
    enabled: !!tag,
    retry: 1,
    staleTime: 120 * 1000,
    cacheTime: 120 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useGetCWLClanWar = (warTag?: string) => {
  const getCWLClanWar = async (warTag: string) => {
    return await apiFetch({
      endpoint: `/clashofclans/clanwarleagues/wars/%23${warTag}`,
      responseSchema: WarSchema,
    });
  };
  return useQuery({
    queryKey: [CWL_WAR_KEY, warTag],
    queryFn: () => getCWLClanWar(warTag!),
    enabled: !!warTag,
    retry: 1,
    staleTime: 120 * 1000,
    cacheTime: 120 * 1000,
    refetchOnWindowFocus: false,
  });
};

const getClanCapitalRaidSeasons = async (
  tag: string,
  limit: number,
  after?: string,
) => {
  const queryParams: CustomQueryParam[] = [];
  queryParams.push({ key: "limit", val: limit.toString() });
  if (after) {
    queryParams.push({ key: "after", val: after });
  }
  return await apiFetch({
    endpoint: `/clashofclans/clan/%23${tag}/capitalraidseasons`,
    responseSchema: ClanCapitalSeasonsSchema,
    customParams: queryParams,
  });
};

export const usePaginatedClanCapitalRaidSeasons = (
  limit: number,
  tag?: string,
) => {
  return useInfiniteQuery({
    queryKey: [CAPITAL_RAID_SEASONS_KEY, tag, limit],
    queryFn: ({ pageParam = undefined }) =>
      getClanCapitalRaidSeasons(tag!, limit, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.paging.cursors.after;
    },
    enabled: !!tag,
    staleTime: 300 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

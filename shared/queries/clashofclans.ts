import {
  CocPlayerDataSchema,
  GoldPassSchema,
} from "shared/validations/ClashOfClansSchemas";
import { apiFetch, CustomQueryParam } from "./api-fetch";
import { useQuery } from "react-query";

const COC_PLAYER_HISTORY_QUERY_KEY = "coc_player_history";
const GOLD_PASS_QUERY_KEY = "coc_gold_pass";

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

export const usePlayerHistory = (tag: string, start: Date, end: Date) => {
  return useQuery({
    queryKey: [COC_PLAYER_HISTORY_QUERY_KEY, tag, start, end],
    queryFn: () => getPlayerHistory(tag, start, end),
    staleTime: 10 * 60 * 1000, // 10 minute
    cacheTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
    enabled: !!tag,
  });
};

const getGoldPass = async () => {
  return await apiFetch({
    endpoint: "/clashofclans/goldpass",
    responseSchema: GoldPassSchema,
  });
};

// Helper function to convert the custom date format into ISO 8601 format
export function formatToISO8601(endTime: string): string {
  // Convert "20250401T080000.000Z" to "2025-04-01T08:00:00Z"
  return `${endTime.substring(0, 4)}-${endTime.substring(4, 6)}-${endTime.substring(6, 8)}T${endTime.substring(9, 11)}:${endTime.substring(11, 13)}:${endTime.substring(13, 15)}Z`;
}

export const useGoldPass = () => {
  return useQuery({
    queryKey: [GOLD_PASS_QUERY_KEY],
    queryFn: getGoldPass,
    staleTime: 10 * 60 * 1000,
    keepPreviousData: true,
  });
};

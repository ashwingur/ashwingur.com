import { CocPlayerDataSchema } from "shared/validations/ClashOfClansSchemas";
import { apiFetch, CustomQueryParam } from "./api-fetch";
import { useQuery } from "react-query";

const COC_PLAYER_HISTORY_QUERY_KEY = "coc_player_history";

const getPlayerHistory = async (tag: string, start: Date, end: Date) => {
  const queryParams: CustomQueryParam[] = [];
  queryParams.push(
    { key: "start_time", val: start.toISOString() },
    { key: "end_time", val: end.toISOString() },
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

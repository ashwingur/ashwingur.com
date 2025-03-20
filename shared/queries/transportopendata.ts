import {
  parkingDataSchema,
  parkingLotSchema,
} from "shared/validations/TransportOpenDataSchema";
import { apiFetch, CustomQueryParam } from "./api-fetch";
import { useQuery } from "react-query";
import { z } from "zod";

const LATEST_PARKING_QUERY_KEY = "latest_parking";
const PARKING_HISTORY_QUERY_KEY = "parking_history";

const getLatestParkingData = async () => {
  return await apiFetch({
    endpoint: "/transportopendata",
    responseSchema: z.array(parkingLotSchema),
  });
};

const getParkingHistory = async (
  facilityId: number,
  start: Date,
  end: Date,
) => {
  const queryParams: CustomQueryParam[] = [];
  queryParams.push(
    { key: "start_time", val: start.toISOString() },
    { key: "end_time", val: end.toISOString() },
  );
  return await apiFetch({
    endpoint: `/transportopendata/parking_data/${facilityId}`,
    responseSchema: parkingDataSchema,
    customParams: queryParams,
  });
};

export const useLatestParkingData = () => {
  return useQuery(LATEST_PARKING_QUERY_KEY, getLatestParkingData);
};

export const useParkingHistory = (
  facilityId: number,
  start: Date,
  end: Date,
) => {
  return useQuery({
    queryKey: [PARKING_HISTORY_QUERY_KEY, facilityId, start, end],
    queryFn: () => getParkingHistory(facilityId, start, end),
    staleTime: 60 * 1000, // 1 minute
    cacheTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
    enabled: !!facilityId,
  });
};

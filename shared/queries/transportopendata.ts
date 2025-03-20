import { parkingLotSchema } from "shared/validations/TransportOpenDataSchema";
import { apiFetch } from "./api-fetch";
import { useQuery } from "react-query";
import { z } from "zod";

const LATEST_PARKING_QUERY_KEY = "latest_parking";

const getLatestParkingData = async () => {
  return await apiFetch({
    endpoint: "/transportopendata",
    responseSchema: z.array(parkingLotSchema),
  });
};

export const useLatestParkingData = () => {
  return useQuery(LATEST_PARKING_QUERY_KEY, getLatestParkingData);
};

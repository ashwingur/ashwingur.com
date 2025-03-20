import { z } from "zod";

export const parkingLotSchema = z.object({
  capacity: z.number().min(0),
  facility_id: z.number(),
  name: z.string(),
  occupancy: z.number().min(0),
});

export const parkingDataSchema = z.object({
  capacity: z.number().min(0),
  facility_id: z.number(),
  facility_name: z.string(),
  latest_occupancy: z.number().min(0),
  min_occupancy: z.number().min(0),
  max_occupancy: z.number().min(0),
  historical_data: z.array(
    z.object({
      occupied: z.number().min(0),
      time: z.string(),
    }),
  ),
});

import { z } from "zod";

export const parkingLotSchema = z.object({
  capacity: z.number().min(0),
  facility_id: z.number(),
  name: z.string(),
  occupancy: z.number().min(0),
});

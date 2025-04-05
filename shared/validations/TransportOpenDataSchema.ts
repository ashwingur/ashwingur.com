import { z } from "zod";

export const parkingLotSchema = z.object({
  capacity: z.number().min(0),
  facility_id: z.number(),
  name: z.string(),
  occupancy: z.number().transform((val) => Math.max(0, val)),
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
      occupied: z.number().transform((val) => Math.max(0, val)),
      time: z.string(),
    }),
  ),
});

export const ServiceInfoSchema = z.object({
  current: z.array(
    z.object({
      affected: z.object({
        lines: z.array(
          z.object({
            description: z.string(),
            name: z.string(),
            number: z.string(),
          }),
        ),
      }),
      priority: z.string(),
      timestamps: z.object({
        availability: z.object({
          from: z.string(),
          to: z.string(),
        }),
        expiration: z.string(),
        validity: z.array(
          z.object({
            from: z.string(),
            to: z.string(),
          }),
        ),
      }),
      type: z.string(),
      url: z.string().url(),
      urlText: z.string(),
    }),
  ),
});

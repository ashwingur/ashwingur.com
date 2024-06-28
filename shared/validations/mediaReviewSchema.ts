import { z } from "zod";

export const mediaReviewSchema = z.object({
  id: z.number().min(0).nullable(),
  name: z.string().min(1, "Name is required"),
  review_creation_date: z.string().nullable(),
  review_last_update_date: z.string().nullable(),
  media_type: z.enum(["Movie", "Book", "Show", "Game", "Music"]),
  cover_image: z.string().nullable(),
  rating: z.coerce
    .number()
    .min(0, "Rating cannot be less than 0")
    .max(10, "Rating cannot be more than 10")
    .nullable(),
  review_content: z.string().nullable(),
  word_count: z.coerce
    .number()
    .min(0, "Word count must be 0 or greater")
    .nullable(),
  run_time: z.coerce
    .number()
    .min(0, "Run time must be 0 or greater")
    .nullable(),
  creator: z.string().nullable(),
  media_creation_date: z.string().nullable(),
  consumed_date: z.string().nullable(),
  genres: z.array(z.string().min(1)),
  pros: z.array(z.string().min(1, "There cannot be a blank value")),
  cons: z.array(z.string().min(1, "There cannot be a blank value")),
  visible: z.boolean(),
});

export type MediaReview = z.infer<typeof mediaReviewSchema>;

export const getDefaultMediaReview = (): MediaReview => ({
  id: null,
  name: "",
  review_creation_date: null,
  review_last_update_date: null,
  media_type: "Movie",
  cover_image: null,
  rating: null,
  review_content: null,
  word_count: null,
  run_time: null,
  creator: null,
  media_creation_date: null,
  consumed_date: null,
  genres: [],
  pros: [],
  cons: [],
  visible: true,
});

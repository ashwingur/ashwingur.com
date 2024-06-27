import { z } from "zod";

export const mediaReviewSchema = z.object({
  id: z.number().min(0).nullable(),
  name: z.string().min(1, "Name is required"),
  media_type: z.enum(["Movie", "Book", "Show", "Game", "Music"]),
  cover_image: z.string().nullable(),
  rating: z.coerce
    .number()
    .min(0, "Rating cannot be less than 0")
    .max(10, "Rating cannot be more than 10")
    .nullable(),
  review_content: z.string().nullable(),
  word_count: z.coerce.number().nullable(),
  run_time: z.coerce
    .number()
    .min(0, "Run time must be 0 or greater")
    .nullable(),
  creator: z.string().nullable(),
  media_creation_date: z.string().nullable(),
  date_consumed: z.string().nullable(),
  genres: z.array(z.string()),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  visible: z.boolean(),
});

export const getDefaultMediaReview = () => ({
  name: "",
  media_type: "Movie",
  cover_image: null,
  rating: null,
  review_content: null,
  word_count: null,
  run_time: null,
  creator: null,
  media_creation_date: null,
  date_consumed: null,
  genres: [],
  pros: [],
  cons: [],
  visible: true,
});

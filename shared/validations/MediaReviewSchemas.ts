import { z } from "zod";

export const genreSchema = z.object({
  name: z.string().min(1, "Genre cannot be an empty string"),
});

const dateSchema = z
  .string()
  .nullable()
  .refine((date) => {
    if (date === null) return true;
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    return !isNaN(parsedDate.getTime()) && year >= 1000 && year <= 2100;
  }, "Date must be a valid date between the years 1000 and 2100");

export const subMediaReviewSchema = z.object({
  id: z.number().min(0).nullable(),
  media_review_id: z.number().min(1).nullable(),
  display_index: z.coerce.number().min(0),
  name: z.string().min(1, "Name is required"),
  review_creation_date: z.string().nullable(),
  review_last_update_date: z.string().nullable(),
  cover_image: z.string().nullable(),
  cover_image_bg_colour: z
    .string()
    .nullable()
    .refine((colour) => {
      if (colour === null) return true;
      return /^#[0-9A-Fa-f]{6}$/.test(colour);
    }, "Invalid HEX colour"),
  signed_cover_image: z.string().nullable(),
  local_signed_cover_image: z.string().nullable(),
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
  media_creation_date: dateSchema,
  consumed_date: dateSchema,
  pros: z.array(
    z
      .string()
      .min(1, "There cannot be a blank line")
      .refine(
        (value) => value.trim().length > 0,
        "All lines must have content",
      ),
  ),
  cons: z.array(
    z
      .string()
      .min(1, "There cannot be a blank line")
      .refine(
        (value) => value.trim().length > 0,
        "All lines must have content",
      ),
  ),
  visible: z.boolean(),
});

export const mediaReviewSchema = z.object({
  id: z.number().min(1).nullable(),
  name: z.string().min(1, "Name is required"),
  review_creation_date: z.string().nullable(),
  review_last_update_date: z.string().nullable(),
  media_type: z.enum(["SELECT", "Movie", "Book", "Show", "Game", "Music"]),
  cover_image: z.string().nullable(),
  cover_image_bg_colour: z
    .string()
    .nullable()
    .refine((colour) => {
      if (colour === null) return true;
      return /^#[0-9A-Fa-f]{6}$/.test(colour);
    }, "Invalid HEX colour"),
  signed_cover_image: z.string().nullable(),
  local_signed_cover_image: z.string().nullable(),
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
  media_creation_date: dateSchema,
  consumed_date: dateSchema,
  genres: z.array(genreSchema),
  pros: z.array(
    z
      .string()
      .min(1, "There cannot be a blank line")
      .refine(
        (value) => value.trim().length > 0,
        "All lines must have content",
      ),
  ),
  cons: z.array(
    z
      .string()
      .min(1, "There cannot be a blank line")
      .refine(
        (value) => value.trim().length > 0,
        "All lines must have content",
      ),
  ),
  visible: z.boolean(),
  sub_media_reviews: z.array(subMediaReviewSchema),
});

export const paginatedMediaReviewSchema = z.object({
  media_reviews: z.array(mediaReviewSchema),
  total: z.number(),
  pages: z.number(),
  current_page: z.number(),
  per_page: z.number(),
  has_next: z.boolean(),
});

const ratingBinsSchema = z.object({
  all: z.array(z.number()),
  movie: z.array(z.number()).optional(),
  book: z.array(z.number()).optional(),
  show: z.array(z.number()).optional(),
  game: z.array(z.number()).optional(),
  music: z.array(z.number()).optional(),
});

export const reviewMetaDataSchema = z.object({
  creators: z.array(z.string()),
  genres: z.array(genreSchema),
  review_names: z.array(z.string()),
  rating_bins: ratingBinsSchema,
  rating_bins_with_sub_reviews: ratingBinsSchema,
  total_run_time: z.number(),
  total_word_count: z.number(),
  media_review_count: z.number(),
  sub_media_review_count: z.number(),
});

// Omit fields that arent expected by the API
export const mediaReviewWriteSchema = mediaReviewSchema.omit({
  id: true,
  review_creation_date: true,
  review_last_update_date: true,
  sub_media_reviews: true,
  signed_cover_image: true,
  local_signed_cover_image: true,
});
export const subMediaReviewWriteSchema = subMediaReviewSchema.omit({
  id: true,
  review_creation_date: true,
  review_last_update_date: true,
  signed_cover_image: true,
  local_signed_cover_image: true,
});

export type MediaReview = z.infer<typeof mediaReviewSchema>;
export type SubMediaReview = z.infer<typeof subMediaReviewSchema>;
export type Genre = z.infer<typeof genreSchema>;
export type PaginatedMediaReview = z.infer<typeof paginatedMediaReviewSchema>;

export const defaultMediaReview = (): MediaReview => ({
  id: null,
  name: "",
  review_creation_date: null,
  review_last_update_date: null,
  media_type: "SELECT",
  cover_image: null,
  cover_image_bg_colour: null,
  signed_cover_image: null,
  local_signed_cover_image: null,
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
  sub_media_reviews: [],
});

export const defaultSubMediaReview = (
  media_review_id: number | null,
  display_index: number,
): SubMediaReview => ({
  id: null,
  media_review_id,
  display_index,
  name: "",
  review_creation_date: null,
  review_last_update_date: null,
  cover_image: null,
  cover_image_bg_colour: null,
  signed_cover_image: null,
  local_signed_cover_image: null,
  rating: null,
  review_content: null,
  word_count: null,
  run_time: null,
  media_creation_date: null,
  consumed_date: null,
  pros: [],
  cons: [],
  visible: true,
});

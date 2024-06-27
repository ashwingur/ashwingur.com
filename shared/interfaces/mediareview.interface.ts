export interface MediaReview {
  id: number | null;
  name: string;
  media_type: string;
  cover_image: string | null;
  rating: number | null;
  review_content: string | null;
  word_count: number | null;
  run_time: number | null;
  creator: string | null;
  media_creation_date: string | null;
  date_consumed: string | null;
  genres: string[];
  pros: string[];
  cons: string[];
  visible: boolean;
}

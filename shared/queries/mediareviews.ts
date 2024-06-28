import { useQuery } from "react-query";
import { mediaReviewSchema } from "shared/validations/mediaReviewSchema";
import { z } from "zod";

export const QUERY_KEY = "mediaReviews";

const fetchAllMediaReviews = async () => {
  const apiUrl = new URL(
    `/mediareviews`,
    process.env.NEXT_PUBLIC_ASHWINGUR_API
  ).toString();

  const response = await fetch(apiUrl, {
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  const responseSchema = z.array(mediaReviewSchema);

  const result = responseSchema.safeParse(responseData);

  if (!result.success) {
    throw new Error(`Error ${response.status}: Invalid response format`);
  }

  return result.data;
};

export const useMediaReviews = () => {
  return useQuery(QUERY_KEY, fetchAllMediaReviews);
};

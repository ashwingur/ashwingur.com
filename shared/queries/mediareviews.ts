import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  MediaReview,
  mediaReviewSchema,
  mediaReviewWriteSchema,
} from "shared/validations/MediaReviewSchemas";
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
    console.log(result.error.errors);
    throw new Error(
      `Error ${response.status}: Invalid response format (${JSON.stringify(result.error.errors)})`
    );
  }

  return result.data;
};

const createOrUpdateMediaReview = async (
  data: z.infer<typeof mediaReviewSchema>
) => {
  const errorSchema = z.object({
    error: z.string().optional(),
  });

  const apiUrl = new URL(
    `/mediareviews${data.id ? `/${data.id}` : ""}`,
    process.env.NEXT_PUBLIC_ASHWINGUR_API
  ).toString();

  let response;

  // Omit parameters that are calculated by the backend
  const writeData = mediaReviewWriteSchema.safeParse(data);

  if (!writeData.success) {
    throw new Error(`Error parsing MediaReview`);
  }

  if (data.id) {
    // We are modifying an existing review, so we do PUT
    response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(writeData.data),
    });
  } else {
    // Create a brand new review
    response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(writeData.data),
    });
  }

  let responseData;

  try {
    responseData = await response.json();
  } catch (error) {
    throw new Error(`Error ${response.status}`);
  }

  if (!response.ok) {
    // Try to parse the error message if available
    const result = errorSchema.safeParse(responseData);
    if (result.success && result.data.error) {
      throw new Error(`Error ${response.status}: ${result.data.error}`);
    } else {
      throw new Error(`Error ${response.status}: Unknown error`);
    }
  }

  const result = mediaReviewSchema.safeParse(responseData);

  if (!result.success) {
    throw new Error(`Error ${response.status}: Invalid response format`);
  }

  return result.data;
};

const deleteMediaReview = async (id: number) => {
  const errorSchema = z.object({
    error: z.string().optional(),
  });

  const apiUrl = new URL(
    `/mediareviews/${id}`,
    process.env.NEXT_PUBLIC_ASHWINGUR_API
  ).toString();

  const response = await fetch(apiUrl, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.status === 204) {
    return;
  }

  let responseData;

  try {
    responseData = await response.json();
  } catch (error) {
    throw new Error(`Error ${response.status}`);
  }

  if (!response.ok) {
    const result = errorSchema.safeParse(responseData);
    if (result.success && result.data.error) {
      throw new Error(`Error ${response.status}: ${result.data.error}`);
    } else {
      throw new Error(`Error ${response.status}: Unknown error`);
    }
  }
};

export const useCreateOrUpdateMediaReview = (
  onSuccess: (data: MediaReview) => void
) => {
  return useMutation(createOrUpdateMediaReview, {
    onSuccess: onSuccess,
  });
};

export const useDeleteMediaReview = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => deleteMediaReview(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

export const useMediaReviews = () => {
  return useQuery(QUERY_KEY, fetchAllMediaReviews);
};

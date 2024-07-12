import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  MediaReview,
  PaginatedMediaReview,
  SubMediaReview,
  mediaReviewSchema,
  mediaReviewWriteSchema,
  paginatedMediaReviewSchema,
  reviewMetaDataSchema,
  subMediaReviewSchema,
  subMediaReviewWriteSchema,
} from "shared/validations/MediaReviewSchemas";
import { z } from "zod";
import { apiFetch, CustomQueryParam } from "./api-fetch";
import { FilterObject } from "@components/mediareviews/MediaReviewFilter";
import { useRouter } from "next/router";

export const UPDATE_QUERY_KEY = "mediaReviews";
export const PAGINATED_QUERY_KEY = "paginatedMediaReviews";
export const METADATA_QUERY_KEY = "reviewMetadata";

const getAllMediaReviews = async () => {
  const apiUrl = new URL(
    `/mediareviews`,
    process.env.NEXT_PUBLIC_ASHWINGUR_API
  );

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
    throw new Error(
      `Error ${response.status}: Invalid response format (${JSON.stringify(result.error.errors)})`
    );
  }

  return result.data;
};

const getPaginatedMediaReviews = async ({
  pageParam = 1,
  perPage,
  mediaTypes,
  orderBy,
  genres,
  creators,
  names,
}: {
  pageParam: number;
  perPage: number;
  mediaTypes: string[];
  orderBy: string;
  genres: string[];
  creators: string[];
  names: string[];
}) => {
  // Custom query params for easily mapping string array to the same key
  // eg ?id=1&id=2&id=3
  const customQueryParams: CustomQueryParam[] = [];
  mediaTypes.forEach((m) =>
    customQueryParams.push({ key: "media_types", val: m })
  );
  genres.forEach((g) => customQueryParams.push({ key: "genres", val: g }));
  creators.forEach((c) => customQueryParams.push({ key: "creators", val: c }));
  names.forEach((n) => customQueryParams.push({ key: "names", val: n }));

  return await apiFetch({
    endpoint: "/mediareviews/paginated",
    responseSchema: paginatedMediaReviewSchema,
    options: {
      queryParams: {
        page: pageParam.toString(),
        per_page: perPage.toString(),
        order_by: orderBy,
      },
    },
    customParams: customQueryParams,
  });
};

const getReviewsMetadata = async () => {
  return await apiFetch({
    endpoint: "/mediareviews/metadata",
    responseSchema: reviewMetaDataSchema,
  });
};

const writeMediaReview = async (data: MediaReview) => {
  const errorSchema = z.object({
    error: z.string().optional(),
  });

  const apiUrl = new URL(
    `/mediareviews${data.id ? `/${data.id}` : ""}`,
    process.env.NEXT_PUBLIC_ASHWINGUR_API
  );

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
  );

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

const writeSubMediaReview = async (data: SubMediaReview) => {
  const errorSchema = z.object({
    error: z.string().optional(),
  });

  const apiUrl = new URL(
    `/mediareviews/submediareview${data.id ? `/${data.id}` : ""}`,
    process.env.NEXT_PUBLIC_ASHWINGUR_API
  );

  let response;

  // Omit parameters that are calculated by the backend
  const writeData = subMediaReviewWriteSchema.safeParse(data);

  if (!writeData.success) {
    throw new Error(`Error parsing SubMediaReview`);
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

  const result = subMediaReviewSchema.safeParse(responseData);

  if (!result.success) {
    throw new Error(`Error ${response.status}: Invalid response format`);
  }

  return result.data;
};

const deleteSubMediaReview = async (id: number) => {
  const errorSchema = z.object({
    error: z.string().optional(),
  });

  const apiUrl = new URL(
    `/mediareviews/submediareview/${id}`,
    process.env.NEXT_PUBLIC_ASHWINGUR_API
  );

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

export const useWriteMediaReview = (onSuccess: (data: MediaReview) => void) => {
  return useMutation(writeMediaReview, {
    onSuccess,
  });
};

export const useWriteSubMediaReview = (
  onSuccess: (data: SubMediaReview) => void
) => {
  return useMutation(writeSubMediaReview, {
    onSuccess,
  });
};

export const useDeleteMediaReview = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => deleteMediaReview(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(UPDATE_QUERY_KEY);
      queryClient.invalidateQueries(PAGINATED_QUERY_KEY);
    },
  });
};

export const useDeleteSubMediaReview = (onSuccess?: () => void) => {
  return useMutation((id: number) => deleteSubMediaReview(id), {
    onSuccess,
  });
};

export const useMediaReviews = () => {
  return useQuery(UPDATE_QUERY_KEY, getAllMediaReviews);
};

export const useReviewsMetadata = () => {
  return useQuery(METADATA_QUERY_KEY, getReviewsMetadata, {
    staleTime: 1000000,
  });
};

export const usePaginatedMediaReviews = (
  perPage: number,
  filterObject: FilterObject,
  filterReady: boolean
) => {
  return useInfiniteQuery({
    queryKey: [PAGINATED_QUERY_KEY, perPage, filterObject],
    queryFn: ({ pageParam = 1 }) =>
      getPaginatedMediaReviews({
        pageParam,
        perPage,
        mediaTypes: filterObject.mediaTypes,
        orderBy: filterObject.orderBy,
        genres: filterObject.genres,
        creators: filterObject.creators,
        names: filterObject.names,
      }),
    staleTime: 3600000,
    getNextPageParam: (lastPage) => {
      if (lastPage.has_next) {
        return lastPage.current_page + 1;
      }
      return undefined; // No more pages to fetch
    },
    keepPreviousData: true,
    enabled: filterReady,
  });
};

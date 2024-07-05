import { z, ZodSchema } from "zod";

interface RequestOptions extends RequestInit {
  queryParams?: Record<string, string>;
}

const defaultErrorSchema = z.object({
  error: z.string(),
});

interface ApiFetchParams<T, E> {
  endpoint: string;
  responseSchema: ZodSchema<T>;
  errorSchema?: ZodSchema<E>;
  options?: RequestOptions;
}

export async function apiFetch<T, E>({
  endpoint,
  responseSchema,
  errorSchema,
  options = {},
}: ApiFetchParams<T, E>): Promise<T> {
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_ASHWINGUR_API);

  if (options?.queryParams) {
    Object.keys(options.queryParams).forEach((key) =>
      url.searchParams.append(key, options.queryParams![key])
    );
  }

  const response = await fetch(url.toString(), {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  let responseData;

  try {
    responseData = await response.json();
  } catch (error) {
    throw new Error(`Error ${response.status}`);
  }

  if (!response.ok) {
    const schema =
      errorSchema || (defaultErrorSchema as unknown as ZodSchema<E>);
    const errorResult = schema.safeParse(responseData);
    if (errorResult.success && errorResult.data) {
      throw new Error(
        `Error ${response.status}: ${JSON.stringify(errorResult.data)}`
      );
    } else {
      throw new Error(`Error ${response.status}: Unknown error`);
    }
  }

  try {
    return responseSchema.parse(responseData);
  } catch (e) {
    throw new Error(`Response validation failed: ${JSON.stringify(e)}`);
  }
}

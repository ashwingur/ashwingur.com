import TipTap from "@components/TipTap";
import clsx from "clsx";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  getDefaultMediaReview,
  mediaReviewSchema,
} from "shared/validations/mediaReviewSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiValue } from "react-select";
import GenericMultiSelect from "@components/GenericMultiSelect";
import GenericListbox from "@components/GenericListBox";
import { useMutation } from "react-query";
import { AiOutlineLoading } from "react-icons/ai";

interface CreateOrUpdateReviewFormProps {
  // existingData?: MediaReview;
  className?: string;
}

type Schema = z.infer<typeof mediaReviewSchema>;

const mediaTypes = ["Movie", "Book", "Show", "Game", "Music"];

interface GenreOption {
  value: string;
  label: string;
}

const predefinedGenres: GenreOption[] = [
  { value: "Action", label: "Action" },
  { value: "Adventure", label: "Adventure" },
  { value: "Comedy", label: "Comedy" },
  { value: "Crime", label: "Crime" },
  { value: "Drama", label: "Drama" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Historical", label: "Historical" },
  { value: "Horror", label: "Horror" },
  { value: "Mystery", label: "Mystery" },
  { value: "Romance", label: "Romance" },
  { value: "Science Fiction", label: "Science Fiction" },
  { value: "Thriller", label: "Thriller" },
  { value: "Western", label: "Western" },
  { value: "Animation", label: "Animation" },
  { value: "Biography", label: "Biography" },
  { value: "Documentary", label: "Documentary" },
  { value: "Family", label: "Family" },
  { value: "Musical", label: "Musical" },
  { value: "War", label: "War" },
  { value: "Sports", label: "Sports" },
  { value: "Superhero", label: "Superhero" },
  { value: "Martial Arts", label: "Martial Arts" },
  { value: "Steampunk", label: "Steampunk" },
  { value: "Cyberpunk", label: "Cyberpunk" },
  { value: "Noir", label: "Noir" },
  { value: "Dystopian", label: "Dystopian" },
  { value: "Utopian", label: "Utopian" },
  { value: "Paranormal", label: "Paranormal" },
  { value: "Psychological", label: "Psychological" },
  { value: "Political", label: "Political" },
  { value: "Satire", label: "Satire" },
  { value: "Tragedy", label: "Tragedy" },
  { value: "Spy", label: "Spy" },
  { value: "Apocalyptic", label: "Apocalyptic" },
  { value: "Dystopian", label: "Dystopian" },
  { value: "Bollywood", label: "Bollywood" },
  { value: "RPG", label: "RPG" },
  { value: "ARPG", label: "ARPG" },
  { value: "Simulation", label: "Simulation" },
  { value: "Strategy", label: "Strategy" },
  { value: "Sports", label: "Sports" },
  { value: "Puzzle", label: "Puzzle" },
  { value: "Idle", label: "Idle" },
  { value: "Casual", label: "Casual" },
  { value: "Shooter", label: "Shooter" },
  { value: "Fighting", label: "Fighting" },
  { value: "Racing", label: "Racing" },
  { value: "Stealth", label: "Stealth" },
  { value: "Survival", label: "Survival" },
  { value: "Horror", label: "Horror" },
  { value: "Platformer", label: "Platformer" },
  { value: "Music", label: "Music" },
  { value: "Party", label: "Party" },
  { value: "Board", label: "Board" },
  { value: "Card", label: "Card" },
  { value: "Trivia", label: "Trivia" },
  { value: "Educational", label: "Educational" },
  { value: "Single Player", label: "Single Player" },
  { value: "MMORPG", label: "MMORPG" },
  { value: "MOBA", label: "MOBA" },
  { value: "Sandbox", label: "Sandbox" },
  { value: "Tower Defense", label: "Tower Defense" },
  { value: "Metroidvania", label: "Metroidvania" },
  { value: "Visual Novel", label: "Visual Novel" },
  { value: "Roguelike", label: "Roguelike" },
  { value: "Indie", label: "Indie" },
  { value: "Soundtrack", label: "Soundtrack" },
  { value: "Orchestral", label: "Orchestral" },
];

const submitMediaReview = async (data: z.infer<typeof mediaReviewSchema>) => {
  const errorSchema = z.object({
    error: z.string().optional(),
  });

  const apiUrl = new URL(
    `/mediareviews${data.id ? `/${data.id}` : ""}`,
    process.env.NEXT_PUBLIC_ASHWINGUR_API
  ).toString();

  let response;

  if (data.id) {
    // We are modifying an existing review, so we do PUT
    response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  } else {
    // Create a brand new review
    response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  }

  // const response = await fetch(apiUrl, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  //   body: JSON.stringify(data),
  // });

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

  console.log(result.data);

  return result.data;
};

const CreateOrUpdateReviewForm: React.FC<CreateOrUpdateReviewFormProps> = ({
  // existingData,
  className,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
    getValues,
  } = useForm<Schema>({
    resolver: zodResolver(mediaReviewSchema),
    defaultValues: getDefaultMediaReview(),
  });

  const mutation = useMutation(submitMediaReview, {
    onSuccess: (data) => {
      // Convert media_creation_date to the format yyyy-MM-ddThh:mm
      let media_creation_date: null | Date = null;
      if (data.media_creation_date) {
        media_creation_date = new Date(data.media_creation_date);
      }
      const formattedMediaCreationDate =
        media_creation_date?.toISOString().slice(0, 16) ?? null;

      reset({ ...data, media_creation_date: formattedMediaCreationDate });
    },
  });

  // useEffect(() => {
  //   if (mutation.data) {
  //     reset(mutation.data);
  //   }
  // }, [mutation.data, reset]);

  const onSubmit = (data: Schema) => {
    console.log(`form submitted`);
    console.log(data);

    const parsedMediaCreationDate = data.media_creation_date
      ? new Date(data.media_creation_date).toISOString()
      : null;
    const parsedConsumedDate = data.consumed_date
      ? new Date(data.consumed_date).toISOString()
      : null;

    const transformedData: Schema = {
      ...data,
      media_creation_date: parsedMediaCreationDate,
      consumed_date: parsedConsumedDate,
    };

    mutation.mutate(transformedData);
  };

  let prosErrorMessages: JSX.Element[] = [];
  if (errors.pros) {
    const length = errors.pros.length ?? 0;
    for (let i = 0; i < length ?? 0; i++) {
      if (errors.pros[i]) {
        prosErrorMessages.push(
          <p key={i} className="text-error">
            {errors.pros[i]?.message} (line: {i + 1})
          </p>
        );
      }
    }
  }
  let consErrorMessages: JSX.Element[] = [];
  if (errors.cons) {
    const length = errors.cons.length ?? 0;
    for (let i = 0; i < length ?? 0; i++) {
      if (errors.cons[i]) {
        consErrorMessages.push(
          <p key={i} className="text-error">
            {errors.cons[i]?.message} (line: {i + 1})
          </p>
        );
      }
    }
  }

  const id = getValues().id;

  return (
    <div className={clsx(className, mutation.isLoading ? "animate-pulse" : "")}>
      {id && <h2 className="text-center">ID: {id}</h2>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">Name:</label>
          <input
            className="input w-11/12 md:w-4/5 mx-auto"
            aria-invalid={errors.name !== undefined}
            {...register("name")}
          />
          <p className="text-error">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">Media Type:</label>
          <Controller
            name="media_type"
            control={control}
            render={({ field }) => {
              return (
                <GenericListbox<string>
                  selectedValue={
                    mediaTypes.find((i) => i === field.value) ?? mediaTypes[0]
                  }
                  onSelectedValueChange={(value) => field.onChange(value)}
                  options={mediaTypes}
                  displayValue={(option) => option}
                  className="w-11/12 md:w-4/5 mx-auto"
                  muted={true}
                />
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">Cover Image URL:</label>
          <input
            className="input w-11/12 md:w-4/5 mx-auto"
            {...register("cover_image")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">Rating:</label>
          <input
            className="input w-11/12 md:w-4/5 mx-auto"
            type="number"
            step="0.1"
            {...register("rating")}
            aria-invalid={errors.rating !== undefined}
          />
          <p className="text-error">{errors.rating?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">Review Content:</label>
          <Controller
            name="review_content"
            control={control}
            render={({ field }) => (
              <TipTap
                value={field.value || ""}
                onChange={field.onChange}
                className="w-11/12 md:w-4/5 bg-background-muted mx-auto"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">Word Count:</label>
          <input
            className="input w-11/12 md:w-4/5 mx-auto"
            type="number"
            {...register("word_count")}
          />
        </div>
        <p className="text-error">{errors.word_count?.message}</p>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">
            Run Time (minutes):
          </label>
          <input
            className="input w-11/12 md:w-4/5 mx-auto"
            type="number"
            {...register("run_time")}
            aria-invalid={errors.run_time !== undefined}
          />
          <p className="text-error">{errors.run_time?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">Creator:</label>
          <input
            className="input w-11/12 md:w-4/5 mx-auto"
            {...register("creator")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">
            Media Creation Date:
          </label>
          <input
            className="input w-11/12 md:w-4/5 mx-auto"
            type="datetime-local"
            {...register("media_creation_date")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">Date Consumed:</label>
          <input
            className="input w-11/12 md:w-4/5 mx-auto"
            type="datetime-local"
            {...register("consumed_date")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">Genres:</label>
          <Controller
            name="genres"
            control={control}
            render={({ field }) => {
              // Filter out selected genres from options
              const filteredOptions = predefinedGenres
                .filter(
                  (genre) =>
                    !(field.value || []).some(
                      (selectedGenre: string) => selectedGenre === genre.value
                    )
                )
                .sort((a, b) => a.value.localeCompare(b.value));

              return (
                <GenericMultiSelect<GenreOption>
                  options={filteredOptions}
                  value={(field.value || []).map((genre: string) => ({
                    value: genre,
                    label: genre,
                  }))}
                  onChange={(selectedGenres: MultiValue<GenreOption>) =>
                    field.onChange(selectedGenres.map((genre) => genre.value))
                  }
                  displayKey="label"
                  className="w-11/12 md:w-4/5 border-2 border-text-muted rounded-full mx-auto"
                />
              );
            }}
          />
          <p className="text-error">{errors.genres?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">
            Pros (Each new line is a separator):
          </label>
          <Controller
            name="pros"
            control={control}
            render={({ field }) => (
              <textarea
                className="input w-11/12 md:w-4/5 !rounded-xl mx-auto"
                {...field}
                value={field.value?.join("\n") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value === ""
                      ? []
                      : value.split("\n").map((item) => item.trim())
                  );
                }}
                rows={4} // Adjust the number of rows as needed
              />
            )}
          />
          {prosErrorMessages}
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-11/12 md:w-4/5 mx-auto">Cons:</label>
          <Controller
            name="cons"
            control={control}
            render={({ field }) => (
              <textarea
                className="input w-11/12 md:w-4/5 !rounded-xl mx-auto"
                {...field}
                value={field.value?.join("\n") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value === ""
                      ? []
                      : value.split("\n").map((item) => item.trim())
                  );
                }}
                rows={4} // Adjust the number of rows as needed
              />
            )}
          />
          {consErrorMessages}
        </div>
        <div className="flex items-center gap-2 w-11/12 md:w-4/5 mx-auto">
          <label className="">Visible:</label>
          <input type="checkbox" {...register("visible")} />
        </div>
        <button
          disabled={mutation.isLoading}
          className="btn self-center w-36 flex items-center justify-center h-10"
          type="submit"
        >
          {mutation.isLoading ? (
            <AiOutlineLoading className="animate-spin text-xl" />
          ) : getValues().id ? (
            "Update"
          ) : (
            "Create"
          )}
        </button>
        {mutation.isLoading && "Submitting..."}
        {mutation.isError && mutation.error instanceof Error && (
          <p className="text-lg text-error text-center mt-2">
            {mutation.error.message}
          </p>
        )}

        {mutation.isSuccess && <p className="text-center">Success</p>}
        {/* {mutation.data && JSON.stringify(mutation.data)} */}
      </form>
    </div>
  );
};

export default CreateOrUpdateReviewForm;

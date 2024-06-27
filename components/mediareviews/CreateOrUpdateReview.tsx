import TipTap from "@components/TipTap";
import { MediaReview } from "@interfaces/mediareview.interface";
import clsx from "clsx";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { mediaReviewSchema } from "shared/validations/mediaReviewSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import GenreSelector, { GenreOption } from "./GenreSelector";
import { MultiValue } from "react-select";
import GenericMultiSelector from "@components/GenericSelector";

interface CreateOrUpdateReviewFormProps {
  // existingData?: MediaReview;
  className?: string;
}

type Schema = z.infer<typeof mediaReviewSchema>;

const mediaTypes = ["Movie", "Book", "Show", "Game", "Music"];

const predefinedGenres: GenreOption[] = [
  { value: "Action", label: "Action" },
  { value: "Drama", label: "Drama" },
  { value: "Comedy", label: "Comedy" },
  { value: "Horror", label: "Horror" },
  { value: "Science Fiction", label: "Science Fiction" },
  { value: "Romance", label: "Romance" },
];

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
  } = useForm<Schema>({
    resolver: zodResolver(mediaReviewSchema),
    // defaultValues: defaultValues,
  });

  // console.log(watch());
  // console.log(errors);
  // console.log(errors.name !== undefined);
  const onSubmit = (data: MediaReview) => {
    // Handle form submission, e.g., send data to the server
    console.log(`form submitted`);
    console.log(data);
  };

  return (
    <div className={clsx(className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label>Name:</label>
          <input
            className="input w-11/12 md:w-4/5"
            aria-invalid={errors.name !== undefined}
            {...register("name")}
          />
          <p className="text-error">{errors.name?.message}</p>
        </div>
        <div>
          <label>Media Type:</label>
          <select {...register("media_type")}>
            {mediaTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>Cover Image URL:</label>
          <input
            className="input w-11/12 md:w-4/5"
            {...register("cover_image")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Rating:</label>
          <input
            className="input w-11/12 md:w-4/5"
            type="number"
            step="0.1"
            {...register("rating")}
            aria-invalid={errors.rating !== undefined}
          />
          <p className="text-error">{errors.rating?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label>Review Content:</label>
          <Controller
            name="review_content"
            control={control}
            render={({ field }) => (
              <TipTap
                value={field.value || ""}
                onChange={field.onChange}
                className="w-11/12 md:w-4/5 bg-background-muted"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Word Count:</label>
          <input
            className="input w-11/12 md:w-4/5"
            type="number"
            {...register("word_count")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Run Time (minutes):</label>
          <input
            className="input w-11/12 md:w-4/5"
            type="number"
            {...register("run_time")}
            aria-invalid={errors.run_time !== undefined}
          />
          <p className="text-error">{errors.run_time?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label>Creator:</label>
          <input className="input w-11/12 md:w-4/5" {...register("creator")} />
        </div>
        <div className="flex flex-col gap-1">
          <label>Media Creation Date:</label>
          <input
            className="input w-11/12 md:w-4/5"
            type="datetime-local"
            {...register("media_creation_date")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Date Consumed:</label>
          <input
            className="input w-11/12 md:w-4/5"
            type="datetime-local"
            {...register("date_consumed")}
          />
        </div>
        <div>
          <label>Genres:</label>
          <Controller
            name="genres"
            control={control}
            render={({ field }) => (
              <GenreSelector
                value={(field.value || []).map((genre: string) => ({
                  value: genre,
                  label: genre,
                }))}
                onChange={(selectedGenres: MultiValue<GenreOption>) =>
                  field.onChange(selectedGenres.map((genre) => genre.value))
                }
                className="w-11/12 md:w-4/5 border-2 border-text-muted rounded-full"
              />
            )}
          />
          <p className="text-error">{errors.genres?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label>Pros:</label>
          <Controller
            name="pros"
            control={control}
            render={({ field }) => (
              <input
                className="input w-11/12 md:w-4/5"
                {...field}
                value={field.value?.join(", ") || ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value.split(", ").map((item) => item.trim())
                  )
                }
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Cons:</label>
          <Controller
            name="cons"
            control={control}
            render={({ field }) => (
              <input
                className="input w-11/12 md:w-4/5"
                {...field}
                value={field.value?.join(", ") || ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value.split(", ").map((item) => item.trim())
                  )
                }
              />
            )}
          />
        </div>
        <div className="flex items-center gap-2">
          <label>Visible:</label>
          <input type="checkbox" {...register("visible")} />
        </div>
        <button className="btn self-center w-36" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateOrUpdateReviewForm;

import TipTap from "@components/TipTap";
import { MediaReview } from "@interfaces/mediareview.interface";
import clsx from "clsx";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { mediaReviewSchema } from "shared/validations/mediaReviewSchema";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiValue } from "react-select";
import GenericMultiSelector from "@components/GenericSelector";

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
  { value: "Epic", label: "Epic" },
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
  { value: "Mystery Thriller", label: "Mystery Thriller" },
  { value: "Legal Thriller", label: "Legal Thriller" },
  { value: "Techno Thriller", label: "Techno Thriller" },
  { value: "Romantic Comedy", label: "Romantic Comedy" },
  { value: "Dark Comedy", label: "Dark Comedy" },
  { value: "Space Opera", label: "Space Opera" },
  { value: "Post-Apocalyptic", label: "Post-Apocalyptic" },
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
            render={({ field }) => {
              // Filter out selected genres from options
              const filteredOptions = predefinedGenres.filter(
                (genre) =>
                  !(field.value || []).some(
                    (selectedGenre: string) => selectedGenre === genre.value
                  )
              );

              return (
                <GenericMultiSelector<GenreOption>
                  options={filteredOptions}
                  value={(field.value || []).map((genre: string) => ({
                    value: genre,
                    label: genre,
                  }))}
                  onChange={(selectedGenres: MultiValue<GenreOption>) =>
                    field.onChange(selectedGenres.map((genre) => genre.value))
                  }
                  displayKey="label"
                  className="w-11/12 md:w-4/5 border-2 border-text-muted rounded-full"
                />
              );
            }}
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

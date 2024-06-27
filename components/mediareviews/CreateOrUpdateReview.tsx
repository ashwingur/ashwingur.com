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
import GenericListbox from "@components/GenericListBox";

interface CreateOrUpdateReviewFormProps {
  // existingData?: MediaReview;
  className?: string;
}

type Schema = z.infer<typeof mediaReviewSchema>;

interface MediaType {
  media_type: string;
}

// const mediaTypes: MediaType[] = [
//   { media_type: "Movie" },
//   { media_type: "Book" },
//   { media_type: "Show" },
//   { media_type: "Game" },
//   { media_type: "Music" },
// ];

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
  { value: "MMORPG", label: "MMORPG" },
  { value: "MOBA", label: "MOBA" },
  { value: "Sandbox", label: "Sandbox" },
  { value: "Tower Defense", label: "Tower Defense" },
  { value: "Metroidvania", label: "Metroidvania" },
  { value: "Visual Novel", label: "Visual Novel" },
  { value: "Roguelike", label: "Roguelike" },
  { value: "Indie", label: "Indie" },
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
                  className="w-11/12 md:w-4/5"
                  muted={true}
                />
              );
            }}
          />
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
              const filteredOptions = predefinedGenres
                .filter(
                  (genre) =>
                    !(field.value || []).some(
                      (selectedGenre: string) => selectedGenre === genre.value
                    )
                )
                .sort((a, b) => a.value.localeCompare(b.value));

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

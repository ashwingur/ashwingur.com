import TipTap from "@components/TipTap";
import { MediaReview } from "@interfaces/mediareview.interface";
import clsx from "clsx";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface CreateOrUpdateReviewFormProps {
  existingData?: MediaReview;
  className?: string;
}

const mediaTypes = ["Movie", "Book", "Show", "Game", "Music"];
const availableGenres = [
  "Action",
  "Drama",
  "Comedy",
  "Horror",
  "Science Fiction",
  "Romance",
];

const CreateOrUpdateReviewForm: React.FC<CreateOrUpdateReviewFormProps> = ({
  existingData,
  className,
}) => {
  // Existing data means we want to update something already in the DB
  // Otherwise create a fresh new review
  const defaultValues = existingData ?? {
    id: null,
    name: "",
    media_type: "Book",
    cover_image: "",
    rating: null,
    review_content: null,
    word_count: null,
    run_time: null,
    creator: null,
    media_creation_date: null,
    date_consumed: null,
    genres: [],
    pros: [],
    cons: [],
    visible: true,
  };

  const { control, handleSubmit, register, setValue } = useForm<MediaReview>({
    defaultValues: defaultValues,
  });

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
          <input className="input w-11/12 md:w-4/5" {...register("name")} />
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
          />
        </div>
        <div>
          <label>Review Content:</label>
          <Controller
            name="review_content"
            control={control}
            render={({ field }) => (
              <TipTap
                value={field.value || ""}
                onChange={field.onChange}
                className="w-full"
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
          />
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
              <select {...field} multiple>
                {availableGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            )}
          />
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
        <div>
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

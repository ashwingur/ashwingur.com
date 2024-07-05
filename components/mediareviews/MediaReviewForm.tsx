import TipTap from "@components/TipTap";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  Controller,
  FieldError,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  MediaReview,
  defaultMediaReview,
  mediaReviewSchema,
  Genre,
  defaultSubMediaReview,
} from "shared/validations/MediaReviewSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiValue } from "react-select";
import GenericMultiSelect from "@components/GenericMultiSelect";
import GenericListbox from "@components/GenericListBox";
import { useQueryClient } from "react-query";
import { AiOutlineLoading } from "react-icons/ai";
import { QUERY_KEY, useWriteMediaReview } from "shared/queries/mediareviews";
import RHFInput from "./RHFInput";
import RHFControllerInput from "./RHFControllerInput";
import DateTimePicker from "@components/DateTimePicker";
import SubMediaReviewForm from "./SubMediaReviewForm";
import Image from "next/image";
import ConfirmButton from "@components/ConfirmButton";

interface MediaReviewFormProps {
  existingData?: MediaReview;
  onSubmitSuccess?: () => void;
  onExit?: () => void;
  className?: string;
}

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

const MediaReviewForm: React.FC<MediaReviewFormProps> = ({
  existingData,
  onSubmitSuccess,
  onExit,
  className,
}) => {
  const queryClient = useQueryClient();
  const [baseValues, setBaseValues] = useState(
    existingData ?? defaultMediaReview()
  );

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
    reset,
    getValues,
  } = useForm<MediaReview>({
    resolver: zodResolver(mediaReviewSchema),
    defaultValues: baseValues,
  });

  const onMutationSuccess = (data: MediaReview) => {
    reset({ ...data });
    queryClient.invalidateQueries(QUERY_KEY);
    onSubmitSuccess && onSubmitSuccess();
    setBaseValues(data);
  };

  const [subReviews, setSubReviews] = useState(
    getValues().sub_media_reviews.map((subReview) => ({
      value: subReview,
      isDirty: false,
    }))
  );

  const mutation = useWriteMediaReview(onMutationSuccess);

  const onSubmit = (data: MediaReview) => {
    mutation.mutate(data);
  };

  const onAddSubreview = () => {
    const id = getValues().id;
    const defaultVal = defaultSubMediaReview(id, subReviews.length);
    setSubReviews([...subReviews, { value: defaultVal, isDirty: false }]);
  };

  const media_creation_date = getValues("media_creation_date");
  const defaultMediaCreationDate = media_creation_date
    ? new Date(media_creation_date)
    : undefined;

  const consumed_date = getValues("consumed_date");
  const defaultConsumedDate = consumed_date
    ? new Date(consumed_date)
    : undefined;

  const getDirtyFieldsString = () => {
    const dirtyFieldNames = Object.keys(dirtyFields)
      .filter((field) => dirtyFields[field as keyof MediaReview])
      .map((field) =>
        field
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      ); // Format the keys to look better
    subReviews.forEach((s) => {
      if (s.isDirty) {
        isSomeSubReviewDirty = true;
        if (s.value.id) {
          dirtyFieldNames.push(`Sub Review "${s.value.name}" (${s.value.id})`);
        } else {
          dirtyFieldNames.push("Sub Review (new)");
        }
      }
    });
    return dirtyFieldNames.join(", ");
  };

  const subMediaReviewForms = subReviews
    .sort((a, b) => a.value.display_index - b.value.display_index)
    .map((s, index) => (
      <SubMediaReviewForm
        key={index}
        existingData={s.value}
        onDeleteSuccess={() => {
          setSubReviews(subReviews.filter((a) => a.value.id !== s.value.id));
        }}
        updateDirty={(isDirty: boolean) => {
          setSubReviews(
            subReviews.map((sr) => {
              if (sr.value.id === s.value.id) {
                return { ...sr, isDirty };
              } else {
                return sr;
              }
            })
          );
        }}
      />
    ));

  let isSomeSubReviewDirty = false;
  const dirtyFieldString = getDirtyFieldsString();

  return (
    <div className={clsx(className, mutation.isLoading ? "animate-pulse" : "")}>
      {baseValues.id && (
        <div className="w-full">
          <h2 className="text-center break-words">{baseValues.name}</h2>
          <h3 className="text-center">
            {baseValues.media_type} (ID: {baseValues.id})
          </h3>
        </div>
      )}
      <form
        className="flex flex-col gap-2"
        autoComplete="false"
        id="main-review-form"
      >
        <RHFInput
          label="Name"
          register={register("name")}
          errors={errors.name}
          className="flex flex-col"
          labelClassName="ml-2"
        />
        <RHFControllerInput
          label="Media Type"
          className="flex flex-col"
          labelClassName="ml-2"
        >
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
                  bgClass="bg-background"
                />
              );
            }}
          />
        </RHFControllerInput>
        <RHFInput
          label="Rating"
          register={register("rating")}
          errors={errors.rating}
          className="flex flex-col"
          labelClassName="ml-2"
          inputClassName="max-w-20 input-bg"
          type="number"
        />
        <RHFInput
          label="Cover Image URL"
          register={register("cover_image")}
          errors={errors.cover_image}
          className="flex flex-col"
          labelClassName="ml-2"
        />
        {baseValues.signed_cover_image && (
          <div className="w-full h-72 relative">
            <Image
              src={getValues().signed_cover_image ?? ""}
              alt={"Main review cover image"}
              style={{ objectFit: "contain" }}
              fill
              priority
            />
          </div>
        )}
        <RHFControllerInput label="Review Content" labelClassName="ml-2">
          <Controller
            name="review_content"
            control={control}
            render={({ field }) => (
              <TipTap
                value={field.value || ""}
                onChange={field.onChange}
                className="w-full bg-background border-2"
              />
            )}
          />
        </RHFControllerInput>
        <RHFInput
          label="Word Count"
          register={register("word_count")}
          errors={errors.word_count}
          className="flex flex-col"
          labelClassName="ml-2"
          inputClassName="max-w-40 input-bg"
          type="number"
        />
        <RHFInput
          label="Run Time (minutes)"
          register={register("run_time")}
          errors={errors.run_time}
          className="flex flex-col"
          labelClassName="ml-2"
          inputClassName="max-w-40 input-bg"
          type="number"
          step="0.1"
        />
        <RHFInput
          label="Creator"
          register={register("creator")}
          errors={errors.creator}
          className="flex flex-col"
          labelClassName="ml-2"
        />
        <RHFControllerInput label="Media Creation Date" labelClassName="ml-2">
          <Controller
            control={control}
            name="media_creation_date"
            render={({ field }) => {
              return (
                <DateTimePicker
                  defaultTime={defaultMediaCreationDate}
                  inputClassName="input-bg"
                  dateOnly={true}
                  onDatetimeChange={(datetime) => {
                    if (datetime) {
                      field.onChange(datetime.toISOString());
                    } else {
                      field.onChange(null);
                    }
                  }}
                />
              );
            }}
          />
        </RHFControllerInput>
        <input type="date"></input>
        <RHFControllerInput label="Consumed Date" labelClassName="ml-2">
          <Controller
            control={control}
            name="consumed_date"
            render={({ field }) => {
              return (
                <DateTimePicker
                  defaultTime={defaultConsumedDate}
                  inputClassName="input-bg"
                  onDatetimeChange={(datetime) => {
                    if (datetime) {
                      field.onChange(datetime.toISOString());
                    } else {
                      field.onChange(null);
                    }
                  }}
                />
              );
            }}
          />
        </RHFControllerInput>

        <RHFControllerInput
          label="Genres"
          labelClassName="ml-2"
          // Display the first error that appears
          errors={
            errors.genres &&
            (errors.genres as (FieldError | undefined)[])?.find(
              (e) => e !== undefined
            )
          }
        >
          <Controller
            name="genres"
            control={control}
            render={({ field }) => {
              // Filter out selected genres from options
              const filteredOptions = predefinedGenres
                .filter(
                  (genre) =>
                    !(field.value || []).some(
                      (selectedGenre: Genre) =>
                        selectedGenre.name === genre.value
                    )
                )
                .sort((a, b) => a.value.localeCompare(b.value));

              return (
                <GenericMultiSelect<GenreOption>
                  options={filteredOptions}
                  value={(field.value || []).map((genre: Genre) => ({
                    value: genre.name,
                    label: genre.name,
                  }))}
                  onChange={(selectedGenres: MultiValue<GenreOption>) =>
                    field.onChange(
                      selectedGenres.map((genre) => ({ name: genre.value }))
                    )
                  }
                  displayKey="label"
                  className="border-2 border-text-muted rounded-full"
                  bgClass="bg-background"
                />
              );
            }}
          />
        </RHFControllerInput>

        <RHFControllerInput
          label="Pros (each new line is a separator)"
          labelClassName="ml-2"
          errors={
            errors.pros &&
            (errors.pros as (FieldError | undefined)[])?.find(
              (e) => e !== undefined
            )
          }
        >
          <Controller
            name="pros"
            control={control}
            render={({ field }) => (
              <textarea
                className="input-bg !rounded-2xl w-full min-h-20"
                {...field}
                value={field.value?.join("\n")}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value === "" ? [] : value.split("\n").map((item) => item)
                  );
                }}
                aria-invalid={errors.pros !== undefined}
                rows={getValues().pros.length ?? 3}
              />
            )}
          />
        </RHFControllerInput>

        <RHFControllerInput
          label="Cons (each new line is a separator)"
          labelClassName="ml-2"
          errors={
            errors.cons &&
            (errors.cons as (FieldError | undefined)[])?.find(
              (e) => e !== undefined
            )
          }
        >
          <Controller
            name="cons"
            control={control}
            render={({ field }) => (
              <textarea
                className="input-bg !rounded-2xl w-full min-h-20"
                {...field}
                value={field.value?.join("\n") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value === "" ? [] : value.split("\n").map((item) => item)
                  );
                }}
                aria-invalid={errors.cons !== undefined}
                rows={getValues().pros.length ?? 3}
              />
            )}
          />
        </RHFControllerInput>
        <RHFInput
          label="Visible"
          register={register("visible")}
          errors={errors.visible}
          type="checkbox"
          className="flex ml-2 gap-2"
        />
      </form>
      <div>
        {mutation.isError && mutation.error instanceof Error && (
          <p className="text-lg text-error text-center mb-2">
            {mutation.error.message}
          </p>
        )}
      </div>
      {subMediaReviewForms.length > 0 && (
        <div className="flex flex-col gap-8 my-4">{subMediaReviewForms}</div>
      )}
      <div className="flex flex-col items-center gap-2">
        {getValues().id && (
          <button
            disabled={mutation.isLoading}
            className="btn-secondary w-44 h-10"
            onClick={onAddSubreview}
          >
            Add Subreview
          </button>
        )}
        {dirtyFieldString && (
          <p className="text-error text-center">
            You have unsaved changes: {dirtyFieldString}
          </p>
        )}
        {!isSomeSubReviewDirty && dirtyFieldString && (
          <button
            disabled={mutation.isLoading || isSomeSubReviewDirty}
            className="btn self-center w-44 h-10"
            form="main-review-form"
            onClick={handleSubmit(onSubmit)}
          >
            {mutation.isLoading ? (
              <AiOutlineLoading className="animate-spin text-xl" />
            ) : getValues().id ? (
              "Update"
            ) : (
              "Create"
            )}
          </button>
        )}
        {dirtyFieldString && (
          <ConfirmButton
            content="Discard"
            className="w-44 flex gap-2 justify-center"
            mainBtnClassName="btn h-10"
            confirmBtnClassName="btn h-10"
            onConfirmClick={() => {
              onExit && onExit();
            }}
            confirmDelay={1000}
          />
        )}
        {!dirtyFieldString && (
          <button
            disabled={mutation.isLoading}
            className="btn w-44 h-10"
            onClick={() => {
              onExit && onExit();
            }}
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaReviewForm;

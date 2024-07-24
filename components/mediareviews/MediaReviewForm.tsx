import TipTap from "@components/TipTap";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Controller, FieldError, useForm } from "react-hook-form";
import {
  MediaReview,
  defaultMediaReview,
  mediaReviewSchema,
  Genre,
  defaultSubMediaReview,
} from "shared/validations/MediaReviewSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiValue } from "react-select";
import GenericListbox from "@components/GenericListBox";
import { useQueryClient } from "react-query";
import { AiOutlineLoading } from "react-icons/ai";
import {
  PAGINATED_QUERY_KEY,
  UPDATE_QUERY_KEY,
  useWriteMediaReview,
} from "shared/queries/mediareviews";
import RHFInput from "./RHFInput";
import RHFControllerInput from "./RHFControllerInput";
import DateTimePicker from "@components/DateTimePicker";
import SubMediaReviewForm from "./SubMediaReviewForm";
import ConfirmButton from "@components/ConfirmButton";
import GenericMultiSelectGroup from "@components/GenericMultiSelectGroup";
import groupedGenreOptions, { OptionType } from "shared/mediareview-genres";
import FixedImageContainer from "./FixedImageContainer";
import { useRouter } from "next/router";

interface MediaReviewFormProps {
  existingData?: MediaReview;
  onSubmitSuccess?: () => void;
  onExit?: () => void;
  className?: string;
}

const mediaTypes = ["SELECT", "Movie", "Book", "Show", "Game", "Music"];

const MediaReviewForm: React.FC<MediaReviewFormProps> = ({
  existingData,
  onSubmitSuccess,
  onExit,
  className,
}) => {
  const queryClient = useQueryClient();
  const [baseValues, setBaseValues] = useState(
    existingData ?? defaultMediaReview(),
  );
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
    reset,
    getValues,
    setError,
  } = useForm<MediaReview>({
    resolver: zodResolver(mediaReviewSchema),
    defaultValues: baseValues,
  });

  const onMutationSuccess = (data: MediaReview) => {
    reset({ ...data });
    queryClient.invalidateQueries(UPDATE_QUERY_KEY);
    queryClient.invalidateQueries(PAGINATED_QUERY_KEY);
    onSubmitSuccess && onSubmitSuccess();
    setBaseValues(data);
    router.push({ pathname: router.pathname, query: { id: data.id } });
  };

  const [subReviews, setSubReviews] = useState(
    getValues()
      .sub_media_reviews.sort((a, b) => a.display_index - b.display_index)
      .map((subReview) => ({
        value: subReview,
        isDirty: false,
      })),
  );

  const mutation = useWriteMediaReview(onMutationSuccess);

  const onSubmit = (data: MediaReview) => {
    if (data.media_type === "SELECT") {
      setError("media_type", {
        type: "required",
        message: "Select a valid media type",
      });
      mediaTypeRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (data.review_content === "<p></p>") {
      data.review_content = null;
    }
    mutation.mutate(data);
  };

  const onAddSubreview = () => {
    const id = getValues().id;
    const defaultVal = defaultSubMediaReview(id, subReviews.length);
    setSubReviews([...subReviews, { value: defaultVal, isDirty: false }]);
  };

  const mediaTypeRef = useRef<HTMLDivElement | null>(null);

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
          .join(" "),
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
        key={`${s.value.id}-${index}`}
        existingData={s.value}
        onSubmitSuccess={(data) => {
          const newSubReviews = [...subReviews];
          newSubReviews[index] = { isDirty: false, value: data };
          setSubReviews(newSubReviews);
        }}
        onDeleteSuccess={() => {
          setSubReviews((prevSubReviews) =>
            prevSubReviews.filter((a) => a.value.id !== s.value.id),
          );
        }}
        updateDirty={(isDirty: boolean) => {
          setSubReviews(
            subReviews.map((sr) => {
              if (sr.value.id === s.value.id) {
                return { ...sr, isDirty };
              } else {
                return sr;
              }
            }),
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
          <h2 className="break-words text-center">{baseValues.name}</h2>
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
        <div ref={mediaTypeRef}>
          <RHFControllerInput
            label="Media Type"
            className="flex flex-col"
            labelClassName="ml-2"
            errors={errors.media_type}
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
        </div>
        <RHFInput
          label="Rating"
          register={register("rating", {
            setValueAs: (value) => (value === "" ? null : value),
          })}
          errors={errors.rating}
          className="flex flex-col"
          labelClassName="ml-2"
          inputClassName="max-w-20 input-bg"
          type="number"
          step="0.1"
        />
        <RHFInput
          label="Cover Image URL"
          register={register("cover_image", {
            setValueAs: (value) => (value === "" ? null : value),
          })}
          errors={errors.cover_image}
          className="flex flex-col"
          labelClassName="ml-2"
        />
        <RHFInput
          label="Background Colour"
          register={register("cover_image_bg_colour", {
            setValueAs: (value) => (value === "" ? null : value),
          })}
          errors={errors.cover_image_bg_colour}
          className="flex flex-col"
          inputClassName="max-w-32 input-bg"
          labelClassName="ml-2"
          placeholder="#000000"
        />

        <div className="overflow-hidden rounded-2xl">
          <FixedImageContainer
            imageSrc={baseValues.signed_cover_image ?? undefined}
            imageAlt="Main review cover image"
            priorityLoad={true}
            bgColour={baseValues.cover_image_bg_colour ?? undefined}
          />
        </div>

        <RHFInput
          label="Creator"
          register={register("creator", {
            setValueAs: (value) => (value === "" ? null : value),
          })}
          errors={errors.creator}
          className="flex flex-col"
          labelClassName="ml-2"
        />
        <RHFInput
          label="Word Count"
          register={register("word_count", {
            setValueAs: (value) => (value === "" ? null : value),
          })}
          errors={errors.word_count}
          className="flex flex-col"
          labelClassName="ml-2"
          inputClassName="max-w-40 input-bg"
          type="number"
        />
        <RHFInput
          label="Run Time (minutes)"
          register={register("run_time", {
            setValueAs: (value) => (value === "" ? null : value),
          })}
          errors={errors.run_time}
          className="flex flex-col"
          labelClassName="ml-2"
          inputClassName="max-w-40 input-bg"
          type="number"
          step="0.1"
        />
        <RHFControllerInput
          label="Media Creation Date"
          labelClassName="ml-2"
          errors={errors.media_creation_date}
        >
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
        <RHFControllerInput label="Consumed Date" labelClassName="ml-2">
          <Controller
            control={control}
            name="consumed_date"
            render={({ field }) => {
              return (
                <DateTimePicker
                  defaultTime={defaultConsumedDate}
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

        <RHFControllerInput
          label="Genres"
          labelClassName="ml-2"
          // Display the first error that appears
          errors={
            errors.genres &&
            (errors.genres as (FieldError | undefined)[])?.find(
              (e) => e !== undefined,
            )
          }
        >
          <Controller
            name="genres"
            control={control}
            render={({ field }) => {
              // Filter out selected genres from grouped options
              const filteredOptions = groupedGenreOptions.map((group) => ({
                ...group,
                options: group.options.filter(
                  (genre) =>
                    !field.value.some(
                      (selectedGenre: Genre) =>
                        selectedGenre.name === genre.value,
                    ),
                ),
              }));

              return (
                <GenericMultiSelectGroup<OptionType>
                  options={filteredOptions}
                  placeholder="Select genres"
                  value={(field.value || []).map((genre: Genre) => ({
                    value: genre.name,
                    label: genre.name,
                  }))}
                  onChange={(selectedGenres: MultiValue<OptionType>) =>
                    field.onChange(
                      selectedGenres.map((genre) => ({ name: genre.value })),
                    )
                  }
                  displayKey="label"
                  className="rounded-2xl border-2 border-text-muted"
                  bgClass="bg-background"
                />
              );
            }}
          />
        </RHFControllerInput>

        <RHFControllerInput
          label="Pros"
          labelClassName="ml-2"
          errors={
            errors.pros &&
            (errors.pros as (FieldError | undefined)[])?.find(
              (e) => e !== undefined,
            )
          }
        >
          <Controller
            name="pros"
            control={control}
            render={({ field }) => (
              <textarea
                className="input-bg min-h-20 w-full !rounded-2xl"
                {...field}
                value={field.value?.join("\n")}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value === "" ? [] : value.split("\n").map((item) => item),
                  );
                }}
                aria-invalid={errors.pros !== undefined}
                rows={getValues().pros.length ?? 2}
                placeholder="Each line is one pro"
              />
            )}
          />
        </RHFControllerInput>

        <RHFControllerInput
          label="Cons"
          labelClassName="ml-2"
          errors={
            errors.cons &&
            (errors.cons as (FieldError | undefined)[])?.find(
              (e) => e !== undefined,
            )
          }
        >
          <Controller
            name="cons"
            control={control}
            render={({ field }) => (
              <textarea
                className="input-bg min-h-20 w-full !rounded-2xl"
                {...field}
                value={field.value?.join("\n") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value === "" ? [] : value.split("\n").map((item) => item),
                  );
                }}
                aria-invalid={errors.cons !== undefined}
                rows={getValues().pros.length ?? 2}
                placeholder="Each line is one con"
              />
            )}
          />
        </RHFControllerInput>
        <RHFControllerInput label="Review Content" labelClassName="ml-2">
          <Controller
            name="review_content"
            control={control}
            render={({ field }) => (
              <TipTap
                value={field.value || ""}
                onChange={field.onChange}
                className="w-full border-2 bg-background"
              />
            )}
          />
        </RHFControllerInput>
        <RHFInput
          label="Visible"
          register={register("visible")}
          errors={errors.visible}
          type="checkbox"
          className="ml-2 flex gap-2"
        />
      </form>
      <div>
        {mutation.isError && mutation.error instanceof Error && (
          <p className="mb-2 text-center text-lg text-error">
            {mutation.error.message}
          </p>
        )}
      </div>
      {subMediaReviewForms.length > 0 && (
        <div className="my-4 flex flex-col gap-8">{subMediaReviewForms}</div>
      )}
      <div className="flex flex-col items-center gap-2">
        {getValues().id && (
          <button
            disabled={mutation.isLoading}
            className="btn-secondary h-10 w-44"
            onClick={onAddSubreview}
          >
            Add Subreview
          </button>
        )}
        {dirtyFieldString && (
          <p className="text-center text-error">
            You have unsaved changes: {dirtyFieldString}
          </p>
        )}
        {!isSomeSubReviewDirty && dirtyFieldString && (
          <button
            disabled={mutation.isLoading || isSomeSubReviewDirty}
            className="btn h-10 w-44 self-center"
            form="main-review-form"
            onClick={handleSubmit(onSubmit)}
          >
            {mutation.isLoading ? (
              <AiOutlineLoading className="mx-auto animate-spin text-xl" />
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
            className="flex w-44 justify-center gap-2"
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
            className="btn h-10 w-44"
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

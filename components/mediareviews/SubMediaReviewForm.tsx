import React, { useEffect, useState } from "react";
import { Controller, FieldError, useForm } from "react-hook-form";
import {
  SubMediaReview,
  subMediaReviewSchema,
} from "shared/validations/MediaReviewSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@components/Card";
import RHFInput from "./RHFInput";
import TipTap from "@components/TipTap";
import RHFControllerInput from "./RHFControllerInput";
import DateTimePicker from "@components/DateTimePicker";
import { AiOutlineLoading } from "react-icons/ai";
import {
  PAGINATED_QUERY_KEY,
  UPDATE_QUERY_KEY,
  useDeleteSubMediaReview,
  useWriteSubMediaReview,
} from "shared/queries/mediareviews";
import { useQueryClient } from "react-query";
import ConfirmButton from "@components/ConfirmButton";
import FixedImageContainer from "./FixedImageContainer";

interface SubMediaReviewFormProps {
  existingData: SubMediaReview;
  onSubmitSuccess?: (data: SubMediaReview) => void;
  onDeleteSuccess?: () => void;
  updateDirty?: (isDirty: boolean) => void;
  className?: string;
}

const SubMediaReviewForm: React.FC<SubMediaReviewFormProps> = ({
  existingData,
  onSubmitSuccess,
  onDeleteSuccess,
  updateDirty,
  className,
}) => {
  const queryClient = useQueryClient();
  const [baseValues, setBaseValues] = useState(existingData);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, dirtyFields },
    reset,
    getValues,
  } = useForm<SubMediaReview>({
    resolver: zodResolver(subMediaReviewSchema),
    defaultValues: baseValues,
  });

  // Keep main review form informed on if a subreview has been changed
  useEffect(() => {
    updateDirty && updateDirty(isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  const onMutationSuccess = (data: SubMediaReview) => {
    reset({ ...data });
    queryClient.invalidateQueries(UPDATE_QUERY_KEY);
    queryClient.invalidateQueries(PAGINATED_QUERY_KEY);
    if (onSubmitSuccess) onSubmitSuccess(data);
    setBaseValues(data);
  };

  const mutation = useWriteSubMediaReview(onMutationSuccess);
  const deleteMutation = useDeleteSubMediaReview(onDeleteSuccess);

  const onSubmit = (data: SubMediaReview) => {
    if (data.review_content === "<p></p>") {
      data.review_content = null;
    }
    mutation.mutate(data);
  };

  const onDelete = () => {
    const id = getValues().id;
    if (id) {
      deleteMutation.mutate(id);
    } else if (onDeleteSuccess) {
      onDeleteSuccess();
    }
  };

  const media_creation_date = getValues().media_creation_date;
  const defaultMediaCreationDate = media_creation_date
    ? new Date(media_creation_date)
    : undefined;

  const consumed_date = getValues().consumed_date;
  const defaultConsumedDate = consumed_date
    ? new Date(consumed_date)
    : undefined;

  const getDirtyFieldsString = () => {
    const dirtyFieldNames = Object.keys(dirtyFields)
      .filter((field) => dirtyFields[field as keyof SubMediaReview])
      .map((field) =>
        field
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      ); // Format the keys to look better
    return dirtyFieldNames.join(", ");
  };

  return (
    <Card firstLayer={false} className={className}>
      {baseValues.id && (
        <div>
          <h2 className="text-center">{baseValues.name}</h2>
          <h3 className="text-center">(ID: {baseValues.id})</h3>
        </div>
      )}
      {!getValues().visible && (
        <p className="text-center text-lg font-bold text-error">
          REVIEW IS INVISIBLE
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
        autoComplete="false"
      >
        <RHFInput
          label="Name"
          register={register("name")}
          errors={errors.name}
          className="flex flex-col"
          labelClassName="ml-2"
        />
        <RHFInput
          label="Display Index"
          register={register("display_index")}
          errors={errors.display_index}
          className="flex flex-col"
          labelClassName="ml-2"
          inputClassName="max-w-20 input-bg"
          type="number"
        />
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
            imageSrc={baseValues.local_signed_cover_image ?? undefined}
            imageAlt="Sub review cover image"
            priorityLoad={false}
            heightClassName={
              baseValues.local_signed_cover_image ? "h-48 lg:h-52" : "h-28"
            }
            bgColour={baseValues.cover_image_bg_colour ?? undefined}
            miniCard={baseValues.cover_image_bg_colour !== undefined}
          />
        </div>

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
        <RHFControllerInput
          label="Consumed Date"
          labelClassName="ml-2"
          errors={errors.consumed_date}
        >
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
                className="input-bg min-h-20 w-full !rounded-xl"
                {...field}
                value={field.value?.join("\n")}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value === "" ? [] : value.split("\n").map((item) => item),
                  );
                }}
                aria-invalid={errors.pros !== undefined}
                rows={getValues().pros.length ?? 1}
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
                className="input-bg min-h-20 w-full !rounded-xl"
                {...field}
                value={field.value?.join("\n") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value === "" ? [] : value.split("\n").map((item) => item),
                  );
                }}
                aria-invalid={errors.cons !== undefined}
                rows={getValues().pros.length ?? 1}
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
        {isDirty && (
          <p className="text-center text-error">
            You have unsaved changes: {getDirtyFieldsString()}
          </p>
        )}
        {isDirty && (
          <button
            disabled={mutation.isLoading}
            className="btn h-10 w-44 self-center"
            type="submit"
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

        {isDirty && getValues().id && (
          <ConfirmButton
            content="Discard"
            className="flex w-44 justify-center gap-2 self-center"
            mainBtnClassName="btn h-10"
            confirmBtnClassName="btn h-10"
            onConfirmClick={() => {
              reset({ ...baseValues });
            }}
            confirmDelay={1000}
          />
        )}

        <ConfirmButton
          className="flex h-10 w-44 justify-center gap-4 self-center"
          onConfirmClick={onDelete}
          content="Delete"
          mainBtnClassName="btn"
          confirmBtnClassName="btn w-20 flex items-center justify-center"
          confirmDelay={1000}
        />
        <div>
          {mutation.isError && mutation.error instanceof Error && (
            <p className="text-center text-lg text-error">
              {mutation.error.message}
            </p>
          )}
        </div>
      </form>
    </Card>
  );
};

export default SubMediaReviewForm;

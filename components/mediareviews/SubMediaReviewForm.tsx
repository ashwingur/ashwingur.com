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
  QUERY_KEY,
  useDeleteSubMediaReview,
  useWriteSubMediaReview,
} from "shared/queries/mediareviews";
import { useQueryClient } from "react-query";
import ConfirmButton from "@components/ConfirmButton";
import Image from "next/image";

interface SubMediaReviewFormProps {
  existingData: SubMediaReview;
  onSubmitSuccess?: () => void;
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
    queryClient.invalidateQueries(QUERY_KEY);
    onSubmitSuccess && onSubmitSuccess();
    setBaseValues(data);
  };

  const mutation = useWriteSubMediaReview(onMutationSuccess);
  const deleteMutation = useDeleteSubMediaReview(onDeleteSuccess);

  const onSubmit = (data: SubMediaReview) => {
    mutation.mutate(data);
  };

  const onDelete = () => {
    const id = getValues().id;
    if (id) {
      deleteMutation.mutate(id);
    } else {
      onDeleteSuccess && onDeleteSuccess();
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
          .join(" ")
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
        {getValues().signed_cover_image && (
          <div className="w-full h-72 relative">
            <Image
              src={getValues().signed_cover_image ?? ""}
              alt={"Main review cover image"}
              style={{ objectFit: "contain" }}
              layout="fill"
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
                className="input-bg !rounded-xl w-full min-h-20"
                {...field}
                value={field.value?.join("\n")}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value === "" ? [] : value.split("\n").map((item) => item)
                  );
                }}
                aria-invalid={errors.pros !== undefined}
                rows={4}
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
                className="input-bg !rounded-xl w-full min-h-20"
                {...field}
                value={field.value?.join("\n") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value === "" ? [] : value.split("\n").map((item) => item)
                  );
                }}
                aria-invalid={errors.cons !== undefined}
                rows={4}
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
        {isDirty && (
          <p className="text-error text-center">
            You have unsaved changes: {getDirtyFieldsString()}
          </p>
        )}
        {isDirty && (
          <button
            disabled={mutation.isLoading}
            className="btn self-center w-44 h-10"
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
        )}

        {isDirty && getValues().id && (
          <ConfirmButton
            content="Discard"
            className="w-44 flex gap-2 justify-center self-center"
            mainBtnClassName="btn h-10"
            confirmBtnClassName="btn h-10"
            onConfirmClick={() => {
              reset({ ...baseValues });
            }}
            confirmDelay={1000}
          />
        )}

        <ConfirmButton
          className="flex justify-center self-center gap-4 w-44 h-10"
          onConfirmClick={onDelete}
          content="Delete"
          mainBtnClassName="btn"
          confirmBtnClassName="btn w-20 flex items-center justify-center"
          confirmDelay={1000}
        />
      </form>
    </Card>
  );
};

export default SubMediaReviewForm;

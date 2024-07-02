import React from "react";
import { useForm } from "react-hook-form";
import {
  SubMediaReview,
  defaultSubMediaReview,
  subMediaReviewSchema,
} from "shared/validations/MediaReviewSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@components/Card";

interface SubMediaReviewFormProps {
  defaultValues: SubMediaReview;
  onSubmitSuccess?: () => void;
  className?: string;
}

const SubMediaReviewForm: React.FC<SubMediaReviewFormProps> = ({
  defaultValues,
  onSubmitSuccess,
  className,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, dirtyFields },
    reset,
    getValues,
  } = useForm<SubMediaReview>({
    resolver: zodResolver(subMediaReviewSchema),
    defaultValues,
  });

  const onSubmit = (data: SubMediaReview) => {
    // mutation.mutate(data);
  };

  return (
    <Card firstLayer={false}>
      {getValues().id && (
        <div>
          <h2 className="text-center">{defaultValues.name}</h2>
          <h3 className="text-center">(ID: {getValues().id})</h3>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
        autoComplete="false"
      ></form>
    </Card>
  );
};

export default SubMediaReviewForm;

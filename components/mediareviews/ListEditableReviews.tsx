import Card from "@components/Card";
import ConfirmButton from "@components/ConfirmButton";
import LoadingIcon from "@components/LoadingIcon";
import React from "react";
import {
  useDeleteMediaReview,
  useMediaReviews,
} from "shared/queries/mediareviews";

interface ListEditableReviewsProps {
  handleEdit: (id: number) => void;
}

const ListEditableReviews: React.FC<ListEditableReviewsProps> = ({
  handleEdit,
}) => {
  const { data, error, isLoading } = useMediaReviews();
  const deleteReviewMutation = useDeleteMediaReview();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data)
    return (
      <div className="text-error">
        Error: {error instanceof Error && error.message}
      </div>
    );

  const reviewItems = data.map((review) => {
    const isLoadingDelete =
      deleteReviewMutation.isLoading &&
      deleteReviewMutation.variables === review.id;
    return (
      <Card
        key={review.id}
        firstLayer={true}
        className="flex flex-col mx-auto w-4/5 md:w-full"
      >
        <h3 className="text-center">{review.name}</h3>
        <p>
          <span className="font-bold">ID:</span> {review.id}
        </p>
        <p>
          <span className="font-bold">Type:</span> {review.media_type}
        </p>
        <p>
          <span className="font-bold">Created:</span>{" "}
          {review.review_creation_date &&
            `${new Date(review.review_creation_date).toLocaleDateString()} ${new Date(review.review_creation_date).toLocaleTimeString()}`}
        </p>
        <p>
          <span className="font-bold">Updated:</span>{" "}
          {review.review_last_update_date &&
            `${new Date(review.review_last_update_date).toLocaleDateString()} ${new Date(review.review_last_update_date).toLocaleTimeString()}`}
        </p>
        <button
          className="btn mx-auto mt-2 w-24 h-10"
          onClick={() => {
            review.id && handleEdit(review.id);
          }}
        >
          Edit
        </button>
        <ConfirmButton
          content={isLoadingDelete ? <LoadingIcon /> : "Delete"}
          className="mx-auto flex gap-2 mt-2 items-center justify-center"
          mainBtnClassName="btn w-24  h-10"
          confirmBtnClassName="btn  h-10"
          onConfirmClick={() => {
            review.id && deleteReviewMutation.mutate(review.id);
          }}
        />
        {deleteReviewMutation.isError &&
          deleteReviewMutation.error instanceof Error &&
          deleteReviewMutation.variables === review.id && (
            <p className="text-lg text-error text-center mt-2">
              {deleteReviewMutation.error.message}
            </p>
          )}
      </Card>
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 md:w-4/5 w-full">
      {reviewItems}
    </div>
  );
};

export default ListEditableReviews;

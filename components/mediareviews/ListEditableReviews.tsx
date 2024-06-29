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
    return <div>Error: {error instanceof Error && error.message}</div>;

  const reviewItems = data.map((review) => {
    const isLoadingDelete =
      deleteReviewMutation.isLoading &&
      deleteReviewMutation.variables === review.id;
    return (
      <Card key={review.id} firstLayer={true} className="flex flex-col">
        <p>ID: {review.id}</p>
        <p>Name: {review.name}</p>
        <p>Type: {review.media_type}</p>
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
      </Card>
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviewItems}
    </div>
  );
};

export default ListEditableReviews;

import Card from "@components/Card";
import React from "react";
import { useMediaReviews } from "shared/queries/mediareviews";

interface ListEditableReviewsProps {
  handleEdit: (id: number) => void;
}

const ListEditableReviews: React.FC<ListEditableReviewsProps> = ({
  handleEdit,
}) => {
  const { data, error, isLoading } = useMediaReviews();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data)
    return <div>Error: {error instanceof Error && error.message}</div>;

  const reviewItems = data.map((review) => (
    <Card key={review.id} firstLayer={true} className="flex flex-col">
      <p>ID: {review.id}</p>
      <p>Name: {review.name}</p>
      <p>Type: {review.media_type}</p>
      <button
        className="btn mx-auto mt-2 w-24"
        onClick={() => {
          review.id && handleEdit(review.id);
        }}
      >
        Edit
      </button>
    </Card>
  ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviewItems}
    </div>
  );
};

export default ListEditableReviews;

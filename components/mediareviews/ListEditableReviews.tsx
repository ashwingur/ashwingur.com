import Card from "@components/Card";
import ConfirmButton from "@components/ConfirmButton";
import LoadingIcon from "@components/LoadingIcon";
import React from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
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

  if (isLoading) return <LoadingIcon className="text-5xl mt-16" />;
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
        className="flex flex-col mx-auto w-4/5 md:w-full justify-between"
      >
        <div className="h-full">
          <h2 className="text-center break-words">{review.name}</h2>
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
          {review.sub_media_reviews.length > 0 && (
            <div className="my-2">
              <h3 className="text-center">Sub Reviews</h3>
              <div className="flex flex-col gap-4 w-full">
                {review.sub_media_reviews.map((subReview) => (
                  <Card
                    key={subReview.id}
                    firstLayer={false}
                    className="w-full"
                  >
                    <p className="font-bold text-center">{subReview.name}</p>
                    <p>
                      <span className="font-bold">ID:</span> {subReview.id}
                    </p>
                    <p>
                      <span className="font-bold">Created:</span>{" "}
                      {subReview.review_creation_date &&
                        `${new Date(subReview.review_creation_date).toLocaleDateString()} ${new Date(subReview.review_creation_date).toLocaleTimeString()}`}
                    </p>
                    <p>
                      <span className="font-bold">Updated:</span>{" "}
                      {subReview.review_last_update_date &&
                        `${new Date(subReview.review_last_update_date).toLocaleDateString()} ${new Date(subReview.review_last_update_date).toLocaleTimeString()}`}
                    </p>
                    {!subReview.visible && (
                      <AiFillEyeInvisible className="text-secondary text-xl ml-auto" />
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center flex-col">
          {!review.visible && (
            <AiFillEyeInvisible className="text-secondary text-2xl absolute bottom-0 right-0" />
          )}
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
        </div>
      </Card>
    );
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 md:w-4/5 w-full ">
      {reviewItems}
    </div>
  );
};

export default ListEditableReviews;

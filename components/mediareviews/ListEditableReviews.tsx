import Card from "@components/Card";
import ConfirmButton from "@components/ConfirmButton";
import LoadingIcon from "@components/LoadingIcon";
import { useAuth } from "@context/AuthContext";
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
  const { role } = useAuth();
  const { data, error, isLoading } = useMediaReviews();
  const deleteReviewMutation = useDeleteMediaReview();

  if (isLoading) return <LoadingIcon className="mt-16 text-5xl" />;
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
        className="mx-auto flex w-4/5 flex-col justify-between md:w-full"
      >
        <div className="h-full text-sm">
          <h2 className="break-words text-center text-2xl">{review.name}</h2>
          <div className="flex justify-between">
            <p>
              <span className="font-bold">Type:</span> {review.media_type}
            </p>
            <p>
              <span className="font-bold">ID:</span> {review.id}
            </p>
          </div>
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
              <div className="flex w-full flex-col gap-4">
                {review.sub_media_reviews
                  .sort((a, b) => a.display_index - b.display_index)
                  .map((subReview) => (
                    <Card
                      key={subReview.id}
                      firstLayer={false}
                      className="w-full"
                    >
                      <p className="text-center text-base font-bold">
                        {subReview.name}
                      </p>
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
                        <AiFillEyeInvisible className="ml-auto text-xl text-secondary" />
                      )}
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          {!review.visible && (
            <AiFillEyeInvisible className="absolute bottom-0 right-0 text-2xl text-secondary" />
          )}
          <button
            className="btn mx-auto mt-2 h-10 w-24"
            onClick={() => {
              review.id && handleEdit(review.id);
            }}
          >
            Edit
          </button>
          {role === "admin" && (
            <>
              <ConfirmButton
                content={isLoadingDelete ? <LoadingIcon /> : "Delete"}
                className="mx-auto mt-2 flex items-center justify-center gap-2"
                mainBtnClassName="btn w-24  h-10"
                confirmBtnClassName="btn  h-10"
                onConfirmClick={() => {
                  review.id && deleteReviewMutation.mutate(review.id);
                }}
              />
              {deleteReviewMutation.isError &&
                deleteReviewMutation.error instanceof Error &&
                deleteReviewMutation.variables === review.id && (
                  <p className="mt-2 text-center text-lg text-error">
                    {deleteReviewMutation.error.message}
                  </p>
                )}
            </>
          )}
        </div>
      </Card>
    );
  });

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:w-4/5 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
      {reviewItems}
    </div>
  );
};

export default ListEditableReviews;

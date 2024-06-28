import CreateOrUpdateReviewForm from "@components/mediareviews/CreateOrUpdateReviewForm";
import ListEditableReviews from "@components/mediareviews/ListEditableReviews";
import Navbar from "@components/navbars/Navbar";
import React, { useState } from "react";
import { useMediaReviews } from "shared/queries/mediareviews";
import {
  MediaReview,
  getDefaultMediaReview,
} from "shared/validations/mediaReviewSchema";

const Edit = () => {
  const { data } = useMediaReviews();
  const [currentlyEditing, setCurrentlyEditing] = useState<MediaReview>();

  const handleCreateNew = () => {
    setCurrentlyEditing(getDefaultMediaReview());
  };

  const handleEdit = (id: number) => {
    if (data) {
      const review = data.find((r) => r.id === id);
      console.log(review);
      review && setCurrentlyEditing(review);
    }
  };

  return (
    <div className="min-h-screen pt-24">
      <Navbar fixed={true} />
      <div className="flex flex-col items-center">
        <h1 className="mb-4">Edit Reviews</h1>
        {!currentlyEditing && (
          <button className="btn mb-4" onClick={handleCreateNew}>
            Create New
          </button>
        )}
        {currentlyEditing && (
          <CreateOrUpdateReviewForm existingData={currentlyEditing} />
        )}
        <ListEditableReviews handleEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Edit;

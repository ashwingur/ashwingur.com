import Card from "@components/Card";
import ConfirmButton from "@components/ConfirmButton";
import MediaReviewForm from "@components/mediareviews/MediaReviewForm";
import ListEditableReviews from "@components/mediareviews/ListEditableReviews";
import Navbar from "@components/navbars/Navbar";
import { useAuth } from "@context/AuthContext";
import React, { useState } from "react";
import { useMediaReviews } from "shared/queries/mediareviews";
import {
  MediaReview,
  defaultMediaReview,
} from "shared/validations/MediaReviewSchemas";

const Edit = () => {
  const { data } = useMediaReviews();
  const [currentlyEditing, setCurrentlyEditing] = useState<MediaReview>();
  const { user, loading } = useAuth();

  const handleCreateNew = () => {
    setCurrentlyEditing(defaultMediaReview());
  };

  const handleEdit = (id: number) => {
    if (data) {
      const review = data.find((r) => r.id === id);
      review && setCurrentlyEditing(review);
    }
  };

  const onSubmitSuccess = () => {
    // We want the editor to hide again after a successful create/update
    setCurrentlyEditing(undefined);
  };

  const onExit = () => {
    setCurrentlyEditing(undefined);
  };

  return (
    <div className="min-h-screen pt-24 pb-8">
      <Navbar fixed={true} />
      <div className="flex flex-col items-center">
        <h1 className="mb-4">Edit Reviews</h1>
        {user === null && !loading && (
          <p className="bg-red-600 rounded-lg text-white mb-4 p-2">
            You are currently unauthenticated
          </p>
        )}
        {!currentlyEditing && (
          <button className="btn mb-4" onClick={handleCreateNew}>
            Create New
          </button>
        )}
        {currentlyEditing && (
          <Card
            firstLayer={true}
            className="flex flex-col items-center mx-4 md:w-4/5 xl:w-2/3"
          >
            <MediaReviewForm
              existingData={currentlyEditing}
              onSubmitSuccess={onSubmitSuccess}
              onExit={onExit}
              className="w-full lg:w-4/5 flex flex-col items-center"
            />
          </Card>
        )}
        {!currentlyEditing && <ListEditableReviews handleEdit={handleEdit} />}
      </div>
    </div>
  );
};

export default Edit;

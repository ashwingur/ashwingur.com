import Card from "@components/Card";
import MediaReviewForm from "@components/mediareviews/MediaReviewForm";
import ListEditableReviews from "@components/mediareviews/ListEditableReviews";
import Navbar from "@components/navbars/Navbar";
import { useAuth } from "@context/AuthContext";
import React, { useEffect, useState } from "react";
import { useMediaReviews } from "shared/queries/mediareviews";
import {
  MediaReview,
  defaultMediaReview,
} from "shared/validations/MediaReviewSchemas";
import { useRouter } from "next/router";
import { z } from "zod";
import Link from "next/link";

const Edit = () => {
  const { role } = useAuth();
  const { data } = useMediaReviews();
  const [currentlyEditing, setCurrentlyEditing] = useState<MediaReview>();
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleCreateNew = () => {
    setCurrentlyEditing(defaultMediaReview());
  };

  const handleEdit = (id: number) => {
    if (data) {
      const review = data.find((r) => r.id === id);
      if (review) {
        setCurrentlyEditing(review);
        router.push({ pathname: router.pathname, query: { id: review?.id } });
      } else {
        router.push({ pathname: router.pathname });
      }
    }
  };

  const onSubmitSuccess = () => {
    // We want the editor to hide again after a successful create/update
    // setCurrentlyEditing(undefined);
  };

  const onExit = () => {
    router.push({ pathname: router.pathname });
    setCurrentlyEditing(undefined);
  };

  useEffect(() => {
    // Upon first load check if there's a url parameter and go to that review if data has loaded
    const { id } = router.query;
    const idResult = z.coerce.number().min(0).safeParse(id);
    if (idResult.success && data && !currentlyEditing) {
      handleEdit(idResult.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Link className="btn w-48" href={"/MediaReviewsV2"}>
              Back to Reviews
            </Link>
            {role === "admin" && (
              <button className="btn w-48" onClick={handleCreateNew}>
                Create New
              </button>
            )}
          </div>
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

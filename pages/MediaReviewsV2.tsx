import Navbar from "@components/navbars/Navbar";
import React from "react";
import { usePaginatedMediaReviews } from "shared/queries/mediareviews";

const MediaReviewsV2 = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePaginatedMediaReviews();

  return (
    <div className="min-h-screen pt-24">
      <Navbar fixed={true} />
      <h1 className="text-center">Media Reviews</h1>
      <button className="btn" onClick={() => fetchNextPage()}>
        Next Page
      </button>
      {hasNextPage && "Has next page"}
      {JSON.stringify(data?.pages)}
    </div>
  );
};

export default MediaReviewsV2;

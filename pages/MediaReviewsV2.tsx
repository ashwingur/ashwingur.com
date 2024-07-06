import Navbar from "@components/navbars/Navbar";
import React, { useEffect } from "react";
import { usePaginatedMediaReviews } from "shared/queries/mediareviews";

const MediaReviewsV2 = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePaginatedMediaReviews();

  const reviews = data?.pages.flatMap((page) => page.media_reviews);

  // const reviewItems = reviews?.map();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    const threshold = 200; // Replace with your desired threshold value in pixels

    if (scrollHeight - currentScroll <= threshold) {
      // Perform your action here
      // console.log("You are within the threshold from the bottom of the page");
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen pt-24">
      <Navbar fixed={true} />
      <h1 className="text-center">Media Reviews</h1>
      <button className="btn" onClick={() => fetchNextPage()}>
        Next Page
      </button>
      {hasNextPage && "Has next page"}
      <pre>{JSON.stringify(reviews, null, 2)}</pre>
    </div>
  );
};

export default MediaReviewsV2;

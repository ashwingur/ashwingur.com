import Navbar from "@components/navbars/Navbar";
import React, { useEffect, useRef } from "react";
import { usePaginatedMediaReviews } from "shared/queries/mediareviews";

const MediaReviewsV2 = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    usePaginatedMediaReviews();

  const reviews = data?.pages.flatMap((page) => page.media_reviews);

  const isFetchingNextPageRef = useRef(isFetchingNextPage);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    const threshold = 200; // Replace with your desired threshold value in pixels

    if (
      scrollHeight - currentScroll <= threshold &&
      !isFetchingNextPageRef.current
    ) {
      console.log("FETCHING NEXT PAGE");
      fetchNextPage();
    }
  };

  // Keep the ref up to date so we don't spam next page request in handlescroll
  useEffect(() => {
    isFetchingNextPageRef.current = isFetchingNextPage;
  }, [isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Call handleScroll when data changes.
  //This is for the situation where the current loaded data is not enough to enable scrolling so we manually call it
  useEffect(() => {
    handleScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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

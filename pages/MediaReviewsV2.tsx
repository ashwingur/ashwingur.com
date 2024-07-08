import LoadingIcon from "@components/LoadingIcon";
import MasonWrapper from "@components/mediareviews/MasonWrapper";
import MediaReviewCard from "@components/mediareviews/MediaReviewCard";
import Navbar from "@components/navbars/Navbar";
import { Masonry } from "masonic";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { usePaginatedMediaReviews } from "shared/queries/mediareviews";

const MediaReviewsV2 = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePaginatedMediaReviews(6);

  const reviews = data?.pages.flatMap((page) => page.media_reviews) || [];

  const isFetchingNextPageRef = useRef(isFetchingNextPage);
  const hasNextPageRef = useRef(hasNextPage);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    const threshold = 500; // Replace with your desired threshold value in pixels

    if (
      scrollHeight - currentScroll <= threshold &&
      !isFetchingNextPageRef.current &&
      hasNextPageRef.current
    ) {
      fetchNextPage();
    }
  };

  // Keep the ref up to date so we don't spam next page request in handlescroll
  useEffect(() => {
    isFetchingNextPageRef.current = isFetchingNextPage;
    hasNextPageRef.current = hasNextPage;
  }, [isFetchingNextPage, hasNextPage]);

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

  const reviewCards = reviews.map((review, index) => (
    <MediaReviewCard
      className="w-full break-inside-avoid-column"
      review={review}
      index={index}
      key={review.id}
    />
  ));

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Navbar fixed={true} />
      <h1 className="text-center">Media Reviews</h1>
      <div className=" flex justify-center my-4">
        <Link className="btn w-48" href={"/MediaReviewsV2/Edit"}>
          Edit Reviews
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-stretch 2xl:w-4/5 mx-auto gap-8 xl:gap-16 px-4 lg:px-8">
        {reviewCards}
      </div>

      {isFetchingNextPage && <LoadingIcon className="mx-auto text-5xl mb-16" />}
    </div>
  );
};

export default MediaReviewsV2;

import LoadingIcon from "@components/LoadingIcon";
import MediaReviewCard from "@components/mediareviews/MediaReviewCard";
import MediaReviewFilter, {
  FilterObject,
} from "@components/mediareviews/MediaReviewFilter";
import MediaReviewModal from "@components/mediareviews/MediaReviewModal";
import Navbar from "@components/navbars/Navbar";
import { useAuth } from "@context/AuthContext";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePaginatedMediaReviews } from "shared/queries/mediareviews";

const MediaReviewsV2 = () => {
  const { user, role } = useAuth();
  const [filterObject, setFilterObject] = useState<FilterObject>({
    mediaTypes: [],
  });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePaginatedMediaReviews(6, filterObject);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<number | null>(null);

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

  const reviewCards = reviews
    .filter((review) => review.visible)
    .map((review, index) => (
      <MediaReviewCard
        className="w-full cursor-pointer"
        review={review}
        index={index}
        key={review.id}
        onCoverClick={() => {
          setSelectedReview(review.id);
          setReviewModalVisible(true);
        }}
        minimised={true}
      />
    ));

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <Navbar fixed={true} />
      <h1 className="text-center">Media Reviews</h1>

      {user && role === "admin" && (
        <div className="flex justify-center mt-4">
          <Link className="btn w-48" href={"/MediaReviewsV2/Edit"}>
            Edit Reviews
          </Link>
        </div>
      )}
      <div className="">
        <MediaReviewFilter
          setFilterObject={setFilterObject}
          className="flex flex-col items-center relative my-4"
        />
        <div className="grid place-items-stretch grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 2xl:w-5/6 mx-auto gap-8 xl:gap-16 px-4 md:px-8 lg:px-12">
          {reviewCards}
        </div>
      </div>

      {isFetchingNextPage && <LoadingIcon className="mx-auto text-5xl mb-16" />}
      <MediaReviewModal
        review={reviews.find((r) => r.id === selectedReview)}
        visible={reviewModalVisible}
        setVisible={(visible) => {
          setReviewModalVisible(visible);
        }}
      />
    </div>
  );
};

export default MediaReviewsV2;

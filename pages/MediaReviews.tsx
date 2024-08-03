import LoadingIcon from "@components/LoadingIcon";
import InfoModal from "@components/mediareviews/InfoModal";
import MediaReviewCard from "@components/mediareviews/MediaReviewCard";
import MediaReviewFilter, {
  defaultFilterObject,
  FilterObject,
} from "@components/mediareviews/MediaReviewFilter";
import MediaReviewModal from "@components/mediareviews/MediaReviewModal";
import StatisticsModal from "@components/mediareviews/StatisticsModal";
import Navbar from "@components/navbars/Navbar";
import { useAuth } from "@context/AuthContext";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaChartColumn, FaInfo } from "react-icons/fa6";
import { MdOutlineHideImage, MdOutlineImage } from "react-icons/md";
import { usePaginatedMediaReviews } from "shared/queries/mediareviews";

const MediaReviewsV2 = () => {
  const { user, role } = useAuth();
  const [filterObject, setFilterObject] =
    useState<FilterObject>(defaultFilterObject);
  const [filterReady, setFilterReady] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePaginatedMediaReviews(6, filterObject, filterReady);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  const [showImages, setShowImages] = useState<boolean>();

  useEffect(() => {
    // Retrieving from local storage if the preference was set
    const showImages = localStorage.getItem("showImages");
    if (showImages) {
      setShowImages(showImages === "false" ? false : true);
    } else {
      localStorage.setItem("showImages", "true");
      setShowImages(true);
    }
  }, []);

  const numResults = data?.pages[0].total;

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
      className="w-full cursor-pointer"
      review={review}
      index={index}
      key={review.id}
      onCoverClick={() => {
        setSelectedReview(review.id);
        setReviewModalVisible(true);
      }}
      minimised={true}
      showImages={showImages === true}
    />
  ));

  return (
    <div className="min-h-screen pb-16 pt-20 md:pt-24">
      <Navbar fixed={true} />
      <h1 className="text-center">Media Reviews</h1>

      {user && role === "admin" && (
        <div className="mt-4 flex justify-center">
          <Link className="btn w-48" href={"/MediaReviews/Edit"}>
            Edit Reviews
          </Link>
        </div>
      )}

      <div className="mt-4 flex justify-center gap-4">
        <button
          className="btn text-xl lg:text-2xl"
          onClick={() => {
            setInfoModalVisible(true);
          }}
        >
          <FaInfo className="w-12" />
        </button>
        <button
          className="btn text-xl lg:text-2xl"
          onClick={() => {
            setStatsModalVisible(true);
          }}
        >
          <FaChartColumn className="w-12" />
        </button>
        <button
          className="btn text-xl lg:text-2xl"
          onClick={() => {
            localStorage.setItem("showImages", showImages ? "false" : "true");
            setShowImages(!showImages);
          }}
        >
          {showImages ? (
            <MdOutlineHideImage className="w-12" />
          ) : (
            <MdOutlineImage className="w-12" />
          )}
        </button>
      </div>

      <MediaReviewFilter
        filterObject={filterObject}
        setFilterObject={setFilterObject}
        setFilterReady={setFilterReady}
        noResults={reviews.length === 0}
        className="relative mt-4 flex flex-col items-center"
      />
      {numResults !== undefined && !isLoading && filterReady && (
        <p className="mb-4 mt-2 text-center text-xl">
          {numResults} result{numResults !== 1 && "s"}
        </p>
      )}
      <div className="mx-auto grid grid-cols-1 place-items-stretch gap-8 px-4 md:px-8 lg:grid-cols-2 lg:px-12 xl:gap-16 2xl:w-5/6 2xl:grid-cols-3">
        {reviewCards}
      </div>

      {(isFetchingNextPage || isLoading) && (
        <LoadingIcon className="mx-auto mb-16 mt-4 text-5xl" />
      )}
      <MediaReviewModal
        review={reviews.find((r) => r.id === selectedReview)}
        visible={reviewModalVisible}
        setVisible={(visible) => {
          setReviewModalVisible(visible);
        }}
        showImages={showImages === true}
      />
      <InfoModal
        visible={infoModalVisible}
        setVisible={(visible) => {
          setInfoModalVisible(visible);
        }}
      />
      <StatisticsModal
        visible={statsModalVisible}
        setVisible={(visible) => {
          setStatsModalVisible(visible);
        }}
      />
    </div>
  );
};

export default MediaReviewsV2;

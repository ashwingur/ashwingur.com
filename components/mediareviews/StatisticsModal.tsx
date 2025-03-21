import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Card from "@components/Card";
import { useReviewsMetadata } from "shared/queries/mediareviews";
import LoadingIcon from "@components/LoadingIcon";
import ColumnChart from "./ColumnChart";
import ReviewPieChart from "./PieChart";

interface StatisticsModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const StatisticsModal: React.FC<StatisticsModalProps> = ({
  visible,
  setVisible,
}) => {
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useReviewsMetadata();

  useEffect(() => {
    if (scrollDivRef.current) {
      scrollDivRef.current.scrollTop = 0;
    }
  }, [visible]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, setVisible]);

  const mapRatingBins = (values: number[]) => {
    return values.map((item, index) => ({
      name: `${index}-${index + 1}`,
      value: item,
    }));
  };

  const all_data = mapRatingBins(data?.rating_bins.all || []);
  const all_data_with_subreviews = mapRatingBins(
    data?.rating_bins_with_sub_reviews.all || [],
  );
  const books_data = mapRatingBins(data?.rating_bins.book || []);
  const movies_data = mapRatingBins(data?.rating_bins.movie || []);
  const shows_data = mapRatingBins(data?.rating_bins.show || []);
  const games_data = mapRatingBins(data?.rating_bins.game || []);
  const music_data = mapRatingBins(data?.rating_bins.music || []);

  const mediaTypeData = [
    {
      name: "Books",
      value: data?.rating_bins.book?.reduce((acc, val) => acc + val, 0) ?? 0,
    },
    {
      name: "Shows",
      value: data?.rating_bins.show?.reduce((acc, val) => acc + val, 0) ?? 0,
    },
    {
      name: "Movies",
      value: data?.rating_bins.movie?.reduce((acc, val) => acc + val, 0) ?? 0,
    },
    {
      name: "Games",
      value: data?.rating_bins.game?.reduce((acc, val) => acc + val, 0) ?? 0,
    },
    {
      name: "Music",
      value: data?.rating_bins.music?.reduce((acc, val) => acc + val, 0) ?? 0,
    },
  ];

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center transition-all duration-300",
        visible ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div
        className="fixed inset-0 bg-black/70"
        onClick={() => {
          setVisible(false);
        }}
      />
      <div className="z-10 flex max-h-[83%] w-full flex-col overflow-hidden rounded-2xl px-4 md:px-8 lg:w-4/5 2xl:w-3/5">
        <div
          ref={scrollDivRef}
          className="relative overflow-y-auto rounded-2xl"
        >
          <button
            className="btn fixed z-50 m-4"
            onClick={() => {
              setVisible(false);
            }}
          >
            <AiOutlineClose />
          </button>
          <Card firstLayer={true} className="flex flex-col items-center !px-8">
            <h2 className="mb-4 mt-8 text-center">Stats for Nerds</h2>

            {isLoading && <LoadingIcon className="my-8 text-3xl" />}
            {isError && (
              <p className="py-8 text-lg text-error">
                Error retrieving statistics
              </p>
            )}
            {data !== undefined && (
              <>
                <p className="text-center">
                  <span className="font-bold">Total Reviews: </span>
                  {data.media_review_count}
                </p>
                <p className="text-center">
                  <span className="font-bold">
                    Total Reviews (Including Subreviews):{" "}
                  </span>
                  {data.media_review_count + data.sub_media_review_count}
                </p>
                <p className="text-center">
                  <span className="font-bold">Total Words Read: </span>
                  {data.total_word_count.toLocaleString()}
                </p>
                <p className="text-center">
                  <span className="font-bold">Total Time Watched: </span>
                  {(data.total_run_time / 60).toFixed(1).toLocaleString()} hours
                </p>
                <p className="text-center">
                  <span className="font-bold">Unique Genres: </span>
                  {data.genres.length}
                </p>
                <p className="text-center">
                  <span className="font-bold">Unique Creators: </span>
                  {data.creators.length}
                </p>
                <ReviewPieChart
                  className="mt-8 h-72 w-full overflow-auto xl:h-80"
                  height="80%"
                  title="Reviews by Media Type"
                  data={mediaTypeData}
                />
                <h2 className="mb-4 text-2xl">Rating Stats</h2>
                <div className="flex w-full flex-col md:px-8 lg:px-16 2xl:px-32">
                  <ColumnChart
                    className="h-72 w-full xl:h-80"
                    height="80%"
                    title="All"
                    data={all_data}
                  />
                  <ColumnChart
                    className="h-72 w-full xl:h-80"
                    title="All (Including Subreviews)"
                    height="80%"
                    data={all_data_with_subreviews}
                  />
                  <ColumnChart
                    className="h-72 w-full xl:h-80"
                    title="Books"
                    height="80%"
                    data={books_data}
                  />
                  <ColumnChart
                    className="h-72 w-full xl:h-80"
                    title="Movies"
                    height="80%"
                    data={movies_data}
                  />
                  <ColumnChart
                    className="h-72 w-full xl:h-80"
                    title="Shows"
                    height="80%"
                    data={shows_data}
                  />
                  <ColumnChart
                    className="h-72 w-full xl:h-80"
                    title="Games"
                    height="80%"
                    data={games_data}
                  />
                  <ColumnChart
                    className="h-72 w-full xl:h-80"
                    title="Music"
                    height="80%"
                    data={music_data}
                  />
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatisticsModal;

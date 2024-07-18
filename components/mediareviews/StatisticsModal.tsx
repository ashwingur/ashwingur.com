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
    data?.rating_bins_with_sub_reviews.all || []
  );
  const books_data = mapRatingBins(data?.rating_bins.book || []);
  const movies_data = mapRatingBins(data?.rating_bins.movie || []);
  const shows_data = mapRatingBins(data?.rating_bins.show || []);
  const games_data = mapRatingBins(data?.rating_bins.game || []);
  const music_data = mapRatingBins(data?.rating_bins.music || []);

  const genreData = [
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
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      <div
        className="fixed inset-0 bg-black/70"
        onClick={() => {
          setVisible(false);
        }}
      />
      <div className="flex flex-col z-10 px-4 w-full md:px-8 lg:w-4/5 2xl:w-3/5 max-h-[83%] overflow-hidden rounded-2xl">
        <div
          ref={scrollDivRef}
          className="overflow-y-auto rounded-2xl relative"
        >
          <button
            className="btn z-50 m-4 fixed"
            onClick={() => {
              setVisible(false);
            }}
          >
            <AiOutlineClose />
          </button>
          <Card firstLayer={true} className="!px-8 flex flex-col items-center">
            <h2 className="mt-8 text-center mb-4">Stats for Nerds</h2>

            {isLoading && <LoadingIcon className="text-3xl my-8" />}
            {isError && (
              <p className="text-error text-lg py-8">
                Error retrieving statistics
              </p>
            )}
            {data !== undefined && (
              <>
                <p className="text-center">
                  <span className="font-bold">Total Reviews: </span>
                  {data.rating_bins.all.reduce((acc, val) => acc + val, 0)}
                </p>
                <p className="text-center">
                  <span className="font-bold">
                    Total Reviews (Including Subreviews):{" "}
                  </span>
                  {data.rating_bins_with_sub_reviews.all.reduce(
                    (acc, val) => acc + val,
                    0
                  )}
                </p>
                <p className="text-center">
                  <span className="font-bold">Total Word Count: </span>
                  {data.total_word_count.toLocaleString()}
                </p>
                <p className="text-center">
                  <span className="font-bold">Total Run Time: </span>
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
                  className="w-full h-72 xl:h-80 overflow-auto mt-8"
                  height="80%"
                  title="Reviews by Genre"
                  data={genreData}
                />
                <h2 className="text-2xl mb-4">Rating Stats</h2>
                <div className="flex flex-col w-full md:px-8 lg:px-16 2xl:px-32">
                  <ColumnChart
                    className="w-full h-72 xl:h-80"
                    height="80%"
                    title="All"
                    data={all_data}
                  />
                  <ColumnChart
                    className="w-full h-72 xl:h-80"
                    title="All (Including Subreviews)"
                    height="80%"
                    data={all_data_with_subreviews}
                  />
                  <ColumnChart
                    className="w-full h-72 xl:h-80"
                    title="Books"
                    height="80%"
                    data={books_data}
                  />
                  <ColumnChart
                    className="w-full h-72 xl:h-80"
                    title="Movies"
                    height="80%"
                    data={movies_data}
                  />
                  <ColumnChart
                    className="w-full h-72 xl:h-80"
                    title="Shows"
                    height="80%"
                    data={shows_data}
                  />
                  <ColumnChart
                    className="w-full h-72 xl:h-80"
                    title="Games"
                    height="80%"
                    data={games_data}
                  />
                  <ColumnChart
                    className="w-full h-72 xl:h-80"
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

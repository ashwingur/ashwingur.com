import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Reviews from "../data/Reviews.json";
import Image from "next/image";

interface ReviewItem {
  type: string;
  name: string;
  image?: string;
  review?: string[];
  rating: number;
  reviewSubItems?: ReviewSubItem[];
}

interface ReviewSubItem {
  name: string;
  image?: string;
  review?: string[];
  rating: number;
}

const categories = ["Books", "Shows", "Movies", "Games"];

const filterTabIndex = (selectedTab: number): string => {
  switch (selectedTab) {
    case 0:
      return "book";
    case 1:
      return "show";
    case 2:
      return "movie";
    case 3:
      return "game";
    default:
      return "none";
  }
};

const ratingColour = (rating: number): string => {
  if (rating <= 1) {
    return "bg-red-500 dark:bg-red-800";
  } else if (rating <= 3) {
    return "bg-orange-500 dark:bg-orange-700";
  } else if (rating <= 5) {
    return "bg-amber-500 dark:bg-amber-700";
  } else if (rating <= 7) {
    return "bg-yellow-500 dark:bg-yellow-600";
  } else if (rating <= 9) {
    return "bg-lime-500 dark:bg-lime-700";
  } else {
    return "bg-lime-400 dark:bg-lime-600";
  }
};

const MediaReviews = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const filterType = filterTabIndex(selectedTab);

  const tabs = categories.map((item, index) => {
    return (
      <button
        className={
          "md:text-2xl px-4 pb-1 relative before:content-[''] before:absolute before:mt-2 before:block before:w-full before:h-[3px] before:bottom-0 before:-translate-x-1/2 before:left-1/2 before:bg-black dark:before:bg-slate-50 before:scale-x-0 before:transition before:ease-in-out before:duration-300" +
          (selectedTab == index ? " before:scale-x-100" : "")
        }
        key={index}
        onClick={() => {
          setSelectedTab(index);
        }}
      >
        {item}
      </button>
    );
  });

  const reviews = Reviews.filter((item) => item.type == filterType).map(
    (item: ReviewItem, index) => {
      const reviewParagraphs = item.review?.map((para, index) => {
        return <p key={index}>{para}</p>;
      });
      const subReviews = item.reviewSubItems?.map((subItem, index) => {
        const subReviewParagraphs = subItem.review?.map((c, index) => {
          return <p key={index}>{c}</p>;
        });
        return (
          <div
            key={index}
            className="bg-slate-100 dark:bg-zinc-900 p-4 md:p-8 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <div className="font-bold text-xl w-4/5">{subItem.name}</div>
              <div
                className={`rounded-full w-8 h-8 flex ${ratingColour(
                  subItem.rating
                )}`}
              >
                <p className="m-auto font-bold">{subItem.rating}</p>
              </div>
            </div>
            {subItem.image !== undefined && (
              <div className="w-full h-36 md:h-72 relative my-4">
                <Image
                  alt="Cover Image"
                  src={subItem.image}
                  fill={true}
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
            <div className="flex flex-col gap-2">{subReviewParagraphs}</div>
          </div>
        );
      });

      return (
        <div
          key={index}
          className="bg-slate-50 dark:bg-slate-800 p-4 md:p-8 w-full md:w-5/6 lg:w-2/3 2xl:w-1/2 rounded-lg animate-fade"
        >
          <div className="flex justify-between items-center">
            <div className="font-bold text-2xl w-4/5">{item.name}</div>
            <div
              className={`rounded-full text-2xl w-12 h-12 flex ${ratingColour(
                item.rating
              )}`}
            >
              <p className="m-auto font-bold">{item.rating}</p>
            </div>
          </div>
          {item.image !== undefined && (
            <div className="w-full h-36 md:h-72 relative my-4">
              <Image
                alt="Cover Image"
                src={item.image}
                fill={true}
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
          <div className="flex flex-col gap-2">{reviewParagraphs}</div>
          <div className="flex flex-col py-4 md:p-4 gap-4 md:gap-8">
            {subReviews}
          </div>
        </div>
      );
    }
  );

  return (
    <div>
      <Navbar fixed={true} />
      <h1 className="text-center mt-20">Media Reviews</h1>
      <div className="flex gap-2 md:gap-6 justify-center my-4 flex-wrap">
        {tabs}
      </div>
      <div className="flex flex-col gap-8 items-center px-4 mb-12">
        {reviews}
      </div>
    </div>
  );
};

export default MediaReviews;

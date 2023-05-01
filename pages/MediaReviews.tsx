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
      return "book";
  }
};

const MediaReviews = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const filterType = filterTabIndex(selectedTab);

  const tabs = categories.map((item, index) => {
    return (
      <button
        className={
          "md:text-2xl p-4 rounded-lg transition-all " +
          (selectedTab == index ? " bg-white dark:bg-black" : "")
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
              <div className="font-bold text-xl">{subItem.name}</div>
              <div>{subItem.rating}/10</div>
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
          className="bg-slate-50 dark:bg-slate-900 p-4 md:p-8 w-full md:w-4/6 lg:w-1/2 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <div className="font-bold text-2xl">{item.name}</div>
            <div>{item.rating}/10</div>
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
          <div className="flex flex-col p-4 gap-4">{subReviews}</div>
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

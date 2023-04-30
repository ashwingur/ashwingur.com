import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Reviews from "../data/Reviews.json";

interface ReviewItem {
  type: string;
  name: string;
  image?: string;
  review?: string;
  rating: number;
  reviewSubItems?: ReviewSubItem[];
}

interface ReviewSubItem {
  name: string;
  image?: string;
  review?: string;
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
          "text-2xl p-4 rounded-lg transition-all " +
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
    (item, index) => {
      return (
        <div
          key={index}
          className="bg-slate-50 dark:bg-slate-900 p-4 w-full md:w-4/6 lg:w-1/2 rounded-lg"
        >
          <div className="flex justify-between">
            <div className="font-bold">{item.name}</div>
            <div>{item.rating}/10</div>
          </div>
          <div>{item.review}</div>
        </div>
      );
    }
  );

  return (
    <div>
      <Navbar fixed={true} />
      <h1 className="text-center mt-20">Media Reviews</h1>
      <div className="flex gap-6 justify-center my-4">{tabs}</div>
      <div className="flex flex-col items-center px-4">{reviews}</div>
    </div>
  );
};

export default MediaReviews;

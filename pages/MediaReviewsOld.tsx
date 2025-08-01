import React, { useEffect, useState } from "react";
import Navbar from "../components/navbars/Navbar";
import Reviews from "../data/Reviews.json";
import Image from "next/image";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineDown,
} from "react-icons/ai";
import { Combobox } from "@headlessui/react";
import { IoMdArrowRoundUp } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import Card from "@components/Card";
import Link from "next/link";

interface ReviewItem {
  type: string;
  name: string;
  image?: string;
  review?: string[];
  rating?: number;
  reviewSubItems?: ReviewSubItem[];
  date?: ReviewDate;
}

interface ReviewSubItem {
  name: string;
  image?: string;
  review?: string[];
  rating?: number;
  date?: ReviewDate;
}

interface ReviewDate {
  year?: number;
  month?: number;
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

const monthNumberToString = (month: number): string => {
  switch (month) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "";
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
  } else if (rating < 10) {
    return "bg-lime-500 dark:bg-lime-700";
  } else {
    return "bg-lime-400 dark:bg-lime-600";
  }
};

// Given a review paragraph string, return the tailwindcss class name, and the rest of the string
const reviewParagraphClassName = (paragraph: string): [string, string] => {
  let className = "";
  if (paragraph.indexOf("<center>") !== -1) {
    className += " mx-4 md:mx-8 lg:mx-12 text-center";
    paragraph = paragraph.replace("<center>", "");
  }
  if (paragraph.indexOf("<end>") !== -1) {
    className += " mx-4 md:mx-8 lg:mx-12 text-end";
    paragraph = paragraph.replace("<end>", "");
  }
  if (paragraph.indexOf("<justify>") !== -1) {
    className += " mx-4 md:mx-8 lg:mx-12 text-justify";
    paragraph = paragraph.replace("<justify>", "");
  }
  if (paragraph.indexOf("<italic>") !== -1) {
    className += " italic";
    paragraph = paragraph.replace("<italic>", "");
  }
  if (paragraph.indexOf("<underline>") !== -1) {
    className += " underline";
    paragraph = paragraph.replace("<underline>", "");
  }
  if (paragraph.indexOf("<bold>") !== -1) {
    className += " font-bold";
    paragraph = paragraph.replace("<bold>", "");
  }
  if (paragraph.indexOf("<lg>") !== -1) {
    className += " text-lg";
    paragraph = paragraph.replace("<lg>", "");
  }
  if (paragraph.indexOf("<xl>") !== -1) {
    className += " text-xl";
    paragraph = paragraph.replace("<xl>", "");
  }
  if (paragraph.indexOf("<small>") !== -1) {
    className += " text-sm";
    paragraph = paragraph.replace("<small>", "");
  }

  return [className, paragraph];
};

const calculateAverageRating = (data: ReviewItem[]): number => {
  let total = 0;
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    const rating = data[i].rating;
    if (rating !== undefined) {
      total += rating;
      count++;
    }
  }

  return count == 0 ? 0 : total / count;
};

const MediaReviews = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const filterType = filterTabIndex(selectedTab);
  const [showImages, setShowImages] = useState(true);
  const [sortAtoZ, setSortAtoZ] = useState<null | boolean>(true);
  const [sortRatingDescending, setSortRatingDescending] = useState<
    null | boolean
  >(null);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // The text that is currently typed in, doesn't have to be a valid name
  const [selectedSearch, setSelectedSearch] = useState(""); // The name of an actual item in the list
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    // Retrieving from local storage if the preference was set
    const showImages = localStorage.getItem("showImages");
    if (showImages) {
      setShowImages(showImages === "false" ? false : true);
    }
    setPreferencesLoaded(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tabs = categories.map((item, index) => {
    return (
      <button
        className={
          "relative px-4 pb-1 before:absolute before:bottom-0 before:left-1/2 before:mt-2 before:block before:h-[3px] before:w-full before:-translate-x-1/2 before:bg-accent before:transition before:duration-300 before:ease-in-out before:content-[''] md:text-2xl" +
          (selectedTab == index ? " before:scale-x-100" : " before:scale-x-0")
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

  const categoryFilteredReviews = Reviews.filter(
    (item) => item.type == filterType,
  ); // All the reviews for the selected tab. We can use this to calculate the average rating of the selected category etc.

  const reviews = Reviews.filter(
    (item) =>
      item.type == filterType &&
      (selectedSearch === ""
        ? true
        : item.name === selectedSearch ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.reviewSubItems?.some((subReview) =>
            subReview.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )), // If user searches for subReviewItem then also return that parent review
  ).sort((r1, r2) => {
    if (sortRatingDescending !== null) {
      if (r1.rating === undefined && r2.rating === undefined) {
        return 0;
      }
      if (r1.rating === undefined) {
        return 1;
      } else if (r2.rating === undefined) {
        return -1;
      }
      if (sortRatingDescending) {
        return r2.rating - r1.rating;
      } else {
        return r1.rating - r2.rating;
      }
    }
    if (sortAtoZ) {
      return r1.name.localeCompare(r2.name);
    } else {
      return -r1.name.localeCompare(r2.name);
    }
  });

  const reviewCards = reviews.map((item: ReviewItem, index) => {
    const reviewParagraphs = item.review?.map((mainReviewParagraph, index) => {
      const [paraClassName, para] =
        reviewParagraphClassName(mainReviewParagraph);
      return (
        <p className={paraClassName} key={index}>
          {para}
        </p>
      );
    });
    const subReviews = item.reviewSubItems?.map((subItem, index) => {
      const subReviewParagraphs = subItem.review?.map((subParagraph, index) => {
        const [subParaClassName, subPara] =
          reviewParagraphClassName(subParagraph);
        return (
          <p className={subParaClassName} key={index}>
            {subPara}
          </p>
        );
      });
      return (
        <Card key={index} firstLayer={false}>
          <div className="mb-4 flex items-center justify-between">
            <div className="w-4/5 text-xl md:text-2xl">
              <div className="font-bold">{subItem.name}</div>
              <div className="text-sm">
                {monthNumberToString(subItem.date?.month ?? -1)}{" "}
                {subItem.date?.year}
              </div>
            </div>
            {subItem.rating && (
              <div
                className={`flex h-10 w-10 rounded-full ${ratingColour(
                  subItem.rating,
                )}`}
              >
                <p className="m-auto text-xl font-bold text-slate-800">
                  {subItem.rating}
                </p>
              </div>
            )}
          </div>
          {subItem.image !== undefined && showImages && (
            <div className={"relative my-4 h-36 w-full md:h-72"}>
              <Image
                unoptimized
                alt="Cover Image"
                src={subItem.image}
                fill={true}
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
          <div className="flex flex-col gap-4">{subReviewParagraphs}</div>
        </Card>
      );
    });

    return (
      <Card
        key={index}
        className="card w-full animate-fade md:w-5/6 lg:w-2/3 2xl:w-1/2"
        firstLayer={true}
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="w-4/5">
            <div className="text-2xl font-bold md:text-3xl">{item.name}</div>
            <div className="text-md">
              {monthNumberToString(item.date?.month ?? -1)} {item.date?.year}
            </div>
          </div>
          {item.rating && (
            <div
              className={`flex h-14 w-14 rounded-full text-2xl ${ratingColour(
                item.rating,
              )}`}
            >
              <p className="m-auto font-bold text-slate-800">{item.rating}</p>
            </div>
          )}
        </div>
        {item.image !== undefined && showImages && (
          <div className="relative my-4 h-36 w-full md:h-72">
            <Image
              unoptimized
              alt="Cover Image"
              src={item.image}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
        <div className="flex flex-col gap-6">{reviewParagraphs}</div>
        <div className="flex flex-col gap-6 py-4 md:gap-8 md:p-4">
          {subReviews}
        </div>
      </Card>
    );
  });

  const filteredReviewSearches = // The list of searches that appear in the dropdown bar
    searchQuery === ""
      ? reviews
      : reviews.filter((review) => {
          let nameInSubReview = review.reviewSubItems?.some((subReview) =>
            subReview.name.toLowerCase().includes(searchQuery.toLowerCase()),
          );
          let nameInReview = review.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          return nameInReview || nameInSubReview;
        });

  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <h1 className="pt-20 text-center">Media Reviews (OLD)</h1>
      <div className="my-4 flex justify-center">
        <Link className="text-3xl text-text-hover" href={"/MediaReviews"}>
          Click here for my new media review site
        </Link>
      </div>
      <p className="mx-4 text-center">
        A nonexhaustive list of all the media I have consumed over the years and
        my (highly subjective) reviews of them. May contain spoilers.
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          className="btn flex w-20 items-center justify-center md:w-32"
          onClick={() => {
            if (sortAtoZ === null) {
              setSortAtoZ(true);
            } else if (sortAtoZ === true) {
              setSortAtoZ(false);
            } else {
              setSortAtoZ(true);
            }
            setSortRatingDescending(null);
          }}
        >
          <div>A-Z</div>
          {sortAtoZ !== null &&
            (sortAtoZ ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />)}
        </button>
        <button
          className="btn flex w-20 items-center justify-center md:w-32"
          onClick={() => {
            if (sortRatingDescending === null) {
              setSortRatingDescending(true);
            } else if (sortRatingDescending === true) {
              setSortRatingDescending(false);
            } else {
              setSortRatingDescending(true);
            }
            setSortAtoZ(null);
          }}
        >
          <div>Rating</div>
          {sortRatingDescending !== null &&
            (sortRatingDescending ? (
              <AiOutlineArrowDown />
            ) : (
              <AiOutlineArrowUp />
            ))}
        </button>
        <button
          className="btn flex w-36 items-center justify-center md:w-40"
          onClick={() => {
            localStorage.setItem("showImages", showImages ? "false" : "true");
            setShowImages(!showImages);
          }}
        >
          {preferencesLoaded && (showImages ? "Hide Images" : "Show Images")}
        </button>
      </div>
      <div className="my-4 flex flex-wrap justify-center gap-2 md:gap-6">
        {tabs}
      </div>
      <div className="mx-auto my-4 w-72 md:w-96 lg:w-[30rem]">
        <Combobox
          value={selectedSearch}
          onChange={(val) => {
            setSearchQuery(val ?? "");
            setSelectedSearch(val ?? "");
          }}
        >
          <div className="relative cursor-default overflow-hidden rounded-lg text-left focus:outline-none">
            <Combobox.Input
              placeholder="Search"
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSelectedSearch(event.target.value);
                if (event.target.value === "") {
                  setSelectedSearch("");
                }
              }}
              displayValue={(review: string) => review}
              className="w-full rounded-lg bg-background-hover py-2 pl-3 pr-14 placeholder:text-text-muted focus:outline-none"
            />
            {(searchQuery !== "" || selectedSearch !== "") && (
              <button
                className="absolute inset-y-0 right-8"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSearch("");
                }}
              >
                <AiOutlineClose className="transition-all hover:text-xl" />
              </button>
            )}
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <AiOutlineDown className="h-5 w-5" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute z-50 mx-auto mt-1 max-h-60 w-72 overflow-auto rounded-lg bg-background-hover shadow-lg md:max-h-80 md:w-96 lg:w-[30rem]">
            {filteredReviewSearches.map((review) => (
              <Combobox.Option
                key={review.name}
                value={review.name}
                className={({ active }) =>
                  `cursor-pointer px-4 py-2 ${
                    active ? "bg-accent text-text-accent" : ""
                  }`
                }
              >
                {review.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </div>
      <div className="my-2 text-center text-lg">
        Average Rating:{" "}
        {calculateAverageRating(categoryFilteredReviews).toFixed(1)}
      </div>
      <div className="flex flex-col items-center gap-8 px-4 pb-12">
        {reviewCards}
      </div>
      <button
        className={
          "fixed bottom-0 right-0 mb-2 mr-2 rounded-full bg-accent text-text-accent transition-all hover:text-6xl dark:text-slate-200 md:mb-4 md:mr-4" +
          (scrollPosition === 0
            ? " scale-0"
            : " scale-100 hover:scale-110 md:hover:scale-125")
        }
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <IoMdArrowRoundUp className="text-5xl" />
      </button>
    </div>
  );
};

export default MediaReviews;

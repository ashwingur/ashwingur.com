import React from "react";
import GenerativeArtData from "../data/GenerativeArts.json";
import GenerativeArtCard from "./GenerativeArtCard";

const GenerativeArtProjects = () => {
  let artCards = GenerativeArtData.map((item, index) => (
    <GenerativeArtCard {...item} key={index} />
  ));

  return (
    <div className="flex justify-center items-center w-full 2xl:w-4/5 3xl:w-5/6 px-4 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 xl:gap-8">
        {artCards}
      </div>
    </div>
  );
};

export default GenerativeArtProjects;

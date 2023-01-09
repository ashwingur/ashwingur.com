/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

interface ProjectProps {
  title: string;
  image: string;
  description: string;
}

const ProjectCard = ({ title, image, description }: ProjectProps) => {
  return (
    <div className="flex flex-col justify-center rounded-2xl bg-white max-w-lg shadow-xl relative m-8 hover:bg-gray-100 hover:shadow-2xl cursor-pointer">
      {/* <Image
        src={image}
        alt="thumbnail"
        // width="0"
        // height="0"
        className="w-full"
        style={{ width: "100%" }}
      /> */}
      <img className="rounded-t-lg" src={image} alt="" />

      <div className="p-8">
        <h2 className="mb-2 text-2xl">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;

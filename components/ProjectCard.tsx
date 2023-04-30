/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

interface ProjectProps {
  title: string;
  image: string;
  description: string;
  stack: String[];
  links?: Link[];
}

interface Link {
  display: string;
  url: string;
}

const ProjectCard = ({
  title,
  image,
  description,
  stack,
  links,
}: ProjectProps) => {
  const stack_items = stack.map((item, index) => (
    <div key={index} className="bg-gray-200 dark:bg-gray-600 p-2 rounded-md">
      {item}
    </div>
  ));

  const link_items = links?.map((item, index) => (
    <div
      key={index}
      className="bg-blue-200 dark:bg-blue-800 p-2 rounded-md hover:bg-blue-400 dark:hover:bg-blue-600 transition-all"
    >
      <a href={item.url} target="_blank" rel="noreferrer">
        {item.display}
      </a>
    </div>
  ));

  return (
    <div className="flex flex-col justify-center rounded-2xl bg-stone-100 dark:bg-gray-900 max-w-lg shadow-xl relative m-8 p-4">
      <div className="w-full h-72 relative">
        <Image
          alt="Mountains"
          src={image}
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="px-4 md:py-4">
        <h2 className="mb-2 text-2xl">{title}</h2>
        <p>{description}</p>
        <h3 className="mt-4 text-xl">Languages and Frameworks</h3>
        <div className="flex gap-4 my-2 flex-wrap">{stack_items}</div>

        {links != undefined && (
          <div>
            <h3 className="mt-4 text-xl">Links</h3>
            <div className="flex gap-4 my-2 flex-wrap">{link_items}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;

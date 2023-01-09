/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

interface ProjectProps {
  id: number;
  title: string;
  image: string;
  description: string;
  github: string;
  stack: Array<String>;
}

const ProjectCard = ({
  id,
  title,
  image,
  description,
  github,
  stack,
}: ProjectProps) => {
  var stack_items = stack.map((item) => <span key={id}>{item}</span>);

  return (
    <div className="flex flex-col justify-center rounded-2xl bg-white max-w-lg shadow-xl relative m-8 hover:bg-gray-100 hover:shadow-2xl cursor-pointer">
      <a href={github} target="_blank" rel="noreferrer">
        <div className="w-full h-72 relative">
          <Image
            alt="Mountains"
            src={image}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="p-8">
          <h2 className="mb-2 text-2xl">{title}</h2>
          <p>{description}</p>
        </div>
        {stack_items}
      </a>
    </div>
  );
};

export default ProjectCard;

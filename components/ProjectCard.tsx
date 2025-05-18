/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@components/Card";

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
    <div
      key={index}
      className="tag rounded-md bg-secondary p-2 text-sm text-text-secondary"
    >
      {item}
    </div>
  ));

  const link_items = links?.map((item, index) => (
    <Link
      key={index}
      className="btn-accent text-sm"
      href={item.url}
      target="_blank"
      rel="noreferrer"
    >
      {item.display}
    </Link>
  ));

  return (
    <Card className="flex max-w-lg flex-col" firstLayer={true}>
      <div className="relative h-36 w-full md:h-72">
        <Image
          alt="Project thumbnail"
          src={image}
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="px-4 pt-2 md:py-4">
        <h2 className="mb-2 text-2xl">{title}</h2>
        <p className="text-sm">{description}</p>
        <h3 className="mt-4 text-xl">Tech Stack</h3>
        <div className="my-2 flex flex-wrap gap-4">{stack_items}</div>

        {links != undefined && (
          <div>
            <h3 className="mt-4 text-xl">Links</h3>
            <div className="my-2 flex flex-wrap gap-4">{link_items}</div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;

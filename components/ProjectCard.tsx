import React from "react";
import Image from "next/image";

interface ProjectProps {
  title: string;
  image: string;
  description: string;
}

const ProjectCard = ({ title, image, description }: ProjectProps) => {
  return (
    <div>
      <Image src={image} alt="/"></Image>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;

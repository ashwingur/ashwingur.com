import React from "react";
import ProjectData from "../data/Projects.json";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  let projectCards = ProjectData.map((item, index) => (
    <ProjectCard {...item} key={index} />
  ));

  return (
    <div
      id="projects"
      className="flex flex-col items-center px-4 pt-20 md:px-8"
    >
      <h1 className="text-center">Projects</h1>
      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16 2xl:grid-cols-3">
        {projectCards}
      </div>
    </div>
  );
};

export default Projects;

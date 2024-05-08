import React from "react";
import ProjectData from "../data/Projects.json";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  let projectCards = ProjectData.map((item, index) => (
    <ProjectCard {...item} key={index} />
  ));

  return (
    <div id="projects" className="pt-20 flex flex-col items-center ">
      <h1 className="text-center">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {projectCards}
      </div>
    </div>
  );
};

export default Projects;

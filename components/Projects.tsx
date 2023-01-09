import React from "react";
import ProjectData from "../data/Projects.json";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  var projectCards = ProjectData.map((item) => (
    <ProjectCard {...item} key={item.id} />
  ));

  return (
    <div id="projects" className="pt-20 flex flex-col items-center ">
      <h1 className="text-center">Projects</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2">{projectCards}</div>
    </div>
  );
};

export default Projects;

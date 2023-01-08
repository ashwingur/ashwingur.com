import React from "react";
import ProjectData from "../data/Projects.json";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  var projectCards = ProjectData.map((item) => (
    <ProjectCard {...item} key={item.id} />
  ));

  return (
    <div id="projects" className="h-screen pt-20">
      <h1 className="text-center">Projects</h1>
      {projectCards}
    </div>
  );
};

export default Projects;

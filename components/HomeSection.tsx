/* eslint-disable react/no-unescaped-entities */
import React from "react";
import TypewriterComponent from "typewriter-effect";

const HomeSection = () => {
  return (
    <div id="home" className="pt-24">
      <div className="text-2xl md:text-2xl lg:text-6xl font-mono text-center">
        <TypewriterComponent
          onInit={(typewriter) => {
            typewriter.typeString("> Hello, I'm Ashwin Gur").start();
          }}
        />
      </div>
      <p className="text-center text-lg mt-8 mx-4">
        I am studying Bachelor of Mechatronics Engineering (Major: Space
        Engineering) and Bachelor of Science (Major: Computer Science) at The
        University of Sydney.
      </p>
    </div>
  );
};

export default HomeSection;

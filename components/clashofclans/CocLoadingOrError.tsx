import React from "react";
import CocNavBar from "./CocNavBar";

const CocLoadingOrError = ({
  info,
  heading,
}: {
  heading: String;
  info: JSX.Element;
}) => {
  return (
    <div className="bg-clash min-h-screen pb-4">
      <CocNavBar />
      <h2 className="clash-font-style pt-20 text-center font-thin">
        {heading}
      </h2>
      {info}
    </div>
  );
};

export default CocLoadingOrError;

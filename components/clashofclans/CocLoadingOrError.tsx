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
    <div className="bg-gradient-to-b from-[#8c94ac] to-[#6c779b] min-h-screen pb-4">
      <CocNavBar />
      <h2 className="text-center pt-20 clash-font-style font-thin">
        {heading}
      </h2>
      {info}
    </div>
  );
};

export default CocLoadingOrError;

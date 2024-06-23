import FrontendVisits from "@components/Analytics/FrontendVisits";
import Navbar from "@components/navbars/Navbar";
import React from "react";

const Analytics = () => {
  return (
    <div>
      <Navbar fixed={true} />
      <div className="flex flex-col mx-auto pt-24 pb-8 md:w-4/5 gap-8">
        <h3 className="text-center italic">(In Progress)</h3>
        <FrontendVisits />
      </div>
    </div>
  );
};

export default Analytics;

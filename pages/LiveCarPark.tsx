import Card from "@components/Card";
import LoadingIcon from "@components/LoadingIcon";
import Navbar from "@components/navbars/Navbar";
import { useRouter } from "next/router";
import React from "react";
import { useLatestParkingData } from "shared/queries/transportopendata";

const LiveCarPark = () => {
  const heading = "Live Parking Data";
  const router = useRouter();
  const { isLoading, isError, data } = useLatestParkingData();

  if (isError) {
    return (
      <div className="min-h-screen">
        <Navbar fixed={true} />
        <h1 className="pb-4 pt-20 text-center">{heading}</h1>
        <p className="text-center">Error fetching parking data.</p>
      </div>
    );
  }
  if (isLoading || data === undefined) {
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <h1 className="pb-4 pt-20 text-center">{heading}</h1>
      <LoadingIcon />
    </div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <h1 className="pb-4 pt-20 text-center">Live Parking Data</h1>
      {JSON.stringify(data)}
    </div>
  );
};

export default LiveCarPark;

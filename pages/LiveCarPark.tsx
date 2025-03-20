import Card from "@components/Card";
import LoadingIcon from "@components/LoadingIcon";
import Navbar from "@components/navbars/Navbar";
import { isDark } from "@components/ToggleThemeButton";
import TimeSeriesChart from "@components/weather/TimeSeriesChart";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLatestParkingData } from "shared/queries/transportopendata";

const LiveCarPark = () => {
  const heading = "Live Parking Data";
  const { theme } = useTheme();
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
    return (
      <div className="min-h-screen">
        <Navbar fixed={true} />
        <h1 className="pb-4 pt-20 text-center">{heading}</h1>
        <LoadingIcon className="mx-auto text-4xl" />
      </div>
    );
  }

  const parkingCards = data
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item, index) => {
      const occupied = Math.min(item.occupancy, item.capacity);
      const percentOccupied = occupied / item.capacity;
      let bgClassName = isDark(theme) ? "bg-green-600" : "bg-green-500";
      if (percentOccupied >= 0.85) {
        bgClassName = isDark(theme) ? "bg-red-700" : "bg-red-600";
      } else if (percentOccupied >= 0.5) {
        bgClassName = isDark(theme) ? "bg-amber-500" : "bg-amber-500";
      }
      return (
        <Link key={index} href={`LiveCarPark/${item.facility_id}`}>
          <Card firstLayer={true} className="hover:outline">
            <div className="group flex justify-between">
              <div className="flex">
                <div
                  className={clsx(
                    "mr-2 h-full w-4 rounded-md md:mr-4",
                    bgClassName,
                  )}
                />
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <p className="font-bold">
                      {item.name.replace(/^Park&Ride - /, "")}
                    </p>
                  </div>
                  <p>
                    Occupied: {occupied}/{item.capacity}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl">{item.capacity - occupied}</p>
                <p className="text-sm">Available</p>
              </div>
            </div>
          </Card>
        </Link>
      );
    });

  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <h1 className="pb-4 pt-20 text-center">Live Parking Data</h1>
      <p className="mb-4 text-center text-sm italic">
        Data sourced from{" "}
        <Link
          className="text-text-hover"
          href="https://opendata.transport.nsw.gov.au/dataset/car-park-api"
          target="_blank"
          rel="noreferrer"
        >
          Transport Opendata
        </Link>
        . The API does not guarantee the values to be accurate at all times.
      </p>
      <div className="mx-4 grid grid-cols-1 gap-4 md:mx-16 md:grid-cols-2 xl:mx-24 xl:grid-cols-3 2xl:grid-cols-4">
        {parkingCards}
      </div>
    </div>
  );
};

export default LiveCarPark;

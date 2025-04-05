import Card from "@components/Card";
import LoadingIcon from "@components/LoadingIcon";
import Navbar from "@components/navbars/Navbar";
import { isDark } from "@components/ToggleThemeButton";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { useLatestParkingData } from "shared/queries/transportopendata";

interface ParkingGridProps {
  className?: string;
}

const ParkingGrid: React.FC<ParkingGridProps> = ({ className }) => {
  const { theme } = useTheme();
  const { isLoading, isError, data, error } = useLatestParkingData();

  if (isError) {
    return (
      <div>
        <p className="text-center text-error">
          Error fetching parking data: {error instanceof Error && error.message}
        </p>
      </div>
    );
  }
  if (isLoading || data === undefined) {
    return <LoadingIcon className="mx-auto text-4xl" />;
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
                <div className="relative mr-2 w-4 rounded-md bg-black md:mr-4">
                  {/* Colored bar inside the black background */}
                  <div
                    className={clsx(
                      "absolute bottom-0 left-0 right-0 rounded-sm",
                      bgClassName,
                    )}
                    style={{ height: `${percentOccupied * 100}%` }}
                  />
                </div>
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

  return <div className={className}> {parkingCards}</div>;
};

export default ParkingGrid;

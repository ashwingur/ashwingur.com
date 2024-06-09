import axios from "axios";
import Navbar from "../components/navbars/Navbar";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ParkingFacility } from "../shared/interfaces/parking.interface";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

const fetchParkingIDs = (
  setLastFetchTime: Dispatch<SetStateAction<string>>
) => {
  setLastFetchTime(new Date().toLocaleTimeString().toLocaleUpperCase());
  return axios
    .get<ParkingFacility[]>("/api/opendata/carpark/all")
    .then(({ data }) =>
      data.sort((a, b) => a.facility_name.localeCompare(b.facility_name))
    );
};

interface ParkingBoxProps {
  facility: ParkingFacility;
}

const ParkingBox = ({ facility }: ParkingBoxProps) => {
  let backgroundColour = "bg-green-400 dark:bg-green-800";
  // Sometimes there are are more occupied than parking spots in the api, cap it at max spots
  const occupied = Number(
    facility.occupancy.total > facility.spots
      ? facility.spots
      : facility.occupancy.total
  );

  const percentageOccupied = occupied / Number(facility.spots);
  if (percentageOccupied >= 0.9) {
    backgroundColour = "bg-red-400 dark:bg-red-800";
  } else if (percentageOccupied >= 0.5) {
    backgroundColour = "bg-orange-300 dark:bg-amber-700";
  }

  return (
    <div
      className={`${backgroundColour} rounded-lg p-4 flex justify-between items-center text-slate-900 shadow-md`}
    >
      <div>
        <div className="font-bold">{facility.facility_name}</div>
        <div>
          Occupied: {occupied}/{facility.spots} (
          {Math.round(percentageOccupied * 100)}%)
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-2xl">{Number(facility.spots) - occupied}</div>
        <div className="text-sm">Available</div>
      </div>
    </div>
  );
};

const LoadingState = () => {
  return (
    <div className="h-screen">
      <Navbar fixed={true} />
      <h1 className="text-center pt-20 pb-4">NSW Live Car Park Data</h1>
      <LoadingIcon className="mx-auto" />
    </div>
  );
};

const LoadingIcon = ({ className }: { className?: string }) => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className={`${className} w-8 h-8 text-transparent animate-spin dark:text-gray-600 fill-cyan-900`}
        viewBox="0 0 100 101"
        fill="none"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const NSWCarPark = () => {
  const router = useRouter();
  const [lastFetchTime, setLastFetchTime] = useState<string>("");
  const { isLoading, error, data } = useQuery<ParkingFacility[]>({
    queryFn: () => fetchParkingIDs(setLastFetchTime),
    enabled: router.isReady,
    staleTime: 60000,
    refetchInterval: 60000,
  });

  if (error instanceof Error) return <LoadingState />;

  if (isLoading || data === undefined) return <LoadingState />;

  const parkingBoxes = data.map((facility, index) => (
    <ParkingBox key={index} facility={facility} />
  ));

  return (
    <div className="">
      <Navbar fixed={true} />
      <h1 className="text-center pt-20 pb-4">NSW Live Car Park Data</h1>
      <p className="text-center">Last update: {lastFetchTime}</p>
      <p className="text-center text-sm italic mb-4">
        Data sourced from{" "}
        <a
          className="text-text-hover"
          href="https://opendata.transport.nsw.gov.au/dataset/car-park-api"
          target="_blank"
          rel="noreferrer"
        >
          Transport Opendata
        </a>
        . The API does not guarantee the values to be accurate at all times.
      </p>
      <div className="grid grid-cols-1 gap-4 mx-4 md:mx-16 md:grid-cols-2 sm:grid-cols-1 pb-8">
        {parkingBoxes}
      </div>
    </div>
  );
};

export default NSWCarPark;

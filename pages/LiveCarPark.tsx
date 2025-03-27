import Navbar from "@components/navbars/Navbar";
import ParkingGrid from "@components/transportopendata/ParkingGrid";
import ServiceInfoGrid from "@components/transportopendata/ServiceInfoGrid";
import Link from "next/link";

const LiveCarPark = () => {
  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <h1 className="pb-4 pt-20 text-center">Live Parking Data</h1>
      <p className="mb-4 px-4 text-center text-sm italic">
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
      <ServiceInfoGrid className="mx-4 mb-8 grid grid-cols-1 gap-4 md:mx-16 md:grid-cols-2 xl:mx-24 xl:grid-cols-3 2xl:grid-cols-4" />
      <ParkingGrid className="mx-4 grid grid-cols-1 gap-4 md:mx-16 md:grid-cols-2 xl:mx-24 xl:grid-cols-3 2xl:grid-cols-4" />
    </div>
  );
};

export default LiveCarPark;

import Card from "@components/Card";
import DateTimeRangePicker from "@components/DateTimeRangePicker";
import GenericListbox from "@components/GenericListBox";
import LoadingIcon from "@components/LoadingIcon";
import Navbar from "@components/navbars/Navbar";
import TimeSeriesChart from "@components/weather/TimeSeriesChart";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useParkingHistory } from "shared/queries/transportopendata";
import { createTimeOptions, TimeOption } from "shared/timeoptions";

const FacilityHistory = () => {
  const router = useRouter();

  const facilityId =
    typeof router.query?.facilityId === "string"
      ? router.query.facilityId
      : undefined;

  const timeOptions = createTimeOptions({
    hoursOptions: [1, 24],
    daysOptions: [3, 7, 31, 90, 180],
    yearsOptions: [1],
    includeCustom: true,
  });
  // Listbox props
  const [selectedTimeOption, setSelectedTimeOption] = useState(timeOptions[2]);
  const displayTimeOption = (option: TimeOption) => option.display;
  const handleSelectedTimeChange = (timeOption: TimeOption) => {
    setSelectedTimeOption(timeOption);
  };

  // Date range picker prop
  const onDateTimeChange = (
    startLessThanEnd: boolean,
    start?: Date,
    end?: Date,
  ) => {
    if (start && end) {
      setSelectedTimeOption((prev) => ({
        ...prev,
        startTime: start,
        endTime: end,
      }));
    }
  };

  const { isLoading, isError, data } = useParkingHistory(
    Number(facilityId),
    selectedTimeOption.startTime,
    selectedTimeOption.endTime,
  );

  console.log(isLoading, isError, data);

  if (isError) {
    return (
      <div className="min-h-screen">
        <Navbar fixed={true} />
        <p className="pb-4 pt-20 text-center">Error fetching parking data.</p>
      </div>
    );
  }
  if (isLoading || data === undefined) {
    return (
      <div className="min-h-screen">
        <Navbar fixed={true} />
        <LoadingIcon className="mx-auto pb-4 pt-20 text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <h1 className="pb-4 pt-20 text-center">
        {data.facility_name.replace(/^Park&Ride - /, "")}
      </h1>
      <div className="flex justify-center">
        <Link className="btn my-4 w-32" href="/LiveCarPark">
          Back
        </Link>
      </div>
      <Card firstLayer={true} className="mx-4 md:mx-auto md:w-4/5">
        <div className="z-20 flex flex-col items-center">
          <h3 className="mb-2 text-xl">Time Filter</h3>
          <GenericListbox<TimeOption>
            selectedValue={selectedTimeOption}
            onSelectedValueChange={handleSelectedTimeChange}
            options={timeOptions}
            displayValue={displayTimeOption}
            maxHeightClass="lg:max-h-none"
          />
          {selectedTimeOption.id === 0 && (
            <div>
              <DateTimeRangePicker
                onDateTimeChange={onDateTimeChange}
                className="z-20 mb-4 mt-2"
                defaultStartTime={timeOptions[0].startTime}
                defaultEndTime={timeOptions[0].endTime}
              />
              {selectedTimeOption.startTime > selectedTimeOption.endTime && (
                <p className="text-center font-bold text-error">
                  Start date must be less than end date
                </p>
              )}
            </div>
          )}
        </div>
        <div className="mt-2 flex items-center justify-center gap-4 md:gap-8">
          <p>
            <span className="font-bold">Current:</span> {data.latest_occupancy}
          </p>
          <p>
            <span className="font-bold">Min: </span>
            {data.min_occupancy}
          </p>
          <p>
            <span className="font-bold">Max: </span>
            {data.max_occupancy}
          </p>
        </div>
        <div className="mt-4 px-4">
          <TimeSeriesChart
            timestamps={data.historical_data.map(
              (i) => new Date(i.time).getTime() / 1000,
            )}
            values={data.historical_data.map((i) => i.occupied)}
            title={"Parking History"}
            yLabel={"Cars"}
          />
        </div>
      </Card>
    </div>
  );
};

export default FacilityHistory;

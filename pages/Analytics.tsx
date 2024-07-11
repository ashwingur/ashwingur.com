import BackendRequests from "@components/Analytics/BackendRequests";
import FrontendVisits from "@components/Analytics/FrontendVisits";
import DateTimeRangePicker from "@components/DateTimeRangePicker";
import GenericListbox from "@components/GenericListBox";
import Navbar from "@components/navbars/Navbar";
import React, { useState } from "react";
import { TimeOption, createTimeOptions } from "shared/timeoptions";

const Analytics = () => {
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
    end?: Date
  ) => {
    if (start && end) {
      setSelectedTimeOption((prev) => ({
        ...prev,
        startTime: start,
        endTime: end,
      }));
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <div className="flex flex-col mx-auto pt-24 pb-8 md:w-4/5 gap-8 px-4 items-center max-h">
        <div className="flex flex-col items-center">
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
                className="mt-2 mb-4"
                defaultStartTime={timeOptions[0].startTime}
                defaultEndTime={timeOptions[0].endTime}
              />
              {selectedTimeOption.startTime > selectedTimeOption.endTime && (
                <p className="font-bold text-center">
                  Start date must be less than end date
                </p>
              )}
            </div>
          )}
        </div>
        <FrontendVisits
          startTime={selectedTimeOption.startTime}
          endTime={selectedTimeOption.endTime}
          className="self-stretch"
        />
        <BackendRequests
          startTime={selectedTimeOption.startTime}
          endTime={selectedTimeOption.endTime}
          className="self-stretch"
        />
      </div>
    </div>
  );
};

export default Analytics;

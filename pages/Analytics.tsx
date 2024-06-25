import BackendRequests from "@components/Analytics/BackendRequests";
import FrontendVisits from "@components/Analytics/FrontendVisits";
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
  const [selectedTimeOption, setSelectedTimeOption] = useState(timeOptions[2]);

  const displayTimeOption = (option: TimeOption) => option.display;

  const handleSelectedTimeChange = (timeOption: TimeOption) => {
    if (timeOption.id === 0) {
      // Set custom time from date picker
    }
    setSelectedTimeOption(timeOption);
  };

  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <div className="flex flex-col mx-auto pt-24 pb-8 md:w-4/5 gap-8 px-4 items-center max-h">
        <h3 className="text-center italic">(In Progress)</h3>
        <GenericListbox<TimeOption>
          selectedValue={selectedTimeOption}
          onSelectedValueChange={handleSelectedTimeChange}
          options={timeOptions}
          displayValue={displayTimeOption}
          maxListBoxHeight="lg:max-h-none"
        />
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

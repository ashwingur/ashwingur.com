import DateTimeRangePicker from "@components/DateTimeRangePicker";
import GenericListbox from "@components/GenericListBox";
import React, { useState } from "react";
import { SpinningCircles } from "react-loading-icons";
import { usePlayerHistory } from "shared/queries/clashofclans";
import { createTimeOptions, TimeOption } from "shared/timeoptions";

interface CocPlayerHistoryProps {
  tag: string;
}

const CocPlayerHistory: React.FC<CocPlayerHistoryProps> = ({ tag }) => {
  const timeOptions = createTimeOptions({
    hoursOptions: [],
    daysOptions: [7, 31, 90, 180],
    yearsOptions: [1],
    includeCustom: true,
  });
  // Listbox props
  const [selectedTimeOption, setSelectedTimeOption] = useState(timeOptions[1]);
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

  const { isLoading, isError, data, error } = usePlayerHistory(
    tag,
    selectedTimeOption.startTime,
    selectedTimeOption.endTime,
  );

  if (isError) {
    return (
      <div className="pt-20">
        <p className="text-center font-coc text-xl text-error">
          Error fetching player history: {(error as Error).message}
        </p>
      </div>
    );
  }
  if (isLoading || data === undefined) {
    <div className="mt-20">
      return <SpinningCircles className="mx-auto mt-8" />;
    </div>;
  }

  return (
    <div className="font-clash font-thin">
      <h1 className="pb-4 pt-20 text-center">Player History</h1>
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
      {JSON.stringify(data)}
    </div>
  );
};

export default CocPlayerHistory;

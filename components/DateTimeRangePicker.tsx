import clsx from "clsx";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import DateTimePicker from "./DateTimePicker";

interface DateTimeRangePickerProps {
  onDateTimeChange: (
    startLessThanEnd: boolean,
    start?: Date,
    end?: Date
  ) => void;
  defaultStartTime?: Date;
  defaultEndTime?: Date;
  className?: string;
}

const getDefaultDateTimes = () => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(now.getHours() - 24);

  return {
    defaultStart: start,
    defaultEnd: now,
  };
};

const DateTimeRangePicker: React.FC<DateTimeRangePickerProps> = ({
  onDateTimeChange,
  defaultStartTime,
  defaultEndTime,
  className,
}) => {
  const { defaultStart, defaultEnd } = getDefaultDateTimes();
  const [startDatetime, setStartDatetime] = useState<Date | undefined>(
    defaultStartTime ?? defaultStart
  );
  const [endDatetime, setEndDatetime] = useState<Date | undefined>(
    defaultEndTime ?? defaultEnd
  );

  const onStartTimeChange = (start?: Date) => {
    setStartDatetime(start);
    onDateTimeChange(
      start && endDatetime ? start < endDatetime : false,
      start,
      endDatetime
    );
  };
  const onEndTimeChange = (end?: Date) => {
    setEndDatetime(end);
    onDateTimeChange(
      startDatetime && end ? startDatetime < end : false,
      startDatetime,
      end
    );
  };

  return (
    <div
      className={clsx(
        className,
        "flex flex-col lg:flex-row items-center justify-center gap-2 md:gap-8"
      )}
    >
      <DateTimePicker
        onDatetimeChange={onStartTimeChange}
        defaultTime={startDatetime}
        label="Start"
      />
      <DateTimePicker
        onDatetimeChange={onEndTimeChange}
        defaultTime={endDatetime}
        label="End"
      />
    </div>
  );
};

export default DateTimeRangePicker;

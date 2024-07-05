import React, { useEffect, useState } from "react";
import { isDark } from "./ToggleThemeButton";
import { useTheme } from "next-themes";
import clsx from "clsx";

interface DateTimePickerProps {
  onDatetimeChange: (datetime?: Date) => void;
  defaultTime?: Date;
  label?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  dateOnly?: boolean;
}

const formatDateTimeLocal = (date: Date, dateOnly: boolean) => {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (dateOnly) {
    return `${year}-${month}-${day}`;
  }

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onDatetimeChange,
  defaultTime,
  label,
  className,
  labelClassName,
  inputClassName = "input",
  dateOnly = false,
}) => {
  const { theme } = useTheme();
  const [datetime, setDatetime] = useState(
    defaultTime ? formatDateTimeLocal(defaultTime, dateOnly) : ""
  );

  const handleEndDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatetime(e.target.value);
    const newDate = new Date(e.target.value);
    const isNan = isNaN(newDate.getTime());
    onDatetimeChange(isNan ? undefined : newDate);
  };

  return (
    <div className={clsx(className, "flex items-center gap-2")}>
      {label && (
        <label
          className={clsx(
            labelClassName,
            "text-sm md:text-base w-12 lg:w-auto"
          )}
        >
          {label}
        </label>
      )}
      <input
        type={dateOnly ? "date" : "datetime-local"}
        value={datetime}
        onChange={handleEndDateTimeChange}
        className={inputClassName}
        style={{ colorScheme: isDark(theme) ? "dark" : "light" }}
      />
    </div>
  );
};

export default DateTimePicker;

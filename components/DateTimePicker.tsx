import React, { useEffect, useState } from "react";
import { isDark } from "./ToggleThemeButton";
import { useTheme } from "next-themes";
import clsx from "clsx";

interface DateTimePickerProps {
  onDatetimeChange: (datetime: Date) => void;
  defaultTime?: Date;
  label?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const formatDateTimeLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onDatetimeChange,
  defaultTime = new Date(),
  label,
  className,
  labelClassName,
  inputClassName,
}) => {
  const { theme } = useTheme();
  const [datetime, setDatetime] = useState(formatDateTimeLocal(defaultTime));
  const handleEndDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatetime(e.target.value);
    onDatetimeChange(new Date(e.target.value));
  };

  // Call this once when the component mounts for the initial value
  useEffect(() => {
    onDatetimeChange(defaultTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        type="datetime-local"
        value={datetime}
        onChange={handleEndDateTimeChange}
        className={clsx(inputClassName ?? "input")}
        style={{ colorScheme: isDark(theme) ? "dark" : "light" }}
      />
    </div>
  );
};

export default DateTimePicker;

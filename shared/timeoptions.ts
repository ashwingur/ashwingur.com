// This can be used for a dropdown menu of time options and is compatible with the generic listbox
// The custom time option will always be ID 0

export interface TimeOption {
  id: number;
  display: string;
  startTime: Date;
  endTime: Date;
}

export const roundUpToNearestMinute = (date: Date): Date => {
  const roundedDate = new Date(date);
  roundedDate.setSeconds(0, 0);
  if (date.getSeconds() > 0 || date.getMilliseconds() > 0) {
    roundedDate.setMinutes(date.getMinutes() + 1);
  }
  return roundedDate;
};

const now = new Date();

interface TimeOptionsInput {
  minutesOptions?: number[];
  hoursOptions?: number[];
  daysOptions?: number[];
  yearsOptions?: number[];
  includeCustom?: boolean;
  endTime?: Date;
}

export function createTimeOptions({
  minutesOptions = [],
  hoursOptions = [],
  daysOptions = [],
  yearsOptions = [],
  includeCustom = false,
  endTime = roundUpToNearestMinute(new Date()),
}: TimeOptionsInput): TimeOption[] {
  const options: TimeOption[] = [];
  let idCounter = 0;

  if (includeCustom) {
    options.push({
      id: idCounter++,
      display: "Custom",
      startTime: new Date(endTime.getTime() - 24 * 60 * 60 * 1000), // Default custom range: Last 24 hours
      endTime: endTime,
    });
  }

  minutesOptions.forEach((minutes) => {
    options.push({
      id: idCounter++,
      display: `Last ${minutes} Minute${minutes > 1 ? "s" : ""}`,
      startTime: new Date(endTime.getTime() - minutes * 60 * 1000),
      endTime: endTime,
    });
  });

  hoursOptions.forEach((hours) => {
    options.push({
      id: idCounter++,
      display: `Last ${hours} Hour${hours > 1 ? "s" : ""}`,
      startTime: new Date(endTime.getTime() - hours * 60 * 60 * 1000),
      endTime: endTime,
    });
  });

  daysOptions.forEach((days) => {
    options.push({
      id: idCounter++,
      display: `Last ${days} Day${days > 1 ? "s" : ""}`,
      startTime: new Date(endTime.getTime() - days * 24 * 60 * 60 * 1000),
      endTime: endTime,
    });
  });

  yearsOptions.forEach((years) => {
    options.push({
      id: idCounter++,
      display: `Last ${years} Year${years > 1 ? "s" : ""}`,
      startTime: new Date(
        endTime.getTime() - years * 365 * 24 * 60 * 60 * 1000
      ),
      endTime: endTime,
    });
  });

  return options;
}

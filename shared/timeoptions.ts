// This can be used for a dropdown menu of time options and is compatible with the generic listbox

export interface TimeOption {
  id: number;
  display: string;
  startTime: Date;
  endTime: Date;
}

const roundUpToNearestMinute = (date: Date): Date => {
  const roundedDate = new Date(date);
  roundedDate.setSeconds(0, 0);
  if (date.getSeconds() > 0 || date.getMilliseconds() > 0) {
    roundedDate.setMinutes(date.getMinutes() + 1);
  }
  return roundedDate;
};

const now = new Date();
const endTime = roundUpToNearestMinute(now);

const timeOptions: TimeOption[] = [
  {
    id: 0,
    display: "Custom",
    startTime: new Date(endTime.getTime() - 24 * 60 * 60 * 1000), // Last 24 hours as the default starting point
    endTime: endTime,
  },
  {
    id: 1,
    display: "Last 24 hours",
    startTime: new Date(endTime.getTime() - 24 * 60 * 60 * 1000),
    endTime: endTime,
  },
  {
    id: 2,
    display: "Last 3 Days",
    startTime: new Date(endTime.getTime() - 3 * 24 * 60 * 60 * 1000),
    endTime: endTime,
  },
  {
    id: 3,
    display: "Last 7 Days",
    startTime: new Date(endTime.getTime() - 7 * 24 * 60 * 60 * 1000),
    endTime: endTime,
  },
  {
    id: 4,
    display: "Last 14 Days",
    startTime: new Date(endTime.getTime() - 14 * 24 * 60 * 60 * 1000),
    endTime: endTime,
  },
  {
    id: 5,
    display: "Last 31 Days",
    startTime: new Date(endTime.getTime() - 31 * 24 * 60 * 60 * 1000),
    endTime: endTime,
  },
  {
    id: 6,
    display: "Last 90 Days",
    startTime: new Date(endTime.getTime() - 90 * 24 * 60 * 60 * 1000),
    endTime: endTime,
  },
  {
    id: 7,
    display: "Last 180 Days",
    startTime: new Date(endTime.getTime() - 180 * 24 * 60 * 60 * 1000),
    endTime: endTime,
  },
  {
    id: 8,
    display: "Last 365 Days",
    startTime: new Date(endTime.getTime() - 365 * 24 * 60 * 60 * 1000),
    endTime: endTime,
  },
];

export default timeOptions;

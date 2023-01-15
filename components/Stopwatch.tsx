import React from "react";

interface StopwatchTime {
  mm: number;
  ss: number;
  ms: number;
}

const Stopwatch = ({ mm, ss, ms }: StopwatchTime) => {
  let ms_string: String = ms.toString();
  if (ms < 10) {
    ms_string = "000";
  } else if (ms < 100) {
    ms_string = "0" + ms.toString();
  }

  return (
    <div className="font-mono flex justify-center text-4xl my-8">
      <div>{mm}:</div>
      <div>{ss}.</div>
      <div>{ms_string}</div>
    </div>
  );
};

export default Stopwatch;
export type { StopwatchTime };

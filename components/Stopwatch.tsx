import React from "react";

interface StopwatchInterface {
  stopwatchTime: StopwatchTime;
  state: StopwatchState;
}

export enum StopwatchState {
  default,
  holding,
  ready,
}

interface StopwatchTime {
  mm: number;
  ss: number;
  ms: number;
}

const Stopwatch = ({ stopwatchTime, state }: StopwatchInterface) => {
  let { mm, ss, ms }: StopwatchTime = stopwatchTime;
  let ms_string: String = ms.toString();
  if (ms < 10) {
    ms_string = "000";
  } else if (ms < 100) {
    ms_string = "0" + ms.toString();
  }

  let textColour = "";
  if (state == StopwatchState.holding) {
    textColour = "text-red-600";
  } else if (state == StopwatchState.ready) {
    textColour = "text-green-500";
  }

  return (
    <div
      className={`font-mono flex justify-center text-4xl my-8 ${textColour}`}
    >
      <div>{mm}:</div>
      <div>{ss}.</div>
      <div>{ms_string}</div>
    </div>
  );
};

export default Stopwatch;
export type { StopwatchTime, StopwatchInterface };

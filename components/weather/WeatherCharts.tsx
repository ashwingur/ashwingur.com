import React, { useState } from "react";
import { WeatherData } from "../../shared/interfaces/weather.interface";
import { useQuery, useQueryClient } from "react-query";
import TimeSeriesChart from "./TimeSeriesChart";
import { Listbox } from "@headlessui/react";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";

const fetchWeatherData = async (
  start: number,
  end: number
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ASHWINGUR_API}/weather?start=${start}&end=${end}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData: WeatherData = await response.json();
    return weatherData;
  } catch (error) {
    throw new Error(`Failed to fetch weather data ${error}`);
  }
};

const timeOptions = [
  { id: 1, display: "Last 24 hours", seconds: 24 * 3600 },
  { id: 2, display: "Last 3 days", seconds: 24 * 3600 * 3 },
  { id: 3, display: "Last 7 days", seconds: 24 * 3600 * 7 },
  { id: 4, display: "Last 14 days", seconds: 24 * 3600 * 14 },
  { id: 5, display: "Last 31 days", seconds: 24 * 3600 * 31 },
  { id: 6, display: "Last 90 days", seconds: 24 * 3600 * 90 },
  { id: 7, display: "Last 180 days", seconds: 24 * 3600 * 180 },
  { id: 8, display: "Last 365 days", seconds: 24 * 3600 * 365 },
];

const WeatherCharts = () => {
  const firstDbEntryTime = 1717137003;
  const [selectedTime, setSelectedTime] = useState(timeOptions[0]);

  // Calculate start and end times based on selectedTime
  const start = Math.floor(Date.now() / 1000 - selectedTime.seconds);
  const end = Math.floor(Date.now() / 1000);

  // Use the calculated start and end times in the query key and query function
  const { data, isLoading, isError } = useQuery<WeatherData>({
    queryKey: ["historicalweather", start, end],
    queryFn: () => fetchWeatherData(start, end),
    keepPreviousData: true, // Keeps the previous data while fetching new data (also smooth transitions as a benefit)
  });

  const onSelectedTimeChange = (value: {
    id: number;
    display: string;
    seconds: number;
  }) => {
    const newTime = timeOptions[value.id - 1];
    setSelectedTime(newTime);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center bg-stone-100/80 dark:bg-stone-800/80 rounded-lg mx-4 py-2 shadow-md">
        <h2 className="mt-2">Historical Data</h2>
        <p className="mb-8">Loading...</p>
      </div>
    );
  }

  if (isError || data === undefined) {
    return (
      <div className="flex flex-col items-center justify-center bg-stone-100/80 dark:bg-stone-800/80 rounded-lg mx-4 py-2 shadow-md">
        <h2 className="mt-2">Historical Data</h2>
        <p className="mb-8">Error fetching data</p>
      </div>
    );
  }

  // Now we will have 8 arrays
  const transposedData = data.data[0].map((_, colIndex) =>
    data.data.map((row) => row[colIndex])
  );
  const timestamps = transposedData[0];
  const temperatures = transposedData[1];
  const pressures = transposedData[2];
  const humidities = transposedData[3];
  const lights = transposedData[4];
  const aqis = transposedData[5];
  const tvocs = transposedData[6];
  const eco2s = transposedData[7];

  return (
    <div className="flex flex-col items-center justify-center bg-stone-100/80 dark:bg-stone-800/90 rounded-lg mx-4 py-2 shadow-md">
      <h2 className="mt-2">Historical Data</h2>
      <div className="relative mt-4 mb-2">
        <Listbox value={selectedTime} onChange={onSelectedTimeChange}>
          <div className="cursor-default overflow-hidden rounded-lg bg-white dark:bg-zinc-900 text-left focus:outline-none w-60 py-2 px-4 justify-between">
            <Listbox.Button className="w-full rounded-lg focus:outline-none flex items-center justify-between">
              {selectedTime.display}
              <AiOutlineDown className="text-gray-600 dark:text-gray-300 hover:text-xl transition-all" />
            </Listbox.Button>
          </div>
          <Listbox.Options className="absolute z-50 bg-white dark:bg-zinc-900 rounded-lg w-60 mt-1 max-h-60 overflow-auto">
            {timeOptions.map((time) => (
              <Listbox.Option
                key={time.id}
                value={time}
                className={({ active }) =>
                  `px-4 cursor-pointer py-2 ${
                    active ? "bg-green-600 dark:bg-[#3b0764] text-white " : ""
                  }`
                }
              >
                {time.display}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      {start < firstDbEntryTime && (
        <p className="text-xs mb-4">
          Note: weather station deployed on 31/5/24 (no data exists before then)
        </p>
      )}
      <div className="flex flex-col self-stretch gap-8 px-2 lg:px-4">
        <TimeSeriesChart
          timestamps={timestamps}
          values={temperatures}
          title={"Temperature"}
          yLabel={"°C"}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={pressures}
          title={"Pressure"}
          yLabel={"hPa"}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={humidities}
          title={"Humidity"}
          yLabel={"%"}
          domain={[0, 100]}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={lights.map((x) => Math.round(x))}
          title={"Ambient Light"}
          yLabel={"lx"}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={aqis}
          title={"Air Quality Index"}
          yLabel={"AQI"}
          domain={[0, 5]}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={tvocs.map((x) => Math.round(x))}
          title={"Total Volatile Organic Compounds"}
          yLabel={"ppb"}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={eco2s}
          title={"Equivalent Embodied Carbon Dioxide"}
          yLabel={"ppm"}
        />
      </div>
    </div>
  );
};

export default WeatherCharts;

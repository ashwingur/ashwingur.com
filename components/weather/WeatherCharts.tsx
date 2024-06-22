import React, { useState } from "react";
import { WeatherData } from "../../shared/interfaces/weather.interface";
import { useQuery } from "react-query";
import TimeSeriesChart from "./TimeSeriesChart";
import { Listbox } from "@headlessui/react";
import { AiOutlineDown } from "react-icons/ai";
import Card from "@components/Card";
import DateTimePicker from "@components/DateTimePicker";

const fetchWeatherData = async (
  start: number,
  end: number
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ASHWINGUR_API}/weather?start=${start}&end=${end}`,
      { credentials: "include" }
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
  { id: 0, display: "Custom", seconds: 24 * 3600 },
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
  const [selectedTime, setSelectedTime] = useState(timeOptions[1]);

  const [customTime, setCustomTime] = useState<{
    start?: string;
    end?: string;
    difference: number;
    startLessThanEnd: boolean;
  }>({
    start: undefined,
    end: undefined,
    difference: 3600 * 24,
    startLessThanEnd: true,
  });

  // Calculate start and end times based on selectedTime
  let start = Math.floor(Date.now() / 1000 - selectedTime.seconds);
  let end = Math.floor(Date.now() / 1000);

  if (
    selectedTime.id === 0 &&
    customTime.start &&
    customTime.end !== undefined &&
    customTime.startLessThanEnd &&
    !isNaN(new Date(customTime.start).getTime()) &&
    !isNaN(new Date(customTime.end).getTime())
  ) {
    start = new Date(customTime.start).getTime() / 1000;
    end = new Date(customTime.end).getTime() / 1000;
  }

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
    const newTime = timeOptions[value.id];
    setSelectedTime(newTime);
  };

  const onDateTimeChange = (
    start: string,
    end: string,
    unixDifference: number,
    startLessThanEnd: boolean
  ) => {
    setCustomTime({
      start,
      end,
      difference: unixDifference,
      startLessThanEnd,
    });
  };

  if (isLoading) {
    return (
      <Card
        className="flex flex-col items-center justify-center bg-background-muted mx-4"
        firstLayer={true}
      >
        <h2 className="mt-2">Historical Data</h2>
        <p className="mb-8">Loading...</p>
      </Card>
    );
  }

  if (isError || data === undefined || data.data.length === 0) {
    return (
      <Card
        className="flex flex-col items-center justify-center bg-background-muted mx-4"
        firstLayer={true}
      >
        <h2 className="mt-2">Historical Data</h2>
        <div className="relative mt-4 mb-2 z-20">
          <Listbox value={selectedTime} onChange={onSelectedTimeChange}>
            <div className="cursor-default overflow-hidden rounded-lg bg-background-hover text-left focus:outline-none w-60 py-2 px-4 justify-between">
              <Listbox.Button className="w-full rounded-lg focus:outline-none flex items-center justify-between">
                {selectedTime.display}
                <AiOutlineDown className="hover:text-xl transition-all" />
              </Listbox.Button>
            </div>
            <Listbox.Options className="absolute z-50 bg-background-muted rounded-lg w-60 mt-1 max-h-60 overflow-auto">
              {timeOptions.map((time) => (
                <Listbox.Option
                  key={time.id}
                  value={time}
                  className={({ active }) =>
                    `px-4 cursor-pointer py-2 ${
                      active ? "bg-accent text-text-accent" : ""
                    }`
                  }
                >
                  {time.display}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        {selectedTime.id === 0 && (
          <div>
            <DateTimePicker
              onDateTimeChange={onDateTimeChange}
              className="mt-2 mb-4"
            />
            {!customTime.startLessThanEnd && (
              <p className="font-bold text-center">
                Start date must be less than end date
              </p>
            )}
          </div>
        )}

        <p className="mb-8">
          {data?.data.length === 0
            ? "No data for the selected time period"
            : "Error fetching data"}
        </p>
      </Card>
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
    <Card
      className="card !px-2 !md:px-4 flex flex-col items-center justify-center mx-4"
      firstLayer={true}
    >
      <h2 className="mt-2">Historical Data</h2>
      <div className="relative mt-4 mb-2 z-20">
        <Listbox value={selectedTime} onChange={onSelectedTimeChange}>
          <div className="cursor-default overflow-hidden rounded-lg bg-background-hover text-left focus:outline-none w-60 py-2 px-4 mb-2 justify-between">
            <Listbox.Button className="w-full rounded-lg focus:outline-none flex items-center justify-between">
              {selectedTime.display}
              <AiOutlineDown className="hover:text-xl transition-all" />
            </Listbox.Button>
          </div>
          <Listbox.Options className="absolute z-50 bg-background-muted rounded-lg w-60 mt-1 max-h-60 overflow-auto">
            {timeOptions.map((time) => (
              <Listbox.Option
                key={time.id}
                value={time}
                className={({ active }) =>
                  `px-4 cursor-pointer py-2 ${
                    active ? "bg-accent text-text-accent" : ""
                  }`
                }
              >
                {time.display}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      {selectedTime.id === 0 && (
        <div>
          <DateTimePicker
            onDateTimeChange={onDateTimeChange}
            className="mt-2 mb-4"
          />
          {!customTime.startLessThanEnd && (
            <p className="font-bold text-center mb-4">
              Start date must be less than end date
            </p>
          )}
        </div>
      )}
      {start < firstDbEntryTime && (
        <p className="text-xs mb-4 px-4">
          Note: weather station deployed on 31/5/24 (no data exists before then)
        </p>
      )}
      <div className="flex flex-col self-stretch gap-8 px-2 lg:px-4">
        <TimeSeriesChart
          timestamps={timestamps}
          values={temperatures}
          title={"Temperature"}
          yLabel={"°C"}
          metricStats={data.overall_stats?.temperature}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={pressures}
          title={"Pressure"}
          yLabel={"hPa"}
          metricStats={data.overall_stats?.pressure}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={humidities}
          title={"Humidity"}
          yLabel={"%"}
          domain={[0, 100]}
          metricStats={data.overall_stats?.humidity}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={lights}
          title={"Ambient Light"}
          yLabel={"lx"}
          metricStats={data.overall_stats?.ambient_light}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={aqis}
          title={"Air Quality Index"}
          yLabel={"AQI"}
          domain={[0, 5]}
          metricStats={data.overall_stats?.air_quality_index}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={tvocs}
          title={"Total Volatile Organic Compounds"}
          yLabel={"ppb"}
          metricStats={data.overall_stats?.TVOC}
        />
        <TimeSeriesChart
          timestamps={timestamps}
          values={eco2s}
          title={"Equivalent Embodied Carbon Dioxide"}
          yLabel={"ppm"}
          metricStats={data.overall_stats?.eCO2}
        />
      </div>
    </Card>
  );
};

export default WeatherCharts;

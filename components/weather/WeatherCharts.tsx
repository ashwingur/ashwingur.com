import React from "react";
import { WeatherData } from "../../shared/interfaces/weather.interface";
import { useQuery } from "react-query";
import TimeSeriesChart from "./TimeSeriesChart";

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

const WeatherCharts = () => {
  const start = Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000);
  const end = Math.floor(Date.now() / 1000);

  const { data, isLoading, isError } = useQuery<WeatherData>(
    "historicalweather",
    () => fetchWeatherData(start, end)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || data === undefined) {
    return <div>Error</div>;
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
    <div className="flex flex-col items-center justify-center bg-stone-100/80 dark:bg-stone-800/80 rounded-lg mx-4 py-2 shadow-md">
      <h2 className="mt-2">Historical Data</h2>
      <TimeSeriesChart
        timestamps={timestamps}
        values={temperatures}
        title={"Temperature"}
        yLabel={"Temperature"}
      />
      <TimeSeriesChart
        timestamps={timestamps}
        values={pressures}
        title={"Pressure"}
        yLabel={"Pressure"}
      />
      <TimeSeriesChart
        timestamps={timestamps}
        values={humidities}
        title={"Humidity"}
        yLabel={"Humidity (%)"}
        domain={[0, 100]}
      />
      <TimeSeriesChart
        timestamps={timestamps}
        values={lights.map((x) => Math.round(x))}
        title={"Ambient Light"}
        yLabel={"Ambient Light"}
      />
      <TimeSeriesChart
        timestamps={timestamps}
        values={aqis}
        title={"Air Quality Index"}
        yLabel={"Air Quality Index"}
        domain={[0, 5]}
      />
      <TimeSeriesChart
        timestamps={timestamps}
        values={tvocs.map((x) => Math.round(x))}
        title={"Total Volatile Organic Compounds"}
        yLabel={"TVOC"}
      />
      <TimeSeriesChart
        timestamps={timestamps}
        values={eco2s}
        title={"Equivalent Embodied Carbon Dioxide"}
        yLabel={"eCO2"}
      />
    </div>
  );
};

export default WeatherCharts;

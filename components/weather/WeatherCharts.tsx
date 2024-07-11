import React, { useState } from "react";
import { WeatherData } from "../../shared/interfaces/weather.interface";
import { useQuery } from "react-query";
import TimeSeriesChart from "./TimeSeriesChart";
import { Listbox } from "@headlessui/react";
import { AiOutlineDown } from "react-icons/ai";
import Card from "@components/Card";
import DateTimeRangePicker from "@components/DateTimeRangePicker";
import { TimeOption, createTimeOptions } from "shared/timeoptions";
import GenericListbox from "@components/GenericListBox";

const fetchWeatherData = async (
  start: Date,
  end: Date
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ASHWINGUR_API}/weather?start=${
        start.getTime() / 1000
      }&end=${end.getTime() / 1000}`,
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

const WeatherCharts = () => {
  const firstDbEntryTime = 1717137003;
  const timeOptions = createTimeOptions({
    hoursOptions: [1, 24],
    daysOptions: [3, 7, 31, 90, 180],
    yearsOptions: [1],
    includeCustom: true,
  });
  // Listbox props
  const [selectedTimeOption, setSelectedTimeOption] = useState(timeOptions[2]);
  const displayTimeOption = (option: TimeOption) => option.display;
  const handleSelectedTimeChange = (timeOption: TimeOption) => {
    setSelectedTimeOption(timeOption);
  };

  // Date range picker prop
  const onDateTimeChange = (
    _startLessThanEnd: boolean,
    start?: Date,
    end?: Date
  ) => {
    if (start && end) {
      setSelectedTimeOption((prev) => ({
        ...prev,
        startTime: start,
        endTime: end,
      }));
    }
  };

  // Query
  const { data, isLoading, isError } = useQuery<WeatherData>({
    queryKey: [
      "historicalweather",
      selectedTimeOption.startTime,
      selectedTimeOption.endTime,
    ],
    queryFn: () =>
      fetchWeatherData(
        selectedTimeOption.startTime,
        selectedTimeOption.endTime
      ),
    staleTime: 60 * 1000, // 1 minute
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    keepPreviousData: true, // Keeps the previous data while fetching new data (also smooth transitions as a benefit)
  });

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

        <GenericListbox<TimeOption>
          selectedValue={selectedTimeOption}
          onSelectedValueChange={handleSelectedTimeChange}
          options={timeOptions}
          displayValue={displayTimeOption}
          className="mt-4 mb-2 z-20"
          maxHeightClass="lg:max-h-none"
        />

        {selectedTimeOption.id === 0 && (
          <div>
            <DateTimeRangePicker
              onDateTimeChange={onDateTimeChange}
              className="mt-2 mb-4"
              defaultStartTime={timeOptions[0].startTime}
              defaultEndTime={timeOptions[0].endTime}
            />
            {selectedTimeOption.startTime > selectedTimeOption.endTime && (
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
      <GenericListbox<TimeOption>
        selectedValue={selectedTimeOption}
        onSelectedValueChange={handleSelectedTimeChange}
        options={timeOptions}
        displayValue={displayTimeOption}
        className="mt-4 mb-2 z-20"
        maxHeightClass="lg:max-h-none"
      />
      {selectedTimeOption.id === 0 && (
        <div>
          <DateTimeRangePicker
            onDateTimeChange={onDateTimeChange}
            className="mt-2 mb-4"
            defaultStartTime={timeOptions[0].startTime}
            defaultEndTime={timeOptions[0].endTime}
          />
          {selectedTimeOption.startTime > selectedTimeOption.endTime && (
            <p className="font-bold text-center mb-4">
              Start date must be less than end date
            </p>
          )}
        </div>
      )}
      {selectedTimeOption.startTime.getTime() / 1000 < firstDbEntryTime && (
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

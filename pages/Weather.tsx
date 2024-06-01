import { LatestWeather } from "../components/weather/LatestWeather";
import Navbar from "../components/Navbar";
import WeatherCharts from "../components/weather/WeatherCharts";

import React from "react";

const MetricTable = () => {
  return (
    <div className="overflow-x-auto px-4 mt-4 md:w-4/5">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Metric
            </th>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Explanation
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Temperature
            </td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              The measure of the warmth or coldness of an environment, in
              degrees Celsius (°C).
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Air Pressure
            </td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              The force exerted by the weight of air in the atmosphere, measured
              in hectopascals (hPa). The standard air pressure at sea level is
              1013.25 hPa.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Humidity
            </td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              The amount of water vapor in the air, expressed as a percentage
              (%).
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Ambient Light
            </td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              The intensity of light present in the environment, measured in
              lux.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Air Quality
            </td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              A numerical value representing the quality of air. It is derived
              from a guideline by the German Federal Agency. From 1 to 5
              respectively the ratings are: excellent, good, moderate, poor,
              unhealthy.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              TVOC
            </td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Total Volatile Organic Compounds, measured in parts per billion
              (ppb).
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              eCO2
            </td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
              Equivalent Carbon Dioxide, a measure of CO2 levels, in parts per
              million (ppm).
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Weather = () => {
  return (
    <div>
      <Navbar fixed={true} />
      <div className="flex flex-col mx-auto mt-20 pb-8 md:w-4/5 gap-8">
        <LatestWeather />
        <WeatherCharts />
        <div className="flex flex-col items-center justify-center bg-stone-100/80 dark:bg-stone-800/80 rounded-lg mx-4 py-4 shadow-md">
          <h2>Notes</h2>
          <div>
            <p className="mx-8 md:mx-auto md:w-96 lg:w-3/5">
              The weather station is a Raspberry Pi Zero 2W attached to an
              atmospheric, ambient light, and air quality sensor. It runs 24/7
              and samples the sensor data every 5 minutes. The setup is located
              outside, but under a patio which means the light sensor readings
              may not be as accurate. The general location is North-west Sydney.
              When querying a larger time window, the values are averages over
              larger bin sizes which will lead to smoother curves. This allows
              it to be both efficient and more useful for analysing long term
              trends.
            </p>
          </div>
          <MetricTable />
        </div>
      </div>
    </div>
  );
};

export default Weather;

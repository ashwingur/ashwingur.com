import { LatestWeather } from "../components/weather/LatestWeather";
import Navbar from "../components/navbars/Navbar";
import WeatherCharts from "../components/weather/WeatherCharts";

import React from "react";
import Link from "next/link";

const MetricTable = () => {
  return (
    <div className="overflow-x-auto px-4 mt-4 md:w-4/5">
      <table className="min-w-full bg-background-hover border border-text-muted">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-text-muted">Metric</th>
            <th className="py-2 px-4 border-b border-text-muted">
              Explanation
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b border-text-muted">
              Temperature
            </td>
            <td className="py-2 px-4 border-b border-text-muted">
              The measure of the warmth or coldness of an environment, in
              degrees Celsius (°C).
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-text-muted">
              Air Pressure
            </td>
            <td className="py-2 px-4 border-b border-text-muted">
              The force exerted by the weight of air in the atmosphere, measured
              in hectopascals (hPa). The standard air pressure at sea level is
              1013.25 hPa.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-text-muted">Humidity</td>
            <td className="py-2 px-4 border-b border-text-muted">
              The amount of water vapor in the air, expressed as a percentage
              (%).
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-text-muted">
              Ambient Light
            </td>
            <td className="py-2 px-4 border-b border-text-muted">
              The intensity of light present in the environment, measured in
              lux.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-text-muted">
              Air Quality
            </td>
            <td className="py-2 px-4 border-b border-text-muted">
              A numerical value representing the quality of air. It is derived
              from a guideline by the German Federal Agency. From 1 to 5
              respectively the ratings are: excellent, good, moderate, poor,
              unhealthy.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-text-muted">TVOC</td>
            <td className="py-2 px-4 border-b border-text-muted">
              Total Volatile Organic Compounds, measured in parts per billion
              (ppb).
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-text-muted">eCO2</td>
            <td className="py-2 px-4 border-b border-text-muted">
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
        <div className="flex flex-col items-center card mx-4">
          <h2>Notes</h2>
          <div>
            <p className="mx-8 md:mx-auto md:w-96 lg:w-3/5">
              The weather station is a Raspberry Pi Zero 2W attached to
              atmospheric, ambient light, and air quality sensors. It runs 24/7
              and samples the sensor data every 5 minutes. The setup is located
              outside but under a patio, which means the light sensor readings
              may not be as accurate. The general location is north-west Sydney.
              When querying a larger time window, the values are averaged over
              larger bin sizes, leading to smoother curves. This allows it to be
              both efficient and more useful for analyzing long-term trends.
              More setup information available at{" "}
              <Link
                href="https://github.com/ashwingur/pi-weather-station"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-hover"
              >
                GitHub Repository
              </Link>
              .
            </p>
          </div>
          <MetricTable />
        </div>
      </div>
    </div>
  );
};

export default Weather;

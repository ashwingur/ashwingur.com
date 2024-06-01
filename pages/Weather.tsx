import { LatestWeather } from "../components/weather/LatestWeather";
import Navbar from "../components/Navbar";
import WeatherCharts from "../components/weather/WeatherCharts";

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
              may not be as accurate. When querying a larger time window, the
              values are averages over larger bin sizes which will lead to
              smoother curves. This allows it to be both efficient and more
              useful for analysing long term trends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

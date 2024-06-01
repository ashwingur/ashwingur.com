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
      </div>
    </div>
  );
};

export default Weather;

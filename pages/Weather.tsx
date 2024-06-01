import { LatestWeather } from "../components/weather/LatestWeather";
import Navbar from "../components/Navbar";

const Weather = () => {
  return (
    <div>
      <Navbar fixed={true} />
      <div className="flex flex-col mt-20 pb-8">
        <LatestWeather />
      </div>
    </div>
  );
};

export default Weather;

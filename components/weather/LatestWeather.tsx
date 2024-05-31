import { useQuery } from "react-query";
import axios from "axios";
import { WeatherData } from "../../shared/interfaces/weather.interface";
import Thermometer from "./Thermometer";
import PressureGauge from "./PressureGauge";
import AirQuality from "./AirQuality";

export const fetchLatestWeatherData = async (): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(
      `${process.env.NEXT_PUBLIC_ASHWINGUR_API}/weather`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch weather data ${error}`);
  }
};

export const LatestWeather: React.FC = () => {
  const { data, isLoading, isError } = useQuery<WeatherData>(
    "latestweather",
    fetchLatestWeatherData
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError || data === undefined)
    return <div>Error fetching weather data</div>;

  const [timestamp, temperature, pressure, humidity, light, aqi, tvoc, eco2] =
    data.data[0];

  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Weather Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div className="grid grid-cols-2 justify-center items-center">
        <Thermometer temperature={temperature} />
        <PressureGauge pressure={pressure} />
        <div className="flex flex-col items-center text-center">
          <div>
            <h3>Humidity</h3>
            {humidity.toFixed(2)}%
          </div>
          <div>
            <h3>Ambient Light</h3>
            {light.toFixed(2)} lx
          </div>
        </div>
        <AirQuality aqi={aqi} tvoc={tvoc} eco2={eco2} />
      </div>
    </div>
  );
};

import { useQuery } from "react-query";
import { WeatherData } from "../../shared/interfaces/weather.interface";
import Thermometer from "./Thermometer";
import PressureGauge from "./PressureGauge";
import AirQuality from "./AirQuality";
import Card from "@components/Card";

function formatUnixTimestamp(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

function timeAgo(unixTimestamp: number): string {
  const now = Date.now() / 1000; // current time in seconds
  const diffInSeconds = now - unixTimestamp;

  if (diffInSeconds < 60) {
    return "just now";
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  let result = `${days} day${days !== 1 ? "s" : ""}`;
  if (remainingHours > 0) {
    result += ` ${remainingHours} hr${remainingHours !== 1 ? "s" : ""}`;
  }
  return result + " ago";
}

const fetchLatestWeatherData = async (): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ASHWINGUR_API}/weather`,
      { credentials: "include" },
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

export const LatestWeather: React.FC = () => {
  const { data, isLoading, isError } = useQuery<WeatherData>(
    "latestweather",
    fetchLatestWeatherData,
  );

  if (isLoading)
    return (
      <Card
        firstLayer={true}
        className="mx-4 flex flex-col items-center justify-center"
      >
        <h2 className="mt-2">Latest Weather Data</h2>
        <p className="mt-1 text-sm">loading...</p>
        <div className="grid grid-cols-2 justify-center gap-4 p-4 lg:grid-cols-4">
          <div className="h-48 w-36 animate-pulse rounded-lg bg-background-muted shadow-lg lg:h-60 lg:w-48" />
          <div className="h-48 w-36 animate-pulse rounded-lg bg-background-muted shadow-lg lg:h-60 lg:w-48" />
          <div className="h-48 w-36 animate-pulse rounded-lg bg-background-muted shadow-lg lg:h-60 lg:w-48" />
          <div className="h-48 w-36 animate-pulse rounded-lg bg-background-muted shadow-lg lg:h-60 lg:w-48" />
        </div>
      </Card>
    );
  if (isError || data === undefined)
    return (
      <Card
        firstLayer={true}
        className="mx-4 flex flex-col items-center justify-center"
      >
        <h2 className="mt-2">Latest Weather Data</h2>
        <p className="mb-8 mt-1 text-sm">Error fetching data</p>
      </Card>
    );

  const [timestamp, temperature, pressure, humidity, light, aqi, tvoc, eco2] =
    data.data[0];

  return (
    <Card
      firstLayer={true}
      className="mx-4 flex flex-col items-center justify-center"
    >
      <h2 className="mt-2">Latest Weather Data</h2>
      {/* <p className="text-error">
        Raspberry Pi is currently broken, replacement incoming to resume data
        collection. It almost lasted a year!
      </p> */}
      <p className="mt-1 text-sm">
        {formatUnixTimestamp(timestamp)} ({timeAgo(timestamp)})
      </p>
      <div className="grid grid-cols-2 items-stretch justify-center gap-4 py-4 xl:grid-cols-4">
        <Thermometer temperature={temperature} />
        <PressureGauge pressure={pressure} />
        <Card
          className="flex flex-col justify-center gap-8 text-center lg:h-60"
          firstLayer={false}
        >
          <div>
            <h3 className="text-lg md:text-xl">Humidity</h3>
            {humidity.toFixed(2)}%
          </div>
          <div>
            <h3 className="text-lg md:text-xl">Ambient Light</h3>
            {light.toFixed(2)} lx
          </div>
        </Card>
        <AirQuality aqi={aqi} tvoc={tvoc} eco2={eco2} />
      </div>
    </Card>
  );
};

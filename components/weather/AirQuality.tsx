import Card from "@components/Card";
import dynamic from "next/dynamic";
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

interface AirQualityProps {
  aqi: number;
  tvoc: number;
  eco2: number;
}

const AirQuality: React.FC<AirQualityProps> = ({ aqi, tvoc, eco2 }) => {
  const percent = aqi / 5.0 - 0.1;
  let rating = "Excellent";
  if (aqi == 2) {
    rating = "Good";
  } else if (aqi == 3) {
    rating = "Moderate";
  } else if (aqi == 4) {
    rating = "Poor";
  } else if (aqi == 5) {
    rating = "Unhealthy";
  }
  return (
    <Card
      className="flex flex-col items-center justify-center lg:h-60 lg:w-48"
      firstLayer={false}
    >
      <h3 className="mb-4 text-lg md:text-xl">Air Quality</h3>
      <GaugeChart
        hideText={true}
        percent={percent}
        nrOfLevels={5}
        cornerRadius={4}
        needleColor="#000"
        needleBaseColor="#000"
        colors={["#0390fc", "#03fc6b", "#f5dd02", "#fc9403", "#fc0b03"]}
        animDelay={0}
      />
      {rating}
      <div className="mt-4">TVOC: {tvoc} ppb</div>
      <div>eCO2: {eco2} ppm</div>
    </Card>
  );
};

export default AirQuality;

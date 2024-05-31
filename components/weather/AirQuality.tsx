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
    <div className="flex flex-col items-center w-48 h-24">
      <h3>Air Quality</h3>
      <GaugeChart
        hideText={true}
        percent={percent}
        nrOfLevels={5}
        cornerRadius={4}
        needleColor="#000"
        needleBaseColor="#000"
        colors={["#0390fc", "#03fc6b", "#e7fc03", "#fc9403", "#fc0b03"]}
      />
      {rating}
    </div>
  );
};

export default AirQuality;

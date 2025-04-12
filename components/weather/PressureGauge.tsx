import Card from "@components/Card";
import dynamic from "next/dynamic";
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

interface AirPressureGaugeProps {
  pressure: number; // Pressure value between 950 and 1050
}

const PressureGauge: React.FC<AirPressureGaugeProps> = ({ pressure }) => {
  // Calculate rotation angle based on pressure
  const MIN_PRESSURE = 960;
  const MAX_PRESSURE = 1040;
  let percent = (pressure - MIN_PRESSURE) / (MAX_PRESSURE - MIN_PRESSURE);
  if (pressure < MIN_PRESSURE) {
    percent = 0;
  } else if (pressure > MAX_PRESSURE) {
    percent = 1;
  }

  const COLOUR_2_START = 980;
  const COLOUR_3_START = 1020;

  const colour_1_length =
    (COLOUR_2_START - MIN_PRESSURE) / (MAX_PRESSURE - MIN_PRESSURE);
  const colour_2_length =
    (COLOUR_3_START - COLOUR_2_START) / (MAX_PRESSURE - MIN_PRESSURE);
  const colour_3_length =
    (MAX_PRESSURE - COLOUR_3_START) / (MAX_PRESSURE - MIN_PRESSURE);

  return (
    <Card
      className="flex flex-col items-center justify-center lg:h-60 lg:w-48"
      firstLayer={false}
    >
      <h3 className="mb-4 text-lg md:text-xl">Air Pressure</h3>
      <GaugeChart
        hideText={true}
        nrOfLevels={1}
        percent={percent}
        arcsLength={[colour_1_length, colour_2_length, colour_3_length]}
        colors={["#0390fc", "#11c700", "#fc0b03"]}
        needleColor="#000"
        needleBaseColor="#000"
        cornerRadius={4}
        animDelay={0}
      />
      {pressure.toFixed(2)} hPa
    </Card>
  );
};

export default PressureGauge;

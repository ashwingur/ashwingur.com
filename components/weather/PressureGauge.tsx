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
    <div className="w-48 h-24 flex flex-col items-center">
      <h3 className="mb-4">Air Pressure</h3>
      <GaugeChart
        hideText={true}
        nrOfLevels={1}
        percent={percent}
        arcsLength={[colour_1_length, colour_2_length, colour_3_length]}
        needleColor="#000"
        needleBaseColor="#000"
        cornerRadius={4}
      />
      {pressure.toFixed(2)} hPa
    </div>
  );
};

export default PressureGauge;

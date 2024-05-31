import React from "react";

interface AirQualityProps {
  aqi: number;
  tvoc: number;
  eco2: number;
}

const AirQuality: React.FC<AirQualityProps> = ({ aqi, tvoc, eco2 }) => {
  return (
    <div className="flex flex-col items-center">
      <h3>Air Quality</h3>
    </div>
  );
};

export default AirQuality;

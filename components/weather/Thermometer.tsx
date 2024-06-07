import React from "react";

interface ThermometerProps {
  temperature: number;
}

const Thermometer: React.FC<ThermometerProps> = ({ temperature }) => {
  // Constrain the temperature between 5 and 45
  const constrainedTemp = Math.max(0, Math.min(temperature, 45));
  // Calculate the fill percentage
  const fillPercentage = (constrainedTemp / 40) * 100;

  return (
    <div className="flex flex-col items-center justify-center bg-background-hover shadow-lg rounded-lg p-2 h-48 lg:h-60">
      <h3>Temperature</h3>
      <svg
        className="w-12 md:w-16 lg:w-20 h-auto"
        viewBox="0 0 60 175" // Adjusted width and height here
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#6fdcff" />
            <stop offset="20%" stopColor="#1e90ff" />
            <stop offset="60%" stopColor="#ff5555" />
            <stop offset="100%" stopColor="#ff0000" />
          </linearGradient>
          <mask id="thermometer-mask">
            <rect x="0" y="0" width="60" height="200" fill="white" />
            <rect
              x="20"
              y="10"
              width="20" // Adjusted width here
              height={160 * (1 - fillPercentage / 100)} // Adjusted height here
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="19" // Adjusted x position for the border
          y="9" // Adjusted y position for the border
          width="22" // Adjusted width here
          height="162" // Adjusted height here
          fill="black" // Transparent fill
          stroke="black" // Black stroke color
          strokeWidth="2" // Border width
          rx="11" // Adjusted rx and ry for rounded corners
          ry="11" // Adjusted rx and ry for rounded corners
        />
        <rect
          x="20"
          y="10"
          width="20" // Adjusted width here
          height="160" // Adjusted height here
          stroke="black"
          fill="url(#gradient)"
          mask="url(#thermometer-mask)"
          rx="10" // Adjusted rx and ry for rounded corners
          ry="10" // Adjusted rx and ry for rounded corners
          className="thermometer-fill"
        />
      </svg>
      <div className="">{temperature.toFixed(2)} °C</div>
    </div>
  );
};

export default Thermometer;

import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

interface TimeSeriesChartProps {
  timestamps: number[];
  values: number[];
  title: string;
  xLabel?: string;
  yLabel: string;
  domain?: (number | string)[];
  tickCount?: number; // Add tickCount prop
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  timestamps,
  values,
  title,
  xLabel,
  yLabel,
  domain,
  tickCount = 5, // Default tick count
}) => {
  // No tailwindcss for recharts, so we manually get the current theme
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const axisStrokeColour = currentTheme === "dark" ? "#c9c9c9" : "#000";
  const lineColour = currentTheme === "dark" ? "#ffbdbd" : "#bd0000";
  const gridColour = currentTheme === "dark" ? "#b0b0b0" : "#4f4f4f";
  const tooltipColour = currentTheme === "dark" ? "#2e2e2e" : "#ebebeb";

  // See how long the time period is
  const timeRange = timestamps[timestamps.length - 1] - timestamps[0];

  // Function to format UNIX timestamp to "dd/mm/yy hh:mm AM/PM" string
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);

    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = ("0" + hours).slice(-2);

    // If the time period is <= 25 h, only display time
    // If > 30 days display date only
    if (timeRange < 3600 * 25) {
      return `${formattedHours}:${minutes} ${ampm}`;
    } else if (timeRange < 3600 * 24 * 30) {
      return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
    } else {
      return `${day}/${month}/${year}`;
    }
  };

  const data = timestamps.map((timestamp, index) => ({
    timestamp: formatTimestamp(timestamp),
    value: values[index],
  }));

  return (
    <div className="w-full h-96 lg:h-[32rem] px-4 pb-8 bg-stone-100 dark:bg-stone-700/25 shadow-lg rounded-lg">
      <h3 className="text-center my-4 text-xl">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{ bottom: 40, left: 10 }}
        >
          <XAxis
            dataKey="timestamp"
            type="category"
            label={{
              value: xLabel ?? "",
              position: "insideBottomRight",
              offset: 0,
            }}
            stroke={axisStrokeColour}
            ticks={timestamps.length < tickCount ? timestamps : undefined} // Use timestamps.length if less than tickCount
            interval={Math.ceil(timestamps.length / tickCount)} // Calculate interval
            tick={{
              // Custom tick rendering function
              dy: 18, // Adjust vertical position
              fontSize: "12px", // Adjust font size
              textAnchor: "middle", // Center the text
              width: "70",
            }}
            angle={-40}
          />
          <YAxis
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft",
              style: { fill: axisStrokeColour },
            }}
            domain={(domain as AxisDomain) || ["auto", "auto"]}
            allowDecimals={false}
            stroke={axisStrokeColour}
            tick={{
              fontSize: "14px",
            }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke={gridColour} />
          <Tooltip contentStyle={{ backgroundColor: tooltipColour }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColour}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;

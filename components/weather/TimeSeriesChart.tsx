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
  const axisStrokeColour = currentTheme === "dark" ? "#fff" : "#000";
  const lineColour = currentTheme === "dark" ? "#d14747" : "#bd0000";
  const gridColour = currentTheme === "dark" ? "#b0b0b0" : "#4f4f4f";

  // Function to format UNIX timestamp to "dd/mm/yy hh:mm" string
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const data = timestamps.map((timestamp, index) => ({
    timestamp: formatTimestamp(timestamp),
    value: values[index],
  }));

  return (
    <div className="w-full h-96 px-4">
      <h3 className="text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{ bottom: 20, left: 10 }}
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
              dy: 12, // Adjust vertical position
              fontSize: "12px", // Adjust font size
              textAnchor: "middle", // Center the text
              width: "50",
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
          <Tooltip />
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

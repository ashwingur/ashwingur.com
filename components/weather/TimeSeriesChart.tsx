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

interface TimeSeriesChartProps {
  timestamps: number[];
  values: number[];
  title: string;
  xLabel?: string;
  yLabel: string;
  domain?: number[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  timestamps,
  values,
  title,
  xLabel,
  yLabel,
  domain,
}) => {
  const data = timestamps.map((timestamp, index) => ({
    timestamp,
    value: values[index],
  }));

  return (
    <div className="w-full h-96 px-4">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart width={800} height={400} data={data}>
          <XAxis
            dataKey="timestamp"
            type="number"
            scale="time"
            domain={["auto", "auto"]}
            label={{
              value: xLabel ?? "Time",
              position: "insideBottomRight",
              offset: 0,
            }}
          />
          <YAxis
            label={{ value: yLabel, angle: -90, position: "insideLeft" }}
            domain={domain || ["auto", "auto"]}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;

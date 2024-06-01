import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface TimeSeriesChartProps {
  timestamps: number[];
  values: number[];
  title: string;
  xLabel: string;
  yLabel: string;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  timestamps,
  values,
  title,
  xLabel,
  yLabel,
}) => {
  const data = timestamps.map((timestamp, index) => ({
    timestamp,
    value: values[index],
  }));

  return (
    <div>
      <h2>{title}</h2>
      <LineChart width={800} height={400} data={data}>
        <XAxis
          dataKey="timestamp"
          type="number"
          scale="time"
          domain={["auto", "auto"]}
          label={{ value: xLabel, position: "insideBottomRight", offset: 0 }}
        />
        <YAxis label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default TimeSeriesChart;

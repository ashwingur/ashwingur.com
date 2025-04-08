import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

export type WarDataItem = {
  name: string;
  used: number;
  remaining: number;
};

type Props = {
  data: WarDataItem[];
  chartTitle?: string;
};

const WarPerformanceChart: React.FC<Props> = ({ data, chartTitle }) => {
  // Add a derived "label" field for display (e.g. "5/7")
  const enrichedData = data.map((item) => ({
    ...item,
    totalLabel: `${item.used}/${item.used + item.remaining}`,
  }));

  const CustomTooltip = ({ payload }: any) => {
    if (payload && payload.length) {
      const { used, remaining, name } = payload[0].payload;
      return (
        <div className="rounded-md border-2 border-white bg-[#5e4b36] p-2">
          <p>{name}</p>
          <p className="text-center text-sm">
            {used}/{used + remaining}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h4 className="text-center text-2xl font-thin">{chartTitle}</h4>
      <ResponsiveContainer width="100%" height={30 * data.length}>
        <BarChart
          layout="vertical"
          data={enrichedData}
          margin={{ top: 0, right: 25, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fill: "#FFFFFF" }}></XAxis>
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#FFFFFF", fontSize: "0.7rem" }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(189, 189, 189, 0.34)" }}
            animationDuration={150}
          />
          <Bar
            dataKey="used"
            stackId="a"
            fill="#46734a"
            stroke="#fff"
            strokeWidth={1}
            style={{ zIndex: 1 }}
          >
            {/* <LabelList
              dataKey="totalLabel"
              position="insideLeft"
              fill="#fff"
              style={{ zIndex: 50 }}
            /> */}
          </Bar>

          <Bar
            dataKey="remaining"
            stackId="a"
            fill="#7b947d"
            stroke="#fff"
            strokeWidth={1}
            radius={[0, 2, 2, 0]}
            style={{ zIndex: 1 }}
          ></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WarPerformanceChart;

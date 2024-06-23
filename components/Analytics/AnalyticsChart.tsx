import Card from "@components/Card";
import moment from "moment";
import { title } from "process";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

interface AnalyticsChartProps {
  timestamps: string[];
  values: number[];
  routes: string[][];
  title: string;
  xLabel?: string;
  yLabel: string;
  tickCount?: number;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  timestamps,
  values,
  routes,
  title,
  xLabel,
  yLabel,
  tickCount,
}) => {
  const data = timestamps.map((timestamp, index) => ({
    timestamp: moment(timestamp).valueOf(),
    value: values[index],
  }));

  return (
    <Card className="w-full" firstLayer={false}>
      <h3 className="text-center my-2 lg:text-xl">{title}</h3>
      <div className="flex h-96 lg:h-[32rem]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{ bottom: 40, left: 10, right: 40 }}
          >
            <XAxis
              dataKey="timestamp"
              type="number"
              domain={["dataMin", "dataMax"]}
              label={{
                value: xLabel ?? "",
                position: "insideBottomRight",
                offset: 0,
              }}
              //   stroke={axisStrokeColour}
              //   ticks={ticks}
              tick={{
                dy: 18,
                fontSize: "12px",
                textAnchor: "middle",
                width: "70",
              }}
              //   tickFormatter={(tick) => formatTimestamp(tick)}
              angle={-40}
            />
            <YAxis
              label={{
                value: yLabel,
                angle: -90,
                position: "insideLeft",
                // style: { fill: axisStrokeColour },
              }}
              //   domain={(domain as AxisDomain) || ["auto", "auto"]}
              allowDecimals={false}
              //   stroke={axisStrokeColour}
              tick={{
                fontSize: "14px",
              }}
            />
            {/* <CartesianGrid strokeDasharray="4 4" stroke={gridColour} /> */}
            <Tooltip
            //   content={<CustomTooltip unit={yLabel} />}
            //   contentStyle={{ backgroundColor: tooltipColour }}
            />
            <Line
              type="monotone"
              dataKey="value"
              //   stroke={lineColour}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AnalyticsChart;

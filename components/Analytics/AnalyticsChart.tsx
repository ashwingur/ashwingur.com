import Card from "@components/Card";
import { isDark } from "@components/ToggleThemeButton";
import moment from "moment";
import { useTheme } from "next-themes";
import { title } from "process";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

interface AnalyticsChartProps {
  timestamps: string[];
  values: number[];
  routes: string[][];
  title: string;
  xLabel?: string;
  yLabel?: string;
  total?: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: Payload<number, string>[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const date = new Date(data.timestamp);
    const formattedDate = `${date.toLocaleDateString()} ${date
      .toLocaleTimeString()
      .toUpperCase()}`;

    return (
      <div className="rounded-md bg-background px-3 py-2 shadow-md">
        <p className="text-center text-lg font-bold">{`${data.value}`}</p>
        <p className="max-w-20 break-words lg:max-w-52">
          <span className="font-bold">Routes: </span>
          {data.routes.join(", ")}
        </p>
        <p className="mt-1 text-sm">{`${formattedDate}`}</p>
      </div>
    );
  }

  return null;
};

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  timestamps,
  values,
  routes,
  title,
  xLabel,
  yLabel,
  total,
}) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const axisStrokeColour = isDark(currentTheme ?? "") ? "#c9c9c9" : "#000";
  const gridColour = isDark(currentTheme ?? "") ? "#b0b0b0" : "#4f4f4f";
  const tooltipColour = isDark(currentTheme ?? "") ? "#2e2e2e" : "#ebebeb";

  const [lineColour, setLineColour] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-accent",
    ),
  );

  useEffect(() => {
    const updateLineColour = () => {
      const newColor = getComputedStyle(
        document.documentElement,
      ).getPropertyValue("--color-accent");
      setLineColour(newColor);
    };

    const timeoutId = setTimeout(() => {
      updateLineColour();
    }, 50); // I couldn't get it working without a delay :|

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentTheme]);

  const generateTicks = (
    min: number,
    max: number,
    tickCount: number,
  ): number[] => {
    // Using a set to avoid duplicate keys
    const step = (max - min) / (tickCount - 1);
    const ticks = new Set<number>();

    for (let i = 0; i < tickCount; i++) {
      const tick = Math.floor(min + i * step);
      ticks.add(tick);
    }

    return Array.from(ticks);
  };

  const data = timestamps.map((timestamp, index) => ({
    timestamp: moment(timestamp).valueOf(),
    value: values[index],
    routes: routes[index],
  }));

  const minTimestamp = new Date(timestamps[0]).getTime();
  const maxTimestamp = new Date(timestamps[timestamps.length - 1]).getTime();

  const timeRange = (maxTimestamp - minTimestamp) / 1000;

  let adjustedTickCount = 50; // Default

  if (timeRange <= 3600 * 6) {
    adjustedTickCount = 12; // Very short range (e.g., 6 hours)
  } else if (timeRange <= 3600 * 24) {
    adjustedTickCount = 18; // 1 day
  } else if (timeRange <= 3600 * 24 * 3) {
    adjustedTickCount = 12; // 3 days
  } else if (timeRange <= 3600 * 24 * 7) {
    adjustedTickCount = 8; // 1 week
  } else {
    adjustedTickCount = 50; // longer range
  }

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);

    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = ("0" + hours).slice(-2);

    const timeStr = `${formattedHours}:${minutes} ${ampm}`;
    const dateStr = `${day}/${month}/${year}`;

    if (timeRange < 3600 * 25) {
      return timeStr;
    } else if (timeRange <= 3600 * 24 * 3) {
      return `${dateStr} ${timeStr}`;
    } else {
      return dateStr;
    }
  };

  const ticks = generateTicks(minTimestamp, maxTimestamp, adjustedTickCount);

  const grandTotal =
    total ??
    values.reduce((accumulator: number, currentValue: number): number => {
      return accumulator + currentValue;
    }, 0);

  return (
    <Card className="w-full" firstLayer={false}>
      <h3 className="mb-1 mt-2 text-center lg:text-xl">{title}</h3>
      <p className="mb-2 text-center">Total: {grandTotal}</p>
      <div className="flex h-96 lg:h-[32rem]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{ bottom: 40, right: 40 }}
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
              stroke={axisStrokeColour}
              ticks={ticks}
              tick={{
                dy: 18,
                fontSize: "12px",
                textAnchor: "middle",
                width: "70",
              }}
              tickFormatter={formatTimestamp}
              angle={-40}
            />
            <YAxis
              label={{
                value: yLabel,
                angle: -90,
                position: "insideLeft",
                style: { fill: axisStrokeColour },
              }}
              //   domain={(domain as AxisDomain) || ["auto", "auto"]}
              allowDecimals={false}
              stroke={axisStrokeColour}
              tick={{
                fontSize: "14px",
              }}
            />
            <CartesianGrid strokeDasharray="4 4" stroke={gridColour} />
            <Tooltip
              animationDuration={150}
              content={<CustomTooltip />}
              contentStyle={{ backgroundColor: tooltipColour }}
            />
            <Line
              type="linear"
              dataKey="value"
              stroke={lineColour}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AnalyticsChart;

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";
import { isDark } from "@components/ToggleThemeButton";
import Card from "@components/Card";
import { MetricStats } from "@interfaces/weather.interface";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

interface TimeSeriesChartProps {
  timestamps: number[];
  values: number[];
  title: string;
  xLabel?: string;
  yLabel: string;
  domain?: (number | string)[];
  tickCount?: number; // Add tickCount prop
  metricStats?: MetricStats;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: Payload<number, string>[];
  unit: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  unit,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const date = new Date(data.timestamp * 1000);
    const formattedDate = `${date.toLocaleDateString()} ${date
      .toLocaleTimeString()
      .toUpperCase()}`;

    return (
      <div className="rounded-md bg-background px-3 py-2 shadow-md">
        <p className="text-center font-bold">{`${data.value} ${unit}`}</p>
        <p className="text-sm">{`${formattedDate}`}</p>
      </div>
    );
  }

  return null;
};

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  timestamps,
  values,
  title,
  xLabel,
  yLabel,
  domain,
  tickCount = 50, // Default tick count
  metricStats,
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

  const timeRange = timestamps[timestamps.length - 1] - timestamps[0];

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
    const date = new Date(timestamp * 1000);
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
    timestamp: timestamp,
    value: values[index],
  }));

  const minTimestamp = Math.min(...timestamps);
  const maxTimestamp = Math.max(...timestamps);
  const ticks = generateTicks(minTimestamp, maxTimestamp, adjustedTickCount);

  return (
    <Card className="w-full" firstLayer={false}>
      <h3 className="my-2 text-center lg:text-xl">{title}</h3>
      {metricStats !== undefined && (
        <div className="mb-2 flex flex-col items-center justify-center md:flex-row md:gap-4">
          <p>
            <span className="font-bold">Average: </span>
            {metricStats.average}
          </p>
          <p>
            <span className="font-bold">Min: </span>
            {metricStats.min.value}{" "}
            <span className="text-xs lg:text-sm">
              ({formatTimestamp(metricStats.min.timestamp)})
            </span>
          </p>
          <p>
            <span className="font-bold">Max: </span>
            {metricStats.max.value}{" "}
            <span className="text-xs lg:text-sm">
              ({formatTimestamp(metricStats.max.timestamp)})
            </span>
          </p>
        </div>
      )}
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
              stroke={axisStrokeColour}
              ticks={ticks}
              tick={{
                dy: 18,
                fontSize: "12px",
                textAnchor: "middle",
                width: "70",
              }}
              tickFormatter={(tick) => formatTimestamp(tick)}
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
            <CartesianGrid strokeDasharray="4 4" stroke={gridColour} />
            <Tooltip
              animationDuration={150}
              content={<CustomTooltip unit={yLabel} />}
              contentStyle={{ backgroundColor: tooltipColour }}
            />
            <Line
              type="monotone"
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

export default TimeSeriesChart;

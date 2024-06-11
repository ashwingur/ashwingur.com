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
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";
import { isDark } from "@components/ToggleThemeButton";
import Card from "@components/Card";

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
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const axisStrokeColour = isDark(currentTheme ?? "") ? "#c9c9c9" : "#000";
  const gridColour = isDark(currentTheme ?? "") ? "#b0b0b0" : "#4f4f4f";
  const tooltipColour = isDark(currentTheme ?? "") ? "#2e2e2e" : "#ebebeb";

  const [lineColour, setLineColour] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-accent"
    )
  );

  useEffect(() => {
    const updateLineColour = () => {
      const newColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--color-accent");
      setLineColour(newColor);
    };

    // Set up observer to detect changes in the CSS variable
    const observer = new MutationObserver(updateLineColour);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    // Update color on theme change
    updateLineColour();

    console.log("updating line colour");

    return () => {
      observer.disconnect();
    };
  }, [currentTheme]);

  const timeRange = timestamps[timestamps.length - 1] - timestamps[0];

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
    <Card className="w-full h-96 lg:h-[32rem]" firstLayer={false}>
      <h3 className="text-center my-4 lg:text-xl">{title}</h3>
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
            ticks={timestamps.length < tickCount ? timestamps : undefined}
            interval={Math.ceil(timestamps.length / tickCount)}
            tick={{
              dy: 18,
              fontSize: "12px",
              textAnchor: "middle",
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
    </Card>
  );
};

export default TimeSeriesChart;

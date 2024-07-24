import { isDark } from "@components/ToggleThemeButton";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface ColumnChartProps {
  title: string;
  data: ChartData[];
  width?: number | string;
  height?: number | string;
  className?: string;
}

const ColumnChart: React.FC<ColumnChartProps> = ({
  title,
  data,
  height = 400,
  className,
}) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const axisStrokeColour = isDark(currentTheme ?? "") ? "#c9c9c9" : "#000";
  const gridColour = isDark(currentTheme ?? "") ? "#757575" : "#a3a3a3";
  const tooltipColour = isDark(currentTheme ?? "") ? "#2e2e2e" : "#ebebeb";
  const [lineColour, setLineColour] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-secondary",
    ),
  );
  const [hoverBg, setHoverBg] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-background-hover",
    ),
  );

  useEffect(() => {
    const updateLineColour = () => {
      const newColor = getComputedStyle(
        document.documentElement,
      ).getPropertyValue("--color-secondary");
      setLineColour(newColor);
      const newHoverColor = getComputedStyle(
        document.documentElement,
      ).getPropertyValue("--color-background-hover");
      setHoverBg(newHoverColor);
    };

    const timeoutId = setTimeout(() => {
      updateLineColour();
    }, 50); // I couldn't get it working without a delay :|

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentTheme]);

  return (
    <div className={className}>
      <h3 className="text-center">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ bottom: 30, top: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColour} />
          <XAxis
            dataKey="name"
            label={{
              value: "Rating",
              style: { fill: axisStrokeColour },
              dy: 20,
            }}
            stroke={axisStrokeColour}
            dy={4}
          ></XAxis>
          <YAxis stroke={axisStrokeColour} width={40} />
          <Tooltip
            contentStyle={{ backgroundColor: tooltipColour }}
            cursor={{ fill: hoverBg, opacity: 0.5 }}
          />
          <Bar dataKey="value" fill={lineColour}>
            <LabelList dataKey="value" position="top" fill={axisStrokeColour} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ColumnChart;

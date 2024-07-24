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
  Pie,
  PieChart,
  Cell,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface ReviewPieChartProps {
  title: string;
  data: ChartData[];
  width?: number | string;
  height?: number | string;
  className?: string;
}

// Function to generate an array of colors with evenly spaced hues
const generateColors = (numColors: number, isDark: boolean) => {
  const colors = [];
  const hueStep = 360 / numColors;
  for (let i = 0; i < numColors; i++) {
    colors.push(
      `hsl(${i * hueStep}, ${isDark ? 70 : 60}%, ${isDark ? 50 : 40}%)`,
    );
  }
  return colors;
};

const renderCustomizedLabel = (props: any) => {
  const {
    x,
    y,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    payload,
    fill,
  } = props;

  const RADIAN = Math.PI / 180;
  const radius = innerRadius - 30;
  const xPos = x + radius * Math.cos(-midAngle * RADIAN);
  const yPos = y + radius * Math.sin(-midAngle * RADIAN);

  // Adjust positioning to prevent clipping

  return (
    <text
      x={xPos}
      y={yPos}
      textAnchor={xPos > x ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs lg:text-sm"
      fill={fill}
    >
      <tspan x={xPos} dy="0">
        {payload.name}
      </tspan>
      <tspan
        x={xPos}
        dy="1.2em"
      >{`${payload.value} (${(percent * 100).toFixed(0)}%)`}</tspan>
    </text>
  );
};

const ReviewPieChart: React.FC<ReviewPieChartProps> = ({
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

  const colors = generateColors(data.length, isDark(currentTheme));

  return (
    <div className={className}>
      <h3 className="text-center text-2xl">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            outerRadius={60}
            innerRadius={40}
            label={renderCustomizedLabel}
            stroke="none"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReviewPieChart;

import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface ScoreRadialChartProps {
  percentage: number;
}

const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return "#27ae60"; // Green
  if (percentage >= 60) return "#f39c12"; // Orange
  return "#e74c3c"; // Red
};

const ScoreRadialChart: React.FC<ScoreRadialChartProps> = ({ percentage }) => {
  const data = [
    { name: "Score", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const scoreColor = getScoreColor(percentage); // Get dynamic color based on percentage
  const COLORS = [scoreColor, "#e0e0e0"]; // Dynamic color for score, gray for remainder

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        innerRadius={70}
        outerRadius={90}
        startAngle={90}
        endAngle={-270}
        paddingAngle={0}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <text
        x={100}
        y={100}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: "20px", fontWeight: "bold" }}
      >
        {percentage}%
      </text>
    </PieChart>
  );
};

export default ScoreRadialChart;
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define the data type
interface DataItem {
  date: string; // Use string to represent date in ISO format
  yield: number;
}

// Sample data
const data: DataItem[] = [
  { date: "2023-01-01", yield: 30 },
  { date: "2023-02-01", yield: 20 },
  { date: "2023-03-01", yield: 27 },
  { date: "2023-04-01", yield: 18 },
  { date: "2023-05-01", yield: 23 },
  { date: "2023-06-01", yield: 34 },
  { date: "2023-07-01", yield: 44 },
];

function AreaCharts() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="yield" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaCharts;

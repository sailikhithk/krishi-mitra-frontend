import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define the data type
interface DataItem {
  date: string;
  temperature: number;
  mintemp: number;
  maxtemp: number;
}

// Sample data
const data: DataItem[] = [
  { date: "2023-07-01", temperature: 25, mintemp: 20, maxtemp: 45 },
  { date: "2023-07-02", temperature: 26, mintemp: 18, maxtemp: 50 },
  { date: "2023-07-03", temperature: 28, mintemp: 22, maxtemp: 35 },
  { date: "2023-07-04", temperature: 27, mintemp: 16, maxtemp: 21 },
  { date: "2023-07-05", temperature: 29, mintemp: 14, maxtemp: 38 },
  { date: "2023-07-06", temperature: 30, mintemp: 10, maxtemp: 36 },
  { date: "2023-07-07", temperature: 28, mintemp: 15, maxtemp: 43 },
];

function LineCharts() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis
          label={{
            value: "Temperature (°C)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          labelFormatter={(value) =>
            `Date: ${new Date(value).toLocaleDateString()}`
          }
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="mintemp"
          stroke="#52BE80"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="maxtemp"
          stroke="#239B56"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineCharts;

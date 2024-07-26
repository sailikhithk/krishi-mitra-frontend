import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define the data type
interface DataItem {
  SampleID: string;
  pH: number;
  moisture: number;
  N: number;
  P: number;
  K: number;
  Texture: string;
  OrganicMatter: number;
}

// Sample data
const data: DataItem[] = [
  {
    SampleID: "1",
    pH: 6,
    moisture: 20,
    N: 50,
    P: 30,
    K: 200,
    Texture: "Loam",
    OrganicMatter: 3.5,
  },
  {
    SampleID: "2",
    pH: 5,
    moisture: 34,
    N: 45,
    P: 22,
    K: 400,
    Texture: "Clay",
    OrganicMatter: 3.7,
  },
  {
    SampleID: "3",
    pH: 9,
    moisture: 8,
    N: 35,
    P: 42,
    K: 200,
    Texture: "Loam",
    OrganicMatter: 5.2,
  },
  {
    SampleID: "4",
    pH: 11,
    moisture: 16,
    N: 10,
    P: 41,
    K: 350,
    Texture: "Clay",
    OrganicMatter: 4.5,
  },
  {
    SampleID: "5",
    pH: 2,
    moisture: 12,
    N: 7,
    P: 22,
    K: 340,
    Texture: "Clay",
    OrganicMatter: 1.2,
  },
];

function BarCharts() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="SampleID" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pH" fill="#186A3B " />
        <Bar dataKey="moisture" fill="#239B56" />
        <Bar dataKey="N" fill="#52BE80" />
        <Bar dataKey="P" fill="#73C6B6" />
        <Bar dataKey="K" fill="#76D7C4" />
        <Bar dataKey="Texture" fill="#FAD7A0" />
        <Bar dataKey="OrganicMatter" fill="#F9E79F" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarCharts;

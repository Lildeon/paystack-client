import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";
// import { RechartsDevtools } from "@recharts/devtools";
const BarAreaChart = ({ data }) => {
  return (
    <ComposedChart
      style={{
        width: "100%",
        maxWidth: "1026px",
        maxHeight: "60vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      {/* <CartesianGrid stroke="#f5f5f5" /> */}
      <XAxis dataKey="branch" scale="band" />
      <YAxis width="" niceTicks="" />
      <Tooltip />
      <Legend />
      {/* <Area type="monotone" dataKey="area" fill="#8884d8" stroke="#8884d8" /> */}
      <Bar dataKey="people" barSize={20} fill="#413ea0" />
      {/* <Line type="monotone" dataKey="line" stroke="#ff7300" /> */}
      {/* <Scatter dataKey="scatter" fill="red" /> */}
      {/* <RechartsDevtools /> */}
    </ComposedChart>
  );
};

export default BarAreaChart;

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { useStateContext } from '../../context/ContextProvider';
import { chartData } from '../../Data/dummy';

const LineChart = () => {
  const { currentMode, currentColor } = useStateContext();
  return (
    <AreaChart
      width={700}
      height={400}
      data={chartData}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={currentColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={currentColor} stopOpacity={0} />
          </linearGradient>
        </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stroke={ currentMode === 'Dark' ? '#33373E' : '#FFFFFF' }
        fill={currentColor} 
        fillOpacity={0.5}
      />
      {/* <Area
        // type={cardinal}
        dataKey="uv"
        stroke="#82ca9d"
        fill="#82ca9d"
        fillOpacity={0.3}
      /> */}
    </AreaChart>
  )
}

export default LineChart;
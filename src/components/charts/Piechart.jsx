import React from 'react';
import { PieChart, Pie, Cell } from "recharts";

import { pieChartData } from '../../Data/dummy';
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Piechart = () => {
  return (
    <PieChart width={200} height={180}>
      <Pie
        data={pieChartData}
        cx={'50%'}
        cy={'50%'}
        innerRadius={40}
        outerRadius={60}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}

export default Piechart;
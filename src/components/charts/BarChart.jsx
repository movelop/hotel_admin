import React from 'react';
import { BarChart, Bar } from 'recharts';

import { chartData } from '../../Data/dummy';

const color="rgb(242, 252, 253)"

class SparkLine extends React.PureComponent{
  
  render() {
    return (
      <BarChart width={320} height={100} data={chartData}>
        <Bar dataKey="uv" fill={color} />
      </BarChart>
    )
  }
}

export default SparkLine;
import React from 'react';
import {
  BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Day 1', Inactive: 4000, Active: 2400, amt: 2400 },
  { name: 'Day 2', Inactive: 3000, Active: 1398, amt: 2210 },
  { name: 'Day 3', Inactive: 2000, Active: 9800, amt: 2290 },
  { name: 'Day 4', Inactive: 2780, Active: 3908, amt: 2000 },
  { name: 'Day 5', Inactive: 1890, Active: 4800, amt: 2181 },
  { name: 'Day 6', Inactive: 2390, Active: 3800, amt: 2500 },
  { name: 'Day 7', Inactive: 3490, Active: 4300, amt: 2100 },
];

const CustomBarShape = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      radius={[6, 6, 0, 0]}
    />
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <div className="intro" style={{ color: '#0A68C5' }}>{`Active: ${payload[0].value}`}</div>
        <div className="desc" style={{ color: 'gray' }}>{`Inactive: ${payload[1].value}`}</div>
      </div>
    );
  }
  return null;
};

const ActiveInactiveUser = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 0, right: 10, left: 10, bottom: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" label={{ value: 'Days', position: 'insideBottom', offset: -12, dy: 10 }} />
        <YAxis label={{ value: 'Number of Users', angle: -90, position: 'insideLeft', offset:0,dy: 60,dx:-2 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" align="right" height={36} />
        <Bar dataKey="Active" shape={<CustomBarShape />} fill="#0A68C5" barSize={20} />
        <Bar dataKey="Inactive" shape={<CustomBarShape />} fill="#E4E4E4" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActiveInactiveUser;

import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'P1',
    courses: 2000,
  },
  {
    name: 'P2',
    courses: 3000,
  },
  {
    name: 'P3',
    courses: 2000,
  },
  {
    name: 'P4',
    courses: 2780,
  },
  {
    name: 'P5',
    courses: 1890,
  },
  {
    name: 'P6',
    courses: 2390,
  },
  {
    name: 'P7',
    courses: 3490,
  },
];

const CustomBarShape = (props: any) => {
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

const ProgramCompletion: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 24,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" label={{ value: 'Program name', position: 'insideBottom', offset: -10, dy: 10 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="courses" fill="#0A68C5" shape={<CustomBarShape />}  barSize={30}  activeBar={<Rectangle />} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ProgramCompletion;

import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the data array outside the component for reuse
const data = [
  {
    name: 'Inst A',
    courses: 2000,
  },
  {
    name: 'Inst B',
    courses: 3000,
  },
  {
    name: 'Inst C',
    courses: 2000,
  },
  {
    name: 'Inst D',
    courses: 2780,
  },
  {
    name: 'Inst E',
    courses: 1890,
  },
  {
    name: 'Inst F',
    courses: 2390,
  },
  {
    name: 'Inst G',
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

const InstituteBarchart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" label={{ value: 'Institutes', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'Number of Courses', angle: -90, position: 'insideLeft', offset: 0,dy: 50}} />
        <Tooltip />
        <Bar dataKey="courses" fill="#0A68C5"   shape={<CustomBarShape />}  barSize={30}  activeBar={<Rectangle />} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default InstituteBarchart;

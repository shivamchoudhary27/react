import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MostVisitedActivity = () => {
  const onPieEnter = (data, index) => {
    // Example: console log the data of the hovered pie segment
    console.log('Hovered over:', data[index]);
  };

  const onPieLeave = () => {
    // Example: handle pie leave event
    console.log('Mouse leave');
  };

  return (
    <>
    <div style={{"width":"100%", "height":300}}>
    <ResponsiveContainer >

    <PieChart>
      <Pie
        data={data}
        cx={320}
        cy={260}
        startAngle={180}
        endAngle={0}
        innerRadius={90}
        outerRadius={150}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        onMouseEnter={onPieEnter}
        onMouseLeave={onPieLeave}
        >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
      </Pie>
    </PieChart>
          </ResponsiveContainer>
    </div>
          </>
  );
};

export default MostVisitedActivity;

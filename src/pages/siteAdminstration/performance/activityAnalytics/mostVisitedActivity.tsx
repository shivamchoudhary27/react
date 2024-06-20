import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Activity 1', value: 1200 },
  { name: 'Activity 2', value: 3450 },
  { name: 'Activity 3', value: 2000 },
  { name: 'Activity 4', value: 1500 },
  { name: 'Activity 5', value: 1000 },
];

const COLORS = ['#7DAFE0', '#0A68C5', '#c2ddf7', '#b3cfea', '#e1eefb'];

const MostVisitedActivity = () => {
  return (
    <div>
      <div className='mt-3 d-flex justify-content-center gap-3 flex-wrap'>
        {data.map((entry, index) => (
          <div key={`item-${index}`}>
            <span
              style={{
                backgroundColor: COLORS[index]
              }}
              className='d-inline-block rounded-circle chart-legend'
            />
            {entry.name}
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="65%"
            innerRadius="60%"
            outerRadius="100%"
            startAngle={180}
            endAngle={0}
            dataKey="value"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <div>{`${payload[0].name}: ${payload[0].value}`}</div>
      </div>
    );
  }
  return null;
};

export default MostVisitedActivity;

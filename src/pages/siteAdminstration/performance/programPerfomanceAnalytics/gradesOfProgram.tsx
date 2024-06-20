import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Sector } from 'recharts';

const data = [
  {
    name: 'Program 1',
    uv: 31.47,
    pv: 2400,
    fill: '#7DAFE0',
  },
  {
    name: 'Program 2',
    uv: 26.69,
    pv: 4567,
    fill: '#458CD3',
  },
  {
    name: 'Program 3',
    uv: 15.69,
    pv: 1398,
    fill: '#0A68C5',
  },
];

const renderCustomShape = (props) => {
  const { cx, cy, startAngle, endAngle, innerRadius, outerRadius, fill } = props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      cornerRadius={10}
    />
  );
};

const GradesOfProgram = () => {
  return (
    <div className='averagegrades-wrapper'>
      <div className='averagegrades-legend'>
        <div className="mb-4">
          <div className='legend-lable'>Overall Average Grade</div>
          <b className='average-grades'>35.23%</b>
        </div>
        {data.map((entry, index) => (
          <div key={index} className='d-flex mb-2 gap-3 align-items-center'>
            <div className="p-1 rounded-circle grade-color" style={{ backgroundColor: entry.fill }}></div>
            <label className="programname">{entry.name}</label>
            <div className="percentage">{entry.uv}%</div>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="30%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={10}
          data={data}
        >
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="uv"
            shape={renderCustomShape}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradesOfProgram;

import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '18-24',
    uv: 31.47,
    pv: 2400,
    fill: '#8884d8',
  },
  {
    name: '25-29',
    uv: 26.69,
    pv: 4567,
    fill: '#83a6ed',
  },
  {
    name: '30-34',
    uv: 15.69,
    pv: 1398,
    fill: '#8dd1e1',
  },
  
];

const style = {
  top: '60%',
  right: 90,
  transform: 'translate(0, -50%)',
  lineHeight: '34px',
  fontSize: '30px'
};

const GradesOfProgram = () => {
  return (
    <div style={{"width":"100%", "height":300}}>
         <div style={{
      position: 'absolute',
      top:'40%',
      left: '60%',
      transform: 'translate(0%, -50%)',
      textAlign: 'left',
      fontSize: '22px'
    }}>
          Overall Average Grade <br /> <b>35.23%</b>
        </div>
      <ResponsiveContainer  >
        <RadialBarChart
          cx="30%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={20}
          data={data}
          >
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise
            dataKey="uv"
            />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GradesOfProgram;

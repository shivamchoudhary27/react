import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';

const data = [
  {
    name: 'P1',
    Activities: 2500,
  },
  {
    name: 'P2',
    Activities: 3000,
  },
  {
    name: 'P3',
    Activities: 2000,
  },
  {
    name: 'P4',
    Activities: 2780,
  },
  {
    name: 'P5',
    Activities: 890,
  },
  {
    name: 'P6',
    Activities: 2390,
  },
  {
    name: 'P7',
    Activities: 3490,
  },
];

const ActivityUnderProgram = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 24}}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" label={{ value: 'Program name', position: 'insideBottom', offset: -10, dy: 10 }} />
        <YAxis label={{ value: 'Number of activity', angle: -90, position: 'insideLeft', offset:0,dy: 60, dx:-2}} />
        <Tooltip />
        <Line type="linear" dataKey="Activities" stroke="#0254d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ActivityUnderProgram;

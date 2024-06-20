import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Inst A',
    uv: 4000,
  },
  {
    name: 'Inst B',
    uv: 3000,
  },
  {
    name: 'Inst C',
    uv: 2000,
  },
  {
    name: 'Inst D',
    uv: 2780,
  },
  {
    name: 'Inst E',
    uv: 1890,
  },
  {
    name: 'Inst F',
    uv: 2390,
  },
  {
    name: 'Inst G',
    uv: 3490,
  },
];

const NumberOfStudent = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 0, right: 10, left: 10, bottom: 20,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="65%" stopColor="#CAE3FF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F9FBFE" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" label={{ value: 'Institutes', position: 'insideBottom', offset: -10, dy: 10 }} />
        <YAxis label={{ value: 'Number of users', angle: -90, position: 'insideLeft', offset: 0, dy: 60, dx: -2 }} />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#0254d8" strokeWidth={2} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default NumberOfStudent;

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

function VisitorChart({ visitors }) {
  // Process data: count visits per day
  const dataByDate = visitors.reduce((acc, visitor) => {
    const date = format(new Date(visitor.visitDate), 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(dataByDate)
    .map(date => ({
      date,
      visits: dataByDate[date]
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="date" tickFormatter={(tick) => format(new Date(tick), 'MMM d')} />
        <YAxis allowDecimals={false} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
        <Legend />
        <Bar dataKey="visits" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
}
export default VisitorChart;

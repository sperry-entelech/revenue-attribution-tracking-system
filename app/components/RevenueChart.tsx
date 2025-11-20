'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample monthly revenue data
const data = [
  { month: 'Jan', mrr: 3200 },
  { month: 'Feb', mrr: 3800 },
  { month: 'Mar', mrr: 4200 },
  { month: 'Apr', mrr: 4600 },
  { month: 'May', mrr: 5100 },
  { month: 'Jun', mrr: 5586 },
];

export function RevenueChart() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-neutral-100 mb-4">MRR Trend (6 Months)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
          <XAxis
            dataKey="month"
            stroke="#737373"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#737373"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#171717',
              border: '1px solid #262626',
              borderRadius: '6px',
              color: '#fafafa',
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'MRR']}
          />
          <Line
            type="monotone"
            dataKey="mrr"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

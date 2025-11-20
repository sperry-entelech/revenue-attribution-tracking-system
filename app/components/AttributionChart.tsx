'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AttributionChartProps {
  plgRevenue: number;
  salesRevenue: number;
  hybridRevenue: number;
}

const COLORS = {
  plg: '#10b981', // green
  sales: '#3b82f6', // blue
  hybrid: '#8b5cf6', // purple
};

export function AttributionChart({ plgRevenue, salesRevenue, hybridRevenue }: AttributionChartProps) {
  const data = [
    { name: 'PLG', revenue: plgRevenue, color: COLORS.plg },
    { name: 'Sales', revenue: salesRevenue, color: COLORS.sales },
    { name: 'Hybrid', revenue: hybridRevenue, color: COLORS.hybrid },
  ];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-neutral-100 mb-4">Attribution Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
          <XAxis
            dataKey="name"
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
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
          />
          <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.plg }} />
          <span className="text-sm text-neutral-400">Product-Led Growth</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.sales }} />
          <span className="text-sm text-neutral-400">Sales-Assisted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.hybrid }} />
          <span className="text-sm text-neutral-400">Hybrid</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

export function TimeFilter() {
  const [selected, setSelected] = useState('30d');

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];

  return (
    <div className="flex gap-2 bg-neutral-900 border border-neutral-800 rounded-lg p-1">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => setSelected(period.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            selected === period.value
              ? 'bg-neutral-800 text-neutral-100'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}

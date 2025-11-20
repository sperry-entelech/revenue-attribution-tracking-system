'use client';

import { useState } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: string;
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const changeColor = change && change > 0 ? 'text-green-400' : 'text-red-400';
  const changeIcon = change && change > 0 ? '↑' : '↓';

  return (
    <div
      className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 transition-all duration-200 cursor-pointer"
      style={{
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        borderColor: isHovered ? '#525252' : '#262626',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm text-neutral-400 mb-1">{label}</div>
          <div className="text-3xl font-semibold text-neutral-100">{value}</div>
          {change !== undefined && (
            <div className={`text-sm mt-2 ${changeColor} flex items-center gap-1`}>
              <span>{changeIcon}</span>
              <span>{Math.abs(change)}% vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-2xl opacity-40">{icon}</div>
        )}
      </div>
    </div>
  );
}

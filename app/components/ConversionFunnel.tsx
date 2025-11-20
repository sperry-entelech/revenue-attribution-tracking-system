'use client';

interface FunnelStage {
  label: string;
  value: number;
  percentage: number;
}

export function ConversionFunnel() {
  const stages: FunnelStage[] = [
    { label: 'Website Visitors', value: 12500, percentage: 100 },
    { label: 'Sign Ups', value: 850, percentage: 6.8 },
    { label: 'Trial Users', value: 425, percentage: 50 },
    { label: 'Paying Customers', value: 212, percentage: 49.9 },
    { label: 'Annual Plans', value: 85, percentage: 40.1 },
  ];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-neutral-100 mb-6">Conversion Funnel</h3>
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={stage.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-300">{stage.label}</span>
              <span className="text-sm text-neutral-400">
                {stage.value.toLocaleString()} ({stage.percentage}%)
              </span>
            </div>
            <div className="relative h-12 bg-neutral-800/50 rounded-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                style={{
                  width: `${stage.percentage}%`,
                  opacity: 1 - index * 0.15,
                }}
              />
              <div className="absolute inset-0 flex items-center px-4">
                <span className="text-xs font-medium text-white z-10">
                  {stage.percentage}% conversion
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

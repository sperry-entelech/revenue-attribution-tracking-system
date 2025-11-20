import { MetricCardProps } from '../types';
import { formatMetric } from '../utils';

export function MetricCard({ label, value, type }: MetricCardProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors">
      <div className="text-sm text-neutral-400 mb-2">{label}</div>
      <div className="text-3xl font-semibold text-neutral-100">
        {formatMetric(value, type)}
      </div>
    </div>
  );
}

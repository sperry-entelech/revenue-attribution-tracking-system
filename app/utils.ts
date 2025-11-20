import { MetricType } from './types';

export function formatMetric(value: string | number, type?: MetricType): string {
  if (typeof value === 'string') return value;

  switch (type) {
    case 'currency':
      return `$${value.toLocaleString('en-US')}`;
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'days':
      return `${value.toFixed(1)} days`;
    case 'number':
    default:
      return value.toLocaleString('en-US');
  }
}

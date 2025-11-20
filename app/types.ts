export interface DashboardData {
  revenueMetrics: RevenueMetrics;
  customerMetrics: CustomerMetrics;
  conversionMetrics: ConversionMetrics;
  attributionBreakdown: AttributionBreakdown;
  churnAnalysis: ChurnAnalysis;
}

export interface RevenueMetrics {
  totalMRR: number;
  activeSubscriptions: number;
  churnedSubscriptions: number;
  averageMRR: number;
}

export interface CustomerMetrics {
  totalUsers: number;
  activeCustomers: number;
  trialUsers: number;
  churnedCustomers: number;
}

export interface ConversionMetrics {
  trialConversionRate: number;
  avgDaysToConversion: number;
  totalCallsBooked: number;
  callsWithClosedOutcome: number;
  callConversionRate: number;
}

export interface AttributionBreakdown {
  plgRevenue: number;
  salesRevenue: number;
  hybridRevenue: number;
  plgCustomerCount: number;
  salesCustomerCount: number;
  hybridCustomerCount: number;
}

export interface ChurnAnalysis {
  churnRate: number;
  avgCustomerLifetime: number;
  monthlyChurnMRR: number;
}

export type MetricType = 'currency' | 'percentage' | 'number' | 'days';

export interface MetricCardProps {
  label: string;
  value: string | number;
  type?: MetricType;
}

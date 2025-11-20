import { DashboardData } from './types';

// Static data - will be replaced with Google Sheets API later
export const dashboardData: DashboardData = {
  revenueMetrics: {
    totalMRR: 5586,
    activeSubscriptions: 14,
    churnedSubscriptions: 1,
    averageMRR: 399,
  },
  customerMetrics: {
    totalUsers: 15,
    activeCustomers: 14,
    trialUsers: 0,
    churnedCustomers: 1,
  },
  conversionMetrics: {
    trialConversionRate: 100.0,
    avgDaysToConversion: 25.5,
    totalCallsBooked: 5,
    callsWithClosedOutcome: 4,
    callConversionRate: 100.0,
  },
  attributionBreakdown: {
    plgRevenue: 2796,
    salesRevenue: 2796,
    hybridRevenue: 199,
    plgCustomerCount: 10,
    salesCustomerCount: 4,
    hybridCustomerCount: 1,
  },
  churnAnalysis: {
    churnRate: 6.7,
    avgCustomerLifetime: 239.6,
    monthlyChurnMRR: 199,
  },
};

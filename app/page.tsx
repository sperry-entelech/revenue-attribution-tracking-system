import { MetricCard } from './components/MetricCard';
import { Section } from './components/Section';
import { dashboardData } from './data';

export default function Home() {
  const {
    revenueMetrics,
    customerMetrics,
    conversionMetrics,
    attributionBreakdown,
    churnAnalysis,
  } = dashboardData;

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-8 md:px-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-100 tracking-tight">
            Revenue Tracking Dashboard
          </h1>
          <p className="text-neutral-400 mt-2">
            Real-time SaaS metrics and performance analytics
          </p>
        </header>

        {/* Dashboard Sections */}
        <div className="space-y-8">
          {/* Revenue Metrics */}
          <Section title="Revenue Metrics">
            <MetricCard
              label="Total MRR"
              value={revenueMetrics.totalMRR}
              type="currency"
            />
            <MetricCard
              label="Active Subscriptions"
              value={revenueMetrics.activeSubscriptions}
              type="number"
            />
            <MetricCard
              label="Churned Subscriptions"
              value={revenueMetrics.churnedSubscriptions}
              type="number"
            />
            <MetricCard
              label="Average MRR"
              value={revenueMetrics.averageMRR}
              type="currency"
            />
          </Section>

          {/* Customer Metrics */}
          <Section title="Customer Metrics">
            <MetricCard
              label="Total Users"
              value={customerMetrics.totalUsers}
              type="number"
            />
            <MetricCard
              label="Active Customers"
              value={customerMetrics.activeCustomers}
              type="number"
            />
            <MetricCard
              label="Trial Users"
              value={customerMetrics.trialUsers}
              type="number"
            />
            <MetricCard
              label="Churned Customers"
              value={customerMetrics.churnedCustomers}
              type="number"
            />
          </Section>

          {/* Conversion Metrics */}
          <Section title="Conversion Metrics">
            <MetricCard
              label="Trial Conversion Rate"
              value={conversionMetrics.trialConversionRate}
              type="percentage"
            />
            <MetricCard
              label="Avg Days to Conversion"
              value={conversionMetrics.avgDaysToConversion}
              type="days"
            />
            <MetricCard
              label="Total Calls Booked"
              value={conversionMetrics.totalCallsBooked}
              type="number"
            />
            <MetricCard
              label="Calls with Closed Outcome"
              value={conversionMetrics.callsWithClosedOutcome}
              type="number"
            />
          </Section>

          {/* Attribution Breakdown */}
          <Section title="Attribution Breakdown">
            <MetricCard
              label="PLG Revenue"
              value={attributionBreakdown.plgRevenue}
              type="currency"
            />
            <MetricCard
              label="Sales Revenue"
              value={attributionBreakdown.salesRevenue}
              type="currency"
            />
            <MetricCard
              label="Hybrid Revenue"
              value={attributionBreakdown.hybridRevenue}
              type="currency"
            />
            <MetricCard
              label="PLG Customer Count"
              value={attributionBreakdown.plgCustomerCount}
              type="number"
            />
          </Section>

          {/* Second row for Attribution */}
          <Section title="Attribution Breakdown (cont.)">
            <MetricCard
              label="Sales Customer Count"
              value={attributionBreakdown.salesCustomerCount}
              type="number"
            />
            <MetricCard
              label="Hybrid Customer Count"
              value={attributionBreakdown.hybridCustomerCount}
              type="number"
            />
            <MetricCard
              label="Call Conversion Rate"
              value={conversionMetrics.callConversionRate}
              type="percentage"
            />
          </Section>

          {/* Churn Analysis */}
          <Section title="Churn Analysis">
            <MetricCard
              label="Churn Rate"
              value={churnAnalysis.churnRate}
              type="percentage"
            />
            <MetricCard
              label="Avg Customer Lifetime"
              value={churnAnalysis.avgCustomerLifetime}
              type="days"
            />
            <MetricCard
              label="Monthly Churn MRR"
              value={churnAnalysis.monthlyChurnMRR}
              type="currency"
            />
          </Section>
        </div>
      </div>
    </div>
  );
}

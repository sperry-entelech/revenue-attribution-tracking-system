import { MetricCard } from './components/MetricCard';
import { Section } from './components/Section';
import { RevenueChart } from './components/RevenueChart';
import { AttributionChart } from './components/AttributionChart';
import { TimeFilter } from './components/TimeFilter';
import { ConversionFunnel } from './components/ConversionFunnel';
import { RecentActivity } from './components/RecentActivity';
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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-neutral-100 tracking-tight">
                Revenue Tracking Dashboard
              </h1>
              <p className="text-neutral-400 mt-2">
                Real-time SaaS metrics and performance analytics
              </p>
              <div className="flex gap-3 mt-4">
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400">
                  Live Demo
                </div>
                <div className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-full text-xs text-neutral-400">
                  Last Updated: Just Now
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-300 hover:bg-neutral-800 hover:border-neutral-700 transition-colors flex items-center gap-2">
                <span>📊</span>
                <span>Export CSV</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white font-medium transition-colors flex items-center gap-2">
                <span>🔄</span>
                <span>Refresh Data</span>
              </button>
            </div>
          </div>
          <div className="mt-6">
            <TimeFilter />
          </div>
        </header>

        {/* Dashboard Sections */}
        <div className="space-y-8">
          {/* Key Metrics Overview */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">Key Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-6">
                <div className="text-sm text-blue-400 mb-2">Total MRR</div>
                <div className="text-3xl font-bold text-neutral-100">${revenueMetrics.totalMRR.toLocaleString()}</div>
                <div className="text-sm text-green-400 mt-2 flex items-center gap-1">
                  <span>↑</span>
                  <span>12.4% vs last month</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-lg p-6">
                <div className="text-sm text-green-400 mb-2">Active Customers</div>
                <div className="text-3xl font-bold text-neutral-100">{customerMetrics.activeCustomers}</div>
                <div className="text-sm text-green-400 mt-2 flex items-center gap-1">
                  <span>↑</span>
                  <span>8.1% vs last month</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-lg p-6">
                <div className="text-sm text-purple-400 mb-2">Trial Conversion</div>
                <div className="text-3xl font-bold text-neutral-100">{conversionMetrics.trialConversionRate}%</div>
                <div className="text-sm text-green-400 mt-2 flex items-center gap-1">
                  <span>↑</span>
                  <span>5.2% vs last month</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-lg p-6">
                <div className="text-sm text-amber-400 mb-2">Churn Rate</div>
                <div className="text-3xl font-bold text-neutral-100">{churnAnalysis.churnRate}%</div>
                <div className="text-sm text-red-400 mt-2 flex items-center gap-1">
                  <span>↑</span>
                  <span>2.1% vs last month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <AttributionChart
              plgRevenue={attributionBreakdown.plgRevenue}
              salesRevenue={attributionBreakdown.salesRevenue}
              hybridRevenue={attributionBreakdown.hybridRevenue}
            />
          </div>

          {/* Funnel and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConversionFunnel />
            <RecentActivity />
          </div>

          {/* Subscription Details */}
          <Section title="Subscription Details">
            <MetricCard
              label="Active Subscriptions"
              value={revenueMetrics.activeSubscriptions}
              type="number"
            />
            <MetricCard
              label="Average MRR"
              value={revenueMetrics.averageMRR}
              type="currency"
            />
            <MetricCard
              label="Churned Subscriptions"
              value={revenueMetrics.churnedSubscriptions}
              type="number"
            />
            <MetricCard
              label="Monthly Churn MRR"
              value={churnAnalysis.monthlyChurnMRR}
              type="currency"
            />
          </Section>

          {/* Customer Journey */}
          <Section title="Customer Journey">
            <MetricCard
              label="Total Users"
              value={customerMetrics.totalUsers}
              type="number"
            />
            <MetricCard
              label="Trial Users"
              value={customerMetrics.trialUsers}
              type="number"
            />
            <MetricCard
              label="Avg Days to Conversion"
              value={conversionMetrics.avgDaysToConversion}
              type="days"
            />
            <MetricCard
              label="Avg Customer Lifetime"
              value={churnAnalysis.avgCustomerLifetime}
              type="days"
            />
          </Section>

          {/* Sales Performance */}
          <Section title="Sales Performance">
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
            <MetricCard
              label="Call Conversion Rate"
              value={conversionMetrics.callConversionRate}
              type="percentage"
            />
            <MetricCard
              label="Sales Revenue"
              value={attributionBreakdown.salesRevenue}
              type="currency"
            />
          </Section>
        </div>
      </div>
    </div>
  );
}

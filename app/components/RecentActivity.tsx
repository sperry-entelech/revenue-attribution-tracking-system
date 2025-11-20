'use client';

interface Activity {
  type: 'signup' | 'upgrade' | 'churn' | 'trial';
  user: string;
  action: string;
  time: string;
  amount?: number;
}

export function RecentActivity() {
  const activities: Activity[] = [
    { type: 'upgrade', user: 'Acme Corp', action: 'Upgraded to Annual', time: '2 min ago', amount: 4788 },
    { type: 'signup', user: 'TechStart Inc', action: 'Started trial', time: '15 min ago' },
    { type: 'upgrade', user: 'Digital Wave', action: 'Upgraded to Pro', time: '1 hour ago', amount: 399 },
    { type: 'churn', user: 'Legacy Systems', action: 'Canceled subscription', time: '3 hours ago' },
    { type: 'signup', user: 'Innovation Labs', action: 'Started trial', time: '5 hours ago' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'upgrade': return '↗️';
      case 'signup': return '✨';
      case 'churn': return '📉';
      case 'trial': return '🔄';
      default: return '•';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'upgrade': return 'text-green-400';
      case 'signup': return 'text-blue-400';
      case 'churn': return 'text-red-400';
      case 'trial': return 'text-purple-400';
      default: return 'text-neutral-400';
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-neutral-100 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors">
            <span className="text-lg">{getIcon(activity.type)}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-neutral-100">{activity.user}</p>
                  <p className={`text-xs ${getColor(activity.type)}`}>{activity.action}</p>
                </div>
                {activity.amount && (
                  <span className="text-sm font-semibold text-green-400">
                    +${activity.amount}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

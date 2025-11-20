# n8n Workflow Integration Guide

**Status**: 📋 Planned - Not Yet Implemented

This document outlines how to build an n8n workflow to automatically populate the revenue tracking dashboard with real data from your business systems.

## Overview

Instead of manually updating Google Sheets or a database, an n8n workflow can:
1. Pull data from multiple sources (CRM, Stripe, analytics, etc.)
2. Calculate metrics and attribution
3. Write to Google Sheets or database
4. Run on schedule (daily, hourly, real-time)

The dashboard then reads from that data source automatically.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐     ┌───────────┐
│   n8n       │────▶│   Google    │────▶│   Dashboard  │────▶│  Browser  │
│  Workflow   │     │   Sheets    │     │   Next.js    │     │           │
└─────────────┘     └─────────────┘     └──────────────┘     └───────────┘
      │
      ├─── Stripe (MRR, subscriptions)
      ├─── CRM (customers, trials)
      ├─── Cal.com (calls booked)
      └─── Analytics (attribution)
```

## Data Sources to Integrate

### Revenue Metrics
- **Stripe**: MRR, active subscriptions, churned subscriptions, average MRR
- **Chargebee/Paddle**: Alternative billing platforms
- **Custom billing system**: API or database queries

### Customer Metrics
- **CRM (HubSpot/Salesforce)**: Total users, active customers, trial users, churned customers
- **Auth system**: User counts and statuses
- **Database**: Direct queries to user table

### Conversion Metrics
- **Cal.com/Calendly**: Calls booked
- **CRM**: Closed deals from calls
- **Analytics**: Trial conversion rates, days to conversion

### Attribution Data
- **Analytics (Mixpanel/Amplitude)**: Attribution by channel
- **CRM**: Lead source tracking
- **UTM parameters**: Campaign attribution
- **Product analytics**: PLG vs Sales classification

## n8n Workflow Structure

### Workflow 1: Revenue Metrics (Stripe → Sheets)

**Trigger**: Schedule (daily at 6 AM)

**Nodes**:
1. **Stripe - Get Subscriptions**
   - Active subscriptions count
   - MRR calculation (sum of subscription amounts)
   - Churned subscriptions (last 30 days)

2. **Function - Calculate Metrics**
   ```javascript
   const activeSubscriptions = $node["Stripe"].json.active_count;
   const totalMRR = $node["Stripe"].json.total_mrr;
   const averageMRR = totalMRR / activeSubscriptions;

   return {
     totalMRR,
     activeSubscriptions,
     churnedSubscriptions: $node["Stripe"].json.churned_count,
     averageMRR
   };
   ```

3. **Google Sheets - Update Row**
   - Write to "Revenue Metrics" range
   - Update columns: Metric Name, Value, Last Updated

### Workflow 2: Customer Metrics (CRM → Sheets)

**Trigger**: Schedule (daily at 6 AM)

**Nodes**:
1. **HubSpot/Salesforce - Get Contacts**
   - Filter by status (active, trial, churned)

2. **Function - Count by Status**
   ```javascript
   const contacts = $node["CRM"].json;

   return {
     totalUsers: contacts.length,
     activeCustomers: contacts.filter(c => c.status === 'active').length,
     trialUsers: contacts.filter(c => c.status === 'trial').length,
     churnedCustomers: contacts.filter(c => c.status === 'churned').length
   };
   ```

3. **Google Sheets - Update Row**

### Workflow 3: Attribution Tracking (Multiple Sources → Sheets)

**Trigger**: Schedule (daily at 6 AM)

**Nodes**:
1. **Stripe - Get Subscriptions with Metadata**
   - Read attribution field from subscription metadata

2. **Function - Group by Attribution**
   ```javascript
   const subscriptions = $node["Stripe"].json.data;

   const attribution = {
     plg: { revenue: 0, count: 0 },
     sales: { revenue: 0, count: 0 },
     hybrid: { revenue: 0, count: 0 }
   };

   subscriptions.forEach(sub => {
     const channel = sub.metadata.attribution || 'plg';
     attribution[channel].revenue += sub.amount;
     attribution[channel].count += 1;
   });

   return attribution;
   ```

3. **Google Sheets - Update Attribution Range**

### Workflow 4: Real-Time Updates (Webhook)

**Trigger**: Webhook (when Stripe event occurs)

**Nodes**:
1. **Webhook - Receive Stripe Event**
   - subscription.created
   - subscription.updated
   - subscription.deleted

2. **Function - Process Event**
3. **Google Sheets - Append to Log**
4. **HTTP Request - Trigger Dashboard Refresh** (optional)

## Google Sheets Structure

### Sheet: "Revenue Metrics"
| Metric Type | Metric Name | Value | Last Updated |
|-------------|-------------|-------|--------------|
| Revenue | Total MRR | 5586 | 2024-11-20 06:00 |
| Revenue | Active Subscriptions | 14 | 2024-11-20 06:00 |
| Revenue | Churned Subscriptions | 1 | 2024-11-20 06:00 |
| Revenue | Average MRR | 399 | 2024-11-20 06:00 |

### Sheet: "Customer Metrics"
| Metric Type | Metric Name | Value | Last Updated |
|-------------|-------------|-------|--------------|
| Customer | Total Users | 15 | 2024-11-20 06:00 |
| Customer | Active Customers | 14 | 2024-11-20 06:00 |
| Customer | Trial Users | 3 | 2024-11-20 06:00 |
| Customer | Churned Customers | 1 | 2024-11-20 06:00 |

### Sheet: "Attribution"
| Channel | Revenue | Customer Count | Last Updated |
|---------|---------|----------------|--------------|
| PLG | 2394 | 6 | 2024-11-20 06:00 |
| Sales | 2793 | 7 | 2024-11-20 06:00 |
| Hybrid | 399 | 1 | 2024-11-20 06:00 |

## Implementation Steps

### Phase 1: Basic Revenue Tracking (1 hour)
1. Set up n8n (cloud or self-hosted)
2. Create Stripe connection
3. Build workflow to fetch subscription data
4. Write to Google Sheets
5. Test dashboard connection

### Phase 2: Customer Metrics (30 min)
1. Add CRM connection
2. Build customer counting workflow
3. Update Google Sheets
4. Verify dashboard display

### Phase 3: Attribution (1 hour)
1. Ensure subscription metadata includes attribution
2. Build attribution grouping workflow
3. Update Google Sheets attribution section
4. Test dashboard breakdown display

### Phase 4: Real-Time Updates (1 hour)
1. Set up Stripe webhooks
2. Create n8n webhook endpoint
3. Build event processing workflow
4. Implement incremental updates

## n8n Workflow Templates

### Template: Daily Revenue Update
```json
{
  "name": "Daily Revenue Metrics Update",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "cronExpression",
              "expression": "0 6 * * *"
            }
          ]
        }
      },
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger"
    },
    {
      "parameters": {
        "resource": "subscription",
        "operation": "getAll"
      },
      "name": "Stripe - Get Subscriptions",
      "type": "n8n-nodes-base.stripe"
    },
    {
      "parameters": {
        "functionCode": "// Calculate metrics from Stripe data..."
      },
      "name": "Calculate Metrics",
      "type": "n8n-nodes-base.function"
    },
    {
      "parameters": {
        "operation": "update",
        "sheetId": "YOUR_SHEET_ID",
        "range": "Revenue Metrics!A2:C10"
      },
      "name": "Google Sheets - Update",
      "type": "n8n-nodes-base.googleSheets"
    }
  ]
}
```

## Error Handling

### Graceful Failures
- Dashboard falls back to last known data if n8n workflow fails
- Google Sheets retains previous values if update fails
- Error notifications via Slack/email when workflow errors occur

### Data Validation
```javascript
// In n8n Function node
const validateMetric = (value, name) => {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error(`Invalid metric value for ${name}: ${value}`);
  }
  if (value < 0) {
    throw new Error(`Negative value for ${name}: ${value}`);
  }
  return value;
};

return {
  totalMRR: validateMetric(totalMRR, 'Total MRR'),
  activeSubscriptions: validateMetric(activeSubscriptions, 'Active Subscriptions')
};
```

## Performance Optimization

### Caching
- Cache API responses in n8n for 5 minutes
- Only write to Google Sheets if values changed
- Batch updates instead of individual row writes

### Rate Limiting
- Respect API rate limits (Stripe: 100/sec, HubSpot varies)
- Implement exponential backoff
- Queue requests during high-volume periods

## Security

### API Keys
- Store in n8n credentials manager
- Never commit to Git
- Rotate periodically

### Service Accounts
- Use read-only access where possible
- Separate credentials for each service
- Monitor usage in cloud console

## Alternative: Direct Database

Instead of Google Sheets, write to PostgreSQL:

```javascript
// n8n Function node
const metrics = calculateMetrics($node["Stripe"].json);

return {
  query: `
    INSERT INTO revenue_metrics (metric_name, value, updated_at)
    VALUES
      ('Total MRR', ${metrics.totalMRR}, NOW()),
      ('Active Subscriptions', ${metrics.activeSubscriptions}, NOW())
    ON CONFLICT (metric_name)
    DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
  `
};
```

Then update dashboard to query database instead of Google Sheets.

## Timeline

| Phase | Description | Time | Status |
|-------|-------------|------|--------|
| 1 | Basic n8n setup + Stripe | 1 hour | 📋 Planned |
| 2 | Google Sheets integration | 30 min | 📋 Planned |
| 3 | CRM connection | 30 min | 📋 Planned |
| 4 | Attribution logic | 1 hour | 📋 Planned |
| 5 | Testing & refinement | 1 hour | 📋 Planned |

**Total estimated time**: 4 hours for full implementation

## When to Implement

**Implement this when**:
- You have access to production data sources (Stripe, CRM, etc.)
- You need real-time or scheduled metric updates
- Client has approved moving from demo to production
- You have credentials and API access for all services

**Don't implement yet if**:
- Still in demo/proposal phase
- Don't have data source access
- Client hasn't signed contract
- Just need screenshots/recordings

## Resources

- [n8n Documentation](https://docs.n8n.io/)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [n8n Community Workflows](https://n8n.io/workflows)

---

**Current Status**: Dashboard works with static data. This guide provides the roadmap for connecting real data when production-ready.

# Google Sheets Integration Guide

Step-by-step guide to connect your dashboard to Google Sheets.

## Prerequisites

- A Google account
- A Google Spreadsheet with your metrics data
- Basic understanding of environment variables

## Step 1: Prepare Your Google Sheet

### Structure Your Data

Your Google Sheet should have a clear structure. Example:

```
| Metric Type          | Metric Name             | Value    |
|---------------------|-------------------------|----------|
| Revenue             | Total MRR               | 5586     |
| Revenue             | Active Subscriptions    | 14       |
| Revenue             | Churned Subscriptions   | 1        |
| Revenue             | Average MRR             | 399      |
| Customer            | Total Users             | 15       |
| Customer            | Active Customers        | 14       |
| ...                 | ...                     | ...      |
```

Or use separate sheets for each metric category.

## Step 2: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Name your project (e.g., "Revenue Dashboard")
4. Click "Create"

## Step 3: Enable Google Sheets API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

## Step 4: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Service account name: `revenue-dashboard-reader`
   - Description: "Read-only access to revenue metrics sheet"
4. Click "Create and Continue"
5. Skip "Grant this service account access to project" (click Continue)
6. Skip "Grant users access to this service account" (click Done)

## Step 5: Generate Service Account Key

1. On the Credentials page, click on your newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Click "Create"
6. A JSON file will download - **keep this secure!**

The JSON file looks like:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "revenue-dashboard-reader@your-project.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

## Step 6: Share Sheet with Service Account

1. Open your Google Sheet
2. Click the "Share" button
3. Paste the service account email (from the JSON file, the `client_email` field)
   - Example: `revenue-dashboard-reader@your-project.iam.gserviceaccount.com`
4. Give it "Viewer" permissions
5. Uncheck "Notify people"
6. Click "Share"

## Step 7: Get Your Spreadsheet ID

Your Google Sheets URL looks like:
```
https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit
```

The Spreadsheet ID is the part between `/d/` and `/edit`:
```
1A2B3C4D5E6F7G8H9I0J
```

## Step 8: Install Dependencies

```bash
cd C:\Users\spder\revenue-tracking-dashboard
npm install googleapis
```

## Step 9: Create Environment Variables

Create a `.env.local` file in your project root:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=1A2B3C4D5E6F7G8H9I0J
GOOGLE_SERVICE_ACCOUNT_EMAIL=revenue-dashboard-reader@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**Important:**
- Copy the private key EXACTLY as it appears in the JSON file
- Keep the quotes around the private key
- Keep the `\n` characters (they represent line breaks)

## Step 10: Create API Route

Create `app/api/metrics/route.ts`:

```typescript
import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { DashboardData } from '@/app/types';

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A2:C100', // Adjust based on your sheet
    });

    const rows = response.data.values || [];
    const dashboardData = transformSheetData(rows);

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

function transformSheetData(rows: any[][]): DashboardData {
  // Create a map of metric name to value
  const metrics: Record<string, number> = {};

  rows.forEach(([type, name, value]) => {
    if (name && value) {
      metrics[name] = parseFloat(value) || 0;
    }
  });

  // Map to your data structure
  return {
    revenueMetrics: {
      totalMRR: metrics['Total MRR'] || 0,
      activeSubscriptions: metrics['Active Subscriptions'] || 0,
      churnedSubscriptions: metrics['Churned Subscriptions'] || 0,
      averageMRR: metrics['Average MRR'] || 0,
    },
    customerMetrics: {
      totalUsers: metrics['Total Users'] || 0,
      activeCustomers: metrics['Active Customers'] || 0,
      trialUsers: metrics['Trial Users'] || 0,
      churnedCustomers: metrics['Churned Customers'] || 0,
    },
    conversionMetrics: {
      trialConversionRate: metrics['Trial Conversion Rate'] || 0,
      avgDaysToConversion: metrics['Avg Days to Conversion'] || 0,
      totalCallsBooked: metrics['Total Calls Booked'] || 0,
      callsWithClosedOutcome: metrics['Calls with Closed Outcome'] || 0,
      callConversionRate: metrics['Call Conversion Rate'] || 0,
    },
    attributionBreakdown: {
      plgRevenue: metrics['PLG Revenue'] || 0,
      salesRevenue: metrics['Sales Revenue'] || 0,
      hybridRevenue: metrics['Hybrid Revenue'] || 0,
      plgCustomerCount: metrics['PLG Customer Count'] || 0,
      salesCustomerCount: metrics['Sales Customer Count'] || 0,
      hybridCustomerCount: metrics['Hybrid Customer Count'] || 0,
    },
    churnAnalysis: {
      churnRate: metrics['Churn Rate'] || 0,
      avgCustomerLifetime: metrics['Avg Customer Lifetime'] || 0,
      monthlyChurnMRR: metrics['Monthly Churn MRR'] || 0,
    },
  };
}
```

## Step 11: Update Page to Use API

Modify `app/page.tsx`:

```typescript
import { MetricCard } from './components/MetricCard';
import { Section } from './components/Section';
import { dashboardData as fallbackData } from './data';

async function getDashboardData() {
  try {
    const res = await fetch('http://localhost:3000/api/metrics', {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch');

    return await res.json();
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    return fallbackData; // Fallback to static data
  }
}

export default async function Home() {
  const data = await getDashboardData();

  // ... rest of your component (unchanged)
}
```

## Step 12: Test the Integration

1. Restart your dev server:
```bash
npm run dev
```

2. Navigate to http://localhost:3000

3. Check the browser console for any errors

4. Verify that the metrics from your Google Sheet are displaying

## Step 13: Deploy to Production

When deploying (to Vercel, Azure, etc.), add the environment variables:

1. Don't commit `.env.local` to git (it's already in `.gitignore`)
2. Add the three environment variables to your hosting platform:
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`

### For Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable

### For Azure Static Web Apps:
1. Go to Configuration > Application settings
2. Add each variable as a new application setting

## Troubleshooting

### Error: "Unable to parse private key"
- Make sure the private key is wrapped in quotes
- Ensure `\n` characters are preserved
- Try copying the key directly from the JSON file

### Error: "The caller does not have permission"
- Verify you shared the sheet with the service account email
- Check that the service account has "Viewer" access
- Make sure the Google Sheets API is enabled

### Error: "Range not found"
- Check your sheet name and range in the API route
- Default is `Sheet1!A2:C100` - adjust as needed
- Make sure your sheet has data in the specified range

### Data not updating
- Remember: server-side fetching with `cache: 'no-store'` will fetch fresh data
- For real-time updates, implement client-side fetching with polling
- Check that your Google Sheet is being updated

## Advanced: Real-Time Updates

For real-time updates, convert to client-side fetching:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { dashboardData as fallbackData } from './data';

export default function Home() {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch('/api/metrics');
        const newData = await res.json();
        setData(newData);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // ... rest of component
}
```

## Security Best Practices

1. Never commit `.env.local` or service account JSON to git
2. Use environment variables for all sensitive data
3. Grant minimum necessary permissions (Viewer only)
4. Rotate service account keys periodically
5. Monitor API usage in Google Cloud Console
6. Consider setting up API quotas to prevent abuse

## Need Help?

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

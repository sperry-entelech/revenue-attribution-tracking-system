# Revenue & Attribution Tracking Dashboard

A production-ready SaaS revenue tracking dashboard built with Next.js 16, TypeScript, and Tailwind CSS. Features Google Sheets integration for real-time metrics, attribution tracking (PLG vs Sales vs Hybrid), and comprehensive churn analysis.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎯 Overview

This dashboard was built as an MVP for demonstrating revenue attribution tracking capabilities to potential clients. It showcases how to integrate external data sources (Google Sheets) with a modern web application while maintaining clean, maintainable code.

> **⚡ DEMO-READY RIGHT NOW**: This project works immediately with static demo data - perfect for screenshots, recordings, and client presentations. The Google Sheets integration is **fully documented** but optional. You can show this off today and connect real data sources when production-ready.

**Key Features:**
- 📊 **20+ Metrics** across 5 dashboard sections
- 🔄 **Real-time Google Sheets Integration** (documented, optional)
- 🎨 **Minimalist Design** inspired by Stripe, Linear, and Vercel
- 📱 **Fully Responsive** from mobile to 4K displays
- 🔒 **Type-Safe** with full TypeScript coverage
- 🚀 **Production Ready** with comprehensive documentation

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Data Source**: Google Sheets API (optional) with static fallback
- **Deployment**: Vercel, Azure, or any Node.js host

### Design Philosophy
- Black theme (#0a0a0a) with clean typography
- No gradients, no excessive animations, no "AI slop"
- Clarity and simplicity above all else
- Professional aesthetics suitable for client demos

## 📈 Dashboard Sections

### 1. Revenue Metrics
- Total MRR (Monthly Recurring Revenue)
- Active Subscriptions
- Churned Subscriptions
- Average MRR per customer

### 2. Customer Metrics
- Total Users
- Active Customers
- Trial Users
- Churned Customers

### 3. Conversion Metrics
- Trial Conversion Rate
- Average Days to Conversion
- Total Calls Booked
- Call Conversion Rate

### 4. Attribution Breakdown
This is the core differentiator - tracking revenue by acquisition channel:
- **PLG (Product-Led Growth)**: Self-serve signups
- **Sales**: Sales-assisted deals
- **Hybrid**: Combination of both

Tracks both revenue and customer count for each channel.

### 5. Churn Analysis
- Churn Rate percentage
- Average Customer Lifetime (days)
- Monthly Churn MRR

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/revenue-tracking-dashboard.git
cd revenue-tracking-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure
```
revenue-tracking-dashboard/
├── app/
│   ├── components/
│   │   ├── MetricCard.tsx      # Reusable metric display card
│   │   └── Section.tsx          # Dashboard section wrapper
│   ├── data.ts                  # Static fallback data
│   ├── types.ts                 # TypeScript interfaces
│   ├── utils.ts                 # Formatting utilities
│   ├── globals.css              # Global styles & theme
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main dashboard page
├── public/                      # Static assets
├── docs/                        # Additional documentation
│   ├── GOOGLE_SHEETS_SETUP.md
│   ├── AZURE_DEPLOYMENT.md
│   └── VISUAL_DESIGN.md
└── README.md
```

## 🔌 Google Sheets Integration

The dashboard can pull live data from Google Sheets. See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for detailed instructions.

**Quick Summary:**
1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a Service Account and download credentials
4. Share your spreadsheet with the service account email
5. Add environment variables to `.env.local`
6. Create API route to fetch data

The app gracefully falls back to static data if the API is unavailable - perfect for demos.

## 🎨 Customization

### Change Theme Colors
Edit `app/globals.css`:
```css
:root {
  --background: #0a0a0a;  /* Background color */
  --foreground: #fafafa;  /* Text color */
}
```

### Update Static Data
Edit `app/data.ts` to change the fallback metrics displayed.

### Add New Metrics
1. Update TypeScript types in `app/types.ts`
2. Add data to `app/data.ts`
3. Add `<MetricCard>` components to `app/page.tsx`

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel deploy
```

### Azure Static Web Apps
See [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) for detailed Azure deployment instructions.

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎯 Use Cases

This dashboard is ideal for:
- **Client Demos**: Show revenue tracking capabilities
- **Internal Dashboards**: Monitor SaaS metrics
- **Portfolio Projects**: Demonstrate full-stack skills
- **Startup MVPs**: Quick revenue tracking for early-stage companies
- **Consulting Deliverables**: Template for client projects

## 📊 Why Attribution Tracking Matters

Modern SaaS companies need to understand which acquisition channels drive the most valuable customers:

- **PLG Revenue**: Typically lower ACV but higher volume, faster sales cycles
- **Sales Revenue**: Higher ACV, longer sales cycles, more support intensive
- **Hybrid Revenue**: Best of both worlds - product-qualified leads that convert to sales

This dashboard makes it easy to track and compare these channels at a glance.

## 📚 Documentation

### Getting Started
- **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** - 🎯 **START HERE** for quick demos & screenshots
- **[START_HERE.md](./START_HERE.md)** - 60-second quick start guide
- **[QUICKSTART.md](./QUICKSTART.md)** - Fast setup instructions

### Production Implementation
- **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)** - Connect Google Sheets API (30 min)
- **[N8N_WORKFLOW_GUIDE.md](./N8N_WORKFLOW_GUIDE.md)** - Automated data pipeline setup (planned)
- **[AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md)** - Deploy to Azure production

### Reference
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project overview
- **[VISUAL_DESIGN.md](./VISUAL_DESIGN.md)** - Design decisions explained
- **[FILE_MANIFEST.md](./FILE_MANIFEST.md)** - What each file does

## 🛠️ Technical Highlights

**For Portfolio/Resume:**
- Server-side rendering with Next.js App Router
- Full TypeScript implementation with custom interfaces
- Google Sheets API integration with OAuth2 service accounts
- Responsive design using Tailwind CSS utility classes
- Error handling with graceful fallbacks
- Clean component architecture with separation of concerns
- Environment variable management for secrets
- Production-ready with comprehensive documentation

## 🤝 Contributing

This is a portfolio/demo project, but suggestions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this for your own projects, portfolios, or client work.

## 👤 Author

**Sperry @ Entelech**
- Building automation and intelligence systems for service businesses
- Specializing in rapid MVP development and AI-powered consulting

## 🙏 Acknowledgments

- Design inspiration: Stripe, Linear, Vercel dashboards
- Built with Next.js, React, and Tailwind CSS
- Google Sheets API for flexible data integration

---

**Status**: Production Ready ✅
**Built**: November 2024
**Purpose**: MVP for revenue attribution tracking demo

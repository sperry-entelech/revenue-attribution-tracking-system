# Azure Deployment Guide

Deploy your Revenue Tracking Dashboard to Azure Static Web Apps or Azure App Service.

## Option 1: Azure Static Web Apps (Recommended for Static/Hybrid Apps)

### Prerequisites
- Azure account
- GitHub account (for CI/CD)
- Azure CLI installed (optional)

### Step 1: Push to GitHub

1. Initialize git repository:
```bash
cd C:\Users\spder\revenue-tracking-dashboard
git init
git add .
git commit -m "Initial commit: Revenue tracking dashboard"
```

2. Create a new GitHub repository (via GitHub website)

3. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/revenue-tracking-dashboard.git
git branch -M main
git push -u origin main
```

### Step 2: Create Azure Static Web App

#### Via Azure Portal:

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Static Web App"
4. Click "Create"
5. Fill in the details:
   - **Subscription**: Choose your subscription
   - **Resource Group**: Create new or select existing
   - **Name**: `revenue-tracking-dashboard`
   - **Region**: Choose closest region
   - **Source**: GitHub
   - **Organization**: Your GitHub username
   - **Repository**: revenue-tracking-dashboard
   - **Branch**: main
   - **Build Presets**: Next.js
   - **App location**: `/`
   - **Api location**: (leave empty)
   - **Output location**: `.next`

6. Click "Review + create"
7. Click "Create"

#### Via Azure CLI:

```bash
az staticwebapp create \
  --name revenue-tracking-dashboard \
  --resource-group your-resource-group \
  --source https://github.com/YOUR_USERNAME/revenue-tracking-dashboard \
  --location "East US 2" \
  --branch main \
  --app-location "/" \
  --output-location ".next" \
  --login-with-github
```

### Step 3: Configure Build Settings

Azure will automatically add a GitHub Actions workflow to your repository.

Check `.github/workflows/azure-static-web-apps-*.yml`:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Build And Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          output_location: ".next"
```

### Step 4: Add Environment Variables

1. In Azure Portal, go to your Static Web App
2. Navigate to "Configuration"
3. Add your environment variables:
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`

4. Click "Save"

### Step 5: Deploy

Push to GitHub and Azure will automatically deploy:

```bash
git add .
git commit -m "Update dashboard"
git push
```

Monitor deployment in:
- GitHub Actions tab in your repository
- Azure Portal > Static Web App > Deployment History

---

## Option 2: Azure App Service (For Server-Side Rendering)

### Step 1: Create App Service

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Web App"
4. Click "Create"
5. Fill in details:
   - **Subscription**: Your subscription
   - **Resource Group**: Create or select
   - **Name**: `revenue-dashboard`
   - **Publish**: Code
   - **Runtime stack**: Node 20 LTS
   - **Operating System**: Linux
   - **Region**: Choose closest
   - **Pricing**: Choose plan (B1 or higher recommended)

6. Click "Review + create"
7. Click "Create"

### Step 2: Configure Deployment

#### Option A: GitHub Actions (Recommended)

1. In App Service, go to "Deployment Center"
2. Select "GitHub" as source
3. Authorize GitHub
4. Select your repository and branch
5. Azure will create a workflow file

Update the workflow to build Next.js:

```yaml
name: Build and deploy Node.js app to Azure Web App

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js version
        uses: actions/setup-node@v3
        with:
          node-version: '20.x'

      - name: npm install and build
        run: |
          npm install
          npm run build

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v3
        with:
          name: node-app
          path: |
            .next
            node_modules
            public
            package.json
            package-lock.json

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: 'Production'

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v3
        with:
          name: node-app

      - name: 'Deploy to Azure Web App'
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'revenue-dashboard'
          slot-name: 'Production'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
```

#### Option B: Azure CLI Deployment

```bash
# Build the app
npm run build

# Create a deployment package
zip -r deploy.zip .next node_modules public package.json package-lock.json

# Deploy to Azure
az webapp deployment source config-zip \
  --resource-group your-resource-group \
  --name revenue-dashboard \
  --src deploy.zip
```

### Step 3: Configure Application Settings

1. Go to App Service > Configuration
2. Add application settings:
   - `GOOGLE_SHEETS_SPREADSHEET_ID`: your-spreadsheet-id
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: your-service-account-email
   - `GOOGLE_PRIVATE_KEY`: your-private-key
   - `SCM_DO_BUILD_DURING_DEPLOYMENT`: true
   - `WEBSITE_NODE_DEFAULT_VERSION`: 20-lts

3. Add startup command:
   - Go to Configuration > General settings
   - Startup Command: `node_modules/next/dist/bin/next start`

4. Click "Save"

### Step 4: Custom Domain (Optional)

1. In App Service, go to "Custom domains"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Add SSL certificate via "TLS/SSL settings"

---

## Option 3: Docker Deployment

### Create Dockerfile

Create `Dockerfile` in your project root:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
};

export default nextConfig;
```

### Build and Deploy

```bash
# Build Docker image
docker build -t revenue-dashboard .

# Test locally
docker run -p 3000:3000 revenue-dashboard

# Push to Azure Container Registry
az acr login --name yourregistry
docker tag revenue-dashboard yourregistry.azurecr.io/revenue-dashboard:latest
docker push yourregistry.azurecr.io/revenue-dashboard:latest

# Deploy to Azure Container Instances or App Service
az container create \
  --resource-group your-rg \
  --name revenue-dashboard \
  --image yourregistry.azurecr.io/revenue-dashboard:latest \
  --dns-name-label revenue-dashboard \
  --ports 3000
```

---

## Performance Optimization for Production

### Enable Caching

In `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
};
```

### Azure CDN Integration

1. Create Azure CDN profile
2. Create CDN endpoint
3. Set origin to your Static Web App or App Service
4. Configure caching rules
5. Update DNS to point to CDN endpoint

### Application Insights

1. Create Application Insights resource
2. Get instrumentation key
3. Add to environment variables
4. Install SDK:

```bash
npm install @azure/monitor-opentelemetry
```

5. Create `instrumentation.ts`:

```typescript
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { AzureMonitorTraceExporter } from '@azure/monitor-opentelemetry-exporter';

export function register() {
  const exporter = new AzureMonitorTraceExporter({
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
  });

  registerInstrumentations({
    instrumentations: [],
  });
}
```

---

## Monitoring and Troubleshooting

### View Logs

**Static Web Apps:**
```bash
az staticwebapp logs show --name revenue-tracking-dashboard
```

**App Service:**
1. Portal > App Service > Log stream
2. Or via CLI:
```bash
az webapp log tail --name revenue-dashboard --resource-group your-rg
```

### Enable Diagnostics

1. Go to App Service > Diagnostic settings
2. Add diagnostic setting
3. Select logs to capture
4. Send to Log Analytics workspace

### Common Issues

**Build fails:**
- Check Node.js version matches (20.x)
- Verify package.json scripts
- Check build logs in GitHub Actions

**Environment variables not working:**
- Restart the app after adding variables
- Check variable names match exactly
- For App Service, verify startup command

**Slow performance:**
- Enable Azure CDN
- Check App Service pricing tier
- Implement caching strategies
- Monitor with Application Insights

---

## Cost Optimization

### Static Web Apps
- Free tier: Perfect for this dashboard
- Includes: 100GB bandwidth, custom domains, SSL

### App Service
- Dev/Test pricing for non-production
- B1 Basic: ~$13/month
- Auto-scaling for traffic spikes

### Recommendations
1. Start with Static Web Apps (free tier)
2. Upgrade to App Service if you need:
   - Server-side processing
   - WebSockets
   - Background jobs
   - More control

---

## Security Checklist

- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Set up Azure AD authentication (if needed)
- [ ] Enable Web Application Firewall
- [ ] Use managed identities for Azure resources
- [ ] Rotate secrets regularly
- [ ] Enable DDoS protection
- [ ] Configure rate limiting

---

## Next Steps

1. Set up custom domain
2. Configure SSL certificate
3. Enable Application Insights
4. Set up Azure CDN
5. Configure automated backups
6. Create staging environment
7. Set up monitoring alerts

## Support Resources

- [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure App Service Docs](https://docs.microsoft.com/azure/app-service/)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

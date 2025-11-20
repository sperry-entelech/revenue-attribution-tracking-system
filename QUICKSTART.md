# Quick Start Guide

Get your Revenue Tracking Dashboard running in 60 seconds.

## Step 1: Navigate to Directory

```bash
cd C:\Users\spder\revenue-tracking-dashboard
```

## Step 2: Start Development Server

```bash
npm run dev
```

## Step 3: Open in Browser

Navigate to: http://localhost:3000

That's it! Your dashboard is now running with static sample data.

## What You'll See

- 5 distinct dashboard sections
- Clean black background with white/grey text
- 20+ key SaaS metrics displayed in card format
- Fully responsive design

## Next Steps

1. **Customize the data**: Edit `app/data.ts` to use your own metrics
2. **Change colors**: Modify `app/globals.css`
3. **Add Google Sheets**: Follow the detailed instructions in `README.md`
4. **Deploy**: Push to Vercel, Netlify, or Azure

## Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## File Structure Overview

- `app/page.tsx` - Main dashboard page
- `app/components/` - Reusable UI components
- `app/data.ts` - Your static data (edit this!)
- `app/types.ts` - TypeScript interfaces
- `app/globals.css` - Global styles and theme

## Troubleshooting

**Port 3000 already in use?**
```bash
# Kill the process on port 3000
npx kill-port 3000

# Or run on a different port
npm run dev -- -p 3001
```

**TypeScript errors?**
```bash
# Make sure dependencies are installed
npm install

# Check TypeScript config
npx tsc --noEmit
```

**Styling not working?**
- Make sure Tailwind is configured properly
- Check that `globals.css` is imported in `layout.tsx`
- Clear `.next` folder and rebuild: `rm -rf .next && npm run dev`

## Support

See `README.md` for comprehensive documentation and Google Sheets integration guide.

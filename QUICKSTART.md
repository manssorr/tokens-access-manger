# Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies (First Time Only)
From the project root:
```bash
pnpm install
```

### 2. Start the Backend
```bash
cd server && pnpm dev
```
Or from the root:
```bash
pnpm dev:server
```

✅ Server running on http://localhost:3000

### 3. Start the Frontend
Open a new terminal:
```bash
cd client && pnpm dev
```
Or from the root:
```bash
pnpm dev:client
```

✅ App running on http://localhost:5173

### 4. Open Your Browser
Visit http://localhost:5173

## What You'll See

- **Theme Toggle**: Top-right corner - switch between light/dark/system theme
- **Seed Tokens Button**: Generate 10 random tokens for testing
- **Add Token Button**: Top-right corner - create new tokens
- **Token Table**: 10 pre-seeded services with their API tokens, expiry dates, and statuses
- **Filters**:
  - Dropdown to filter by service name
  - Checkbox to show only expired tokens
- **Action Buttons**: Renew, Copy, Delete buttons for each token
- **Pagination**: Navigate through tokens (5 per page by default)
- **Toast Notifications**: Success/error feedback for all operations

## Test the Features

1. **View all tokens** - Default view shows all 10 pre-seeded services
2. **Seed random tokens** - Click "Seed Tokens" to generate 10 random tokens:
   - Mix of expired and active tokens
   - Various services (20+ available)
   - Watch pagination update automatically
3. **Add new token** - Click "Add Token", fill the form:
   - Enter service name (e.g., "GitHub API")
   - Click the magic wand 🪄 icon to auto-generate token, or enter manually
   - Pick an expiry date
   - Click "Create Token"
4. **Filter by service** - Select any service from dropdown
5. **Show expired only** - Check the "Show Expired Only" box
6. **Sort the table** - Click column headers to sort (Service Name, Expiry Date, Status)
7. **Renew a token** - Click "Renew" button on any row
8. **Copy a token** - Click the copy icon to copy token value
9. **Delete a token** - Click the trash icon and confirm deletion
10. **Change theme** - Toggle between light/dark/system mode
11. **Pagination** - Navigate pages and adjust items per page

## Troubleshooting

### Backend won't start?
- Check if port 3000 is available: `lsof -ti:3000`
- Kill existing process: `kill -9 <PID>`

### Frontend won't start?
- Check if port 5173 is available: `lsof -ti:5173`
- Kill existing process: `kill -9 <PID>`

### No data showing?
- Make sure backend is running on port 3000
- Check browser console for errors
- Verify CORS is working (should see API calls in Network tab)

## Next Steps

- Read [README.md](README.md) for complete documentation
- Check [docs/](docs/) folder for technical details
- Review [plans/](plans/) folder for implementation notes

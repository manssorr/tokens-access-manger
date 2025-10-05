# Access Manager

A lightweight full-stack application for managing API access tokens across multiple services. Built with React, TypeScript, Vite, shadcn/ui, and Express.

## Features

✅ **Token Management** - View tokens from multiple services (GitHub, AWS, Stripe, etc.)
✅ **Add New Tokens** - Create new tokens with service name, token value, and expiry date
✅ **Auto-Generate Tokens** - Smart token generation based on service name with correct prefixes
✅ **Seed Random Tokens** - Generate 10 random tokens per click for testing (mix of expired and active)
✅ **Smart Filtering** - Filter by service name or show expired tokens only
✅ **Token Renewal** - One-click token renewal with instant feedback
✅ **Token Deletion** - Delete tokens with confirmation dialog and "don't show again" option
✅ **Copy to Clipboard** - One-click copy for token values with toast confirmation
✅ **Table Sorting** - Sort by service name, expiry date, or status (ascending/descending)
✅ **Pagination** - Client-side pagination with configurable items per page (persisted to localStorage)
✅ **Theme Toggle** - Light/Dark/System theme with localStorage persistence
✅ **Professional UI** - Clean, modern interface built with shadcn/ui
✅ **Responsive Design** - Works seamlessly on desktop and mobile
✅ **Real-time Status** - Automatic status calculation based on expiry dates
✅ **Toast Notifications** - Success/error feedback for all operations

## Tech Stack

### Frontend
- **React 19** + **TypeScript**
- **Vite** - Fast build tool
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first styling
- **Sonner** - Toast notifications

### Backend
- **Express.js** + **TypeScript**
- **CORS** - Cross-origin support
- **Mock Data** - In-memory data store

### Shared
- **@palm/shared** - Workspace package with shared constants, types, and utilities
- **pnpm workspaces** - Monorepo management

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd palm-assessment
   ```

2. **Install all dependencies** (installs for client, server, and shared)
   ```bash
   pnpm install
   ```

### Running the Application

**Terminal 1 - Start the backend:**
```bash
pnpm dev:server
```
Server will run on http://localhost:3000

**Terminal 2 - Start the frontend:**
```bash
pnpm dev:client
```
Frontend will run on http://localhost:5173

**Alternative (from subdirectories):**
```bash
# Terminal 1
cd server && pnpm dev

# Terminal 2
cd client && pnpm dev
```

### Building for Production

**Build everything (shared, client, server):**
```bash
pnpm build
```

**Build individual packages:**
```bash
pnpm build:shared   # Build shared package first
pnpm build:client   # Build client (requires shared)
pnpm build:server   # Build server (requires shared)
```

**Run production build:**
```bash
cd server && pnpm start
```

## Project Structure

```
palm-assessment/            # Monorepo root
├── pnpm-workspace.yaml    # Workspace configuration
├── package.json           # Root scripts (dev:client, dev:server, build, etc.)
│
├── shared/                # @palm/shared workspace package
│   ├── src/
│   │   ├── constants.ts   # Shared constants (API routes, filter values)
│   │   ├── utils.ts       # Shared utilities (isExpired, getTokenStatus)
│   │   └── index.ts       # Package entry point
│   ├── dist/              # Compiled output
│   └── package.json
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ui/        # shadcn/ui components (DO NOT MODIFY)
│   │   │   ├── AddTokenDialog.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── TokenTable.tsx
│   │   │   ├── RenewButton.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── api/           # API layer (config, tokens.api.ts)
│   │   ├── hooks/         # Custom hooks (useTokens, usePagination, useLocalStorage)
│   │   ├── lib/           # Utilities (helpers, token-generator, toast)
│   │   ├── config/        # Configuration (constants, app.config)
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   └── package.json
│
├── server/                # Express backend
│   ├── src/
│   │   ├── config/        # Server configuration
│   │   ├── data/          # Mock token data
│   │   ├── routes/        # API route handlers
│   │   ├── types/         # TypeScript types
│   │   └── index.ts       # Server entry point
│   └── package.json
│
├── docs/                  # Documentation
│   ├── architecture.md    # System architecture
│   ├── api-spec.md        # API specifications
│   ├── components.md      # Component documentation
│   └── setup.md           # Setup guide
│
├── plans/                 # Implementation plans
│   └── implementation-plan.md
│
├── QUICKSTART.md          # Quick start guide
└── README.md
```

## API Endpoints

### GET /api/tokens
Returns all tokens with their current status.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "serviceName": "GitHub API",
      "token": "ghp_xxxx...yyyy",
      "expiryDate": "2026-03-15T00:00:00.000Z",
      "status": "active"
    }
  ]
}
```

### POST /api/tokens
Creates a new token.

**Request:**
```json
{
  "serviceName": "My Service",
  "token": "my_access_token_here",
  "expiryDate": "2026-12-31T23:59:59.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token created successfully",
  "data": { /* new token */ }
}
```

### POST /api/tokens/:id/renew
Renews a token (stub implementation - extends expiry by 1 year).

**Response:**
```json
{
  "success": true,
  "message": "Token renewed successfully",
  "data": { /* updated token */ }
}
```

### DELETE /api/tokens/:id
Deletes a token by ID.

**Response:**
```json
{
  "success": true,
  "message": "Token deleted successfully"
}
```

### POST /api/tokens/seed
Seeds random tokens for testing (default: 10 tokens).

**Request:**
```json
{
  "count": 10
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully seeded 10 tokens",
  "data": [ /* array of 10 new tokens */ ]
}
```

## Features Detail

### Filtering
- **Service Filter**: Dropdown to filter tokens by specific service
- **Expired Filter**: Checkbox to show only expired tokens
- Both filters work together for precise filtering

### Token Display
- **Masked Tokens**: Security-first approach showing `xxxx...yyyy` format
- **Status Badges**: Visual indicators (green for active, red for expired)
- **Formatted Dates**: Human-readable date format (e.g., "Mar 15, 2026")

### Token Creation
- **Manual Entry**: Enter any token value manually
- **Auto-Generate**: Click the magic wand icon to auto-generate tokens
  - Detects service type (GitHub, AWS, Stripe, etc.)
  - Applies correct prefix (e.g., `ghp_` for GitHub, `AKIA` for AWS)
  - Generates secure random token string
  - Shows confirmation toast notification
- **Seed Random Tokens**: Click "Seed Tokens" button to generate 10 random tokens
  - Randomized services (20 services available)
  - Mix of expired and active tokens (±12 months from current date)
  - Perfect for testing pagination, filtering, and sorting
  - Shows success toast with count

### Token Renewal
- Click "Renew" button to extend token
- Loading state with spinner animation
- Success/error toast notifications
- Automatic table refresh after renewal

## Development Notes

### Trial Task Scope
This is a demonstration project with intentional simplifications:
- Mock data (no real database)
- Stub renewal logic (no actual API integration)
- In-memory storage (resets on server restart)

### Production Considerations
For production use, consider:
- Database integration (PostgreSQL, MongoDB)
- Real token renewal with service APIs
- Authentication & authorization
- Rate limiting
- Audit logging
- Data encryption
- Pagination for large datasets

## Documentation

Detailed documentation is available in the `docs/` folder:
- **[Architecture](docs/architecture.md)** - System design and data flow
- **[API Specification](docs/api-spec.md)** - Complete API reference
- **[Components](docs/components.md)** - Component documentation
- **[Setup Guide](docs/setup.md)** - Detailed setup and troubleshooting

## Scripts

### Monorepo (root)
```bash
pnpm install           # Install all workspace dependencies
pnpm build             # Build shared, client, and server (in order)
pnpm dev:client        # Start client dev server
pnpm dev:server        # Start server dev server
pnpm build:shared      # Build only shared package
pnpm build:client      # Build only client
pnpm build:server      # Build only server
```

### Frontend (client/)
```bash
pnpm dev      # Start dev server
pnpm build    # Build for production (requires @palm/shared)
pnpm preview  # Preview production build
```

### Backend (server/)
```bash
pnpm dev      # Start dev server with hot reload
pnpm build    # Compile TypeScript (requires @palm/shared)
pnpm start    # Run compiled code
```

### Shared (shared/)
```bash
pnpm build    # Compile TypeScript to dist/
pnpm watch    # Watch mode for development
pnpm clean    # Remove dist/ folder
```

## Deployment

This application can be deployed to Render.com using the included blueprint configuration.

### Quick Deploy to Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

**One-Click Deployment:**
1. Click the button above (or manually create services in Render)
2. Connect your GitHub repository
3. Render will automatically detect `render.yaml`
4. Review and deploy both services (backend + frontend)
5. Update environment variables after deployment (see below)

### Environment Variables

After deployment, update these in the Render dashboard:

**Backend (`access-manager-api`):**
- `CORS_ORIGINS` - Set to your frontend URL
- `FRONTEND_URL` - Set to your frontend URL

**Frontend (`access-manager-app`):**
- `VITE_API_URL` - Set to your backend URL

### Detailed Deployment Guide

For complete deployment instructions, troubleshooting, and configuration options, see **[DEPLOYMENT.md](DEPLOYMENT.md)**.

### Live Demo

Once deployed, your app will be available at:
- Frontend: `https://your-app-name.onrender.com`
- Backend API: `https://your-api-name.onrender.com`

---

## License

ISC

## Author

Built for Palm Assessment Trial Task

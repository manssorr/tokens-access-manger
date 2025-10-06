# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated deployment to Render.

## Workflows

### 1. Deploy Frontend (`deploy-frontend.yml`)
Automatically deploys the frontend to Render when changes are pushed to:
- `client/**` - Any changes in the client directory
- `shared/**` - Any changes in the shared package
- `.github/workflows/deploy-frontend.yml` - Changes to the workflow itself

### 2. Deploy Backend (`deploy-backend.yml`)
Automatically deploys the backend to Render when changes are pushed to:
- `server/**` - Any changes in the server directory
- `shared/**` - Any changes in the shared package
- `.github/workflows/deploy-backend.yml` - Changes to the workflow itself

## Setup Instructions

### 1. Get Render Deploy Hooks

#### For Frontend:
1. Go to your Render dashboard: https://dashboard.render.com
2. Select your **frontend static site** (e.g., `access-manager-app`)
3. Go to **Settings** → **Deploy Hook**
4. Copy the Deploy Hook URL

#### For Backend:
1. Go to your Render dashboard: https://dashboard.render.com
2. Select your **backend web service** (e.g., `tokens-access-manger`)
3. Go to **Settings** → **Deploy Hook**
4. Copy the Deploy Hook URL

### 2. Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

   - **Name**: `RENDER_DEPLOY_HOOK_FRONTEND`
     - **Value**: The Deploy Hook URL for your frontend static site
     - Example: `https://api.render.com/deploy/srv-xxxxx?key=xxxxxx`

   - **Name**: `RENDER_DEPLOY_HOOK_BACKEND`
     - **Value**: The Deploy Hook URL for your backend web service
     - Example: `https://api.render.com/deploy/srv-yyyyy?key=yyyyyy`

5. Click **Add secret** for each

### 3. How It Works

Once set up, the workflows will automatically trigger on push to `main` branch:

1. **Frontend deployment** triggers when:
   - You modify any file in `client/` or `shared/`
   - Example: `git push origin main` after editing `client/src/App.tsx`

2. **Backend deployment** triggers when:
   - You modify any file in `server/` or `shared/`
   - Example: `git push origin main` after editing `server/src/routes/tokens.ts`

3. **Both deployments** trigger when:
   - You modify files in `shared/`
   - This ensures both frontend and backend are updated when shared code changes

### 4. Monitoring Deployments

- View workflow runs in GitHub: **Actions** tab
- View deployment status in Render: Dashboard → Service → Events
- Deployments typically take 2-5 minutes

### 5. Manual Deployment

To manually trigger a deployment without code changes:
1. Go to **Actions** tab in GitHub
2. Select the workflow (Deploy Frontend or Deploy Backend)
3. Click **Run workflow** → **Run workflow**

## Notes

- Workflows only run on the `main` branch
- Deploy hooks are secure URLs that trigger builds without exposing credentials
- Multiple workflows can run in parallel (e.g., if both `client/` and `server/` are modified)
- Failed deployments will show in the Actions tab with error logs

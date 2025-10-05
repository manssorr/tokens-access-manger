# Deployment Guide - Access Manager

This guide covers deploying the Access Manager application to Render.com, a cloud platform that provides free hosting for web services and static sites.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Deployment Strategy](#deployment-strategy)
- [Quick Deploy (Blueprint)](#quick-deploy-blueprint)
- [Manual Deployment](#manual-deployment)
- [Post-Deployment Configuration](#post-deployment-configuration)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

1. **GitHub Account** - Your code must be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **Git Repository** - Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

---

## Deployment Strategy

This monorepo application deploys as **two separate services**:

1. **Backend Web Service** (`access-manager-api`)
   - Express.js API server
   - Runs on Node.js
   - Free tier: Auto-sleeps after 15 min of inactivity

2. **Frontend Static Site** (`access-manager-app`)
   - React SPA built with Vite
   - Static files served from CDN
   - Free tier: Always available

---

## Quick Deploy (Blueprint)

The fastest way to deploy is using the included `render.yaml` blueprint file.

### Step 1: Connect to GitHub
1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub account if not already connected
4. Select your repository

### Step 2: Deploy Blueprint
1. Render will detect the `render.yaml` file
2. Review the services:
   - `access-manager-api` (Web Service)
   - `access-manager-app` (Static Site)
3. Click **"Apply"**

### Step 3: Configure Environment Variables
After deployment starts, you need to update environment variables:

#### For Backend (`access-manager-api`):
1. Go to the backend service dashboard
2. Click **"Environment"** in the left sidebar
3. Update `FRONTEND_URL`:
   - Wait for frontend to deploy
   - Copy the frontend URL (e.g., `https://access-manager-app.onrender.com`)
   - Paste it as the value for `FRONTEND_URL`
4. The `CORS_ORIGINS` will be auto-set to match `FRONTEND_URL`

#### For Frontend (`access-manager-app`):
1. Go to the frontend service dashboard
2. Click **"Environment"** in the left sidebar
3. Update `VITE_API_URL`:
   - Copy the backend URL (e.g., `https://access-manager-api.onrender.com`)
   - Paste it as the value for `VITE_API_URL`
4. Save changes

### Step 4: Trigger Redeploy
After updating environment variables:
1. Go to each service dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait for both services to redeploy

🎉 **Your app is now live!**

---

## Manual Deployment

If you prefer manual setup or need more control:

### Deploy Backend (Web Service)

1. **Create Web Service**
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `access-manager-api`
     - **Region**: Oregon (or closest to you)
     - **Branch**: `main`
     - **Root Directory**: Leave empty (uses root)
     - **Runtime**: Node
     - **Build Command**: `pnpm install && pnpm build:shared && pnpm build:server`
     - **Start Command**: `cd server && pnpm start`
     - **Plan**: Free

2. **Environment Variables**
   Add these in the "Environment" tab:
   ```
   NODE_ENV=production
   PORT=10000
   CORS_ORIGINS=https://your-frontend-url.onrender.com
   ```

3. **Health Check**
   - Path: `/health`
   - This ensures Render knows your service is running

### Deploy Frontend (Static Site)

1. **Create Static Site**
   - Click **"New +"** → **"Static Site"**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `access-manager-app`
     - **Region**: Oregon (or same as backend)
     - **Branch**: `main`
     - **Root Directory**: Leave empty
     - **Build Command**: `pnpm install && pnpm build:shared && pnpm build:client`
     - **Publish Directory**: `client/dist`

2. **Environment Variables**
   Add in the "Environment" tab:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

3. **Headers (Optional but Recommended)**
   In "Headers" tab, add:
   ```
   /*
     Cache-Control: public, max-age=0, must-revalidate

   /assets/*
     Cache-Control: public, max-age=31536000, immutable
   ```

---

## Post-Deployment Configuration

### Update CORS After Both Services Deploy

1. Note your deployed URLs:
   - Backend: `https://access-manager-api.onrender.com`
   - Frontend: `https://access-manager-app.onrender.com`

2. Update backend environment variables:
   ```
   CORS_ORIGINS=https://access-manager-app.onrender.com
   FRONTEND_URL=https://access-manager-app.onrender.com
   ```

3. Update frontend environment variables:
   ```
   VITE_API_URL=https://access-manager-api.onrender.com
   ```

4. Redeploy both services for changes to take effect

---

## Environment Variables

### Backend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | Yes | `development` | Set to `production` |
| `PORT` | No | `3000` | Render sets this automatically |
| `CORS_ORIGINS` | Yes | `localhost` | Frontend URL (comma-separated for multiple) |
| `FRONTEND_URL` | No | - | Frontend URL for reference |

### Frontend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | Yes | `http://localhost:3000` | Backend API URL |

---

## Troubleshooting

### Issue: Backend shows "Service Unavailable"
**Solution**:
- Check build logs in Render dashboard
- Ensure `pnpm build:shared` ran successfully
- Verify `PORT` environment variable is set

### Issue: Frontend can't connect to backend
**Possible Causes**:
1. **CORS Error**: Backend `CORS_ORIGINS` doesn't include frontend URL
   - Update backend env var: `CORS_ORIGINS=https://your-frontend.onrender.com`
   - Redeploy backend

2. **Wrong API URL**: Frontend `VITE_API_URL` points to wrong backend
   - Update frontend env var: `VITE_API_URL=https://your-backend.onrender.com`
   - Redeploy frontend

3. **Backend is sleeping** (free tier):
   - First request after 15 min takes ~30 seconds to wake up
   - Subsequent requests are fast
   - Consider upgrading to paid tier for always-on service

### Issue: Build fails with "Module not found"
**Solution**:
- Ensure build command includes `pnpm build:shared`
- Check that `@palm/shared` is listed in `dependencies` (not `devDependencies`)
- Verify `pnpm-workspace.yaml` is in the root directory

### Issue: 404 on frontend routes
**Solution**:
- Static sites need a `_redirects` file for SPA routing
- Create `client/public/_redirects`:
  ```
  /*    /index.html   200
  ```
- Redeploy frontend

### Issue: Environment variables not updating
**Solution**:
- After changing env vars, you MUST redeploy
- Go to service → "Manual Deploy" → "Deploy latest commit"
- Changes don't take effect until redeploy completes

---

## Custom Domain (Optional)

To use your own domain:

1. **Add Domain in Render**
   - Go to service dashboard → "Settings"
   - Scroll to "Custom Domain"
   - Click "Add Custom Domain"
   - Enter your domain (e.g., `app.yourdomain.com`)

2. **Update DNS Records**
   - Add CNAME record in your DNS provider:
     ```
     app.yourdomain.com → your-app.onrender.com
     ```

3. **Update Environment Variables**
   - Update `CORS_ORIGINS` in backend to include new domain
   - Update `VITE_API_URL` in frontend if backend has custom domain
   - Redeploy both services

---

## Monitoring

### Check Service Health
- Backend: `https://your-backend.onrender.com/health`
- Should return: `{ "status": "ok" }`

### View Logs
- Go to service dashboard → "Logs" tab
- Real-time logs show requests, errors, and server output
- Filter by log level (Info, Warn, Error)

### Monitor Performance
- Render dashboard shows:
  - CPU usage
  - Memory usage
  - Request counts
  - Response times

---

## Costs

### Free Tier Limitations
- **Web Service**: 750 hours/month (auto-sleeps after 15 min inactivity)
- **Static Site**: Unlimited (no sleep)
- **Bandwidth**: 100 GB/month
- **Build Minutes**: 500 minutes/month

### Upgrade Options
If you need always-on service:
- **Starter Plan**: $7/month (no sleep, more resources)
- **Standard Plan**: $25/month (even more resources)

---

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Blueprints Guide](https://render.com/docs/infrastructure-as-code)
- [Render Free Tier Details](https://render.com/docs/free)
- [Troubleshooting Build Failures](https://render.com/docs/troubleshooting-builds)

---

## Quick Reference: Common Commands

```bash
# Local development
pnpm install          # Install all dependencies
pnpm build:shared     # Build shared package
pnpm dev:server       # Start backend dev server
pnpm dev:client       # Start frontend dev server

# Production build (test locally)
pnpm build            # Build everything
pnpm start            # Start production server

# Git deployment
git add .
git commit -m "Deploy to Render"
git push origin main  # Triggers auto-deploy on Render
```

---

**Need Help?** Open an issue in the GitHub repository or contact support@render.com

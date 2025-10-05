# Render Deployment - Quick Start

## 🚀 Deploy in 5 Minutes

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Select your GitHub repository
4. Render detects `render.yaml` automatically
5. Click **"Apply"**

### Step 3: Wait for Deployment
Both services will deploy automatically:
- ✅ `access-manager-api` (Backend)
- ✅ `access-manager-app` (Frontend)

### Step 4: Update Environment Variables

**After both services finish deploying:**

#### Backend Environment:
1. Go to `access-manager-api` service
2. Click **"Environment"**
3. Update:
   ```
   CORS_ORIGINS=https://access-manager-app.onrender.com
   ```
   (Replace with your actual frontend URL)

#### Frontend Environment:
1. Go to `access-manager-app` service
2. Click **"Environment"**
3. Update:
   ```
   VITE_API_URL=https://access-manager-api.onrender.com
   ```
   (Replace with your actual backend URL)

### Step 5: Redeploy Both Services
1. Go to each service
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait for redeploy to complete

## ✅ Done!

Your app is now live:
- **Frontend**: `https://access-manager-app.onrender.com`
- **Backend API**: `https://access-manager-api.onrender.com/health`

---

## 📚 Need More Help?

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Detailed step-by-step instructions
- Troubleshooting guide
- Custom domain setup
- Monitoring and logs
- Manual deployment options

---

## 🔧 Local Testing Before Deploy

```bash
# Build everything
pnpm build

# Test production server locally
pnpm start

# Verify it works at http://localhost:10000
```

---

## ⚠️ Free Tier Notes

- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Consider upgrading to paid tier ($7/month) for always-on service

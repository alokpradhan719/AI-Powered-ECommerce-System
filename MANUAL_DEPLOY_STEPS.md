## MANUAL DEPLOYMENT STEPS (Since Git auth needed)

### STEP 1: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens/new
2. Select scopes: `repo`, `workflow`
3. Generate token
4. Copy the token

### STEP 2: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `AI-Powered-ECommerce`
3. Click "Create repository"

### STEP 3: Upload Files to GitHub

Option A - Using Web Upload:
1. Go to your repo
2. Click "Add file" → "Upload files"
3. Drag and drop the entire AI-Powered-ECommerce folder
4. Commit changes

Option B - Using Git Token:
```powershell
cd "C:\Users\ALOK PRADHAN\OneDrive\ドキュメント\AI-Powered-ECommerce"
git push -u origin main
# Enter username: alokpradhan719
# Enter password: YOUR_GITHUB_TOKEN (from step 1)
```

### STEP 4: Deploy to Vercel

1. Go to: https://vercel.com/dashboard
2. Click "New Project"
3. Click "Import Git Repository"
4. Paste: https://github.com/alokpradhan719/AI-Powered-ECommerce
5. Click "Import"

Vercel auto-detects Next.js! Click Deploy.

### STEP 5: Add Environment Variables in Vercel

In Vercel dashboard, go to Project Settings → Environment Variables

Add these:
```
DB_HOST = localhost
DB_USER = root
DB_PASSWORD = 1234
DB_NAME = ecommerce_analytics
ANTHROPIC_API_KEY = (your-api-key-here)
NODE_ENV = production
```

### STEP 6: Wait for Deployment

Vercel will build and deploy. Takes 2-3 minutes.

### Your app will be live at:
https://ai-powered-ecommerce.vercel.app

---

**IMPORTANT: Make sure MySQL database is running locally before this deploys!**

The MySQL on localhost:3306 must be accessible.

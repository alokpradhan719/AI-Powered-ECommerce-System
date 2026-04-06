# DEPLOY TO VERCEL WITH MYSQL DATABASE

## YES - Project will work with MySQL on Vercel! ✅

You need:
1. **Cloud MySQL Database** (not local)
2. **Vercel Account**
3. **Anthropic API Key**

---

## STEP 1: Set Up Cloud MySQL Database

### Option A: PlanetScale (Recommended - FREE)
1. Go to https://planetscale.com
2. Sign up / Login
3. Create new database
4. Get connection string

### Option B: AWS RDS
1. Go to AWS RDS Console
2. Create MySQL instance
3. Get endpoint

### Option C: Azure MySQL
1. Go to Azure Portal
2. Create MySQL server
3. Get connection details

---

## STEP 2: Import Database Schema

Once you have MySQL connection details:

```cmd
mysql -h YOUR_HOST -u YOUR_USER -p YOUR_PASSWORD < database/full_database.sql
```

This creates the schema and sample data.

---

## STEP 3: Get Anthropic API Key

1. Go to https://console.anthropic.com
2. Get your API key (starts with `sk-ant-`)
3. Save it

---

## STEP 4: Prepare GitHub

```cmd
cd C:\Users\ALOK PRADHAN\OneDrive\ドキュメント\AI-Powered-ECommerce

git init
git add .
git commit -m "AI E-commerce with MySQL"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/AI-Powered-ECommerce.git
git push -u origin main
```

---

## STEP 5: Deploy to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"New Project"**
3. Select your GitHub repo
4. Click **"Import"**

---

## STEP 6: Add Environment Variables in Vercel

**In Project Settings → Environment Variables**, add:

```
DB_HOST = your-mysql-host (e.g., pscale_xxx.mysql.database.com)
DB_USER = your-username
DB_PASSWORD = your-password
DB_NAME = ecommerce_analytics
ANTHROPIC_API_KEY = sk-ant-xxxxx
NODE_ENV = production
```

---

## STEP 7: Deploy

Click **"Deploy"** button

Wait 2-3 minutes → Your app is LIVE! 🎉

---

## Test It

Visit: `https://your-project.vercel.app`

Try asking: "What are the top 5 best-selling products?"

---

## IMPORTANT ⚠️

- ✅ MySQL database must be running and accessible
- ✅ Environment variables must be set in Vercel
- ✅ Anthropic API key must be valid
- ✅ Database schema must be imported
- ✅ Frontend will connect to backend via `/api` routes

---

**That's it! Your app will work perfectly with MySQL on Vercel!**

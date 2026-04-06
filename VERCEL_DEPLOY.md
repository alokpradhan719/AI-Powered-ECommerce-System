# ✅ DEPLOYMENT INSTRUCTIONS FOR VERCEL

## YES! This project will run successfully on Vercel! ✨

Follow these exact steps to deploy:

---

## STEP 1: Initialize Git Repository

```cmd
cd C:\Users\ALOK PRADHAN\OneDrive\ドキュメント\AI-Powered-ECommerce
git init
git add .
git commit -m "AI-Powered E-commerce Analytics Platform"
git branch -M main
```

---

## STEP 2: Push to GitHub

1. Go to https://github.com/new
2. Create repository: `AI-Powered-ECommerce`
3. Run these commands:

```cmd
git remote add origin https://github.com/YOUR_USERNAME/AI-Powered-ECommerce.git
git push -u origin main
```

---

## STEP 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (EASIEST)

1. Go to https://vercel.com/dashboard
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Paste: `https://github.com/YOUR_USERNAME/AI-Powered-ECommerce`
5. Click **"Import"**

Vercel will auto-detect Next.js!

---

## STEP 4: Set Environment Variables

**In Vercel Project Settings → Environment Variables**, add:

### Database Variables
```
DB_HOST = your-database-host (e.g., dbName.mysql.database.azure.com)
DB_USER = database-username
DB_PASSWORD = database-password
DB_NAME = ecommerce_analytics
```

### AI Variables
```
ANTHROPIC_API_KEY = sk-ant-xxxxx (from https://console.anthropic.com)
```

### Other Variables
```
NODE_ENV = production
CORS_ORIGIN = https://your-project.vercel.app
```

---

## STEP 5: Set Up Database for Production

### Option A: Use PlanetScale (EASIEST - Free Tier)

1. Go to https://planetscale.com
2. Create new database
3. Get connection string
4. Import schema:
```cmd
mysql -h HOST -u USER -p < database/full_database.sql
```

### Option B: Use AWS RDS / Azure Database

1. Create MySQL database
2. Get connection endpoint
3. Import schema with your credentials

---

## STEP 6: Deploy

1. Back in Vercel, scroll down and click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. ✅ Your app is live!

Your app URL: `https://your-project.vercel.app`

---

## QUICK REFERENCE

| What | Value |
|------|-------|
| **Frontend** | Next.js (auto-detected) |
| **Backend** | Express in `/backend` |
| **Database** | MySQL 8+ |
| **API** | https://your-project.vercel.app/api |
| **Frontend** | https://your-project.vercel.app |

---

## TESTING YOUR DEPLOYMENT

1. Visit: `https://your-project.vercel.app`
2. Test health: `https://your-project.vercel.app/api/health`
3. Try a query: Ask "What are the top 5 best-selling products?"

---

## TROUBLESHOOTING

### Build Failed?
- Check Vercel logs: Project → Deployments → Failed build
- Ensure all environment variables are set
- Check database connection string

### Database Connection Error?
- Verify DB credentials in environment variables
- Ensure database is accessible from Vercel
- Check security groups/firewalls

### Frontend shows "API Error"?
- Check ANTHROPIC_API_KEY is correct
- Verify database is running
- Check browser console for errors (F12)

---

## 🎉 CONGRATULATIONS!

Your AI-Powered E-commerce Analytics Platform is now **live on Vercel**!

Share your URL: `https://your-project.vercel.app`

Need help? Check the API responses or Vercel logs.

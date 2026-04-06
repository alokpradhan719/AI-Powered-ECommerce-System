# Deployment Guide for Vercel

## Prerequisites

Before deploying to Vercel, ensure you have:

1. GitHub account with the repository
2. Vercel account (free at vercel.com)
3. Cloud database (MySQL) - examples:
   - PlanetScale (MySQL compatible)
   - AWS RDS
   - DigitalOcean Managed Databases
   - Heroku ClearDB

## Step 1: Push Code to GitHub

### Initialize Git Repository
```bash
cd AI-Powered-ECommerce
git init
git add .
git commit -m "Initial commit: AI-Powered E-commerce Analytics"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/AI-Powered-ECommerce.git
git push -u origin main
```

## Step 2: Set Up Cloud Database

### Using PlanetScale (Recommended - Free Tier Available)

1. Go to [PlanetScale](https://planetscale.com)
2. Create a new database
3. Get your connection string
4. Run the SQL schema:
   ```bash
   mysql -h YOUR_HOST -u YOUR_USER -p < database/full_database.sql
   ```

### Using AWS RDS

1. Create RDS MySQL instance
2. Get endpoint and credentials
3. Run the SQL schema with your credentials

## Step 3: Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Go to API keys section
4. Create new secret key
5. Copy and save securely

## Step 4: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Find and select your GitHub repository
5. Click "Import"

### Configure Build Settings

Vercel should auto-detect your Next.js setup. If needed:

- **Framework**: Next.js
- **Build Command**: `npm run build:frontend`
- **Output Directory**: `frontend/.next`
- **Install Command**: `npm install`

### Add Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=ecommerce_analytics
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-vercel-domain.vercel.app/api
```

### Deploy

Click "Deploy" and wait for the deployment to complete.

### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Follow prompts and add environment variables

## Step 5: Configure Frontend API URL

After deployment, update the frontend to use your Vercel URL:

In Vercel dashboard:
1. Go to your project settings
2. Environment Variables
3. Update `NEXT_PUBLIC_API_URL` to your Vercel domain

## Step 6: Test the Deployment

1. Visit your deployed URL
2. Test the health endpoint: `https://your-app.vercel.app/api/health`
3. Try a sample query

## Deployment Checklist

- [ ] Database is running and accessible from Vercel
- [ ] Database schema has been imported (full_database.sql)
- [ ] OpenAI API key is set and valid
- [ ] All environment variables are configured
- [ ] Frontend .env variables are set correctly
- [ ] Backend server.js is configured for production
- [ ] CORS_ORIGIN matches your Vercel domain
- [ ] Database connection pool is configured properly

## Monitoring & Logs

### View Deployment Logs
- In Vercel Dashboard → Deployments
- Click on deployment → Logs

### Database Connection Issues

If you see connection errors:

1. Verify database is running
2. Check credentials in environment variables
3. Ensure database host is accessible from Vercel
4. Check database firewalls/security groups allow Vercel IPs

### OpenAI API Issues

If AI features aren't working:

1. Verify API key is correct and active
2. Check API key has sufficient credits
3. Ensure rate limits haven't been exceeded
4. Check API key permissions

## Performance Optimization

### Database Query Optimization

- The database has indexes on frequently queried columns
- Use LIMIT in queries to reduce data transfer
- Monitor slow queries in your database

### Frontend Optimization

- Next.js automatically optimizes images and code
- Results are paginated (showing first 10 rows)
- CSS is minified and optimized

### Backend Optimization

- Connection pooling is enabled
- Queries are validated before execution
- Large results are truncated to prevent memory issues

## Scaling Considerations

### For Higher Traffic

1. **Database**: Consider read replicas
2. **Cache**: Add Redis for query caching
3. **CDN**: Vercel includes automatic CDN
4. **API Rate Limiting**: Add rate limiting middleware

### Production Checklist

- [ ] Error logging and monitoring (Sentry/LogRocket)
- [ ] Database backups enabled
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Input validation enhanced
- [ ] Sensitive data in environment variables only
- [ ] HTTPS enforced
- [ ] CORS properly configured

## Rollback

If deployment has issues:

```bash
# Revert to previous deployment
vercel rollback
```

## Custom Domain

To add a custom domain:

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records with Vercel's instructions
4. Update environment variables with new domain

## Support & Troubleshooting

### Common Issues

**Port 3001 not available**: Change PORT in .env
**Database connection refused**: Check database is running and accessible
**CORS errors**: Verify NEXT_PUBLIC_API_URL is correct
**OpenAI errors**: Check API key and rate limits

### Getting Help

1. Check Vercel Documentation: https://vercel.com/docs
2. Check Next.js Documentation: https://nextjs.org/docs
3. Check project README for detailed info
4. Review error logs in Vercel dashboard

## Security Best Practices

1. Never commit .env files
2. Use environment variables for all secrets
3. Implement HTTPS only
4. Add authentication if needed
5. Validate all user inputs
6. Use prepared statements for database queries
7. Keep dependencies updated
8. Monitor for security vulnerabilities

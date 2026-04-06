# Quick Start Guide

Get up and running with AI-Powered E-commerce Analytics in 5 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- MySQL 8+ ([Download](https://dev.mysql.com/downloads/mysql))
- OpenAI API Key ([Get one](https://platform.openai.com/api-keys))

## Installation (Windows)

### 1. Extract Project
```cmd
cd AI-Powered-ECommerce
```

### 2. Run Setup Script
```cmd
setup.bat
```

This will install all dependencies for both backend and frontend.

### 3. Configure Database

Open `backend/.env` and update:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce_analytics
```

Then import the database:
```cmd
mysql -u root -p ecommerce_analytics < database/full_database.sql
```

### 4. Configure OpenAI

Open `backend/.env` and add:
```
OPENAI_API_KEY=sk-your_key_here
```

### 5. Start Development Server

```cmd
npm run dev
```

This will start both backend (port 3001) and frontend (port 3000).

### 6. Open Browser

Go to: **http://localhost:3000**

---

## Installation (Mac/Linux)

### 1. Extract Project
```bash
cd AI-Powered-ECommerce
```

### 2. Run Setup Script
```bash
chmod +x setup.sh
./setup.sh
```

### 3. Configure & Start

Follow steps 3-6 from Windows guide above.

---

## First Time Usage

### Try These Sample Questions:

1. **"What are the top 5 best-selling products?"**
   - Shows product performance

2. **"Show me total revenue by category"**
   - Revenue breakdown by category

3. **"How many customers are in each region?"**
   - Geographic customer distribution

4. **"What are the pending orders?"**
   - Orders awaiting processing

5. **"Which products are low on stock?"**
   - Inventory management

---

## File Structure

```
AI-Powered-ECommerce/
├── backend/
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   └── .env.example           # Configuration template
├── frontend/
│   ├── app/                   # Next.js pages
│   ├── components/            # React components
│   ├── lib/                   # Helper functions
│   └── package.json           # Frontend dependencies
├── database/
│   └── full_database.sql      # Database schema
├── README.md                  # Detailed documentation
├── API.md                     # API reference
└── DEPLOYMENT.md              # Vercel deployment guide
```

---

## Environment Files

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce_analytics
OPENAI_API_KEY=sk-your_key
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Development Commands

```bash
# Start both frontend and backend
npm run dev

# Start backend only
cd backend && npm run dev

# Start frontend only
cd frontend && npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/query/analyze` | Ask a question, get SQL + insights |
| POST | `/api/query/generate` | Generate SQL from natural language |
| POST | `/api/query/execute` | Execute a SQL query |
| GET | `/api/stats/overview` | Get database statistics |
| GET | `/api/queries/samples` | Get sample questions |
| GET | `/api/health` | Health check |

See `API.md` for detailed documentation.

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows
```

### MySQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution:**
- Ensure MySQL is running
- Check credentials in .env
- Run: `mysql -u root -p` to test connection

### Missing npm packages
```bash
# Reinstall dependencies
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
```

### Database not found
```bash
# Import database schema
mysql -u root -p < database/full_database.sql
```

---

## Next Steps

1. ✅ **Basic Setup**: Follow the installation steps above
2. 📚 **Learn More**: Read detailed README.md
3. 🚀 **Deploy**: Follow DEPLOYMENT.md for Vercel
4. 📖 **API Docs**: Check API.md for endpoint details
5. 🎨 **Customize**: Modify components in frontend/

---

## Getting Help

### Documentation Files
- `README.md` - Comprehensive documentation
- `API.md` - API reference
- `DEPLOYMENT.md` - Deployment guide
- `database/full_database.sql` - Database schema

### Common Issues
Check the **Troubleshooting** section above or the main README.md

### Support Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Docs](https://expressjs.com)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [MySQL Docs](https://dev.mysql.com/doc)
- [Vercel Docs](https://vercel.com/docs)

---

## What's Included

✨ **Features**
- Natural language query interface
- AI-powered SQL generation
- Real-time query execution
- Business insights generation
- Beautiful modern UI
- Vercel deployment ready

📦 **Stack**
- Frontend: Next.js + React + TypeScript + Tailwind CSS
- Backend: Node.js + Express + MySQL
- AI: OpenAI API
- Deployment: Vercel

🗄️ **Database**
- 15 tables with full schema
- Sample e-commerce data
- Performance indexes
- Full relational structure

---

## Production Checklist

Before deploying to production:

- [ ] Database configured and populated
- [ ] OpenAI API key validated
- [ ] Environment variables set
- [ ] CORS configured for your domain
- [ ] Database backups enabled
- [ ] Error logging implemented
- [ ] Rate limiting configured
- [ ] Security headers added

See DEPLOYMENT.md for details.

---

**Happy Analyzing! 🎉**

For questions or issues, refer to the comprehensive documentation or check the API reference.

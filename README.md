# AI-Powered E-commerce Analytics Platform

A cutting-edge AI-powered analytics platform that transforms natural language questions into intelligent SQL queries, delivering actionable business insights from e-commerce data.

## Features

✨ **Natural Language Processing**: Ask questions in plain English  
🤖 **AI-Powered SQL Generation**: Automatic query generation using OpenAI  
📊 **Real-time Analytics**: Instant data analysis and visualization  
💡 **Business Insights**: AI-generated insights and recommendations  
🚀 **Production Ready**: Built with modern tech stack  
☁️ **Cloud Deployable**: Ready for Vercel deployment  

## Project Structure

```
AI-Powered-ECommerce/
├── backend/                 # Node.js Express API
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment variables template
├── frontend/               # Next.js React Application
│   ├── app/               # App directory (Next.js 13+)
│   ├── components/        # React components
│   ├── lib/               # Utility functions & API calls
│   ├── styles/            # CSS & Tailwind
│   ├── package.json       # Dependencies
│   └── next.config.js     # Next.js configuration
├── database/              # Database setup
│   └── full_database.sql  # Schema & sample data
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## Tech Stack

### Backend
- **Node.js 18+** - Server runtime
- **Express.js** - Web framework
- **MySQL2/Promise** - Database driver
- **OpenAI API** - AI model for SQL generation
- **CORS** - Cross-origin resource sharing

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Database
- **MySQL 8+** - Relational database
- 15 tables with full schema
- Sample e-commerce data

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MySQL 8+
- OpenAI API key
- Vercel account (for deployment)

### Local Development Setup

#### 1. Clone or Extract the Project
```bash
cd AI-Powered-ECommerce
```

#### 2. Database Setup
```bash
# Start MySQL service
# Import the database schema
mysql -u root -p < database/full_database.sql
```

#### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# - DB_HOST: localhost
# - DB_USER: root
# - DB_PASSWORD: your_password
# - OPENAI_API_KEY: your_openai_key

# Start the backend server
npm run dev
# Runs on http://localhost:3001
```

#### 4. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001

# Start the frontend development server
npm run dev
# Runs on http://localhost:3000
```

#### 5. Access the Application
Open your browser and navigate to: `http://localhost:3000`

## API Endpoints

### Query Generation
- **POST** `/api/query/generate` - Generate SQL from natural language
- **POST** `/api/query/execute` - Execute a SQL query
- **POST** `/api/query/analyze` - Generate SQL, execute, and get insights

### Statistics
- **GET** `/api/stats/overview` - Get database statistics
- **GET** `/api/queries/samples` - Get sample questions

### Health
- **GET** `/api/health` - Health check

## Example Queries

Try these questions:
- "What are the top 5 best-selling products?"
- "Show me total revenue by category"
- "How many customers are in each region?"
- "What are the pending orders?"
- "Show me customer lifetime value"
- "Which products are low on stock?"
- "What is the average order value?"
- "Show me the most reviewed products"

## Deployment to Vercel

### Prerequisites
- GitHub account with the repository pushed
- Vercel account

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: AI-Powered E-commerce Analytics"
git branch -M main
git remote add origin https://github.com/your-username/AI-Powered-ECommerce.git
git push -u origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Select your GitHub repository
- Configure environment variables:
  - `DB_HOST`: Your database host
  - `DB_USER`: Database user
  - `DB_PASSWORD`: Database password
  - `DB_NAME`: Database name (ecommerce_analytics)
  - `OPENAI_API_KEY`: Your OpenAI API key
  - `NEXT_PUBLIC_API_URL`: Your Vercel backend URL

3. **Configure Database**
- Use a cloud database service (e.g., PlanetScale, AWS RDS, or DigitalOcean)
- Update the connection string in environment variables
- Run the SQL schema on your cloud database

4. **Deploy**
- Click "Deploy"
- Wait for the build to complete
- Your app will be live at `your-project.vercel.app`

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce_analytics
PORT=3001
NODE_ENV=development
OPENAI_API_KEY=sk-...
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Database Schema

The application includes 15 tables:
- **CUSTOMERS** - Customer information
- **ADDRESSES** - Customer addresses
- **PRODUCTS** - Product catalog
- **CATEGORIES** - Product categories
- **SUPPLIERS** - Supplier information
- **INVENTORY** - Stock management
- **ORDERS** - Customer orders
- **ORDER_ITEMS** - Items in each order
- **PAYMENTS** - Payment transactions
- **SHIPMENTS** - Shipment tracking
- **REVIEWS** - Product reviews
- **COUPONS** - Discount coupons
- **RETURNS** - Product returns
- **CARTS** - Shopping carts
- **CART_ITEMS** - Items in carts

## Features in Detail

### 1. Natural Language Interface
Users can ask questions in plain English without knowledge of SQL syntax.

### 2. AI-Powered Query Generation
OpenAI API automatically converts natural language to optimized MySQL queries.

### 3. Real-time Execution
Queries are executed immediately with results displayed in an interactive table.

### 4. Business Insights
AI generates meaningful insights and recommendations from query results.

### 5. Sample Queries
Pre-built sample questions help new users get started quickly.

### 6. Responsive Design
Beautiful, modern UI with dark theme optimized for data visualization.

## Performance Optimization

- Database indexes on frequently queried columns
- Query result pagination (first 10 rows shown)
- Efficient connection pooling
- CORS middleware for optimized requests
- Next.js automatic code splitting

## Security Features

- Only SELECT queries allowed for data safety
- Environment variable protection
- CORS configuration
- Input validation
- SQL injection prevention through parameterized queries

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
- Ensure MySQL service is running
- Verify credentials in .env file
- Check database name exists

### OpenAI API Error
```
Error: 401 Unauthorized
```
- Verify OPENAI_API_KEY is correct
- Check API key has sufficient credits
- Ensure API key is active

### CORS Error
- Update `NEXT_PUBLIC_API_URL` in frontend .env.local
- Ensure backend URL matches

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check environment variables

---

**Built with ❤️ using AI and Modern Web Technologies**

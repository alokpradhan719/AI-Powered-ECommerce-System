import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { Anthropic } from '@anthropic-ai/sdk';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SCHEMA_CONTEXT = `
You are an expert SQL query generator for an e-commerce analytics database.
The database has these tables:
CUSTOMERS, ADDRESSES, CATEGORIES, SUPPLIERS, PRODUCTS, INVENTORY, ORDERS, ORDER_ITEMS, 
PAYMENTS, SHIPMENTS, REVIEWS, COUPONS, RETURNS, CARTS, CART_ITEMS

Generate ONLY the SQL query without explanation.
`;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Generate SQL
app.post('/api/query/generate', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question required' });

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: `${SCHEMA_CONTEXT}\n\nQuestion: ${question}\n\nGenerate SQL:` }],
    });

    let sqlQuery = message.content[0].type === 'text' ? message.content[0].text : '';
    sqlQuery = sqlQuery.replace(/```sql\n?/g, '').replace(/```\n?/g, '').trim();

    res.json({ success: true, question, sqlQuery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Execute query
app.post('/api/query/execute', async (req, res) => {
  let conn;
  try {
    const { sqlQuery } = req.body;
    if (!sqlQuery) return res.status(400).json({ error: 'Query required' });

    if (!sqlQuery.trim().toUpperCase().startsWith('SELECT')) {
      return res.status(400).json({ error: 'Only SELECT queries allowed' });
    }

    conn = await pool.getConnection();
    const [rows] = await conn.query(sqlQuery);

    res.json({ success: true, rowCount: rows.length, data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (conn) conn.release();
  }
});

// Analyze (generate + execute + insights)
app.post('/api/query/analyze', async (req, res) => {
  let conn;
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question required' });

    // Generate SQL
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: `${SCHEMA_CONTEXT}\n\nQuestion: ${question}\n\nGenerate SQL:` }],
    });

    let sqlQuery = message.content[0].type === 'text' ? message.content[0].text : '';
    sqlQuery = sqlQuery.replace(/```sql\n?/g, '').replace(/```\n?/g, '').trim();

    if (!sqlQuery.trim().toUpperCase().startsWith('SELECT')) {
      return res.status(400).json({ error: 'Invalid query generated' });
    }

    // Execute query
    conn = await pool.getConnection();
    const [rows] = await conn.query(sqlQuery);

    // Generate insights
    const insightMessage = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Based on this data, provide 2-3 key insights:\n\nQuestion: ${question}\n\nData:\n${JSON.stringify(rows.slice(0, 10), null, 2)}`,
      }],
    });

    const insights = insightMessage.content[0].type === 'text' ? insightMessage.content[0].text : '';

    res.json({
      success: true,
      question,
      sqlQuery,
      rowCount: rows.length,
      data: rows,
      insights,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (conn) conn.release();
  }
});

// Stats
app.get('/api/stats/overview', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    
    const [customers] = await conn.query('SELECT COUNT(*) as count FROM CUSTOMERS');
    const [products] = await conn.query('SELECT COUNT(*) as count FROM PRODUCTS');
    const [orders] = await conn.query('SELECT COUNT(*) as count FROM ORDERS');
    const [revenue] = await conn.query('SELECT SUM(total_amount) as total FROM ORDERS');

    res.json({
      success: true,
      stats: {
        totalCustomers: customers[0]?.count || 0,
        totalProducts: products[0]?.count || 0,
        totalOrders: orders[0]?.count || 0,
        totalRevenue: revenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (conn) conn.release();
  }
});

// Sample queries
app.get('/api/queries/samples', (req, res) => {
  res.json({
    success: true,
    samples: [
      'What are the top 5 best-selling products?',
      'Show me total revenue by category',
      'How many customers are in each region?',
      'What are the pending orders?',
    ],
  });
});

export default app;

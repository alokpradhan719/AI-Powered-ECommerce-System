import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { Anthropic } from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce_analytics',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
  multipleStatements: false,
});

// Anthropic (Claude) Configuration
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Database Schema Context for AI
const SCHEMA_CONTEXT = `
You are an expert SQL query generator for an e-commerce analytics database.
The database has the following tables and structure:

CUSTOMERS (customer_id, name, email, phone, region, created_at)
ADDRESSES (address_id, customer_id, street, city, state, postal_code, country, is_billing, is_shipping)
CATEGORIES (category_id, name, description)
SUPPLIERS (supplier_id, name, contact_email, phone)
PRODUCTS (product_id, sku, name, category_id, supplier_id, price, created_at)
INVENTORY (inventory_id, product_id, stock, reorder_level, last_updated)
ORDERS (order_id, customer_id, billing_address_id, shipping_address_id, total_amount, status, order_date)
ORDER_ITEMS (id, order_id, product_id, unit_price, quantity)
PAYMENTS (payment_id, order_id, amount, method, status, paid_at)
SHIPMENTS (shipment_id, order_id, shipped_date, carrier, tracking_number, status)
REVIEWS (review_id, product_id, customer_id, rating, title, body, created_at)
COUPONS (coupon_id, code, discount_percent, expires_at)
RETURNS (return_id, order_item_id, reason, status, created_at)
CARTS (cart_id, customer_id, created_at)
CART_ITEMS (cart_item_id, cart_id, product_id, quantity, added_at)

When given a natural language question about the data:
1. Generate a valid, optimized MySQL query
2. The query should be ready to execute directly
3. Use appropriate JOINs, aggregations, and filters
4. Return ONLY the SQL query without any explanation or markdown formatting

IMPORTANT: Return ONLY the SQL query, nothing else. No markdown, no explanation, no backticks.
`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI E-commerce Analytics API is running' });
});

// Generate SQL from natural language
app.post('/api/query/generate', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Call Anthropic to generate SQL
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `${SCHEMA_CONTEXT}\n\nQuestion: ${question}\n\nGenerate the SQL query:`,
        },
      ],
    });

    let sqlQuery = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Clean up the SQL query
    sqlQuery = sqlQuery.replace(/```sql\n?/g, '').replace(/```\n?/g, '').trim();

    res.json({
      success: true,
      question,
      sqlQuery,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error generating SQL:', error);
    res.status(500).json({
      error: 'Failed to generate SQL query',
      details: error.message,
    });
  }
});

// Execute SQL query and return results
app.post('/api/query/execute', async (req, res) => {
  let conn;
  try {
    const { sqlQuery } = req.body;

    if (!sqlQuery) {
      return res.status(400).json({ error: 'SQL query is required' });
    }

    // Security check - only allow SELECT queries
    const trimmedQuery = sqlQuery.trim().toUpperCase();
    if (!trimmedQuery.startsWith('SELECT')) {
      return res.status(400).json({
        error: 'Only SELECT queries are allowed for security reasons',
      });
    }

    conn = await pool.getConnection();
    const [rows] = await conn.query(sqlQuery);

    res.json({
      success: true,
      rowCount: rows.length,
      data: rows,
      executedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({
      error: 'Failed to execute query',
      details: error.message,
    });
  } finally {
    if (conn) conn.release();
  }
});

// Combined endpoint: Generate and Execute
app.post('/api/query/analyze', async (req, res) => {
  let conn;
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Step 1: Generate SQL from natural language
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `${SCHEMA_CONTEXT}\n\nQuestion: ${question}\n\nGenerate the SQL query:`,
        },
      ],
    });

    let sqlQuery = message.content[0].type === 'text' ? message.content[0].text : '';
    sqlQuery = sqlQuery.replace(/```sql\n?/g, '').replace(/```\n?/g, '').trim();

    // Security check
    if (!sqlQuery.trim().toUpperCase().startsWith('SELECT')) {
      return res.status(400).json({
        error: 'Generated query is not a SELECT statement',
      });
    }

    // Step 2: Execute the query
    conn = await pool.getConnection();
    const [rows] = await conn.query(sqlQuery);

    // Step 3: Generate insights using AI
    const insightMessage = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Based on the following data from an e-commerce analytics database, provide 2-3 key business insights and recommendations:\n\nQuestion: ${question}\n\nData:\n${JSON.stringify(rows.slice(0, 10), null, 2)}\n\nProvide insights in a clear, business-friendly format.`,
        },
      ],
    });

    const insights = insightMessage.content[0].type === 'text' ? insightMessage.content[0].text : '';

    res.json({
      success: true,
      question,
      sqlQuery,
      rowCount: rows.length,
      data: rows,
      insights,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in analyze:', error);
    res.status(500).json({
      error: 'Failed to analyze question',
      details: error.message,
    });
  } finally {
    if (conn) conn.release();
  }
});

// Get database statistics
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
    console.error('Error fetching stats:', error);
    res.status(500).json({
      error: 'Failed to fetch statistics',
      details: error.message,
    });
  } finally {
    if (conn) conn.release();
  }
});

// Sample queries endpoint
app.get('/api/queries/samples', (req, res) => {
  const samples = [
    'What are the top 5 best-selling products?',
    'Show me total revenue by category',
    'How many customers are in each region?',
    'What are the pending orders?',
    'Show me customer lifetime value',
    'Which products are low on stock?',
    'What is the average order value?',
    'Show me the most reviewed products',
  ];

  res.json({
    success: true,
    samples,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ AI E-commerce Analytics API running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Database: ${process.env.DB_NAME || 'ecommerce_analytics'}`);
});

export default app;

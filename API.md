# API Integration Guide

## Overview

The AI-Powered E-commerce Analytics API provides endpoints for natural language query processing and data analysis. All responses are in JSON format.

## Base URL

- **Development**: `http://localhost:3001`
- **Production**: `https://your-vercel-domain.vercel.app`

## Authentication

Currently, no authentication is required. For production, consider adding API key authentication.

## Endpoints

### 1. Health Check
**GET** `/api/health`

Check if the API is running.

```bash
curl http://localhost:3001/api/health
```

**Response**:
```json
{
  "status": "ok",
  "message": "AI E-commerce Analytics API is running"
}
```

---

### 2. Generate SQL Query
**POST** `/api/query/generate`

Convert a natural language question to SQL.

**Request**:
```json
{
  "question": "What are the top 5 best-selling products?"
}
```

**Response**:
```json
{
  "success": true,
  "question": "What are the top 5 best-selling products?",
  "sqlQuery": "SELECT p.product_id, p.name, SUM(oi.quantity) as total_sold FROM PRODUCTS p JOIN ORDER_ITEMS oi ON p.product_id = oi.product_id GROUP BY p.product_id, p.name ORDER BY total_sold DESC LIMIT 5",
  "generatedAt": "2024-04-06T10:30:00.000Z"
}
```

---

### 3. Execute SQL Query
**POST** `/api/query/execute`

Execute a SQL query and get results.

**Request**:
```json
{
  "sqlQuery": "SELECT * FROM CUSTOMERS LIMIT 5"
}
```

**Response**:
```json
{
  "success": true,
  "rowCount": 5,
  "data": [
    {
      "customer_id": 1,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "phone": "555-0100",
      "region": "North",
      "created_at": "2025-11-15T08:22:33.000Z"
    },
    ...
  ],
  "executedAt": "2024-04-06T10:31:00.000Z"
}
```

---

### 4. Analyze Question (Combined)
**POST** `/api/query/analyze`

Generate SQL, execute it, and get AI insights all in one request.

**Request**:
```json
{
  "question": "Show me total revenue by category"
}
```

**Response**:
```json
{
  "success": true,
  "question": "Show me total revenue by category",
  "sqlQuery": "SELECT c.name, SUM(o.total_amount) as revenue FROM CATEGORIES c JOIN PRODUCTS p ON c.category_id = p.category_id JOIN ORDER_ITEMS oi ON p.product_id = oi.product_id JOIN ORDERS o ON oi.order_id = o.order_id GROUP BY c.category_id, c.name",
  "rowCount": 3,
  "data": [
    {
      "name": "Electronics",
      "revenue": 349.95
    },
    {
      "name": "Clothing",
      "revenue": 29.99
    },
    {
      "name": "Home",
      "revenue": 34.98
    }
  ],
  "insights": "Electronics is the top revenue generator with $349.95 (82% of total). This category demonstrates strong customer demand. Consider expanding electronics inventory and potentially running targeted marketing campaigns. Clothing and Home categories underperform relative to Electronics.",
  "generatedAt": "2024-04-06T10:32:00.000Z"
}
```

---

### 5. Get Database Statistics
**GET** `/api/stats/overview`

Get an overview of database statistics.

**Response**:
```json
{
  "success": true,
  "stats": {
    "totalCustomers": 4,
    "totalProducts": 6,
    "totalOrders": 4,
    "totalRevenue": 529.94
  }
}
```

---

### 6. Get Sample Queries
**GET** `/api/queries/samples`

Get a list of sample questions to get started.

**Response**:
```json
{
  "success": true,
  "samples": [
    "What are the top 5 best-selling products?",
    "Show me total revenue by category",
    "How many customers are in each region?",
    "What are the pending orders?",
    "Show me customer lifetime value",
    "Which products are low on stock?",
    "What is the average order value?",
    "Show me the most reviewed products"
  ]
}
```

---

## Error Handling

All errors follow a consistent format:

```json
{
  "error": "Error message",
  "details": "Additional details (development only)"
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

## Rate Limiting

Currently no rate limiting. For production, implement rate limiting using middleware like:
- `express-rate-limit`
- `redis` for distributed rate limiting

## Security Considerations

1. **Read-Only Queries**: Only SELECT queries are allowed
2. **Input Validation**: All inputs are validated
3. **Error Messages**: Sensitive details hidden in production
4. **CORS**: Configured for production domains

## Code Examples

### JavaScript/Node.js

```javascript
// Using fetch
async function analyzeQuestion(question) {
  const response = await fetch('http://localhost:3001/api/query/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });
  
  return response.json();
}

// Usage
const result = await analyzeQuestion('What are the top 5 best-selling products?');
console.log(result);
```

### Python

```python
import requests

def analyze_question(question):
    url = 'http://localhost:3001/api/query/analyze'
    payload = {'question': question}
    response = requests.post(url, json=payload)
    return response.json()

# Usage
result = analyze_question('Show me total revenue by category')
print(result)
```

### cURL

```bash
curl -X POST http://localhost:3001/api/query/analyze \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the pending orders?"}'
```

## Response Pagination

Results are limited to the first 10 rows to prevent memory issues. For larger datasets, consider:

1. Adding pagination parameters
2. Implementing result export features
3. Using aggregation functions (SUM, AVG, COUNT, etc.)

## Performance Tips

1. **Use Aggregations**: GROUP BY, SUM, AVG for large datasets
2. **Filter Early**: Use WHERE clauses to reduce data
3. **Limit Results**: Always use LIMIT
4. **Use Indexes**: Database has indexes on key columns

## Monitoring

### Recommended Metrics to Track

- API response time
- Database query performance
- OpenAI API usage and costs
- Error rates
- Database connection pool status

### Logging

Add logging middleware for production:

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});
```

## WebSocket Support (Future)

For real-time updates, consider adding WebSocket support:

```javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('query', (question) => {
    // Process and emit results
  });
});
```

## Versioning

Current API Version: **1.0.0**

For backward compatibility, future versions will use URL prefixes: `/api/v2/...`

## Support

For API questions or issues:
1. Check this documentation
2. Review error messages
3. Check Vercel logs
4. Review backend server.js for details

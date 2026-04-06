const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface AnalysisResponse {
  success: boolean;
  question: string;
  sqlQuery: string;
  rowCount: number;
  data: any[];
  insights: string;
  generatedAt: string;
}

interface GenerateQueryResponse {
  success: boolean;
  question: string;
  sqlQuery: string;
  generatedAt: string;
}

interface ExecuteQueryResponse {
  success: boolean;
  rowCount: number;
  data: any[];
  executedAt: string;
}

interface StatsResponse {
  success: boolean;
  stats: {
    totalCustomers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
  };
}

export async function analyzeQuestion(question: string): Promise<AnalysisResponse> {
  const response = await fetch(`${API_URL}/api/query/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!response.ok) throw new Error('Failed to analyze question');
  return response.json();
}

export async function generateQuery(question: string): Promise<GenerateQueryResponse> {
  const response = await fetch(`${API_URL}/api/query/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!response.ok) throw new Error('Failed to generate query');
  return response.json();
}

export async function executeQuery(sqlQuery: string): Promise<ExecuteQueryResponse> {
  const response = await fetch(`${API_URL}/api/query/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sqlQuery }),
  });
  if (!response.ok) throw new Error('Failed to execute query');
  return response.json();
}

export async function getStats(): Promise<StatsResponse> {
  const response = await fetch(`${API_URL}/api/stats/overview`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}

export async function getSampleQueries(): Promise<string[]> {
  const response = await fetch(`${API_URL}/api/queries/samples`);
  if (!response.ok) throw new Error('Failed to fetch sample queries');
  const data = await response.json();
  return data.samples;
}

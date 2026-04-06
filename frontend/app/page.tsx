'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, TrendingUp, Database, Zap } from 'lucide-react';
import QueryBuilder from '../components/QueryBuilder';
import StatsOverview from '../components/StatsOverview';
import { getStats } from '../lib/api';

interface Stats {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await getStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Analytics Hub</h1>
                <p className="text-sm text-gray-400">E-commerce Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <Database className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Connected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        {!loading && stats && <StatsOverview stats={stats} />}

        {/* Query Builder */}
        <div className="mt-8">
          <QueryBuilder onAnalysisComplete={loadStats} />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-purple-500/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Smart Analysis</h3>
            </div>
            <p className="text-gray-400 text-sm">Ask questions in natural language and get AI-powered insights instantly.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-blue-500/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <BarChart className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-semibold">Visual Reports</h3>
            </div>
            <p className="text-gray-400 text-sm">Visualize complex data patterns with interactive charts and graphs.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-pink-500/50 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Database className="w-5 h-5 text-pink-400" />
              <h3 className="text-white font-semibold">Real-time Data</h3>
            </div>
            <p className="text-gray-400 text-sm">Access live e-commerce data with automatic query optimization.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>AI-Powered E-commerce Analytics Platform • Powered by AI & Data Intelligence</p>
        </div>
      </footer>
    </div>
  );
}

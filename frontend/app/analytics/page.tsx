'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QueryBuilder from '@/components/QueryBuilder';
import StatsOverview from '@/components/StatsOverview';
import { getStats } from '@/lib/api';
import { motion } from 'framer-motion';
import { FiGrid, FiLayers, FiTrendingUp } from 'react-icons/fi';

interface Stats {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function Analytics() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'dashboard' | 'queries'>('dashboard');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await getStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary opacity-5 rounded-full blur-3xl"></div>
        </div>

        <motion.div className="container-custom relative z-10" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">
              AI-Powered <span className="text-gradient">Analytics Dashboard</span>
            </h1>
            <p className="text-xl text-slate-300">Ask questions about your data. Get answers with AI-generated SQL queries.</p>
          </motion.div>

          {/* View Toggle */}
          <motion.div variants={itemVariants} className="flex gap-4 mb-8">
            <button
              onClick={() => setView('dashboard')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                view === 'dashboard' ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow-lg' : 'glass hover:bg-white/10'
              }`}
            >
              <FiGrid size={20} />
              Dashboard
            </button>
            <button
              onClick={() => setView('queries')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                view === 'queries' ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow-lg' : 'glass hover:bg-white/10'
              }`}
            >
              <FiLayers size={20} />
              Query Builder
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="flex-grow px-4 pb-12">
        <motion.div className="container-custom" variants={containerVariants} initial="hidden" animate="visible">
          {view === 'dashboard' ? (
            <motion.div variants={itemVariants}>
              {/* Stats Overview */}
              {!loading && stats ? (
                <motion.div className="mb-12" variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FiTrendingUp className="text-primary" />
                    Key Metrics
                  </h2>
                  <StatsOverview stats={stats} />
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Quick Access Query Builder */}
              <motion.div variants={itemVariants} className="glass rounded-xl p-8 border border-primary/20">
                <h2 className="text-2xl font-bold text-white mb-6">Ask Your Data</h2>
                <QueryBuilder onAnalysisComplete={loadStats} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div variants={itemVariants}>
              <div className="glass rounded-xl p-8 border border-primary/20">
                <QueryBuilder onAnalysisComplete={loadStats} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

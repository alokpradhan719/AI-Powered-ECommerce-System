'use client';

import React, { useState, useEffect } from 'react';
import { analyzeQuestion, getSampleQueries } from '../lib/api';
import ResultsDisplay from './ResultsDisplay';
import { FiSend } from 'react-icons/fi';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { motion } from 'framer-motion';

interface AnalysisResponse {
  success: boolean;
  question: string;
  sqlQuery: string;
  rowCount: number;
  data: any[];
  insights: string;
  generatedAt: string;
}

interface QueryBuilderProps {
  onAnalysisComplete?: () => void;
}

export default function QueryBuilder({ onAnalysisComplete }: QueryBuilderProps) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState('');
  const [sampleQueries, setSampleQueries] = useState<string[]>([]);

  useEffect(() => {
    loadSampleQueries();
  }, []);

  const loadSampleQueries = async () => {
    try {
      const samples = await getSampleQueries();
      setSampleQueries(samples);
    } catch (error) {
      console.error('Error loading sample queries:', error);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const analysisResult = await analyzeQuestion(question);
      setResult(analysisResult);
      onAnalysisComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (sample: string) => {
    setQuestion(sample);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Query Input Section */}
      <motion.div variants={itemVariants} className="glass-dark rounded-2xl p-8 border border-primary/30 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
          <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-lg">
            <AiOutlineThunderbolt className="w-6 h-6 text-white" />
          </div>
          <span>Ask Your Question</span>
        </h2>

        <form onSubmit={handleAnalyze} className="space-y-4 relative z-10">
          <div className="relative group">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What are the top 5 best-selling products in the last 30 days?"
              className="w-full bg-white/5 border border-primary/30 rounded-xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white/10 transition-all duration-300 text-lg"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary hover:shadow-glow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg p-3 transition-all duration-300 transform hover:scale-110"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiSend className="w-5 h-5" />
              )}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-200 text-sm"
            >
              {error}
            </motion.div>
          )}
        </form>

        {/* Sample Queries */}
        {sampleQueries.length > 0 && !result && (
          <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-primary/20">
            <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-4">📌 Quick Examples</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sampleQueries.slice(0, 4).map((sample, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSampleClick(sample)}
                  className="text-left text-sm bg-white/5 hover:bg-white/10 border border-primary/20 hover:border-primary/50 rounded-lg p-4 text-slate-300 transition-all duration-300 group"
                >
                  <div className="text-primary font-semibold text-xs mb-1 group-hover:text-secondary transition-colors">Sample Query</div>
                  <p className="line-clamp-2">{sample}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Results Section */}
      {result && (
        <motion.div variants={itemVariants}>
          <ResultsDisplay result={result} />
        </motion.div>
      )}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-12 text-center border border-primary/20"
        >
          <div className="flex justify-center mb-6">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-lg animate-pulse"></div>
              <div className="absolute inset-2 border-3 border-transparent border-t-primary border-r-primary rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="text-slate-300 text-lg font-medium">Analyzing your question with AI...</p>
          <p className="text-slate-400 text-sm mt-2">This usually takes a few seconds</p>
        </motion.div>
      )}
    </motion.div>
  );
}

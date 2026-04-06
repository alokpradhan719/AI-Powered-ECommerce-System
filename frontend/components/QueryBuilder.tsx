'use client';

import React, { useState, useEffect } from 'react';
import { analyzeQuestion, getSampleQueries } from '../lib/api';
import ResultsDisplay from './ResultsDisplay';
import { Loader, Send, Sparkles } from 'lucide-react';

interface QueryBuilderProps {
  onAnalysisComplete?: () => void;
}

export default function QueryBuilder({ onAnalysisComplete }: QueryBuilderProps) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
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

  return (
    <div className="space-y-6">
      {/* Query Input Section */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Ask Your Question
        </h2>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What are the top 5 best-selling products?"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/20 transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg p-2 transition-all"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
              {error}
            </div>
          )}
        </form>

        {/* Sample Queries */}
        {sampleQueries.length > 0 && !result && (
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-3">Quick Examples:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {sampleQueries.slice(0, 4).map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSampleClick(sample)}
                  className="text-left text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded p-2 text-gray-300 transition-all"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && <ResultsDisplay result={result} />}

      {loading && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-12 text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-400" />
          <p className="text-gray-300">Analyzing your question...</p>
        </div>
      )}
    </div>
  );
}

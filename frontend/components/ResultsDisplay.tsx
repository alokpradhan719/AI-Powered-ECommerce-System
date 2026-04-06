'use client';

import React from 'react';
import { Database, Lightbulb, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ResultsDisplayProps {
  result: {
    question: string;
    sqlQuery: string;
    rowCount: number;
    data: any[];
    insights: string;
    generatedAt: string;
  };
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const [copiedSQL, setCopiedSQL] = useState(false);
  const [copiedInsights, setCopiedInsights] = useState(false);

  const handleCopy = (text: string, type: 'sql' | 'insights') => {
    navigator.clipboard.writeText(text);
    if (type === 'sql') {
      setCopiedSQL(true);
      setTimeout(() => setCopiedSQL(false), 2000);
    } else {
      setCopiedInsights(true);
      setTimeout(() => setCopiedInsights(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* SQL Query */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Generated SQL Query</h3>
          </div>
          <button
            onClick={() => handleCopy(result.sqlQuery, 'sql')}
            className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded text-blue-300 text-sm transition-all"
          >
            {copiedSQL ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="bg-black/30 border border-white/10 rounded p-4 overflow-x-auto">
          <code className="text-sm text-gray-300 font-mono">
            {result.sqlQuery}
          </code>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">AI Insights</h3>
          </div>
          <button
            onClick={() => handleCopy(result.insights, 'insights')}
            className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded text-yellow-300 text-sm transition-all"
          >
            {copiedInsights ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
            {result.insights}
          </p>
        </div>
      </div>

      {/* Data Table */}
      {result.data.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Results ({result.rowCount} rows)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {Object.keys(result.data[0] || {}).map((key) => (
                    <th
                      key={key}
                      className="px-4 py-2 text-left text-gray-400 font-semibold"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.data.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    {Object.values(row as any).map((value: any, colIdx) => (
                      <td key={colIdx} className="px-4 py-3 text-gray-300">
                        {typeof value === 'object'
                          ? JSON.stringify(value)
                          : String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {result.rowCount > 10 && (
            <p className="text-gray-400 text-sm mt-4">
              Showing 10 of {result.rowCount} results
            </p>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import React from 'react';
import { FiUsers, FiShoppingCart, FiPackage, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface StatsOverviewProps {
  stats: {
    totalCustomers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
  };
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const statItems = [
    {
      label: 'Total Customers',
      value: stats.totalCustomers.toLocaleString(),
      icon: <FiUsers size={28} />,
      color: 'from-blue-500/20 to-blue-600/20',
      accentColor: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.3)',
    },
    {
      label: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: <FiPackage size={28} />,
      color: 'from-purple-500/20 to-purple-600/20',
      accentColor: '#a855f7',
      glowColor: 'rgba(168, 85, 247, 0.3)',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: <FiShoppingCart size={28} />,
      color: 'from-emerald-500/20 to-emerald-600/20',
      accentColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.3)',
    },
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <FiTrendingUp size={28} />,
      color: 'from-amber-500/20 to-amber-600/20',
      accentColor: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.3)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" animate="visible">
      {statItems.map((item, idx) => (
        <motion.div key={idx} variants={itemVariants} className="group">
          <div
            className={`relative h-full bg-gradient-to-br ${item.color} backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300 overflow-hidden card-3d`}
            style={{ boxShadow: `0 0 20px ${item.glowColor}` }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-white/0"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-300 text-sm font-semibold uppercase tracking-wider">{item.label}</h3>
                <div
                  className="p-3 bg-gradient-to-br rounded-lg transition-all duration-300 group-hover:scale-110 flex items-center justify-center"
                  style={{ backgroundColor: item.glowColor, color: item.accentColor }}
                >
                  {item.icon}
                </div>
              </div>

              <div className="mb-3">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{item.value}</p>
                <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <p className="text-xs text-slate-400 font-medium">Updated in real-time</p>
            </div>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

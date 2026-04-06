'use client';

import React from 'react';
import { Users, ShoppingCart, Package, TrendingUp } from 'lucide-react';

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
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`${item.bgColor} backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-300 text-sm font-medium">{item.label}</h3>
              <div className={`p-2 bg-gradient-to-br ${item.color} rounded-lg`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}

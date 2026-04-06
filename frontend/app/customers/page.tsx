'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FiUsers, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

interface Customer {
  customer_id: number;
  name: string;
  email: string;
  phone: string;
  region: string;
  created_at: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/customers`);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-secondary opacity-5 rounded-full blur-3xl"></div>
        </div>

        <motion.div className="container-custom relative z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold text-white mb-4">
            Customer <span className="text-gradient">Directory</span>
          </h1>
          <p className="text-xl text-slate-300">
            Connect with our valued customers and manage relationships
          </p>
        </motion.div>
      </section>

      {/* Customers List */}
      <section className="flex-grow px-4 pb-12">
        <div className="container-custom">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-300">Loading customers...</p>
              </div>
            </div>
          ) : (
            <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <motion.div
                    key={customer.customer_id}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className="glass rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-all group hover:shadow-glow cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            {customer.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{customer.name}</h3>
                            <p className="text-sm text-slate-400">ID: #{customer.customer_id}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-center gap-2 text-slate-300">
                            <FiMail className="text-primary" size={18} />
                            <span className="text-sm">{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <FiPhone className="text-secondary" size={18} />
                            <span className="text-sm">{customer.phone || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <FiMapPin className="text-accent" size={18} />
                            <span className="text-sm">{customer.region || 'Unknown'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-6 md:gap-8">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gradient">12</p>
                          <p className="text-xs text-slate-400">Orders</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gradient">$1,250</p>
                          <p className="text-xs text-slate-400">Total Spend</p>
                        </div>
                        <button className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold hover:shadow-glow-lg transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FiUsers className="mx-auto mb-4 text-slate-400" size={48} />
                  <p className="text-slate-400 text-lg">No customers found.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

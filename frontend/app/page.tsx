'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiArrowRight, FiBarChart, FiZap, FiShield, FiDatabase } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    {
      icon: <FiBarChart size={32} />,
      title: 'Real-Time Analytics',
      description: 'Get instant insights from your e-commerce data with beautiful visualizations',
    },
    {
      icon: <FiZap size={32} />,
      title: 'AI-Powered Queries',
      description: 'Ask questions in natural language and get SQL queries generated automatically',
    },
    {
      icon: <FiShield size={32} />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with encrypted connections and data protection',
    },
    {
      icon: <FiDatabase size={32} />,
      title: 'Multi-Database Support',
      description: 'Connect to MySQL, PostgreSQL, and other popular databases seamlessly',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary opacity-10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div
          className="container-custom relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">AI-Powered</span>
              <br />
              <span className="text-white">E-Commerce Analytics</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Transform your business data into actionable insights with natural language AI queries. Ask questions, get answers instantly.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/analytics"
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
            >
              Start Analyzing
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 glass rounded-lg text-white font-semibold hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Queries/Day', value: '50K+' },
              { label: 'Uptime', value: '99.9%' },
              { label: 'Response Time', value: '<100ms' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center glass rounded-lg p-4">
                <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <motion.div className="container-custom" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-12">
            <span className="text-gradient">Powerful Features</span> for Your Business
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass rounded-xl p-8 hover:border-primary/50 transition-all duration-300 group card-3d"
              >
                <div className="mb-4 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <motion.div className="container-custom" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-12">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$29', features: ['5K queries/month', 'Basic analytics', 'Email support'] },
              { name: 'Pro', price: '$99', features: ['50K queries/month', 'Advanced analytics', 'Priority support', 'Custom dashboards'], popular: true },
              { name: 'Enterprise', price: 'Custom', features: ['Unlimited queries', 'White-label', 'Dedicated support', 'Custom integration'] },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`rounded-xl p-8 transition-all duration-300 ${plan.popular ? 'glass-dark border-2 border-primary scale-105' : 'glass'}`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-gradient mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${plan.popular ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-glow-lg' : 'glass hover:bg-white/10'}`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div className="container-custom glass rounded-2xl p-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Data?</h2>
          <p className="text-xl text-slate-300 mb-8">Start analyzing your e-commerce data with AI today.</p>
          <Link href="/analytics" className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2">
            Launch Analytics Dashboard
            <FiArrowRight />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

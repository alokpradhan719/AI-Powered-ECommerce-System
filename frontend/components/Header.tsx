'use client';

import React from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-dark border-b border-primary/20">
      <div className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-gradient">ECommerce Analytics</h1>
            <p className="text-xs text-slate-400">AI-Powered Insights</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-slate-300 hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <Link href="/products" className="text-slate-300 hover:text-primary transition-colors font-medium">
            Products
          </Link>
          <Link href="/customers" className="text-slate-300 hover:text-primary transition-colors font-medium">
            Customers
          </Link>
          <Link href="/analytics" className="text-slate-300 hover:text-primary transition-colors font-medium">
            Analytics
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="/analytics" className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass-dark border-t border-primary/20">
          <nav className="container-custom py-4 flex flex-col gap-4">
            <Link href="/" className="text-slate-300 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="text-slate-300 hover:text-primary transition-colors font-medium">
              Products
            </Link>
            <Link href="/customers" className="text-slate-300 hover:text-primary transition-colors font-medium">
              Customers
            </Link>
            <Link href="/analytics" className="text-slate-300 hover:text-primary transition-colors font-medium">
              Analytics
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

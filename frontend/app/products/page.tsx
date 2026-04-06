'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiShoppingCart, FiStar } from 'react-icons/fi';

interface Product {
  product_id: number;
  name: string;
  price: number;
  category_id: number;
  sku: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
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

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary opacity-5 rounded-full blur-3xl"></div>
        </div>

        <motion.div className="container-custom relative z-10" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 variants={itemVariants} className="text-5xl font-bold text-white mb-4">
            Our <span className="text-gradient">Products</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-slate-300">
            Discover our premium e-commerce catalog with advanced search and filtering
          </motion.p>
        </motion.div>
      </section>

      {/* Search & Filter */}
      <section className="px-4 pb-12">
        <motion.div className="container-custom" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="glass rounded-xl p-6 border border-primary/20">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by product name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-primary/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-primary"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold hover:shadow-glow-lg transition-all flex items-center gap-2">
                <FiFilter size={20} />
                Filter
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="flex-grow px-4 pb-12">
        <div className="container-custom">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-300">Loading products...</p>
              </div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product.product_id}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="glass rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all group"
                  >
                    {/* Image Placeholder */}
                    <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                        📦
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-slate-400 mb-3">SKU: {product.sku}</p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-gradient">${product.price.toFixed(2)}</span>
                        <div className="flex gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} size={16} fill="currentColor" />
                          ))}
                        </div>
                      </div>

                      <button className="w-full py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold hover:shadow-glow-lg transition-all flex items-center justify-center gap-2">
                        <FiShoppingCart size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-400 text-lg">No products found matching your search.</p>
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

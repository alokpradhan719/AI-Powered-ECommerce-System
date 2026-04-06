'use client';

import React from 'react';
import { FiBarChart, FiTrendingUp, FiDatabase, FiZap, FiShield, FiTarget } from 'react-icons/fi';
import { AiOutlineRobot, AiOutlineCloudSync } from 'react-icons/ai';
import { motion } from 'framer-motion';

interface Icon3DProps {
  icon: string;
  size?: number;
  color?: string;
  variant?: 'glow' | 'gradient' | 'neon';
  animate?: boolean;
}

export default function Icon3D({
  icon,
  size = 40,
  color = '#6366f1',
  variant = 'glow',
  animate = true,
}: Icon3DProps) {
  const iconMap: { [key: string]: React.ReactNode } = {
    analytics: <FiBarChart size={size} />,
    trending: <FiTrendingUp size={size} />,
    database: <FiDatabase size={size} />,
    zap: <FiZap size={size} />,
    shield: <FiShield size={size} />,
    target: <FiTarget size={size} />,
    ai: <AiOutlineRobot size={size} />,
    cloud: <AiOutlineCloudSync size={size} />,
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'glow':
        return 'text-primary drop-shadow-lg filter blur-sm';
      case 'gradient':
        return 'bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent';
      case 'neon':
        return 'text-accent drop-shadow-lg filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]';
      default:
        return '';
    }
  };

  const containerVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      variants={animate ? containerVariants : undefined}
      initial={animate ? 'initial' : undefined}
      animate={animate ? 'animate' : undefined}
      className={`flex items-center justify-center ${getVariantStyles()}`}
      style={{ color }}
    >
      {iconMap[icon] || iconMap.analytics}
    </motion.div>
  );
}

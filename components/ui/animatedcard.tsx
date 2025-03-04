// components/AnimatedCard.tsx
'use client'; // Mark it as a client component

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import React from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-black/40 backdrop-blur-md border border-[#8A2BE2]/20 hover:border-[#8A2BE2]/50 transition-colors">
        {children}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
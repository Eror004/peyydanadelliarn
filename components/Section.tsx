import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  isActive?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, children, className = "", isActive = false }) => {
  return (
    <section
      id={id}
      className={`relative h-[100dvh] w-full snap-start snap-always flex flex-col overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full h-full relative"
      >
        {children}
      </motion.div>
    </section>
  );
};
"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate asset loading
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="relative flex flex-col items-center">
            {/* The Rune Ring Animation */}
            <svg width="100" height="100" viewBox="0 0 100 100" className="mb-8">
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="#333"
                strokeWidth="2"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="#C5A059"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1, rotate: 270 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-serif text-[#C5A059] tracking-[0.3em] text-xs uppercase"
            >
              Restoring Order...
            </motion.div>

            {/* Counter */}
            <motion.span 
               className="absolute -right-12 top-0 text-[#333] font-mono text-xs"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
            >
               V.1.04
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
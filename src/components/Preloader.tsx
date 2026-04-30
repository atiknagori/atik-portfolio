import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

const WORDS = ["ATTENTION", "PRECISION", "INNOVATION", "CRAFTING"];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === WORDS.length - 1) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 1000 / (index * 0.5 + 1));

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[1000] bg-black flex items-center justify-center pointer-events-auto"
    >
      <div className="relative overflow-hidden h-[10vh] md:h-[15vh] w-full flex items-center justify-center px-4">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="text-[12vw] md:text-[8vw] font-display font-black tracking-tighter uppercase text-white text-center whitespace-nowrap"
          >
            {WORDS[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 origin-left"
      />
    </motion.div>
  );
};

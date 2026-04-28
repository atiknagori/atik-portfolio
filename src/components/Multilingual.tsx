import { motion, useInView } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

export function Multilingual() {
  const words = ["EMOTION", "SYSTEMS", "CRAFT", "DESIGN", "CODE"];
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView, words.length]);

  return (
    <section ref={containerRef} className="py-20 md:py-40 bg-white text-black px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        <div className="flex-1">
          <div className="text-[14vw] md:text-[10vw] font-display font-extrabold leading-[0.8] flex flex-col tracking-tighter">
            <div>WE ARE</div>
            <div className="text-black/10">MULTILINGUAL</div>
            <div>WE SPEAK</div>
            <div className="relative h-[1.1em] overflow-hidden text-red-600 italic font-serif">
              {words.map((word, i) => (
                <motion.div
                  key={word}
                  initial={{ y: "100%" }}
                  animate={{ y: i === index ? "0%" : "-100%" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0"
                >
                  {word}
                </motion.div>
              ))}
            </div>
            <div className="mt-2">LOGIC</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-end pb-4">
          <div className="max-w-md text-xl md:text-2xl text-black/60 space-y-6">
            <p>
              C-Suite and design. Spreadsheets and scripts. Our language is intentional, unique, and built to move projects towards their goals.
            </p>
            <div className="flex gap-4 items-center">
              <span className="w-12 h-px bg-black/20" />
              <span className="text-black font-bold uppercase tracking-widest text-sm">ATIK NAGORI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

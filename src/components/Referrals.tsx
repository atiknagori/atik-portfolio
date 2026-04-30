import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

const MAIN_TITLE = "MOST SUCCESSFUL PROJECTS BEGIN WITH A".split(" ");

export function Referrals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const textX = useTransform(smoothProgress, [0, 1], ["20%", "-20%"]);
  
  return (
    <section ref={containerRef} className="min-h-[34vh] md:min-h-[48vh] flex flex-col items-center justify-center bg-white overflow-hidden relative pt-12 md:pt-20 pb-0">
      {/* Background Parallax Patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ 
            y: useTransform(smoothProgress, [0, 1], [100, -100]),
            WebkitTextStroke: "1px rgba(0,0,0,0.04)",
            opacity: useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
          }}
          className="text-[20vw] font-black text-transparent leading-none select-none -rotate-12 will-change-transform"
        >
          CONNECT
        </motion.div>
      </div>

      <div className="w-full">
        <div className="px-6 md:px-8 max-w-7xl mx-auto relative mb-6 md:mb-14 z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 md:gap-6 mb-6 md:mb-10"
          >
            <span className="w-6 md:w-12 h-px bg-black/20" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-black/40">Referrals & Vision</span>
            <span className="w-6 md:w-12 h-px bg-black/20" />
          </motion.div>

          <div className="relative">
            <h2 className="text-[12vw] md:text-[7vw] font-display font-black leading-[0.85] max-w-5xl uppercase tracking-tighter">
              {MAIN_TITLE.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-[0.2em] will-change-transform"
                >
                  {word}
                </motion.span>
              ))}
              <span className="relative inline-block px-4 italic text-red-600">
                <motion.span
                  initial={{ opacity: 0, rotateY: 90 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                  className="inline-block"
                >
                  VISION
                </motion.span>
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "circOut" }}
                  className="absolute bottom-2 md:bottom-3 left-0 h-[8%] bg-red-600/20 -z-10"
                />
              </span>
            </h2>
          </div>
        </div>

        <div className="relative h-[70px] md:h-[100px] flex items-center justify-center">
          <motion.div 
            style={{ x: textX }} 
            className="flex whitespace-nowrap opacity-[0.2] will-change-transform"
          >
            <span className="text-[10vw] font-display font-black mx-12 leading-none uppercase select-none text-transparent" style={{ WebkitTextStroke: "1px rgba(0,0,0,0.12)" }}>MINDSET</span>
            <span className="text-[10vw] font-display font-black mx-12 leading-none uppercase italic select-none text-transparent" style={{ WebkitTextStroke: "1px rgba(0,0,0,0.12)" }}>STRATEGY</span>
            <span className="text-[10vw] font-display font-black mx-12 leading-none uppercase select-none text-transparent" style={{ WebkitTextStroke: "1px rgba(0,0,0,0.12)" }}>MINDSET</span>
            <span className="text-[10vw] font-display font-black mx-12 leading-none uppercase italic select-none text-transparent" style={{ WebkitTextStroke: "1px rgba(0,0,0,0.12)" }}>STRATEGY</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

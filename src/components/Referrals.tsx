import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

export function Referrals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const textX = useTransform(smoothProgress, [0, 1], ["15%", "-15%"]);
  
  const scriptText = "Collaborative";

  return (
    <section ref={containerRef} className="py-80 bg-white overflow-hidden">
      <div className="px-8 max-w-7xl mx-auto relative mb-32">
        <div className="flex items-center gap-6 mb-8">
           <span className="w-12 h-px bg-black" />
           <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-black/40">Our Approach</span>
        </div>
        <h2 className="text-5xl md:text-[8vw] font-display font-black leading-[0.8] max-w-5xl uppercase tracking-tighter">
          MOST SUCCESSFUL PROJECTS <br />
          BEGIN WITH A 
          <span className="relative inline-block px-4 italic text-red-600">
             VISION
             <motion.span
               initial={{ width: 0 }}
               whileInView={{ width: "100%" }}
               transition={{ duration: 1, ease: "circOut" }}
               className="absolute bottom-4 left-0 h-[10%] bg-red-600/10 -z-10"
            />
          </span>
        </h2>
      </div>

      <div className="relative h-[300px] flex items-center justify-center">
        <motion.div style={{ x: textX }} className="flex whitespace-nowrap opacity-[0.03]">
          <span className="text-[35vw] font-display font-black mx-12 leading-none uppercase select-none">MINDSET</span>
          <span className="text-[35vw] font-display font-black mx-12 leading-none uppercase italic select-none">STRATEGY</span>
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="flex">
               {scriptText.split("").map((char, i) => (
                 <motion.span
                   key={i}
                   initial={{ opacity: 0, scale: 0.5, y: 30, rotate: -15 }}
                   whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                   transition={{ 
                    duration: 0.8, 
                    delay: i * 0.05, 
                    type: "spring",
                    stiffness: 150,
                    damping: 20
                   }}
                   viewport={{ once: false, amount: 0.5 }}
                   className="text-red-500 font-serif font-black italic text-[12vw] md:text-[15vw] leading-none inline-block"
                 >
                    {char}
                 </motion.span>
               ))}
             </div>
        </div>
      </div>
    </section>
  );
}

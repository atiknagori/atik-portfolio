import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

export function Philosophy() {
  const section1Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s1Progress } = useScroll({
    target: section1Ref,
    offset: ["start start", "end end"]
  });
  
  const s1Smooth = useSpring(s1Progress, { stiffness: 100, damping: 30 });
  const s1Opacity = useTransform(s1Smooth, [0, 0.12, 0.82, 1], [0, 1, 1, 0]);
  const s1Scale = useTransform(s1Smooth, [0, 0.3, 0.82, 1], [0.85, 1, 1, 0.94]);
  const s1XLeft = useTransform(s1Smooth, [0.05, 0.38], ["-100%", "0%"]);
  const s1XRight = useTransform(s1Smooth, [0.05, 0.38], ["100%", "0%"]);
  const s1BgY = useTransform(s1Smooth, [0, 1], [0, -200]);
  const s1LineScale = useTransform(s1Smooth, [0.1, 0.42], [0, 1]);
  const s1DescY = useTransform(s1Smooth, [0.35, 0.55], [40, 0]);
  const s1DescOpacity = useTransform(s1Smooth, [0.35, 0.55, 0.82, 1], [0, 0.6, 0.6, 0]);

  return (
    <section id="about" ref={section1Ref} className="relative h-[220vh] border-b border-black/5 bg-white">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <motion.div 
            style={{ opacity: s1Opacity, scale: s1Scale }}
            className="flex flex-col items-center text-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.3, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.8em] uppercase mb-10 md:mb-14"
            >
              Our Philosophy
            </motion.div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-center mb-10 gap-4 md:gap-0">
              <div className="overflow-hidden">
                <motion.h2 
                  style={{ x: s1XLeft }}
                  className="text-[16vw] md:text-[clamp(4rem,8vw,9rem)] font-display font-black leading-none tracking-tight uppercase whitespace-nowrap will-change-transform"
                >
                  CRAFTING
                </motion.h2>
              </div>

              <motion.div 
                style={{ scaleY: s1LineScale }}
                className="hidden md:block w-[1px] h-[7vw] bg-black/10 mx-[2vw] origin-bottom will-change-transform"
              />

              <div className="overflow-hidden">
                <motion.h2 
                  style={{ x: s1XRight }}
                  className="text-[16vw] md:text-[clamp(4rem,8vw,9rem)] font-display font-black leading-none tracking-tight uppercase whitespace-nowrap text-red-500 will-change-transform"
                >
                  FUTURE
                </motion.h2>
              </div>
            </div>
            
            <motion.div style={{ y: s1DescY, opacity: s1DescOpacity }} className="px-4">
              <p className="max-w-xl text-[14px] md:text-[20px] font-medium leading-relaxed tracking-tight text-black">
                We merge aesthetic precision with technical excellence to create digital products that don't just look good, but feel inevitable.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden hidden md:flex items-center justify-center">
          <motion.h3 
            className="text-[22vw] font-display font-black uppercase whitespace-nowrap -rotate-6 select-none text-transparent will-change-transform"
            style={{ 
              WebkitTextStroke: "1px rgba(0,0,0,0.08)",
              opacity: useTransform(s1Smooth, [0, 0.4, 0.86, 1], [0, 1, 1, 0]),
              y: s1BgY
            }}
          >
            DIGITAL INNOVATOR
          </motion.h3>
        </div>
      </div>
    </section>
  );
}

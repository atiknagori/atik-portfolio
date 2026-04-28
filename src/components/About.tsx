import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const y1 = useTransform(smoothProgress, [0, 1], [-150, 150]);
  const y2 = useTransform(smoothProgress, [0, 1], [100, -250]);
  const y3 = useTransform(smoothProgress, [0, 1], [-50, 200]);
  const y4 = useTransform(smoothProgress, [0, 1], [300, -300]);
  
  const textOpacity = useTransform(smoothProgress, [0.3, 0.5], [0.1, 1]);
  const textSkew = useTransform(smoothProgress, [0.3, 0.7], [5, -5]);

  return (
    <section id="about" ref={containerRef} className="relative min-h-[160vh] py-60 bg-white overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-8 relative z-20">
        
        {/* Large Typographic Text (Z-20 ensures it's on top) */}
        <motion.div 
          style={{ skewY: textSkew, opacity: textOpacity }}
          className="relative z-20"
        >
          <h2 className="text-[11vw] font-display font-extrabold leading-[0.8] uppercase tracking-tighter text-center">
            PIONEERING<br />
            EXPERIENCES<br />
            THAT SHAPE<br />
            <span className="text-outline">CULTURE,</span><br />
            BORN FROM<br />
            PURE LOGIC
          </h2>
        </motion.div>

        {/* Floating High-Quality Parallax Assets (Z-10 keeps them behind text) */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[5%] w-56 md:w-80 aspect-square z-10 shadow-[-40px_40px_80px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden border-4 border-white lg:block hidden">
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80" alt="Tech" className="w-full h-full object-cover grayscale opacity-10" />
          </motion.div>
          
          <motion.div style={{ y: y2 }} className="absolute top-[20%] right-[5%] w-64 md:w-96 aspect-[4/5] z-10 shadow-[40px_40px_80px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden border-4 border-white lg:block hidden">
            <img src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&q=80" alt="UI" className="w-full h-full object-cover grayscale opacity-10" />
          </motion.div>

          <motion.div style={{ y: y3 }} className="absolute bottom-[20%] left-[10%] w-48 md:w-72 aspect-video z-10 shadow-[-40px_-40px_80px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden border-4 border-white lg:block hidden">
            <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80" alt="React" className="w-full h-full object-cover grayscale opacity-10" />
          </motion.div>

          <motion.div style={{ y: y4 }} className="absolute bottom-[10%] right-[10%] w-64 md:w-80 aspect-square z-10 shadow-[40px_-40px_80px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden border-4 border-white lg:block hidden">
            <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80" alt="Development" className="w-full h-full object-cover grayscale opacity-10" />
          </motion.div>
        </div>
      </div>

      <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-[#f2f2f2] to-transparent z-0" />
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-white to-transparent z-0" />
    </section>
  );
}

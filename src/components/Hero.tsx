import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useMemo } from 'react';

const NAME = "ATIK NAGORI";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 35, 
    mass: 1,
    restDelta: 0.001 
  });

  const nameChars = useMemo(() => NAME.split(""), []);

  // Split Text Positions (Phase 2: 0.25 -> 0.45)
  const splitTextLeft = useTransform(smoothProgress, [0.25, 0.45], ["-35%", "0%"]);
  const splitTextRight = useTransform(smoothProgress, [0.25, 0.45], ["35%", "0%"]);
  const splitTextOpacity = useTransform(smoothProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);

  // Video/Reveal State (Phase 3: 0.55 -> 0.8 with a solid hold until 1.0)
  const videoScale = useTransform(smoothProgress, [0.55, 0.8, 1.0], [0.5, 1.2, 1.2]);
  const videoWidth = useTransform(smoothProgress, [0.55, 0.8, 1.0], ["30vw", "100vw", "100vw"]);
  const videoHeight = useTransform(smoothProgress, [0.55, 0.8, 1.0], ["20vw", "100vh", "100vh"]);
  const videoRadius = useTransform(smoothProgress, [0.55, 0.75], ["48px", "0px"]);
  const videoOpacity = useTransform(smoothProgress, [0.5, 0.6], [0, 1]);
  
  // Name Title State (Phase 1: 0 -> 0.25)
  const nameOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const nameY = useTransform(smoothProgress, [0, 0.25], ["0vh", "-30vh"]);
  const nameScale = useTransform(smoothProgress, [0, 0.25], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative h-[600vh]">
      <section id="home" className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#f0f0f0]">
        
        {/* Hero Title */}
        <motion.div 
          style={{ 
            opacity: nameOpacity, 
            y: nameY,
            scale: nameScale,
          }}
          className="absolute z-40 w-full flex flex-col items-center pointer-events-none"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-[11px] font-bold tracking-[0.8em] mb-4 md:mb-10 uppercase text-black/60"
          >
            Digital Experiences
          </motion.div>
          <h1 className="text-[12.5vw] md:text-[14vw] font-display font-black leading-[0.9] md:leading-[0.7] tracking-tighter flex flex-wrap justify-center select-none text-center px-4 will-change-transform">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 120, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: 0.6 + (i * 0.05),
                  duration: 1.5,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
              >
                <motion.span
                  whileHover={{ 
                    y: -15,
                    rotateX: -25,
                    scale: 1.1,
                    color: "#ef4444",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={char === " " ? "w-[4vw] md:w-[2.5vw]" : "inline-block pointer-events-auto cursor-default"}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Split Text Animation */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-4">
          <motion.div 
            style={{ x: splitTextLeft, opacity: splitTextOpacity }}
            className="text-[8vw] md:text-[5.5vw] font-display font-black tracking-tight uppercase leading-none whitespace-nowrap"
          >
            CREATIVE
          </motion.div>
          <div className="w-[4vw] md:w-[10px] shrink-0" />
          <motion.div 
            style={{ x: splitTextRight, opacity: splitTextOpacity }}
            className="text-[8vw] md:text-[5.5vw] font-display font-black tracking-tight uppercase leading-none whitespace-nowrap"
          >
            DEVELOPER
          </motion.div>
        </div>

        {/* Reveal Image/Video Section */}
        <motion.div 
          style={{ 
            scale: videoScale, 
            width: videoWidth, 
            height: videoHeight,
            borderRadius: videoRadius,
            opacity: videoOpacity
          }}
          className="absolute z-20 overflow-hidden bg-black shadow-[0_120px_160px_rgba(0,0,0,0.12)] flex items-center justify-center"
        >
          <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0.65, 0.85], [0.4, 0.7]) }}
            className="absolute inset-0 bg-black z-10 pointer-events-none" 
          />
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=75" 
            alt="Pushing Boundaries Background"
            className="w-full h-full object-cover grayscale brightness-50 scale-110"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
          />
          
          <motion.div 
            style={{ 
                opacity: useTransform(smoothProgress, [0.65, 0.75, 0.95], [0, 1, 1]),
                y: useTransform(smoothProgress, [0.65, 0.8], [50, 0])
            }}
            className="absolute inset-0 z-20 flex items-center justify-center text-white text-center px-4"
          >
            <h2 className="text-[10vw] md:text-[8vw] font-display font-black leading-none tracking-tighter uppercase italic select-none">
              PUSHING THE <br /> BOUNDARIES
            </h2>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 z-30 flex flex-col items-center gap-4"
        >
          <div className="text-[10px] uppercase font-black tracking-[0.6em] opacity-20">Scroll</div>
          <div className="w-px h-24 bg-gradient-to-b from-black/20 via-black/10 to-transparent" />
        </motion.div>
      </section>
    </div>
  );
}

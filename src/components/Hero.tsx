import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

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

  const name = "ATIK NAGORI";
  const [activeChar, setActiveChar] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChar(Math.floor(Math.random() * name.length));
      setTimeout(() => setActiveChar(null), 800);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Split Text Positions (Phase 2: 0.35 -> 0.6)
  const splitTextLeft = useTransform(smoothProgress, [0.35, 0.55], ["-35%", "0%"]);
  const splitTextRight = useTransform(smoothProgress, [0.35, 0.55], ["35%", "0%"]);
  const splitTextOpacity = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);

  // Video State (Phase 3: 0.65 -> 0.95)
  const videoScale = useTransform(smoothProgress, [0.65, 0.95], [0.5, 1.2]);
  const videoWidth = useTransform(smoothProgress, [0.65, 0.95], ["30vw", "100vw"]);
  const videoHeight = useTransform(smoothProgress, [0.65, 0.95], ["20vw", "100vh"]);
  const videoRadius = useTransform(smoothProgress, [0.65, 0.85], ["48px", "0px"]);
  const videoOpacity = useTransform(smoothProgress, [0.6, 0.7], [0, 1]);
  
  // Name Title State (Phase 1: 0 -> 0.35)
  const nameOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const nameY = useTransform(smoothProgress, [0, 0.35], ["0vh", "-30vh"]);
  const nameScale = useTransform(smoothProgress, [0, 0.35], [1, 0.8]);

  return (
    <div id="home" ref={containerRef} className="relative h-[400vh]">
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#f0f0f0]">
        
        {/* Navigation Bar */}
        <nav className="absolute top-0 w-full px-12 py-10 flex justify-between items-center z-50 text-[11px] font-black uppercase tracking-widest text-[#111]">
          <div className="text-[18px] font-display font-black tracking-tighter leading-none">
             ATIK NAGORI
          </div>
          
          <div className="flex gap-14 text-[13px] font-black tracking-tighter">
            <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
            <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
            <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
          </div>
        </nav>

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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[11px] font-bold tracking-[0.8em] mb-10 uppercase"
          >
            Digital Experiences
          </motion.div>
          <h1 className="text-[14vw] font-display font-black leading-[0.7] tracking-tighter flex select-none text-center">
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: i * 0.04,
                  type: "spring",
                  stiffness: 120,
                  damping: 15
                }}
              >
                <motion.span
                  animate={activeChar === i ? { 
                    y: -15,
                    rotateX: -25,
                    scale: 1.05,
                    color: "#ef4444",
                  } : { 
                    y: 0, 
                    rotateX: 0, 
                    scale: 1,
                    color: "#111",
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25,
                  }}
                  className={char === " " ? "w-[2.5vw]" : "inline-block"}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Split Text Animation */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-8">
          <motion.div 
            style={{ x: splitTextLeft, opacity: splitTextOpacity }}
            className="text-[6vw] sm:text-[5vw] md:text-[4.5vw] font-display font-black tracking-tight uppercase leading-none whitespace-nowrap"
          >
            CREATIVE
          </motion.div>
          <div className="w-[10px] shrink-0" />
          <motion.div 
            style={{ x: splitTextRight, opacity: splitTextOpacity }}
            className="text-[6vw] sm:text-[5vw] md:text-[4.5vw] font-display font-black tracking-tight uppercase leading-none whitespace-nowrap"
          >
            DEVELOPER
          </motion.div>
        </div>

        {/* Reveal Video Section */}
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
            style={{ opacity: useTransform(smoothProgress, [0.5, 0.7], [0, 0.6]) }}
            className="absolute inset-0 bg-black z-10 pointer-events-none" 
          />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover grayscale brightness-90"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1100-large.mp4" type="video/mp4" />
          </video>
          
          <motion.div 
            style={{ 
                opacity: useTransform(smoothProgress, [0.7, 0.9], [0, 1]),
                y: useTransform(smoothProgress, [0.7, 0.9], [50, 0])
            }}
            className="absolute inset-0 z-20 flex items-center justify-center text-white text-center px-8"
          >
            <h2 className="text-[8vw] font-display font-black leading-none tracking-tighter uppercase italic select-none">
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

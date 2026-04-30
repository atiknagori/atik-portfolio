import React, { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

const approachSteps = [
  {
    id: '01',
    title: 'PERFORMANCE FIRST',
    desc: 'I focus on building websites that load fast and feel smooth from the first interaction. Performance is considered at every stage, from structure and assets to code quality and optimization, ensuring reliable results on real devices and networks.',
    color: '#f0f0f0',
    textColor: '#000'
  },
  {
    id: '02',
    title: 'CLEAN & SCALABLE CODE',
    desc: 'I write clean, well-structured, and maintainable code with a strong focus on clarity and long-term scalability. This approach makes projects easier to understand, update, and extend over time, while reducing complexity and keeping the codebase reliable as it grows.',
    color: '#82a38b',
    textColor: '#000'
  },
  {
    id: '03',
    title: 'MODERN UI & UX',
    desc: 'I design and build interfaces with clarity, usability, and consistency in mind. Layouts, interactions, and responsive behavior are carefully crafted to provide an intuitive experience that works seamlessly across all devices and screen sizes.',
    color: '#f0f0f0',
    textColor: '#000'
  },
  {
    id: '04',
    title: 'SEO & BEST PRACTICES',
    desc: 'Websites are built using modern best practices and strong technical SEO foundations from the very beginning of the project. This includes clean structure, accessibility, semantic markup, and optimization techniques that support visibility, performance, and long-term growth.',
    color: '#82a38b',
    textColor: '#000'
  }
];

export const Approach = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 flex justify-between pointer-events-none px-8 opacity-[0.08]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-white/20" />
        ))}
      </div>

      <div className="relative z-10 px-6 md:px-12 py-4 md:py-12 max-w-[1400px] mx-auto">
        <div className="mb-10 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[10px] md:text-[12px] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase text-red-500 mb-4 md:mb-6 block"
          >
            Capabilities & Workflow
          </motion.span>
          <h2 className="text-[10vw] md:text-[7vw] font-display font-black leading-[0.8] tracking-tighter uppercase text-white">
            HOW I APPROACH <br /> EVERY PROJECT?
          </h2>
        </div>

        <div className="flex flex-col gap-0">
          {approachSteps.map((step, index) => (
            <ApproachCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ApproachCard = memo(function ApproachCard({ step, index }: { step: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // "Alternating Slide" Effect
  const xDirection = index % 2 === 0 ? "100%" : "-100%";
  const x = useTransform(scrollYProgress, [0.1, 0.7], ["0%", xDirection]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.7], [0, index % 2 === 0 ? 10 : -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(4px)"]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ 
        backgroundColor: index % 2 === 0 ? '#161616' : '#141414',
        color: '#fff',
        x,
        rotateZ: rotate,
        scale,
        opacity,
        filter: blur,
        zIndex: index + 10,
        top: '10vh', 
        boxShadow: "0 -40px 100px rgba(0,0,0,0.8), inset 0 0 80px rgba(255,255,255,0.02)"
      }}
      className="sticky min-h-[50vh] md:min-h-[65vh] rounded-[32px] md:rounded-[80px] p-8 md:p-20 mb-8 md:mb-[25vh] flex flex-col justify-center overflow-hidden group border border-white/10 mx-auto w-full max-w-[1400px] shadow-2xl transition-all duration-300 backdrop-blur-sm will-change-transform"
    >
      {/* Noise Texture - Added for professional texture finish */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* Suble Interior Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />

      {/* Hover Border Glow */}
      <div className="absolute inset-0 rounded-[32px] md:rounded-[80px] border border-white/0 group-hover:border-white/20 transition-colors duration-700 pointer-events-none" />

      {/* Large Integrated Number - Improved visibility and positioning */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[-5%] right-[5%] text-[20vw] md:text-[25vw] font-display font-black leading-none select-none pointer-events-none opacity-20"
        style={{ 
          WebkitTextStroke: "2px rgba(255,255,255,0.15)", 
          color: 'rgba(255,255,255,0.03)'
        }}
      >
        {step.id}
      </motion.div>

      <div className="relative z-10 max-w-5xl w-full mx-auto text-center md:text-left">
        <h3 className="text-[8vw] md:text-[6.5vw] font-display font-black leading-[0.95] tracking-tighter uppercase mb-6 md:mb-10 group-hover:text-red-500 transition-colors duration-700">
          {step.title}
        </h3>

        <div className="flex justify-center md:justify-start">
            <p className="max-w-3xl text-[16px] md:text-[22px] font-medium leading-relaxed text-white/70 group-hover:text-white/100 transition-colors duration-700">
              {step.desc}
            </p>
        </div>
      </div>

      {/* Corner Brackets for Professional Look */}
      <div className="absolute bottom-12 left-12 w-12 h-[1px] bg-white/10" />
      <div className="absolute bottom-12 left-12 h-12 w-[1px] bg-white/10" />
    </motion.div>
  );
});

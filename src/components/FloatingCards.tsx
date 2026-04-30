import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

const CARDS = [
  { id: 1, title: "VISUAL IDENTITY", desc: "Crafting distinct brands through meticulous design and strategy.", tags: ["Strategy", "Logo", "Guidelines"], num: "01" },
  { id: 2, title: "DIGITAL PRODUCTS", desc: "Building scalable web and mobile experiences with Next.js.", tags: ["React", "State", "Mobile"], num: "02" },
  { id: 3, title: "USER EXPERIENCE", desc: "Architecting journeys that convert users into advocates.", tags: ["Research", "Figma", "Flows"], num: "03" },
  { id: 4, title: "CREATIVE CODE", desc: "Bridging the gap between art and high-end engineering.", tags: ["Animation", "D3.js", "WebGL"], num: "04" },
];

function FloatingCard({
  card,
  progress,
  start,
  end,
}: {
  card: (typeof CARDS)[number];
  progress: ReturnType<typeof useSpring>;
  start: number;
  end: number;
  key?: number;
}) {
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [100, -100]);
  const rotateX = useTransform(progress, [start, end], [10, -10]);
  const scale = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.9, 1, 1, 0.9]);

  return (
    <motion.div
      style={{ opacity, y, rotateX, scale }}
      className="absolute w-full aspect-[4/3] md:aspect-video bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden group"
    >
      <div className="relative z-10">
        <motion.div className="w-12 h-1 px bg-white/20 mb-12 group-hover:w-24 transition-all duration-500" />
        <h4 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tighter">{card.title}</h4>
        <p className="text-lg md:text-2xl text-white/40 max-w-sm leading-relaxed">{card.desc}</p>
      </div>

      <div className="flex justify-between items-end relative z-10">
        <div className="flex flex-col gap-3">
          {card.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold text-white tracking-[0.3em] uppercase">{tag}</span>
          ))}
        </div>
        <div className="text-[15vw] font-display font-black text-white/5 leading-none translate-y-12 select-none">
          {card.num}
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-white/5 to-transparent -z-0" />
    </motion.div>
  );
}

export function FloatingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const bgOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  return (
    <div id="work" ref={containerRef} className="relative h-[400vh] bg-[#111]">
      <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-[#0a0a0a] z-0"
        />
        
        {/* Floating Particle Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-20 w-full max-w-5xl px-8 h-[70vh] flex items-center justify-center perspective-1000">
          {CARDS.map((card, index) => (
            <FloatingCard
              key={card.id}
              card={card}
              progress={smoothProgress}
              start={index / CARDS.length}
              end={(index + 1) / CARDS.length}
            />
          ))}
        </div>

        <div className="absolute bottom-12 left-12 flex items-center gap-4 text-white/20 font-bold tracking-[0.4em] text-[10px] uppercase">
          <span className="w-12 h-px bg-white/20" />
          Capabilities
        </div>
      </section>
    </div>
  );
}

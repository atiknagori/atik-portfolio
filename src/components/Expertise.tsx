import { motion } from 'motion/react';

const EXPERTISE_ITEMS = [
  { 
    title: "FRONTEND DEV", 
    tag: "Human-Centric",
    desc: "Proficient in React.js, Next.js, and modern CSS frameworks. Crafting immersive, high-performance user interfaces with pixel-perfect precision and clean architecture." 
  },
  { 
    title: "CMS MASTERY", 
    tag: "Strategic",
    desc: "Expert in WordPress, Webflow, and Magento. Specialized in custom theme development and building flexible, easy-to-manage digital platforms." 
  },
  { 
    title: "SEO ENGINE", 
    tag: "Performance",
    desc: "Achieving 90+ PageSpeed scores and driving organic growth through technical optimization, Google Ads, and landing page strategy." 
  },
  { 
    title: "UI/UX ARCHITECT", 
    tag: "Precision",
    desc: "Translating complex Figma designs into pixel-perfect, fully responsive interfaces that prioritize user flow and visual harmony." 
  },
  { 
    title: "PROJECT LEAD", 
    tag: "Scalable",
    desc: "Coordinating development teams to deliver secure, high-quality code while managing complex project timelines and milestones." 
  }
];

export function Expertise() {
  return (
    <section id="services" className="relative bg-[#0a0a0a] text-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row min-h-screen">
        
        {/* Left Column: Sticky Title */}
        <div className="w-full md:w-[40%] md:h-screen md:sticky md:top-0 h-fit pt-20 pb-0 md:py-0 flex flex-col justify-center gap-4 md:gap-10 md:pr-8">
          <div>
            <div className="inline-block px-4 py-1.5 border border-white/10 rounded-full text-[10px] font-black tracking-[0.4em] uppercase mb-4 md:mb-8 text-red-500 bg-white/5">
              Expertise
            </div>
            <h3 className="text-[10vw] md:text-[clamp(2.5rem,4vw,4.5rem)] font-display font-black leading-[0.85] tracking-tighter uppercase mb-6 md:mb-12 break-words">
              REDEFINING <br className="hidden md:block" /> THE MODERN <br /> <span className="text-red-500">EXPERIENCE</span>
            </h3>
            
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Scroll to explore</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[60%] pt-8 pb-32 md:py-40 flex flex-col gap-8 md:gap-32">
           {EXPERTISE_ITEMS.map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 100, rotateX: 20 }}
               whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
               viewport={{ once: false, amount: 0.3 }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
               className="group relative bg-[#111] border border-white/5 p-8 md:p-16 rounded-[32px] md:rounded-[48px] overflow-hidden hover:border-red-500/30 transition-all duration-700 hover:bg-[#161616]"
             >
               {/* Subtle card glow */}
               <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 blur-[120px] rounded-full group-hover:bg-red-500/10 transition-colors duration-700" />
               
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8 md:mb-12">
                    <span className="text-[10px] font-black text-red-500 tracking-[0.3em] uppercase">{item.tag}</span>
                  </div>
                  
                  <h4 className="text-[28px] md:text-[42px] font-display font-black tracking-tighter uppercase mb-4 md:mb-6 leading-none group-hover:text-red-500 transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="text-[14px] md:text-[18px] font-medium leading-relaxed opacity-40 group-hover:opacity-80 transition-opacity pr-8 md:pr-16">
                    {item.desc}
                  </p>
               </div>

               <div 
                 className="absolute bottom-2 right-4 text-[80px] md:text-[120px] font-display font-black leading-none opacity-[0.25] group-hover:opacity-[0.4] group-hover:-translate-y-2 transition-all duration-700 select-none pointer-events-none"
                 style={{ 
                   WebkitTextStroke: "2px rgba(255, 255, 255, 0.8)",
                   color: "transparent"
                 }}
               >
                 0{i+1}
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}

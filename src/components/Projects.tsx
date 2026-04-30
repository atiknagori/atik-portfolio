import React, { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const PROJECT_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=75&w=1400&auto=format&fit=crop";
const PROJECT_DESCRIPTION = "project description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo sed libero gravida posuere et vel sapien.";

const projects = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: "project title",
  category: "project description",
  description: PROJECT_DESCRIPTION,
  image: PROJECT_IMAGE,
}));

export function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  // Calculate the horizontal shift based on 6 items.
  // Move until the last card is aligned to the right edge.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  return (
    <section id="work" ref={targetRef} className="relative h-[500vh] bg-[#f8f8f8]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Header Section */}
        <div className="absolute top-6 md:top-8 lg:top-12 xl:top-20 left-6 md:left-16 z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-3 md:mb-6"
          >
            <span className="w-8 h-[1px] bg-black/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Selected Works</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[32px] md:text-[40px] lg:text-[50px] xl:text-[80px] font-display font-black leading-none uppercase tracking-tighter"
          >
            Case <span className="text-red-500">Studies</span>
          </motion.h2>
        </div>

        {/* Horizontal Container */}
        <div className="flex w-full h-full items-center">
          <motion.div style={{ x }} className="flex gap-6 md:gap-14 px-6 md:px-16 pt-0 md:pt-48 lg:pt-56 xl:pt-72 will-change-transform">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
            {/* Precise spacer for right edge alignment */}
            <div className="w-[15vw] flex-shrink-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const ProjectCard = memo(function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div 
      data-cursor="view"
      className="group relative w-[75vw] md:w-[45vw] h-[55vh] md:h-[60vh] flex-shrink-0 bg-white rounded-[32px] md:rounded-[48px] overflow-hidden border border-black/5 will-change-transform"
    >
      {/* Image Container with Hover Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-sm">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-[28px] md:text-[42px] font-display font-black leading-tight uppercase mb-4 tracking-tighter">
          {project.title}
        </h3>

        <p className="max-w-xl text-sm md:text-base font-medium leading-relaxed text-white/70 mb-6">
          {project.description}
        </p>
        
              <div className="flex items-center justify-between border-t border-white/20 pt-6">
                <span className="text-[10px] md:text-[12px] font-mono opacity-60">PROJECT.0{index + 1}</span>
                <div className="flex items-center gap-2 group-hover:gap-4 transition-all text-red-500">
                  <span className="font-display font-black text-[14px] md:text-[18px] uppercase">View Project</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-[-45deg]">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
            </div>

      {/* Big number in background on hover */}
      <div className="absolute top-4 right-8 text-[120px] font-display font-black text-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none select-none">
        0{index + 1}
      </div>
    </motion.div>
  );
});

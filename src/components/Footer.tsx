import React, { memo, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from 'lucide-react';

export function Footer() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="contact" className="relative bg-[#0a0a0a] text-white pt-8 md:pt-16 pb-12 px-8 overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-red-600/10 blur-[150px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Section */}
        <div className="mb-8 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="w-8 h-px bg-white/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Ready to start?</span>
          </motion.div>

          <h2 className="text-[10vw] md:text-[8vw] font-display font-black leading-[0.8] tracking-tighter uppercase mb-16 md:mb-20 max-w-5xl">
            LET'S BUILD <br />
            SOMETHING <br />
            <span className="text-red-500 italic">EXTRAORDINARY</span>
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <motion.a
              href="mailto:atiknagori2022@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-white text-black px-8 py-5 md:px-12 md:py-7 rounded-full text-lg md:text-2xl font-display font-black flex items-center justify-center gap-4 md:gap-6 overflow-hidden w-full md:w-auto"
            >
              <span className="relative z-10 uppercase">Send a Brief</span>
              <Mail className="relative z-10 w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
              <motion.div 
                className="absolute inset-0 bg-red-500 z-0"
                initial={{ x: "-101%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              />
            </motion.a>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Connect directly</span>
              <a href="tel:+918108731578" className="text-2xl font-display font-black hover:text-red-500 transition-colors">+91 8108731578</a>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-24 border-b border-white/10">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 truncate">Socials</span>
            <div className="flex flex-col gap-4">
              <FooterLink href="https://www.linkedin.com/in/atik-nagori/" icon={<Linkedin size={16} />}>LinkedIn</FooterLink>
              <FooterLink href="https://github.com/atiknagori" icon={<Github size={16} />}>GitHub</FooterLink>
              <FooterLink href="https://wa.me/918108731578" icon={<Phone size={16} />}>WhatsApp</FooterLink>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 truncate">Navigation</span>
            <div className="flex flex-col gap-4">
              <FooterLink href="#home">Home</FooterLink>
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#work">Work</FooterLink>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 truncate">Location</span>
            <p className="text-sm font-medium text-white/60 leading-relaxed uppercase">
              MUMBAI, INDIA <br />
              19.0760° N, 72.8777° E
            </p>
          </div>

          <div className="flex flex-col gap-6 text-right md:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 truncate">Current Time</span>
            <p className="text-2xl font-display font-black">
              {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--'} IST
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/70 select-none cursor-none">
          <div className="cursor-none">&copy; 2026 ATIK NAGORI - CREATIVE DEVELOPER</div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 cursor-pointer text-white/80 hover:text-red-500 transition-all"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>Back to top</span>
            <ArrowUpRight size={14} />
          </motion.div>
          <div className="cursor-none">PROUDLY BUILT IN INDIA</div>
        </div>
      </div>
    </footer>
  );
}

const FooterLink = memo(function FooterLink({ href, children, icon }: { href: string, children: React.ReactNode, icon?: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="group flex items-center gap-2 text-sm md:text-lg font-bold text-white/60 hover:text-white transition-all w-fit"
    >
      <span className="group-hover:translate-x-1 transition-transform">{children}</span>
      {icon ? icon : <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />}
    </a>
  );
});

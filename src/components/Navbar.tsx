import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !isOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement> | null, href: string) => {
    if (e) e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: 'smooth',
    });
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference pointer-events-none"
      >
        <div 
          onClick={() => {
            const elem = document.getElementById('home');
            elem?.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
          }}
          className="text-white text-[24px] font-display font-black tracking-tighter leading-none pointer-events-auto cursor-pointer"
        >
          AN.
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-12 pointer-events-auto items-center">
          {navLinks.map((link, i) => (
            <NavLink 
              key={i} 
              link={link} 
              onClick={(e) => scrollToSection(e, link.href)} 
            />
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden pointer-events-auto">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-12 h-12 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm border border-white/20 transition-all active:scale-95"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <motion.div 
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white origin-center"
              />
              <motion.div 
                animate={isOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                className="w-full h-0.5 bg-white origin-right"
              />
              <motion.div 
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white origin-center"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[95] bg-[#0a0a0a] md:hidden flex flex-col items-center justify-center gap-6 px-10"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              {navLinks.map((link, i) => (
                <div key={i} className="overflow-hidden py-2">
                  <motion.a
                    href={link.href}
                    initial={{ y: 100, rotate: 10 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ 
                      delay: 0.3 + (i * 0.1),
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="block text-5xl font-display font-black text-white hover:text-red-500 transition-colors uppercase tracking-tighter"
                  >
                    {link.name}
                  </motion.a>
                </div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 flex flex-col items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-white/20" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Get in touch</p>
              <a href="mailto:atiknagori2022@gmail.com" className="text-sm font-bold text-white/60">atiknagori2022@gmail.com</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ link, onClick }: { link: any, onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void, key?: any }) {
  return (
    <motion.a
      href={link.href}
      onClick={onClick}
      className="relative text-white font-black text-[12px] md:text-[14px] uppercase tracking-tighter overflow-hidden group py-1"
    >
      <div className="relative overflow-hidden">
        <motion.div
          className="group-hover:-translate-y-full transition-transform duration-500 ease-in-out"
        >
          {link.name}
        </motion.div>
        <motion.div
          className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out text-red-500"
        >
          {link.name}
        </motion.div>
      </div>
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out"
      />
    </motion.a>
  );
}

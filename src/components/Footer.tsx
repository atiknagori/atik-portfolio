import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const scriptText = 'Matter';

  return (
    <footer id="contact" className="bg-white py-40 px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="text-[12vw] md:text-[10vw] font-display font-extrabold leading-[0.85] tracking-tighter uppercase mb-12">
          WE TAKE PRIDE IN <br />
          CHALLENGING <br />
          NORMS, MAKING <br />
          <span className="block md:inline">STORIES THAT</span><br />
          <div className="relative inline-block">
            <div className="flex justify-center">
              {scriptText.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  viewport={{ once: false }}
                  className="text-red-600 font-serif font-black italic text-[18vw] md:text-[12vw] leading-none lowercase inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xl md:text-3xl text-black/60 max-w-2xl mb-16 leading-relaxed">
          and building work that performs because it refuses to behave.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-black text-white px-12 py-6 rounded-full text-xl font-display font-bold flex items-center gap-4 overflow-hidden"
        >
          <span className="relative z-10 uppercase tracking-widest">WE&apos;RE READY WHEN YOU ARE</span>
          <ArrowUpRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          <motion.div
            className="absolute inset-0 bg-red-600 z-0"
            initial={{ y: '100%' }}
            whileHover={{ y: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          />
        </motion.button>

        <div className="mt-40 w-full pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 text-black/40 font-mono text-xs uppercase tracking-widest">
          <div className="flex gap-12">
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-black transition-colors">GitHub</a>
            <a href="#" className="hover:text-black transition-colors">Instagram</a>
          </div>
          <div>&copy; 2026 ATIK NAGORI - ALL RIGHTS RESERVED</div>
          <div className="flex gap-4">
            <span>MUMBAI, INDIA - 19.0760 DEG N</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

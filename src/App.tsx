'use client';

import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Preloader } from './components/Preloader';
import { AnimatePresence } from 'motion/react';

const Philosophy = lazy(() => import('./components/Philosophy').then((module) => ({ default: module.Philosophy })));
const Expertise = lazy(() => import('./components/Expertise').then((module) => ({ default: module.Expertise })));
const Projects = lazy(() => import('./components/Projects').then((module) => ({ default: module.Projects })));
const Referrals = lazy(() => import('./components/Referrals').then((module) => ({ default: module.Referrals })));
const Approach = lazy(() => import('./components/Approach').then((module) => ({ default: module.Approach })));
const Footer = lazy(() => import('./components/Footer').then((module) => ({ default: module.Footer })));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const handlePreloaderComplete = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="relative bg-white">
            <Hero />
            <Suspense fallback={null}>
              <Philosophy />
              <Expertise />
              <Projects />
              <Referrals />
              <Approach />
              <Footer />
            </Suspense>
          </main>
        </SmoothScroll>
      )}
    </>
  );
}

'use client';

import { SmoothScroll } from './components/SmoothScroll';
import { Hero } from './components/Hero';

export default function App() {
  return (
    <SmoothScroll>
      <main className="relative">
        <Hero />
      </main>
    </SmoothScroll>
  );
}

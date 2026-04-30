import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const hoverStateRef = useRef({ isHovering: false, cursorText: "" });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for a "premium" feel
  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    const updatePointerType = () => setIsTouchDevice(pointerQuery.matches);
    updatePointerType();
    pointerQuery.addEventListener('change', updatePointerType);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverData = target.closest('[data-cursor]');
      let nextIsHovering = false;
      let nextCursorText = "";

      if (hoverData) {
        nextIsHovering = true;
        nextCursorText = hoverData.getAttribute('data-cursor') || "";
      } else if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
        nextIsHovering = true;
      }

      if (
        hoverStateRef.current.isHovering !== nextIsHovering ||
        hoverStateRef.current.cursorText !== nextCursorText
      ) {
        hoverStateRef.current = { isHovering: nextIsHovering, cursorText: nextCursorText };
        setIsHovering(nextIsHovering);
        setCursorText(nextCursorText);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleHoverStart);

    return () => {
      pointerQuery.removeEventListener('change', updatePointerType);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleHoverStart);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Main Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-current z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "white",
          mixBlendMode: "difference"
        }}
        animate={{
          width: isHovering ? 90 : 32,
          height: isHovering ? 90 : 32,
        }}
      >
        {cursorText && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-black uppercase text-black tracking-[0.2em]"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-red-600 rounded-full z-[10000] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 4 : isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
      />
    </>
  );
}

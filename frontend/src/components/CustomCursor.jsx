import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Check if device supports fine pointers (mouse) to avoid mounting on touchscreens
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasMouse) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e) => {
      // Check if target is interactive
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.classList.contains('cursor-pointer');

      setIsHovered(!!isInteractive);
    };

    const onMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-sage-500 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out z-[9999] opacity-0 mix-blend-difference bg-white dark:bg-white select-none ${
        isHovered ? 'w-16 h-16 bg-white/10 border-sage-600/30' : 'w-8 h-8'
      }`}
      style={{
        transitionProperty: 'width, height, background-color, border-color, opacity',
        willChange: 'transform'
      }}
    />
  );
}

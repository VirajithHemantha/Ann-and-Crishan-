import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroProps {
  guestName?: string | null;
}

export const Hero: React.FC<HeroProps> = ({ guestName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-screen flex flex-col items-center justify-start pt-20 sm:pt-32 overflow-hidden bg-brand-beige-deep">

      {/* Cinematic Background Image with Ken Burns effect */}
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        style={{ y: y1, scale }}
      >
        {/* Floating Particles for Romantic Polish */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{
          backgroundImage: 'radial-gradient(1.5px 1.5px at 10% 20%, rgba(212, 175, 55, 0.5) 1.5px, transparent 0), radial-gradient(2.5px 2.5px at 80% 50%, rgba(255, 255, 255, 0.3) 2.5px, transparent 0), radial-gradient(1px 1px at 50% 80%, rgba(212, 175, 55, 0.4) 1px, transparent 0)',
          backgroundSize: '150px 150px',
          animation: 'particle-drift 45s linear infinite'
        }} />

        <motion.div
          animate={{ scale: [1.02, 1.05] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src="/image 1.jpeg"
            alt="Ann and Crishan"
            className="w-full h-full object-contain sm:object-cover"
            style={{ 
              objectPosition: 'center center',
              maxHeight: '100%',
              maxWidth: '100%' 
            }}
          />
        </motion.div>
        
        {/* Cinematic Grade Overlays */}
        {/* Warmth and contrast */}
        <div className="absolute inset-0 bg-[#4A3525] mix-blend-overlay opacity-30" />
        {/* Soft dark gradient behind text for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2216]/90 via-[#1A2216]/50 to-transparent h-[70vh]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2216]/80 via-transparent to-transparent h-[40vh] bottom-0 top-auto" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 w-full max-w-5xl mt-8 sm:mt-12"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
          className="flex flex-col items-center"
        >
          <img 
            src="/bgr.png" 
            alt="Ann and Crishan Crest" 
            className="w-24 h-auto sm:w-32 mb-6 sm:mb-8 opacity-90 object-contain"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }}
          />
          <span className="text-[#E6DFD3] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-sm font-sans mb-4 sm:mb-6 block drop-shadow-md opacity-90">
            Together with their families
          </span>

          <h1 className="flex items-center justify-center flex-wrap text-[3.5rem] leading-[1.1] sm:text-7xl lg:text-[8.5rem] font-display text-[#FAF8F5] mb-4 sm:mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] tracking-wide relative">
            <motion.span 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            >
              Ann
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1.8 }}
              className="font-serif italic text-[#C6AA76] mx-3 sm:mx-8 text-3xl sm:text-6xl lg:text-[7rem] font-light inline-block -translate-y-1 sm:-translate-y-4"
            >
              &
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 1.4 }}
            >
              Crishan
            </motion.span>
          </h1>

          <p className="text-[#E6DFD3] font-serif italic text-base sm:text-2xl tracking-wide mb-8 drop-shadow-md opacity-90 max-w-2xl mx-auto">
            {guestName ? (
              <>We cordially invite <span className="text-white font-semibold">{guestName}</span> to celebrate our special day with us.</>
            ) : (
              "Invite you to celebrate their wedding"
            )}
          </p>

          {/* Delicate animated gold divider */}
          <div className="flex items-center justify-center gap-4 mb-8 w-full max-w-xs">
            <motion.div 
              initial={{ scaleX: 0 }} 
              animate={{ scaleX: 1 }} 
              transition={{ delay: 2, duration: 1.5 }} 
              className="h-[1px] flex-1 bg-gradient-to-l from-[#C6AA76] to-transparent origin-right" 
            />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#C6AA76]" />
            <motion.div 
              initial={{ scaleX: 0 }} 
              animate={{ scaleX: 1 }} 
              transition={{ delay: 2, duration: 1.5 }} 
              className="h-[1px] flex-1 bg-gradient-to-r from-[#C6AA76] to-transparent origin-left" 
            />
          </div>

          <div className="flex flex-col gap-2 text-[#FAF8F5] font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] drop-shadow-md font-light">
            <span>Saturday, 12 December 2026</span>
            <span className="text-[#C6AA76]">Holy Mass · 11:00 AM</span>
            <span>St. Joseph's Church, Wennappuwa</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#E6DFD3] font-light">Scroll to discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#C6AA76] to-transparent animate-pulse" />
      </motion.div>
    </div>
  );
};

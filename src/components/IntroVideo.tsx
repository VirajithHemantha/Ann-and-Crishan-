import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface IntroVideoProps {
  onComplete: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;
const VIDEO = '/gemini_generated_video_200c18cd.mp4';
const HEADLINE = 'You are invited';

// Each letter drifts up out of a soft blur, as if written in light
const letter = {
  hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease } },
};

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(console.error);
    bgRef.current?.play().catch(() => {});
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#0F1611] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Desktop: blurred copy fills the sides of the portrait video */}
      <video
        ref={bgRef}
        src={VIDEO}
        autoPlay
        muted
        playsInline
        aria-hidden
        className="hidden sm:block absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50"
      />

      {/* Main video: full-bleed on phones, centred portrait on larger screens */}
      <video
        ref={videoRef}
        src={VIDEO}
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        className="relative w-full h-full object-cover sm:w-auto sm:aspect-[9/16] sm:shadow-[0_0_80px_rgba(0,0,0,0.6)]"
      />

      {/* Cinematic wash: darker at the top for the wording, soft vignette below */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,14,11,0.78) 0%, rgba(10,14,11,0.45) 28%, transparent 50%, transparent 72%, rgba(10,14,11,0.55) 100%)',
        }}
      />

      {/* Wording */}
      <div className="absolute inset-x-0 top-[9vh] sm:top-[10vh] z-10 flex flex-col items-center text-center px-6 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={{ opacity: 1, letterSpacing: '0.42em' }}
          transition={{ duration: 2.2, ease, delay: 2.2 }}
          className="font-engraved font-semibold uppercase text-[10px] sm:text-xs text-[#E6D3A3] pl-[0.42em]"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
        >
          Ann &amp; Crishan
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease, delay: 2.8 }}
          className="flex items-center gap-3 w-40 sm:w-52 my-4 sm:my-5"
        >
          <span className="h-px flex-1 bg-gradient-to-l from-[#C6AA76] to-transparent" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[#C6AA76]" />
          <span className="h-px flex-1 bg-gradient-to-r from-[#C6AA76] to-transparent" />
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { delayChildren: 3.3, staggerChildren: 0.09 } } }}
          className="font-script text-[#F6EEDC] text-[15vw] sm:text-[5.5rem] leading-[1.1] whitespace-nowrap"
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.55), 0 0 40px rgba(230,211,163,0.25)' }}
          aria-label={HEADLINE}
        >
          {HEADLINE.split('').map((ch, i) => (
            <motion.span key={i} variants={letter} className="inline-block" aria-hidden>
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease, delay: 5.3 }}
          className="font-serif italic font-medium text-lg sm:text-2xl text-[#F3E9D2] mt-2"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
        >
          to celebrate the union of two hearts
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 6.2 }}
          className="font-engraved font-semibold tracking-[0.45em] pl-[0.45em] text-[11px] sm:text-[13px] text-[#E6D3A3] mt-4"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
        >
          12 · 12 · 2026
        </motion.p>
      </div>

      {/* Skip */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={onComplete}
        className="absolute bottom-8 right-6 sm:bottom-10 sm:right-10 z-20 px-5 py-2 border border-[#C6AA76]/60 bg-black/20 backdrop-blur-sm text-[#E6D3A3] font-engraved font-semibold text-[9px] tracking-[0.3em] uppercase hover:bg-[#C6AA76]/15 transition-colors rounded-[2px]"
      >
        Skip
      </motion.button>
    </motion.div>
  );
};

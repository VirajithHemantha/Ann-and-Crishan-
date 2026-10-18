import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void, onMusicStart?: () => void }) {
  const [opened, setOpened] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const prefix = params.get('prefix');
  const guestName = params.get('name');

  useEffect(() => {
    if (opened) {
      if (onMusicStart) onMusicStart();

      const timer = setTimeout(() => {
        onComplete();
      }, 6500); // Envelope opens, card is read, then transition
      return () => clearTimeout(timer);
    }
  }, [opened, onComplete, onMusicStart]);

  return (
    <div
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center px-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #F7F1E6 0%, #EBE1CF 60%, #D9CCB4 100%)',
      }}
    >
      {/* Linen texture */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]" />

      {/* Greeting above the envelope */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: opened ? 0 : 1, y: 0 }}
        transition={{ duration: opened ? 0.6 : 1.6, ease, delay: opened ? 0 : 0.4 }}
        className="relative z-10 text-center mb-6 sm:mb-8"
      >
        <p className="font-engraved font-semibold uppercase tracking-[0.3em] text-[10px] sm:text-[11px] text-[#5E431A]">
          {guestName ? 'Addressed to' : 'You are cordially invited'}
        </p>
        {guestName && (
          <p className="font-script text-[2rem] sm:text-[2.4rem] leading-tight text-[#140D08] mt-1">
            {prefix ? `${prefix} ` : ''}{guestName}
          </p>
        )}
      </motion.div>

      {/* Envelope stage: holds both the sealed (landscape) and opened (portrait) envelope */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.8, ease }}
        className={`relative z-10 w-[min(480px,94vw)] ${opened ? 'h-[min(600px,72svh)]' : 'h-[min(360px,70vw)]'} transition-[height] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${opened ? '' : 'cursor-pointer'}`}
        onClick={() => {
          if (!opened) setOpened(true);
        }}
      >
        {/* Warm glow that blooms as the envelope opens */}
        <motion.div
          initial={false}
          animate={opened ? { opacity: [0, 1, 0.55], scale: [0.6, 1.15, 1] } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 2.4, ease, delay: opened ? 0.6 : 0 }}
          className="absolute inset-[-10%] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,236,190,0.75) 0%, rgba(214,184,120,0.25) 40%, transparent 68%)' }}
        />

        {/* Sealed envelope: presses in at the seal, then sinks away */}
        <div
          className="absolute inset-0"
          style={{ filter: 'drop-shadow(0 30px 35px rgba(40,30,15,0.35)) drop-shadow(0 6px 10px rgba(40,30,15,0.2))' }}
        >
        <motion.img
          src="/Forest_Green_Royal_Crest_Envelope-removebg-preview.png"
          alt="Sealed invitation envelope"
          draggable={false}
          initial={false}
          animate={
            opened
              ? { scale: [1, 0.96, 1.02, 0.9], y: ['0%', '0%', '-2%', '10%'], opacity: [1, 1, 1, 0], filter: ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'] }
              : { scale: 1, y: '0%', opacity: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 1.6, ease, times: [0, 0.15, 0.35, 1] }}
          whileHover={opened ? undefined : { y: -6, scale: 1.015 }}
          className="w-full h-full object-contain select-none"
        />
        </div>

        {/* Glint across the wax seal before opening */}
        {!opened && (
          <motion.div
            className="absolute z-20 left-1/2 top-[57%] w-[17%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,240,200,0.45), transparent 65%)' }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.8, 1.15, 0.8] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        )}

        {/* Opened envelope with the invitation card: rises into focus, then floats gently */}
        <motion.div
          initial={false}
          animate={
            opened
              ? { opacity: 1, y: '0%', scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, y: '12%', scale: 0.9, filter: 'blur(10px)' }
          }
          transition={{ duration: 2, ease, delay: opened ? 0.8 : 0 }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.img
            src="/Luxury_Olive_Green_Wedding_Invitation-removebg-preview.png"
            alt="Ann & Crishan wedding invitation"
            draggable={false}
            animate={opened ? { y: [0, -8, 0] } : { y: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.8 }}
            className="w-full h-full object-contain select-none"
            style={{ filter: 'drop-shadow(0 30px 35px rgba(40,30,15,0.35)) drop-shadow(0 6px 10px rgba(40,30,15,0.2))' }}
          />
        </motion.div>
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: opened ? 0.5 : 1.2, delay: opened ? 0 : 1.4 }}
        className="relative z-10 mt-8 sm:mt-10 flex flex-col items-center gap-3"
      >
        <button
          onClick={() => setOpened(true)}
          className="font-engraved font-semibold uppercase tracking-[0.32em] text-[10px] sm:text-[11px] text-[#F3E9D2] bg-[#26331F] hover:bg-[#1A2416] px-7 py-3 rounded-[2px] shadow-[0_8px_20px_rgba(26,36,22,0.3)] border border-[#A8833F]/60 transition-colors"
        >
          Open Invitation
        </button>
        <span className="font-serif italic text-[13px] text-[#5E4A39]">tap the seal to open</span>
      </motion.div>
    </div>
  );
}

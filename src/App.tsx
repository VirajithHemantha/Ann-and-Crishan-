import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, VolumeX } from 'lucide-react';
import { Toaster } from 'sonner';
import { getGuestNameFromPath } from './lib/invite';

import { EnvelopeOpening } from './components/EnvelopeOpening';
import { IntroVideo } from './components/IntroVideo';
import { Hero } from './components/Hero';
import { CoupleDetails } from './components/CoupleDetails';
import { Location } from './components/Location';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';
import { WishesSection } from './components/WishesSection';
import { FallingGoldLeaf } from './components/FallingGoldLeaf';

export default function App() {
  const [appState, setAppState] = useState<'envelope' | 'video' | 'invitation'>('envelope');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/paulyudin-wedding-485932.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.preload = 'auto';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMusicStart = () => {
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  if (appState === 'envelope') {
    return (
      <AnimatePresence mode="wait">
        <EnvelopeOpening
          key="envelope"
          onComplete={() => setAppState('video')}
          onMusicStart={handleMusicStart}
        />
      </AnimatePresence>
    );
  }

  if (appState === 'video') {
    return (
      <AnimatePresence mode="wait">
        <IntroVideo 
          key="video"
          onComplete={() => setAppState('invitation')} 
        />
      </AnimatePresence>
    );
  }

  const weddingDate = new Date("2026-12-12T11:00:00");

  return (
    <div className="font-sans text-stone-800 bg-brand-ivory overflow-hidden selection:bg-brand-beige-deep/20">
      <Toaster position="top-center" />
      <FallingGoldLeaf />
      
      {/* Premium Floating Music Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-12 sm:w-14 h-12 sm:h-14 bg-white/70 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(26,34,22,0.2)] flex items-center justify-center border border-brand-gold/30 text-brand-mocha hover:scale-105 transition-all duration-300"
      >
        {isMusicPlaying ? <Music className="w-5 h-5 sm:w-6 sm:h-6" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
      </motion.button>

      <Hero guestName={getGuestNameFromPath()} />
      <CoupleDetails />
      <Location />
      <Countdown targetDate={weddingDate} />
      <RSVPForm />
      <div>
        <WishesSection />
      </div>

      {/* 11. Final scene — closing card */}
      <footer className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-[#0E140F] text-[#F3E9D2] py-24">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <img
            src="/44.jpg"
            alt="Ann and Crishan sunset"
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E140F] via-[#0E140F]/70 to-[#0E140F]/40" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 30%, rgba(14,20,15,0.75) 100%)' }} />
        </motion.div>

        {/* Floating gold dust */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(1px 1px at 20% 30%, rgba(214, 184, 120, 0.5) 1px, transparent 0), radial-gradient(1.5px 1.5px at 70% 60%, rgba(243, 233, 210, 0.25) 1.5px, transparent 0)',
          backgroundSize: '100px 100px',
          animation: 'particle-drift 30s linear infinite'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-6 max-w-2xl flex flex-col items-center"
        >
          {/* Crest, gilded */}
          <img
            src="/bgr.png"
            alt="Ann and Crishan Crest"
            className="w-24 sm:w-28 mb-8 mix-blend-screen"
            style={{ filter: 'invert(1) sepia(1) saturate(2.2) hue-rotate(-12deg) brightness(0.85)' }}
          />

          <p className="font-serif italic font-medium text-2xl sm:text-3xl leading-snug text-[#F3E9D2] drop-shadow-md max-w-md">
            &ldquo;We look forward to celebrating this beautiful beginning with you.&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3 w-40 my-8">
            <span className="h-px flex-1 bg-gradient-to-l from-[#C6AA76] to-transparent" />
            <span className="w-1.5 h-1.5 rotate-45 border border-[#C6AA76]" />
            <span className="h-px flex-1 bg-gradient-to-r from-[#C6AA76] to-transparent" />
          </div>

          <p className="font-engraved font-semibold uppercase tracking-[0.42em] pl-[0.42em] text-[10px] sm:text-[11px] text-[#C6AA76]">
            With love
          </p>
          <h2 className="font-script text-[3.6rem] sm:text-8xl leading-[1.15] text-[#F6EEDC] drop-shadow-lg">
            Ann &amp; Crishan
          </h2>
          <span className="font-engraved font-semibold tracking-[0.45em] pl-[0.45em] text-[11px] sm:text-xs text-[#E6D3A3] mt-2">
            12 · 12 · 2026
          </span>

          <div className="mt-20 pt-6 border-t border-[#C6AA76]/25 w-full max-w-xs">
            <p className="text-[#F3E9D2]/60 text-[9px] sm:text-[10px] font-engraved font-semibold tracking-[0.25em] uppercase text-center leading-relaxed">
              Want a beautiful wedding website like this? <br className="sm:hidden" />
              Create yours with <a target="_blank" rel="noreferrer" className="text-[#C6AA76] hover:text-white transition-colors underline underline-offset-4 ml-1" href="https://wa.me/94707819074">invitemint</a>
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
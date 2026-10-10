import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, VolumeX, Sparkles } from 'lucide-react';
import { Toaster } from 'sonner';

import { EnvelopeOpening } from './components/EnvelopeOpening';
import { IntroVideo } from './components/IntroVideo';
import { Hero } from './components/Hero';
import { CoupleDetails } from './components/CoupleDetails';
import { Location } from './components/Location';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';

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

      {/* Extract Guest Name from URL */}
      {(() => {
        const pathParam = window.location.pathname.slice(1);
        const guestName = pathParam && pathParam !== 'admin' ? decodeURIComponent(pathParam) : null;
        return <Hero guestName={guestName} />;
      })()}
      <CoupleDetails />
      <Location />
      <Countdown targetDate={weddingDate} />
      <RSVPForm />

      {/* 11. Final scene — movie ending */}
      <footer className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-mocha text-brand-champagne">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          transition={{ duration: 10, ease: "linear" }}
        >
          <img 
            src="/44.jpg" 
            alt="Ann and Crishan sunset" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-mocha via-brand-mocha/60 to-transparent" />
        </motion.div>

        {/* Floating light particles */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(1px 1px at 20% 30%, rgba(212, 175, 55, 0.4) 1px, transparent 0), radial-gradient(2px 2px at 70% 60%, rgba(255, 255, 255, 0.2) 1.5px, transparent 0)',
          backgroundSize: '100px 100px',
          animation: 'particle-drift 30s linear infinite'
        }} />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center px-6 max-w-2xl"
        >
          <p className="font-serif italic text-2xl sm:text-3xl mb-12 drop-shadow-md">
            “We look forward to celebrating this beautiful beginning with you.”
          </p>
          <h2 className="font-display text-5xl sm:text-7xl mb-6 tracking-wide drop-shadow-lg">
            Ann & Crishan
          </h2>
          <span className="font-sans text-xs uppercase tracking-[0.4em] font-light text-brand-gold">
            12 · 12 · 2026
          </span>
          <div className="mt-16 flex flex-col items-center">
            <div className="text-brand-gold/60 mb-12">
              <Sparkles className="w-5 h-5 mx-auto" strokeWidth={1} />
            </div>
            
            <p className="text-brand-champagne/60 text-[10px] sm:text-xs font-sans tracking-widest uppercase text-center">
              Want a beautiful wedding website like this? <br className="sm:hidden" />
              Create yours with <a target="_blank" rel="noreferrer" className="text-brand-gold hover:text-white transition-colors underline underline-offset-4 ml-1" href="https://wa.me/94707819074">invitemint</a>
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
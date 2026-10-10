import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface IntroVideoProps {
  onComplete: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-[#1A2216] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <video
        ref={videoRef}
        src="/gemini_generated_video_200c18cd.mp4"
        autoPlay
        playsInline
        onEnded={onComplete}
        className="w-full h-full object-cover sm:object-contain mix-blend-lighten opacity-90"
      />
      
      {/* Optional gradient overlays to make the video feel more cinematic */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A2216]/80 via-transparent to-[#1A2216]/80 pointer-events-none" />

      {/* Skip Button */}
      <button 
        onClick={onComplete}
        className="absolute bottom-10 right-10 z-10 px-6 py-2 border border-[#C6AA76]/50 text-[#C6AA76] font-sans text-[10px] tracking-widest uppercase hover:bg-[#C6AA76]/10 transition-colors rounded-sm"
      >
        Skip Video
      </button>
    </motion.div>
  );
};

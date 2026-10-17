import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ScratchCard } from './ScratchCard';

export const CoupleDetails: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const clipPath = useTransform(scrollYProgress, [0.1, 0.4], ["inset(20% 20% 20% 20%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(scrollYProgress, [0.1, 0.6], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <div className="w-full relative bg-brand-ivory" ref={containerRef}>
      
      {/* 4. Second Photo — Cinematic Reveal */}
      <div className="relative h-screen w-full flex items-start justify-center overflow-hidden bg-brand-beige-deep">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ clipPath }}
        >
          <motion.div className="w-full h-full" style={{ scale }}>
            <img 
              src="/image 1.jpeg" 
              alt="Ann and Crishan" 
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
            />
          </motion.div>
          {/* Subtle film-grain overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          {/* Cinematic lighting gradient (darker at the top so the wording stays readable) */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-mocha/90 via-brand-mocha/20 to-transparent" />
        </motion.div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-3xl pt-24 sm:pt-32"
          style={{ opacity }}
        >
          <p className="font-serif italic text-2xl sm:text-4xl text-brand-champagne drop-shadow-lg leading-relaxed">
            “Two hearts, one beautiful journey, a lifetime of memories yet to come.”
          </p>
        </motion.div>
      </div>

      {/* 5. Our Story — Editorial Film-Strip Section - skipping as per instructions, or maybe add a small one here? User said: "Create a stylish photo-led section inspired by a romantic movie scrapbook... Include both supplied photos... Use a combination of horizontal film-strip composition..."
      Actually I should create this in a separate component or here. Let's create it in a separate component if needed. But let's add Family details here.
      */}

      {/* 6. Family Details */}
      <div className="py-24 sm:py-32 relative flex justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/999.jpg" alt="" className="w-full h-full object-cover opacity-60" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="bg-white/30 backdrop-blur-md p-10 sm:p-16 max-w-4xl w-full rounded-sm border border-brand-gold/30 shadow-[0_20px_40px_rgba(44,53,39,0.1)] relative"
        >
          {/* Elegant Botanical SVG Corners */}
          <div className="absolute top-4 left-4 w-12 h-12 opacity-40 text-brand-gold">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M10,0 C10,50 50,90 100,90 L100,100 C40,100 0,60 0,0 L10,0 Z" />
              <path d="M20,10 C30,30 50,40 70,40 C50,40 30,50 20,70 C10,50 0,40 20,10 Z" />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 w-12 h-12 opacity-40 text-brand-gold rotate-180">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M10,0 C10,50 50,90 100,90 L100,100 C40,100 0,60 0,0 L10,0 Z" />
              <path d="M20,10 C30,30 50,40 70,40 C50,40 30,50 20,70 C10,50 0,40 20,10 Z" />
            </svg>
          </div>
          
          <div className="text-center mb-16 relative z-10">
            <span className="font-sans uppercase tracking-[0.4em] text-xs text-brand-beige mb-4 block">The Families</span>
            <div className="w-12 h-px bg-brand-gold/50 mx-auto mb-12" />
            
            {/* Oval Scratch Reveal Card */}
            <div className="mb-12 w-48 h-64 sm:w-64 sm:h-80 mx-auto">
              <ScratchCard imageSrc="/x.jpg" text="Scratch to reveal" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-16 md:gap-8 justify-between text-center">
            
            {/* Groom's Parents */}
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 1 }}
              className="flex-1"
            >
              <h3 className="font-display text-3xl text-brand-mocha mb-8">Groom's Parents</h3>
              <div className="space-y-4 font-serif text-lg text-brand-beige">
                <p>Mr. W.P. Joseph Nihal Laxman Fernando</p>
                <div className="w-4 h-px bg-brand-gold/40 mx-auto" />
                <p>Mrs. S. Lalitha</p>
              </div>
            </motion.div>

            {/* Vertical Separator */}
            <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent" />

            {/* Bride's Parents */}
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }}
              className="flex-1"
            >
              <h3 className="font-display text-3xl text-brand-mocha mb-8">Bride's Parent</h3>
              <div className="space-y-4 font-serif text-lg text-brand-beige">
                <p>Mr. W.A. Suresh Kumara</p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

    </div>
  );
};

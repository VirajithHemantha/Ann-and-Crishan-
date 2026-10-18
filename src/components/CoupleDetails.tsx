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
      
      {/* 4a. Second Photo — Mobile: framed gallery print on forest green */}
      <div className="sm:hidden relative min-h-[100svh] w-full overflow-hidden bg-[#141C15] flex flex-col items-center justify-center px-6 py-12">
        {/* Photo tint + vignette */}
        <img src="/image 1.jpeg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-50" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 45%, rgba(20,28,21,0.25) 0%, rgba(14,20,15,0.85) 80%)' }} />
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 font-serif italic text-[1.6rem] leading-snug text-[#F3E9D2] text-center max-w-[20rem]"
        >
          “Two hearts, one beautiful journey, a lifetime of memories yet to come.”
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="relative z-10 flex items-center gap-3 w-36 my-6"
        >
          <span className="h-px flex-1 bg-gradient-to-l from-[#C6AA76] to-transparent" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[#C6AA76]" />
          <span className="h-px flex-1 bg-gradient-to-r from-[#C6AA76] to-transparent" />
        </motion.div>

        {/* Arched gallery frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-[min(84vw,22rem)] p-[6px] rounded-t-[999px] border border-[#C6AA76]/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
        >
          <div className="relative w-full aspect-[9/10] overflow-hidden rounded-t-[999px] border border-[#C6AA76]/40">
            <motion.img
              src="/image 1.jpeg"
              alt="Ann and Crishan"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 6, ease: 'easeOut' }}
              className="w-full h-full object-cover"
              style={{ objectPosition: '55% 100%' }}
            />
            {/* Soft gilt sheen */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-[#F3E9D2]/10" />
            {/* Curtain that lifts to reveal the photo */}
            <motion.div
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="absolute inset-0 origin-top bg-[#141C15]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="relative z-10 mt-6 text-center"
        >
          <p className="font-script text-[2.6rem] leading-none text-[#E6D3A3]">Ann &amp; Crishan</p>
          <p className="font-engraved font-semibold tracking-[0.4em] pl-[0.4em] text-[10px] text-[#C6AA76] mt-3">12 · 12 · 2026</p>
        </motion.div>
      </div>

      {/* 4b. Second Photo — Desktop: cinematic full-bleed reveal */}
      <div className="hidden sm:flex relative h-screen w-full items-start justify-center overflow-hidden bg-brand-beige-deep">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ clipPath }}
        >
          <motion.div className="relative w-full h-full" style={{ scale }}>
            <img
              src="/image 1.jpeg"
              alt="Ann and Crishan"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 70%' }}
            />
          </motion.div>
          {/* Subtle film-grain overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          {/* Cinematic lighting gradient (darker at the top so the wording stays readable) */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-mocha/60 via-transparent to-transparent h-1/3" />
        </motion.div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-xl pt-10 sm:pt-14"
          style={{ opacity }}
        >
          <p className="font-serif italic text-2xl sm:text-4xl text-brand-champagne drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] leading-snug">
            “Two hearts, one beautiful journey, a lifetime of memories yet to come.”
          </p>
        </motion.div>
      </div>

      {/* 5. Our Story — Editorial Film-Strip Section - skipping as per instructions, or maybe add a small one here? User said: "Create a stylish photo-led section inspired by a romantic movie scrapbook... Include both supplied photos... Use a combination of horizontal film-strip composition..."
      Actually I should create this in a separate component or here. Let's create it in a separate component if needed. But let's add Family details here.
      */}

      {/* 6. Family Details — engraved stationery card */}
      <div className="relative flex justify-center px-4 py-20 sm:py-32 overflow-hidden bg-[#F3ECDF]">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/999.jpg" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,246,238,0.55)_0%,rgba(236,226,208,0.35)_100%)]" />
          <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/linen.png')]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl bg-[#FBF7EF] p-2.5 sm:p-3 shadow-[0_30px_60px_-20px_rgba(60,40,15,0.35)]"
        >
          {/* Double gilt border */}
          <div className="relative border border-[#A8833F]/70 p-1.5">
            <div className="relative border border-[#A8833F]/35 px-6 py-12 sm:px-14 sm:py-16">

              {/* Gilt corner brackets */}
              {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r', 'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map((pos) => (
                <span key={pos} className={`absolute ${pos} w-7 h-7 border-[#8E6E36]`} />
              ))}

              {/* Heading */}
              <div className="text-center relative z-10">
                <img
                  src="/bgr.png"
                  alt=""
                  className="w-16 sm:w-20 mx-auto mb-5 mix-blend-multiply"
                  style={{ filter: 'sepia(0.75) saturate(1.1) brightness(0.7) contrast(1.2)' }}
                />
                <p className="font-engraved font-semibold uppercase tracking-[0.4em] pl-[0.4em] text-[11px] sm:text-xs text-[#5E431A]">
                  The Families
                </p>
                <p className="font-serif italic font-medium text-[17px] sm:text-xl text-[#33241A] mt-3 max-w-xs mx-auto leading-snug">
                  With hearts full of gratitude, two families become one
                </p>
                <div className="flex items-center justify-center gap-3 w-40 mx-auto mt-6 mb-10">
                  <span className="h-px flex-1 bg-gradient-to-l from-[#8E6E36] to-transparent" />
                  <span className="w-1.5 h-1.5 rotate-45 border border-[#8E6E36]" />
                  <span className="h-px flex-1 bg-gradient-to-r from-[#8E6E36] to-transparent" />
                </div>

                {/* Oval Scratch Reveal Card in a gilt oval */}
                <div className="mx-auto mb-12 w-52 h-[17rem] sm:w-64 sm:h-80 p-1.5 rounded-[50%] border border-[#A8833F]/70 shadow-[0_15px_30px_-10px_rgba(60,40,15,0.35)]">
                  <div className="w-full h-full">
                    <ScratchCard imageSrc="/x.jpg" text="Scratch to reveal" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-10 md:gap-8 justify-between text-center">

                {/* Groom's family */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 1.2 }}
                  className="flex-1 flex flex-col items-center"
                >
                  <p className="font-engraved font-semibold uppercase tracking-[0.3em] pl-[0.3em] text-[10px] text-[#5E431A]">The Groom</p>
                  <h3 className="font-script text-[3.2rem] sm:text-6xl leading-[1.15] text-[#140D08]">Crishan</h3>
                  <p className="font-serif italic font-medium text-base sm:text-lg text-[#33241A] mb-4">beloved son of</p>
                  <p className="font-engraved font-semibold text-[13px] sm:text-[15px] tracking-[0.06em] leading-relaxed text-[#140D08] max-w-[17rem]">
                    Mr. W.P. Joseph Nihal Laxman Fernando
                  </p>
                  <span className="font-script text-[2rem] leading-none text-[#5E431A] my-1.5">&amp;</span>
                  <p className="font-engraved font-semibold text-[13px] sm:text-[15px] tracking-[0.06em] text-[#140D08]">
                    Mrs. S. Lalitha
                  </p>
                </motion.div>

                {/* Ornamental separator: horizontal on phones, vertical on desktop */}
                <div className="flex md:hidden items-center justify-center gap-3 w-48 mx-auto">
                  <span className="h-px flex-1 bg-gradient-to-l from-[#8E6E36] to-transparent" />
                  <span className="font-script text-[2.6rem] text-[#5E431A] leading-none">&amp;</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#8E6E36] to-transparent" />
                </div>
                <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-[#8E6E36]/60 to-transparent" />

                {/* Bride's family */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 1.2 }}
                  className="flex-1 flex flex-col items-center"
                >
                  <p className="font-engraved font-semibold uppercase tracking-[0.3em] pl-[0.3em] text-[10px] text-[#5E431A]">The Bride</p>
                  <h3 className="font-script text-[3.2rem] sm:text-6xl leading-[1.15] text-[#140D08]">Ann</h3>
                  <p className="font-serif italic font-medium text-base sm:text-lg text-[#33241A] mb-4">beloved daughter of</p>
                  <p className="font-engraved font-semibold text-[13px] sm:text-[15px] tracking-[0.06em] leading-relaxed text-[#140D08]">
                    Mr. W.A. Suresh Kumara
                  </p>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

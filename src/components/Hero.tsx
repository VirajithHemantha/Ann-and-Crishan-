import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroProps {
  guestName?: string | null;
}

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.6, ease, delay },
});

// Hot-stamped gold foil
const foil: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(110deg, #4E3712 0%, #74561F 25%, #A07C3A 45%, #6A4D1B 65%, #957234 82%, #4E3712 100%)',
  backgroundSize: '250% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

// Letterpress: ink pressed into cotton paper
const letterpress: React.CSSProperties = {
  textShadow: '0 1px 0 rgba(255,255,255,0.6), 0 -0.5px 0 rgba(60,40,20,0.08)',
};

const INK = 'text-[#140D08]';
const SEPIA = 'text-[#33241A]';
const GOLD = 'text-[#5E431A]';

const Hairline: React.FC<{ delay: number; side: 'left' | 'right'; className?: string }> = ({
  delay,
  side,
  className = '',
}) => (
  <motion.span
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.6, ease, delay }}
    className={`h-px flex-1 ${side === 'left' ? 'origin-right bg-gradient-to-l' : 'origin-left bg-gradient-to-r'} from-[#74561F] to-transparent ${className}`}
  />
);

// A few slow-rising specks of gold leaf
const specks = [
  { left: '18%', size: 3, dur: 14, delay: 0 },
  { left: '32%', size: 2, dur: 18, delay: 4 },
  { left: '50%', size: 2.5, dur: 16, delay: 8 },
  { left: '66%', size: 2, dur: 20, delay: 2 },
  { left: '80%', size: 3, dur: 15, delay: 6 },
  { left: '42%', size: 1.5, dur: 22, delay: 11 },
  { left: '74%', size: 1.5, dur: 19, delay: 13 },
];

export const Hero: React.FC<HeroProps> = ({ guestName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 160]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.06]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden flex items-center justify-center bg-[#EFE6D6] sm:bg-[#16201A]"
    >
      {/* Desktop backdrop: hunter green with a candlelit vignette */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, #2B3A2E 0%, #1A251D 55%, #0F1611 100%)' }}
      />
      <div className="absolute inset-0 hidden sm:block opacity-[0.07] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/linen.png')]" />

      {/* The invitation card: full-bleed on phones, floating card on larger screens */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease }}
        style={{ y, scale }}
        className="relative h-full w-full sm:h-[92vh] sm:w-auto sm:aspect-[1536/2752] sm:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(198,170,118,0.25)]"
      >
        {/* Stretched to fit on phones so the whole gilded frame stays visible */}
        <img
          src="/Gemini_Generated_Image_34rdvr34rdvr34rd.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-fill"
        />

        {/* Warm glow behind the text block */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 40% at 50% 48%, rgba(255,251,242,0.7), transparent 72%)' }}
        />

        {/* Slow light sweep across the paper */}
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{
            background: 'linear-gradient(115deg, transparent 35%, rgba(255,248,230,0.6) 50%, transparent 65%)',
            backgroundSize: '300% 100%',
          }}
          animate={{ backgroundPosition: ['120% 0%', '-120% 0%'] }}
          transition={{ duration: 9, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
        />

        {/* Gold leaf specks */}
        <div className="absolute inset-[8%] pointer-events-none overflow-hidden">
          {specks.map((s, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full bg-[#C6A766]"
              style={{ left: s.left, width: s.size, height: s.size, boxShadow: '0 0 6px rgba(214,184,120,0.8)' }}
              animate={{ y: ['0%', '-1200%'], opacity: [0, 0.9, 0], x: [0, 8, -6, 0] }}
              transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Printed content, held inside the frame's inner panel */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-x-[12%] top-[9%] bottom-[15%] flex flex-col items-center justify-center text-center"
        >
          {/* Crest */}
          <motion.img
            {...fadeUp(0.5)}
            src="/bgr.png"
            alt="Ann and Crishan Crest"
            className="w-[min(26vw,13svh)] max-w-[7.5rem] sm:w-28 h-auto object-contain mix-blend-multiply"
            style={{ filter: 'sepia(0.75) saturate(1.1) hue-rotate(-8deg) brightness(0.7) contrast(1.2)' }}
          />

          <motion.p
            {...fadeUp(0.9)}
            style={letterpress}
            className={`font-engraved font-semibold uppercase tracking-[0.28em] text-[9.5px] sm:text-[11px] ${GOLD} mt-[2.4vh] sm:mt-5`}
          >
            Together with their families
          </motion.p>

          <motion.p
            {...fadeUp(1.1)}
            style={letterpress}
            className={`font-serif italic font-medium text-[16px] sm:text-[18px] ${SEPIA} leading-snug mt-[1vh] max-w-[16rem]`}
          >
            request the honour of your presence
            <br />
            at the marriage of
          </motion.p>

          {/* Names */}
          <div className="mt-[1.6vh] sm:mt-3 flex flex-col items-center w-full">
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2, ease, delay: 1.4 }}
              style={letterpress}
              className={`font-script ${INK} text-[min(17vw,8.5svh)] sm:text-[4.6rem] leading-[1.05] -mb-[1vh]`}
            >
              Ann
            </motion.h1>

            <div className="flex items-center justify-center gap-3 w-[62%] my-[0.4vh]">
              <Hairline delay={1.9} side="left" />
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{
                  opacity: { duration: 1.4, delay: 1.9 },
                  scale: { duration: 1.4, ease, delay: 1.9 },
                  backgroundPosition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 },
                }}
                style={foil}
                className="font-engraved font-semibold tracking-[0.3em] pl-[0.3em] text-[11px] sm:text-xs"
              >
                AND
              </motion.span>
              <Hairline delay={1.9} side="right" />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2, ease, delay: 1.7 }}
              style={letterpress}
              className={`font-script ${INK} text-[min(15vw,7.6svh)] sm:text-[4.2rem] leading-[1.15]`}
            >
              Crishan
            </motion.h1>
          </div>

          {/* Date plate */}
          <motion.div
            {...fadeUp(2.3)}
            style={letterpress}
            className="mt-[2.2vh] sm:mt-4 grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-[17rem]"
          >
            <span className={`font-engraved font-semibold uppercase tracking-[0.2em] text-[10px] sm:text-[11px] ${SEPIA} border-y border-[#8E6E36]/70 py-1.5`}>
              Saturday
            </span>
            <span className={`font-bodoni ${INK} text-[min(2.6rem,6svh)] sm:text-5xl leading-none px-4`}>12</span>
            <span className={`font-engraved font-semibold uppercase tracking-[0.2em] text-[10px] sm:text-[11px] ${SEPIA} border-y border-[#8E6E36]/70 py-1.5`}>
              December
            </span>
          </motion.div>
          <motion.p
            {...fadeUp(2.4)}
            style={foil}
            className="font-engraved font-semibold tracking-[0.55em] pl-[0.55em] text-[12px] sm:text-[13px] mt-[1vh]"
          >
            2026
          </motion.p>

          {/* Ceremony */}
          <motion.div {...fadeUp(2.7)} style={letterpress} className="mt-[2vh] sm:mt-4 flex flex-col items-center">
            <p className={`font-serif italic font-medium text-[15px] sm:text-[17px] ${SEPIA}`}>
              Holy Mass at eleven o&rsquo;clock in the morning
            </p>
            <p className={`font-engraved font-semibold uppercase tracking-[0.18em] text-[12px] sm:text-[14px] ${INK} mt-[0.8vh]`}>
              St. Joseph&rsquo;s Church
            </p>
            <p className={`font-serif italic font-semibold text-[14px] sm:text-[15px] ${GOLD}`}>Wennappuwa, Sri Lanka</p>
          </motion.div>

          {guestName && (
            <motion.div {...fadeUp(3.1)} className="mt-[1.8vh] sm:mt-4 flex flex-col items-center">
              <span className={`font-engraved font-semibold uppercase tracking-[0.28em] text-[8.5px] sm:text-[9px] ${GOLD}`}>
                Reserved for
              </span>
              <span className={`font-script text-[1.7rem] sm:text-3xl ${INK} leading-tight`}>{guestName}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Scroll cue inside the lower medallion */}
        <motion.div style={{ opacity }} className="absolute bottom-[9.5%] inset-x-0 flex justify-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6, duration: 1 }}>
            <motion.div
              className="w-px h-5 sm:h-6 bg-gradient-to-b from-[#8A6A33] to-transparent"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

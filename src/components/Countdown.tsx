import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

interface CountdownProps {
  targetDate: Date;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isPast: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full relative overflow-hidden bg-[#F3ECDF] py-24 sm:py-32 px-5">
      {/* Linen paper + faint photograph */}
      <div className="absolute inset-0 pointer-events-none">
        <img src="/00.jpg" alt="" className="w-full h-full object-cover" style={{ filter: 'sepia(0.35)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,247,239,0.82)_0%,rgba(243,236,223,0.6)_55%,rgba(236,226,208,0.35)_100%)]" />
        <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/linen.png')]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease }}
          src="/bgr.png"
          alt="Ann and Crishan Crest"
          className="w-24 sm:w-28 mx-auto mix-blend-multiply"
          style={{ filter: 'sepia(0.75) saturate(1.1) brightness(0.7) contrast(1.2)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease, delay: 0.2 }}
        >
          <p className="font-engraved font-semibold uppercase tracking-[0.42em] pl-[0.42em] text-[11px] sm:text-xs text-[#5E431A] mt-6">
            {timeLeft.isPast ? 'The day has arrived' : 'Counting the days'}
          </p>
          <h2 className="font-script text-[3.2rem] sm:text-7xl leading-[1.15] text-[#140D08] mt-1">
            {timeLeft.isPast ? 'Today is the Day' : 'Until we say I do'}
          </h2>
          <div className="flex items-center justify-center gap-3 w-40 mx-auto mt-4 mb-12 sm:mb-14">
            <span className="h-px flex-1 bg-gradient-to-l from-[#8E6E36] to-transparent" />
            <span className="w-1.5 h-1.5 rotate-45 border border-[#8E6E36]" />
            <span className="h-px flex-1 bg-gradient-to-r from-[#8E6E36] to-transparent" />
          </div>
        </motion.div>

        {timeLeft.isPast ? (
          <p className="font-serif italic font-medium text-2xl text-[#33241A]">Our beautiful beginning starts now.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
            className="grid grid-cols-4 gap-2.5 sm:gap-6 max-w-[22rem] sm:max-w-2xl mx-auto"
          >
            {units.map(({ label, value }) => (
              <div
                key={label}
                className="relative p-[3px] sm:p-1 rounded-t-[999px] border border-[#A8833F]/70 bg-[#FBF7EF] shadow-[0_14px_28px_-12px_rgba(60,40,15,0.35)]"
              >
                <div className="rounded-t-[999px] border border-[#A8833F]/35 pt-6 pb-3 sm:pt-10 sm:pb-5 flex flex-col items-center">
                  <div className="relative h-[2.4rem] sm:h-[4.2rem] overflow-hidden w-full">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={value}
                        initial={{ y: '-60%', opacity: 0, filter: 'blur(4px)' }}
                        animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: '60%', opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.6, ease }}
                        className="absolute inset-0 font-bodoni text-[2.1rem] sm:text-6xl leading-none text-[#140D08] flex items-center justify-center"
                      >
                        {value.toString().padStart(2, '0')}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="w-5 sm:w-8 h-px bg-[#8E6E36]/70 my-2 sm:my-3" />
                  <span className="font-engraved font-semibold uppercase tracking-[0.12em] sm:tracking-[0.25em] text-[7.5px] sm:text-[10px] text-[#5E431A]">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="font-serif italic font-medium text-lg sm:text-xl text-[#33241A] mt-10 sm:mt-12"
        >
          Saturday, the twelfth of December
          <span className="block font-engraved not-italic font-semibold tracking-[0.4em] pl-[0.4em] text-[11px] text-[#5E431A] mt-2">
            Two thousand twenty-six
          </span>
        </motion.p>
      </div>
    </div>
  );
};

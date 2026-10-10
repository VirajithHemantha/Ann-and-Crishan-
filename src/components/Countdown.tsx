import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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

  if (timeLeft.isPast) {
    return (
      <div className="w-full bg-[#1A2216] py-32 px-6 border-y border-[#C6AA76]/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl sm:text-7xl text-[#FAF8F5] mb-6">Today is the Day</h2>
          <p className="font-serif italic text-2xl text-[#C6AA76]">Our beautiful beginning starts now.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#1A2216] py-32 px-6 border-y border-[#C6AA76]/20 relative overflow-hidden flex flex-col justify-center min-h-[70vh]">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none z-0" />
      
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img src="/00.jpg" alt="" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
      </div>

      {/* Center Oval Mask (Optional if they wanted oval) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-30">
        <div className="w-64 h-96 sm:w-[400px] sm:h-[500px] rounded-[50%] bg-[#C6AA76] blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center w-full">
        {/* Custom Crest Logo */}
        <div className="mb-16 relative w-40 sm:w-48 mx-auto flex justify-center">
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            src="/bgr.png" 
            alt="Ann and Crishan Crest" 
            className="w-full h-auto object-contain opacity-90"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-12"
        >
          {Object.entries({
            Days: timeLeft.days,
            Hours: timeLeft.hours,
            Minutes: timeLeft.minutes,
            Seconds: timeLeft.seconds
          }).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-display text-5xl sm:text-7xl text-[#FAF8F5] mb-4 w-20 sm:w-32">
                {value.toString().padStart(2, '0')}
              </span>
              <div className="w-8 h-px bg-[#C6AA76]/50 mb-4" />
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C6AA76]">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

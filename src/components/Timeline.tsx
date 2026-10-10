import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, GlassWater } from 'lucide-react';

const events = [
  { 
    time: '11:00 AM', 
    title: 'Holy Mass', 
    icon: Sparkles, 
    location: "St. Joseph's Church",
    city: "Wennappuwa, Sri Lanka" 
  },
  { 
    time: '6:00 PM Onwards', 
    title: 'Homecoming Celebration', 
    icon: GlassWater, 
    location: "Avenara Gangaara Hotel",
    city: "Wennappuwa, Sri Lanka" 
  },
];

export const Timeline: React.FC = () => {
  return (
    <div className="w-full bg-[#FAF8F5] relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="font-sans uppercase tracking-[0.4em] text-xs text-[#2C3527] mb-4 block">
            The Celebration
          </span>
          <div className="w-8 h-px bg-[#C6AA76] mx-auto mt-6" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-px bg-gradient-to-b from-transparent via-[#C6AA76] to-transparent" 
          />

          <div className="space-y-24">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 relative ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Time (Mobile hidden behind icon, Desktop side) */}
                <div className={`hidden md:block flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="text-2xl font-serif italic text-[#C6AA76]">{event.time}</span>
                </div>

                {/* Icon Node */}
                <div className="relative z-10 w-12 h-12 shrink-0 ml-0 md:ml-0 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[#C6AA76]/30 animate-[ping_3s_ease-in-out_infinite]" />
                  <div className="relative w-full h-full rounded-full bg-[#FAF8F5] border border-[#C6AA76] flex items-center justify-center shadow-md">
                    <event.icon className="w-5 h-5 text-[#C6AA76]" strokeWidth={1} />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} pl-16 md:pl-0 -mt-12 md:mt-0`}>
                  <div className="md:hidden text-lg font-serif italic text-[#C6AA76] mb-2">{event.time}</div>
                  <h4 className="text-3xl font-display text-[#3A2B24] mb-3">{event.title}</h4>
                  <div className="text-[#2C3527] font-sans text-sm tracking-wider uppercase font-light space-y-1">
                    <p>{event.location}</p>
                    <p className="text-xs text-[#2C3527]/70">{event.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

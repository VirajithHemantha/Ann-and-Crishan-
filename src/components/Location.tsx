import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export const Location: React.FC = () => {
  const venues = [
    {
      numeral: 'I',
      title: "Holy Mass",
      name: "St. Joseph's Church",
      town: "Wennappuwa",
      detail: "Eleven o'clock in the morning",
      mapUrl: "https://maps.app.goo.gl/search/St.+Joseph's+Church,+Wennappuwa",
      image: "/12345.jpg",
    },
    {
      numeral: 'II',
      title: "Homecoming",
      name: "Avenara Gangaara Hotel",
      town: "Wennappuwa",
      detail: "Celebration to follow",
      mapUrl: "https://maps.google.com/maps?q=Avenara+Gangaara+Hotel,+Wennappuwa",
      image: "/Gemini_Generated_Image_iezaikiezaikieza.jpg",
    }
  ];

  return (
    <div className="w-full relative overflow-hidden bg-[#141C15] py-20 sm:py-28 px-6">
      {/* Candlelit vignette + linen */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 30%, #243127 0%, #141C15 60%, #0E140F 100%)' }} />
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]" />

      <div className="relative max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="font-engraved font-semibold uppercase tracking-[0.42em] pl-[0.42em] text-[11px] sm:text-xs text-[#C6AA76]">
            The Venues
          </p>
          <h2 className="font-script text-[3.2rem] sm:text-7xl leading-[1.15] text-[#F3E9D2] mt-1">
            Where we celebrate
          </h2>
          <div className="flex items-center justify-center gap-3 w-40 mx-auto mt-4">
            <span className="h-px flex-1 bg-gradient-to-l from-[#C6AA76] to-transparent" />
            <span className="w-1.5 h-1.5 rotate-45 border border-[#C6AA76]" />
            <span className="h-px flex-1 bg-gradient-to-r from-[#C6AA76] to-transparent" />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">
          {venues.map((venue, index) => (
            <React.Fragment key={venue.title}>
              {/* Ornamental separator between venues on phones */}
              {index > 0 && (
                <div className="lg:hidden flex items-center justify-center gap-3 w-44 mx-auto -my-4">
                  <span className="h-px flex-1 bg-gradient-to-l from-[#C6AA76]/70 to-transparent" />
                  <span className="font-script text-3xl text-[#C6AA76] leading-none">&amp;</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#C6AA76]/70 to-transparent" />
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, ease, delay: index * 0.15 }}
                className="flex-1 flex flex-col items-center text-center group"
              >
                {/* Arched gilt frame */}
                <div className="relative w-[min(78vw,20rem)] p-[6px] rounded-t-[999px] border border-[#C6AA76]/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-[999px] border border-[#C6AA76]/40">
                    <motion.img
                      src={venue.image}
                      alt={venue.name}
                      initial={{ scale: 1.15 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 6, ease: 'easeOut' }}
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                      style={{ filter: 'sepia(0.55) saturate(0.9) brightness(0.9) contrast(1.05)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-[#F3E9D2]/10 pointer-events-none" />
                    {/* Curtain reveal */}
                    <motion.div
                      initial={{ scaleY: 1 }}
                      whileInView={{ scaleY: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 1.8, ease, delay: 0.2 + index * 0.15 }}
                      className="absolute inset-0 origin-top bg-[#141C15]"
                    />
                  </div>

                  {/* Numeral medallion */}
                  <div className="absolute left-1/2 -bottom-5 -translate-x-1/2 w-10 h-10 rounded-full bg-[#141C15] border border-[#C6AA76] flex items-center justify-center shadow-[0_6px_14px_rgba(0,0,0,0.5)]">
                    <span className="font-engraved font-semibold text-[13px] text-[#E6D3A3]">{venue.numeral}</span>
                  </div>
                </div>

                <p className="font-engraved font-semibold uppercase tracking-[0.38em] pl-[0.38em] text-[11px] text-[#C6AA76] mt-10">
                  {venue.title}
                </p>
                <h3 className="font-script text-[2.6rem] sm:text-5xl leading-[1.15] text-[#F6EEDC] mt-1">
                  {venue.name}
                </h3>
                <p className="font-engraved font-semibold uppercase tracking-[0.3em] pl-[0.3em] text-[10px] text-[#E6D3A3]/90 mt-1">
                  {venue.town}
                </p>
                <p className="font-serif italic font-medium text-[17px] text-[#E9DFCB] mt-3">
                  {venue.detail}
                </p>

                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-[#C6AA76]/70 text-[#E6D3A3] font-engraved font-semibold text-[10px] uppercase tracking-[0.3em] rounded-[2px] hover:bg-[#C6AA76] hover:text-[#141C15] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} />
                  View on Map
                </a>
              </motion.div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  );
};

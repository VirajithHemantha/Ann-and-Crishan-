import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export const Location: React.FC = () => {
  const venues = [
    {
      title: "Holy Mass",
      name: "St. Joseph's Church, Wennappuwa",
      mapUrl: "https://maps.app.goo.gl/search/St.+Joseph's+Church,+Wennappuwa",
      image: "/12345.jpg",
    },
    {
      title: "Homecoming",
      name: "Avenara Gangaara Hotel, Wennappuwa",
      mapUrl: "https://maps.google.com/maps?q=Avenara+Gangaara+Hotel,+Wennappuwa",
      image: "/Gemini_Generated_Image_iezaikiezaikieza.jpg",
    }
  ];

  return (
    <div className="w-full bg-[#1A2216] relative py-20 sm:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-20">
          <span className="font-sans uppercase tracking-[0.4em] text-xs text-[#E6DFD3] mb-4 block opacity-80">
            The Venues
          </span>
          <div className="w-12 h-px bg-[#C6AA76] mx-auto opacity-50" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          {venues.map((venue, index) => (
            <motion.div 
              key={venue.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="flex-1 group"
            >
              <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-sm mb-8 bg-[#2C3527] border border-[#C6AA76]/30 flex flex-col items-center justify-center p-6 group-hover:border-[#C6AA76]/50 transition-colors">
                {venue.image ? (
                  <>
                    <img 
                      src={venue.image} 
                      alt={venue.title} 
                      className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-50 transition-transform duration-[2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2216]/90 via-[#1A2216]/60 to-[#1A2216]/30 pointer-events-none" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
                )}
                
                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center text-center mt-auto pt-10 w-full">
                  <MapPin className="w-6 h-6 text-[#C6AA76] mb-4 opacity-80" strokeWidth={1.5} />
                  <h4 className="font-display text-3xl text-[#FAF8F5] mb-3 drop-shadow-md">{venue.title}</h4>
                  <div className="w-8 h-px bg-[#C6AA76]/50 mb-6" />
                  <p className="font-sans text-[10px] uppercase tracking-widest text-[#E6DFD3] leading-relaxed drop-shadow-md">{venue.name}</p>
                  
                  <a 
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-[#C6AA76] border-b border-[#C6AA76]/30 pb-1 hover:text-[#FAF8F5] hover:border-[#FAF8F5] transition-all mt-8 opacity-80 hover:opacity-100"
                  >
                    View Location
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

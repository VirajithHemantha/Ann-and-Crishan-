import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { submitToSheet } from '../lib/sheets';

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    guests: '1',
    dietaryNotes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await submitToSheet('RSVP', {
        name: formData.fullName,
        guests: formData.guests,
        dietary: formData.dietaryNotes,
        attendance: 'Yes',
      });

      setStatus('success');
      setFormData({ fullName: '', guests: '1', dietaryNotes: '' });
    } catch (error) {
      console.error('Error sending RSVP: ', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full bg-[#E6DFD3] py-32 px-4 relative overflow-hidden flex items-center justify-center">
      {/* Cinematic Imagery / Texture */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000&h=1000')] bg-cover bg-center opacity-30 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#E6DFD3] via-[#E6DFD3]/80 to-[#E6DFD3]/20" />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-[#FAF8F5] p-10 sm:p-16 max-w-2xl w-full rounded-sm border border-[#C6AA76]/30 shadow-[0_30px_60px_rgba(58,43,36,0.1)] text-center"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#3A2B24] mb-4 block">RSVP</span>
        <h2 className="font-display text-4xl sm:text-5xl text-[#1A2216] mb-6">Reserve Your Seat</h2>
        
        <div className="w-12 h-px bg-[#C6AA76] mx-auto mb-8" />
        
        <p className="font-serif italic text-lg text-[#3A2B24] mb-10">
          Your presence means the world to us. Please kindly let us know if you will be able to join our celebration.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12"
            >
              <h3 className="text-3xl font-display text-[#1A2216] mb-4">With Gratitude</h3>
              <p className="font-serif italic text-lg text-[#3A2B24] mb-8">
                Your response has been warmly received. We cannot wait to celebrate with you!
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-8 py-3 border border-[#C6AA76] text-[#C6AA76] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#C6AA76]/10 transition-colors"
              >
                Update Response
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 text-left"
            >
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#3A2B24] mb-2 text-center">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="E.g., John & Jane Doe"
                  className="w-full bg-transparent border-b border-[#C6AA76]/50 px-4 py-3 focus:outline-none focus:border-[#C6AA76] font-serif italic text-xl text-center text-[#1A2216] placeholder:text-[#3A2B24]/40 transition-colors"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#3A2B24] mb-2 text-center">Number of Guests</label>
                <select
                  className="w-full bg-transparent border-b border-[#C6AA76]/50 px-4 py-3 focus:outline-none focus:border-[#C6AA76] font-serif italic text-xl text-center text-[#1A2216] cursor-pointer appearance-none text-center-last"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  style={{ textAlignLast: 'center' }}
                >
                  <option value="1">Just Me (1 Guest)</option>
                  <option value="2">We are coming! (2 Guests)</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#3A2B24] mb-2 text-center">Dietary Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="Any allergies..."
                  className="w-full bg-transparent border-b border-[#C6AA76]/50 px-4 py-3 focus:outline-none focus:border-[#C6AA76] font-serif italic text-xl text-center text-[#1A2216] placeholder:text-[#3A2B24]/40 transition-colors"
                  value={formData.dietaryNotes}
                  onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                />
              </div>

              <div className="pt-8 flex justify-center">
                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="bg-[#1A2216] text-[#FAF8F5] px-12 py-4 font-sans text-xs uppercase tracking-[0.3em] hover:bg-[#2C3527] transition-colors flex items-center justify-center min-w-[200px]"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Confirm Attendance'
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-16 pt-8 border-t border-[#C6AA76]/30">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#3A2B24] mb-4">RSVP Contacts</p>
          <div className="font-serif text-lg text-[#1A2216] space-y-2">
            <p>W.A.S. Kumara - 0777 538717</p>
            <p>W.P.C. Lakshitha - 071 9319741</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

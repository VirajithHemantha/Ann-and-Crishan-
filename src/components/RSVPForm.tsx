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

  const label = 'block font-engraved font-semibold uppercase tracking-[0.28em] text-[10px] text-[#5E431A] mb-1 text-center';
  const field = 'w-full bg-transparent border-b border-[#A8833F]/60 px-4 py-3 focus:outline-none focus:border-[#5E431A] font-serif italic font-medium text-xl text-center text-[#140D08] placeholder:text-[#5E4A39]/50 transition-colors';

  return (
    <div className="w-full relative overflow-hidden bg-[#141C15] py-20 sm:py-28 px-4 flex items-center justify-center">
      {/* Background photograph, washed in candlelit forest green */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000&h=1000')] bg-cover bg-center opacity-45 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 35%, rgba(36,49,39,0.55) 0%, rgba(20,28,21,0.8) 60%, rgba(14,20,15,0.92) 100%)' }} />
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl bg-[#FBF7EF] p-2.5 sm:p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
      >
        <div className="border border-[#A8833F]/70 p-1.5">
          <div className="relative border border-[#A8833F]/35 px-6 py-12 sm:px-14 sm:py-16 text-center">
            {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r', 'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map((pos) => (
              <span key={pos} className={`absolute ${pos} w-7 h-7 border-[#8E6E36]`} />
            ))}

            <p className="font-engraved font-semibold uppercase tracking-[0.45em] pl-[0.45em] text-[11px] text-[#5E431A]">R · S · V · P</p>
            <h2 className="font-script text-[3rem] sm:text-6xl leading-[1.15] text-[#140D08] mt-1">Kindly Reply</h2>
            <div className="flex items-center justify-center gap-3 w-40 mx-auto mt-3 mb-6">
              <span className="h-px flex-1 bg-gradient-to-l from-[#8E6E36] to-transparent" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[#8E6E36]" />
              <span className="h-px flex-1 bg-gradient-to-r from-[#8E6E36] to-transparent" />
            </div>
            <p className="font-serif italic font-medium text-[17px] sm:text-lg text-[#33241A] mb-10 max-w-md mx-auto leading-relaxed">
              Your presence would be the greatest gift. Kindly let us know if you will be able to join our celebration.
            </p>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-8"
                >
                  <h3 className="font-script text-5xl text-[#140D08] mb-3">With Gratitude</h3>
                  <p className="font-serif italic font-medium text-lg text-[#33241A] mb-8">
                    Your response has been warmly received. We cannot wait to celebrate with you.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 border border-[#8E6E36] text-[#5E431A] font-engraved font-semibold text-[10px] tracking-[0.3em] uppercase hover:bg-[#8E6E36]/10 transition-colors"
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
                  className="space-y-8 text-left"
                >
                  <div>
                    <label className={label}>Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Mr. & Mrs. Perera"
                      className={field}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={label}>Number of Guests</label>
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {['1', '2', '3', '4'].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setFormData({ ...formData, guests: n })}
                          className={`py-2.5 border font-bodoni text-xl transition-colors ${
                            formData.guests === n
                              ? 'bg-[#1E2A20] border-[#1E2A20] text-[#F3E9D2]'
                              : 'border-[#A8833F]/60 text-[#140D08] hover:bg-[#A8833F]/10'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={label}>Dietary Notes (Optional)</label>
                    <input
                      type="text"
                      placeholder="Any allergies..."
                      className={field}
                      value={formData.dietaryNotes}
                      onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                    />
                  </div>

                  <div className="pt-4 flex justify-center">
                    <button
                      disabled={status === 'loading'}
                      type="submit"
                      className="bg-[#1E2A20] text-[#F3E9D2] border border-[#A8833F] outline outline-1 outline-offset-[3px] outline-[#A8833F]/50 px-10 py-4 font-engraved font-semibold text-[11px] uppercase tracking-[0.3em] hover:bg-[#141C15] transition-colors flex items-center justify-center min-w-[220px]"
                    >
                      {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Attendance'}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="text-center font-serif italic text-[#7A2E1F]">Something went wrong. Please try again.</p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-14 pt-8 border-t border-[#A8833F]/40">
              <p className="font-engraved font-semibold uppercase tracking-[0.3em] text-[10px] text-[#5E431A] mb-4">RSVP Contacts</p>
              <div className="space-y-3">
                {[
                  { name: 'W.A.S. Kumara', phone: '0777 538717' },
                  { name: 'W.P.C. Lakshitha', phone: '071 9319741' },
                ].map((c) => (
                  <a key={c.phone} href={`tel:${c.phone.replace(/\s/g, '')}`} className="block group">
                    <span className="font-serif italic font-medium text-lg text-[#33241A]">{c.name}</span>
                    <span className="block font-engraved font-semibold tracking-[0.18em] text-[13px] text-[#140D08] group-hover:text-[#8E6E36] transition-colors">{c.phone}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

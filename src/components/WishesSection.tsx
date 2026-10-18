import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2 } from 'lucide-react';
import { fetchWishes, submitToSheet } from '../lib/sheets';

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
}

const getRelativeTime = (date: Date) => {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchWishes()
      .then((rows) =>
        setWishes(rows.map((row, i) => ({
          id: `${row.createdAt}-${i}`,
          name: row.name,
          message: row.message,
          createdAt: new Date(row.createdAt),
        })))
      )
      .catch((error) => console.error('Error loading wishes: ', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setIsSubmitting(true);

    try {
      await submitToSheet('Wishes', {
        name: formData.name,
        message: formData.message,
      });

      const newWish: Wish = {
        id: Date.now().toString(),
        name: formData.name,
        message: formData.message,
        createdAt: new Date(),
      };
      
      // Prepend the new wish to the list
      setWishes(prev => [newWish, ...prev]);
      setFormData({ name: '', message: '' });
    } catch (error) {
      console.error('Error submitting wish: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const label = 'block font-engraved font-semibold uppercase tracking-[0.28em] text-[10px] text-[#5E431A] mb-1 text-center';
  const field = 'w-full bg-transparent border-b border-[#A8833F]/60 px-4 py-3 focus:outline-none focus:border-[#5E431A] font-serif italic font-medium text-xl text-center text-[#140D08] placeholder:text-[#5E4A39]/50 transition-colors';

  return (
    <div className="relative w-full overflow-hidden bg-[#F3ECDF] py-20 sm:py-28 px-5">
      {/* Linen paper */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(251,247,239,0.8)_0%,rgba(236,226,208,0.95)_100%)]" />
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]" />

      <div className="relative max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-engraved font-semibold uppercase tracking-[0.42em] pl-[0.42em] text-[11px] sm:text-xs text-[#5E431A]">
            The Guestbook
          </p>
          <h2 className="font-script text-[3.2rem] sm:text-7xl leading-[1.15] text-[#140D08] mt-1">
            Blessings &amp; Wishes
          </h2>
          <div className="flex items-center justify-center gap-3 w-40 mx-auto mt-3 mb-5">
            <span className="h-px flex-1 bg-gradient-to-l from-[#8E6E36] to-transparent" />
            <span className="w-1.5 h-1.5 rotate-45 border border-[#8E6E36]" />
            <span className="h-px flex-1 bg-gradient-to-r from-[#8E6E36] to-transparent" />
          </div>
          <p className="font-serif italic font-medium text-[17px] sm:text-lg text-[#33241A] max-w-md mx-auto leading-relaxed">
            Leave a little note or a piece of advice for our journey ahead.
          </p>
        </motion.div>

        {/* Writing desk card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FBF7EF] p-2.5 sm:p-3 shadow-[0_30px_60px_-20px_rgba(60,40,15,0.35)] mb-14"
        >
          <div className="border border-[#A8833F]/70 p-1.5">
            <form onSubmit={handleSubmit} className="border border-[#A8833F]/35 px-6 py-10 sm:px-12 sm:py-12 space-y-8">
              <div>
                <label className={label}>Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="Aunty Maria"
                  className={field}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className={label}>Your Message</label>
                <textarea
                  required
                  placeholder="Wishing you a lifetime of happiness..."
                  className={`${field} h-28 resize-none leading-relaxed`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="bg-[#1E2A20] text-[#F3E9D2] border border-[#A8833F] outline outline-1 outline-offset-[3px] outline-[#A8833F]/50 px-10 py-4 font-engraved font-semibold text-[11px] uppercase tracking-[0.3em] hover:bg-[#141C15] transition-colors flex items-center justify-center gap-3 min-w-[220px] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#C6AA76]" strokeWidth={1.75} />
                      Share Blessing
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Wishes as handwritten notes */}
        <div className="space-y-5 max-h-[800px] overflow-y-auto px-1 pb-2 scrollbar-thin">
          <AnimatePresence initial={false}>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-[#FBF7EF] border border-[#A8833F]/40 px-6 py-7 sm:px-10 sm:py-8 text-center shadow-[0_10px_24px_-14px_rgba(60,40,15,0.35)]"
              >
                <span className="absolute top-1 left-4 font-bodoni text-6xl leading-none text-[#A8833F]/35 select-none">&ldquo;</span>
                <p className="font-serif italic font-medium text-lg text-[#33241A] leading-relaxed">
                  {wish.message}
                </p>
                <div className="flex items-center justify-center gap-3 w-24 mx-auto my-3">
                  <span className="h-px flex-1 bg-[#A8833F]/50" />
                  <span className="w-1 h-1 rotate-45 bg-[#8E6E36]" />
                  <span className="h-px flex-1 bg-[#A8833F]/50" />
                </div>
                <h4 className="font-script text-3xl leading-tight text-[#140D08]">{wish.name}</h4>
                <span className="font-engraved font-semibold uppercase tracking-[0.25em] text-[9px] text-[#5E431A]">
                  {wish.createdAt ? getRelativeTime(wish.createdAt) : 'just now'}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

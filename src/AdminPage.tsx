import React, { useState } from 'react';
import { Copy, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { PREFIXES, Prefix, getDisplayName, buildInviteLink, buildInviteMessage } from './lib/invite';

const label = 'block text-xs font-medium text-[#1A2216] mb-2 tracking-wide uppercase';
const field =
  'w-full px-4 py-3 rounded-md border border-[#C6AA76]/50 focus:ring-1 focus:ring-[#C6AA76] focus:border-[#C6AA76] outline-none bg-white text-[#1A2216] text-sm';
const sectionTitle = 'text-xs text-[#C6AA76] mb-3 uppercase tracking-widest font-semibold';

export function AdminPage() {
  const [prefix, setPrefix] = useState<Prefix>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedData, setGeneratedData] = useState<{ link: string; message: string; displayName: string } | null>(null);

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!guestName.trim()) return;

    const displayName = getDisplayName(prefix, guestName);
    const link = buildInviteLink(displayName);
    setGeneratedData({ link, message: buildInviteMessage(displayName, link), displayName });
  };

  const copy = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('Could not copy. Please copy it manually.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1A2216] py-12 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
      <Toaster position="top-center" />
      <div className="w-full max-w-lg bg-[#FAF8F5] rounded-xl shadow-2xl overflow-hidden border border-[#C6AA76]/30">
        <div className="px-6 py-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display text-[#1A2216] mb-2">Invitation Generator</h2>
            <p className="text-[#C6AA76] font-sans text-xs uppercase tracking-[0.2em]">Generate personalized links & messages</p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label htmlFor="prefix" className={label}>
                  Prefix
                </label>
                <select id="prefix" value={prefix} onChange={(e) => setPrefix(e.target.value as Prefix)} className={field}>
                  {PREFIXES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="guestName" className={label}>
                  Guest Name
                </label>
                <input
                  type="text"
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Sanjaya"
                  className={field}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!guestName.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#1A2216] text-[#FAF8F5] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#2C3527] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LinkIcon className="w-4 h-4" />
              Generate Link
            </button>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => generatedData && copy(generatedData.link, 'Link copied!')}
                disabled={!generatedData}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-[#C6AA76] text-[#9A7F4C] rounded-md hover:bg-[#C6AA76]/10 transition-colors text-xs tracking-widest uppercase font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <Copy className="w-4 h-4" />
                Copy Link Only
              </button>
              <button
                type="button"
                onClick={() => generatedData && copy(generatedData.message, 'Message copied!')}
                disabled={!generatedData}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#C6AA76] text-white rounded-md hover:bg-[#B09460] transition-colors text-xs tracking-widest uppercase font-medium shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#C6AA76]"
              >
                <MessageCircle className="w-4 h-4" />
                Copy Full Message
              </button>
            </div>
          </form>

          {generatedData && (
            <div className="mt-8 space-y-4">
              <div className="p-5 bg-white border border-[#C6AA76]/30 rounded-md shadow-sm">
                <p className={sectionTitle}>Greeting</p>
                <p className="text-[#1A2216] font-serif text-lg italic">Dear {generatedData.displayName} ❤️</p>
              </div>

              <div className="p-5 bg-white border border-[#C6AA76]/30 rounded-md shadow-sm">
                <p className={sectionTitle}>Invitation Link</p>
                <a
                  href={generatedData.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-[#1A2216] underline decoration-[#C6AA76] underline-offset-4 break-all"
                >
                  {generatedData.link}
                </a>
              </div>

              <div className="p-5 bg-white border border-[#C6AA76]/30 rounded-md shadow-sm">
                <p className={sectionTitle}>Full Message</p>
                <p className="text-sm text-[#1A2216] whitespace-pre-wrap break-words leading-relaxed">{generatedData.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

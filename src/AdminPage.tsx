import React, { useState } from 'react';
import { Copy, Link as LinkIcon, CheckCircle, MessageCircle } from 'lucide-react';

const PREFIXES = [
  'Mr.',
  'Mrs.',
  'Miss',
  'Mr. & Mrs.',
  'Family',
  'Dear'
];

export function AdminPage() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedData, setGeneratedData] = useState<{ link: string, message: string, displayName: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const getDisplayName = (p: string, name: string) => {
    const trimmed = name.trim();
    if (p === 'Family') {
      return `${trimmed} and Family`;
    }
    if (p === 'Dear') {
      return trimmed;
    }
    return `${p} ${trimmed}`;
  };

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    
    const displayName = getDisplayName(prefix, guestName);
    const baseUrl = window.location.origin;
    
    // Safely URL encode the display name for the path
    const link = `${baseUrl}/${encodeURIComponent(displayName)}`;
    
    const message = `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Crishan & Ann`;

    setGeneratedData({ link, message, displayName });
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const handleCopyLink = async () => {
    if (!generatedData) return;
    try {
      await navigator.clipboard.writeText(generatedData.link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const handleCopyMessage = async () => {
    if (!generatedData) return;
    try {
      await navigator.clipboard.writeText(generatedData.message);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy message: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A2216] py-12 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
      <div className="w-full max-w-lg bg-[#FAF8F5] rounded-xl shadow-2xl overflow-hidden border border-[#C6AA76]/30">
        <div className="px-6 py-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display text-[#1A2216] mb-2">Invitation Generator</h2>
            <p className="text-[#C6AA76] font-sans text-xs uppercase tracking-[0.2em]">Generate personalized links & messages</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label htmlFor="prefix" className="block text-xs font-medium text-[#1A2216] mb-2 tracking-wide uppercase">
                  Prefix
                </label>
                <select
                  id="prefix"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-[#C6AA76]/50 focus:ring-1 focus:ring-[#C6AA76] focus:border-[#C6AA76] outline-none bg-white text-[#1A2216] text-sm"
                >
                  {PREFIXES.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="guestName" className="block text-xs font-medium text-[#1A2216] mb-2 tracking-wide uppercase">
                  Guest Name
                </label>
                <input
                  type="text"
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Sanjaya"
                  className="w-full px-4 py-3 rounded-md border border-[#C6AA76]/50 focus:ring-1 focus:ring-[#C6AA76] focus:border-[#C6AA76] outline-none bg-white text-[#1A2216] text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!guestName.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#1A2216] text-[#FAF8F5] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#2C3527] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <LinkIcon className="w-4 h-4" />
              Generate Link & Message
            </button>

            {generatedData && (
              <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="p-5 bg-white border border-[#C6AA76]/30 rounded-md shadow-sm">
                  <p className="text-xs text-[#C6AA76] mb-3 uppercase tracking-widest font-semibold">Preview Greeting</p>
                  <p className="text-[#1A2216] font-serif text-lg italic">Dear {generatedData.displayName} ❤️</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-[#C6AA76] text-[#C6AA76] rounded-md hover:bg-[#C6AA76]/10 transition-colors text-xs tracking-widest uppercase font-medium"
                  >
                    {copiedLink ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedLink ? 'Link Copied!' : 'Copy Link Only'}
                  </button>
                  <button
                    onClick={handleCopyMessage}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#C6AA76] text-white rounded-md hover:bg-[#B09460] transition-colors text-xs tracking-widest uppercase font-medium shadow-sm"
                  >
                    {copiedMessage ? <CheckCircle className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                    {copiedMessage ? 'Message Copied!' : 'Copy Full Message'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

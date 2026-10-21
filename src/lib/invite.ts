import { WEDDING } from '../config/wedding';

export const PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'] as const;
export type Prefix = (typeof PREFIXES)[number];

// "Dear" is a message-style option: the greeting already starts with "Dear",
// so it adds nothing to the display name.
export function getDisplayName(prefix: Prefix, name: string): string {
  const trimmed = name.trim().replace(/\s+/g, ' ');
  if (prefix === 'Family') return `${trimmed} and Family`;
  if (prefix === 'Dear') return trimmed;
  return `${prefix} ${trimmed}`;
}

export function buildInviteLink(displayName: string, baseUrl = window.location.origin): string {
  return `${baseUrl}/${encodeURIComponent(displayName)}`;
}

export function buildInviteMessage(displayName: string, link: string): string {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${WEDDING.groomName} & ${WEDDING.brideName}`;
}

// Reads the guest display name from the URL path, e.g. "/Mr.%20Sanjaya" -> "Mr. Sanjaya".
export function getGuestNameFromPath(pathname = window.location.pathname): string | null {
  const segment = pathname.replace(/^\/+|\/+$/g, '');
  if (!segment || segment.toLowerCase() === 'admin') return null;
  try {
    return decodeURIComponent(segment).trim() || null;
  } catch {
    return null;
  }
}

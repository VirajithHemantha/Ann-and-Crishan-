import { getGuestNameFromPath } from './invite';

// Web App URL from Apps Script (Deploy > Manage deployments).
export const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyptuF7WUUGZG0uHVNgqP1k3JqSi52QCjUHHQMnLPQ_nDKtzRxAGwWMcUFsaAACm421dg/exec';

export const submitToSheet = async (sheet: 'RSVP' | 'Wishes', data: Record<string, string>) => {
  // URL-encoded body is a "simple" request, so it avoids CORS preflight and
  // Apps Script parses it straight into e.parameter.
  const payload = new URLSearchParams({
    sheet,
    invitedAs: getGuestNameFromPath() ?? '',
    ...data,
  });

  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: payload.toString(),
  });
};

export interface SheetWish {
  name: string;
  message: string;
  createdAt: string;
}

export const fetchWishes = async (): Promise<SheetWish[]> => {
  const res = await fetch(`${SCRIPT_URL}?sheet=Wishes`);
  const json = await res.json();
  return json.ok && Array.isArray(json.wishes) ? json.wishes : [];
};

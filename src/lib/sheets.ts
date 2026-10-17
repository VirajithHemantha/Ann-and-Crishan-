export const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz_E-vPb34_5Cpbf9E-aoTbkXz55tqamMxDnlf4fh1fs0INjlpnCGXrVKqyEy-I__sOiA/exec';

export const submitToSheet = async (sheet: 'RSVP' | 'Wishes', data: Record<string, string>) => {
  const payload = new FormData();
  payload.append('sheet', sheet);
  Object.entries(data).forEach(([key, value]) => payload.append(key, value));

  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: payload,
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

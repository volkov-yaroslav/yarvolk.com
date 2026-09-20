import type { APIRoute } from 'astro';
import { getFaviconSet } from '@lib/favicons.mjs';

export const GET: APIRoute = async () => {
  const icon = (await getFaviconSet()).find(icon => icon.rel === 'apple-touch-icon')!;
  return new Response(new Uint8Array(icon.data), { headers: { 'Content-Type': icon.type } });
};

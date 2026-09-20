import type { APIRoute } from 'astro';
import { getFaviconSet } from '@lib/favicons.mjs';

export async function getStaticPaths() {
  return (await getFaviconSet()).map(icon => ({ params: { filename: icon.filename } }));
}

export const GET: APIRoute = async ({ params }) => {
  const icon = (await getFaviconSet()).find(icon => icon.filename === params.filename);
  if (!icon) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(icon.data), { headers: { 'Content-Type': icon.type } });
};

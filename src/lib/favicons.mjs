import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const tabSizes = [16, 32, 48];
let cachedVersion;
let cachedIcons;

// ICO directory entries point to PNG frames, one for each tab pixel density.
function createIco(frames) {
  const directory = Buffer.alloc(6 + frames.length * 16);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(frames.length, 4);
  let offset = directory.length;
  frames.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    directory[entry] = size;
    directory[entry + 1] = size;
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(data.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([directory, ...frames.map(frame => frame.data)]);
}

export async function createFaviconSet(source) {
  const metadata = await sharp(source).metadata();
  if (metadata.width !== metadata.height || metadata.width < 180) {
    throw new Error('The favicon source must be square and at least 180x180 pixels.');
  }

  const version = createHash('sha256').update(source).digest('hex').slice(0, 12);
  const icons = [];
  for (const size of [...tabSizes, 180]) {
    const apple = size === 180;
    const data = await sharp(source).resize(size, size).flatten({ background: '#000000' }).png().toBuffer();
    icons.push({
      filename: `${apple ? 'apple-touch-icon' : `favicon-${size}x${size}`}-${version}.png`,
      rel: apple ? 'apple-touch-icon' : 'icon',
      type: 'image/png',
      sizes: `${size}x${size}`,
      size,
      data,
    });
  }
  icons.unshift({
    filename: `favicon-${version}.ico`,
    rel: 'icon',
    type: 'image/x-icon',
    sizes: tabSizes.map(size => `${size}x${size}`).join(' '),
    data: createIco(icons.filter(icon => tabSizes.includes(icon.size))),
  });
  return icons;
}

export async function getFaviconSet() {
  const config = JSON.parse(await readFile(resolve('src/config/site.config.json'), 'utf8'));
  const source = await readFile(resolve('public', `.${config.favicon}`));
  const version = createHash('sha256').update(source).digest('hex');
  if (version !== cachedVersion) {
    cachedVersion = version;
    cachedIcons = createFaviconSet(source);
  }
  return cachedIcons;
}

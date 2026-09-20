import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import sharp from 'sharp';
import { createFaviconSet } from '../src/lib/favicons.mjs';

const source = await readFile(new URL('../public/images/favicon.png', import.meta.url));

test('generates correctly sized, opaque PNGs from the current artwork', async () => {
  const icons = await createFaviconSet(source);
  assert.equal(icons.length, 5);
  for (const icon of icons.filter(icon => icon.type === 'image/png')) {
    const metadata = await sharp(icon.data).metadata();
    assert.equal(metadata.width, icon.size);
    assert.equal(metadata.height, icon.size);
    assert.equal(metadata.hasAlpha, false);
    assert.equal(icon.sizes, `${icon.size}x${icon.size}`);
  }
  assert.equal(icons.find(icon => icon.rel === 'apple-touch-icon').size, 180);
});

test('ICO contains valid 16, 32, and 48 pixel PNG frames', async () => {
  const icons = await createFaviconSet(source);
  const ico = icons.find(icon => icon.type === 'image/x-icon').data;
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  let nextOffset = 54;
  for (const [index, size] of [16, 32, 48].entries()) {
    const entry = 6 + index * 16;
    assert.equal(ico[entry], size);
    assert.equal(ico[entry + 1], size);
    const length = ico.readUInt32LE(entry + 8);
    const offset = ico.readUInt32LE(entry + 12);
    assert.equal(offset, nextOffset);
    const frame = ico.subarray(offset, offset + length);
    const metadata = await sharp(frame).metadata();
    assert.equal(metadata.width, size);
    assert.equal(metadata.height, size);
    assert.deepEqual(frame, icons.find(icon => icon.size === size).data);
    nextOffset += length;
  }
  assert.equal(nextOffset, ico.length);
});

test('filenames stay stable until the source changes, then all are replaced', async () => {
  const first = await createFaviconSet(source);
  const repeat = await createFaviconSet(source);
  const replacement = await sharp({ create: { width: 512, height: 512, channels: 3, background: '#222222' } }).png().toBuffer();
  const changed = await createFaviconSet(replacement);
  assert.deepEqual(first, repeat);
  first.forEach((icon, index) => assert.notEqual(icon.filename, changed[index].filename));
});

test('rejects undersized or non-square source images', async () => {
  for (const [width, height] of [[32, 32], [512, 256]]) {
    const invalid = await sharp({ create: { width, height, channels: 3, background: '#000000' } }).png().toBuffer();
    await assert.rejects(createFaviconSet(invalid), /square and at least 180x180/);
  }
});

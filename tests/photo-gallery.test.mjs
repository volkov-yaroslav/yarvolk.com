import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import sharp from 'sharp';

const images = JSON.parse(await readFile(new URL('../src/data/photoshoot-images.json', import.meta.url), 'utf8'));
const imageDirectory = '/images/blog/my-first-professional-photoshoot';

const readBuild = path => readFile(new URL(`../dist/${path}/index.html`, import.meta.url), 'utf8');
const decode = value => value.replaceAll('&#34;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');

test('gallery dimensions and responsive candidates match the optimized files', async () => {
  for (const image of images) {
    const source = `${imageDirectory}/${image.filename}`;
    const full = await sharp(new URL(`../public${source}.webp`, import.meta.url).pathname).metadata();
    assert.equal(image.width, full.width, image.id);
    assert.equal(image.height, full.height, image.id);
    for (const width of [480, 900]) {
      const thumbnail = await sharp(new URL(`../public${source}-${width}w.webp`, import.meta.url).pathname).metadata();
      assert.equal(thumbnail.width, width, image.id);
      assert.ok(Math.abs(thumbnail.height - width * image.height / image.width) <= 1, image.id);
    }
  }
});

const translations = {
  en: { prefix: '', close: 'Close gallery', name: 'Yaroslav Volkov' },
  pl: { prefix: 'pl/', close: 'Zamknij galerię', name: 'Yaroslav Volkov' },
  ua: { prefix: 'ua/', close: 'Закрити галерею', name: 'Ярослав Волков' },
};

for (const [locale, { prefix, close, name }] of Object.entries(translations)) {
  test(`${locale}: all photos are server-rendered, localized, and usable without JavaScript`, async () => {
    const html = await readBuild(`${prefix}blog/first-photoshoot`);
    const gallery = html.match(/<photo-gallery\b[^>]*>[\s\S]*?<\/photo-gallery>/)?.[0];
    assert.ok(gallery, 'Build the site before running gallery tests');
    assert.doesNotMatch(gallery, /astro-island|<dialog/);
    const labels = JSON.parse(decode(gallery.match(/data-labels="([^"]+)"/)[1]));
    assert.equal(labels.close, close);
    for (const key of ['title', 'open', 'next', 'previous', 'zoom', 'zoomOut', 'of', 'hint', 'error']) {
      assert.ok(labels[key]?.length, `Missing ${locale} label: ${key}`);
    }
    const links = [...gallery.matchAll(/<a\b([^>]+)>([\s\S]*?)<\/a>/g)];
    assert.equal(links.length, images.length);
    links.forEach(([, attributes, content], index) => {
      const photo = images[index];
      const source = `${imageDirectory}/${photo.filename}`;
      assert.ok(attributes.includes(`href="${source}.webp"`));
      assert.ok(attributes.includes(`data-pswp-width="${photo.width}"`));
      assert.ok(attributes.includes(`data-pswp-height="${photo.height}"`));
      assert.ok(attributes.includes(`data-pswp-srcset="${source}-480w.webp 480w, ${source}-900w.webp 900w, ${source}.webp ${photo.width}w"`));
      const alt = content.match(/alt="([^"]+)"/)[1];
      const caption = content.match(/class="pswp-caption-content" hidden>([\s\S]*?)<\/span>/)[1];
      assert.equal(decode(caption), decode(alt));
      assert.ok(attributes.includes(`aria-label="${labels.open}: ${alt}"`));
    });
    assert.ok(gallery.includes(name));
    if (locale === 'ua') assert.ok(!gallery.includes('Yaroslav Volkov'));
  });

  test(`${locale}: About keeps its simple photo switcher, not a lightbox`, async () => {
    const html = await readBuild(`${prefix}about`);
    assert.match(html, /<about-photo-switcher/);
    assert.doesNotMatch(html, /<photo-gallery|data-pswp-width|PhotoGallery\.astro/);
  });
}

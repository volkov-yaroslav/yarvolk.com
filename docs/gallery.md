# Image Gallery

The blog uses a server-rendered Astro grid enhanced with PhotoSwipe 5 and its
official dynamic-caption plugin. The core viewer loads only when a photo opens.
Links still open the image if JavaScript is disabled. About intentionally keeps
its separate photo-swap button.

- Keep gestures, image transforms, keyboard navigation, and focus handling in
  PhotoSwipe. Do not add a second gesture or zoom implementation.
- Keep the toolbar visible (`tapAction: false`). All four icon buttons are 48px.
  PhotoSwipe hides navigation arrows on touch devices and restores them for mice.
- Native SVG view boxes are normalized so the drawings are centered inside the
  circular buttons. Keep this normalization if changing the button styles.
- Captions always sit below the fitted image, on every viewport. Their text width
  is independent of narrow portrait images so landscape layouts remain readable.
  The caption plugin reserves their height and hides them during zoom as usual.
- Keep labels in `src/lib/photoshoot.ts` synchronized for English, Polish, and
  Ukrainian. Captions come from the same localized descriptions as image alt text.
- Image dimensions in `src/data/photoshoot-images.json` must describe the actual
  full-size WebP files, not the original camera files. Thumbnail crops are separate.
- PhotoSwipe handles touch and wheel events. The `photo-gallery-open` class also
  locks document scrolling until the viewer finishes closing.

## Verification

Run `npm run build`, then `npm run test:gallery`. The deployment workflow runs
these checks before publishing.

Before releasing gallery interaction changes, also test on a real iPhone in
Safari and Chrome. A resized desktop browser does not verify touch gestures.

1. Open a photo from the middle of a scrolled article in each language.
2. Swipe between photos in both directions, including the first and last photo.
3. Pinch or double-tap to zoom, then drag horizontally and vertically. The zoomed
   photo should pan rather than unexpectedly switch to another photo.
4. Use the zoom icon to fit the photo again. Close must stay visible while zoomed.
5. Rotate the phone and expand/collapse the browser toolbar. Check that controls
   remain reachable and captions are readable.
6. Try scrolling the underlying page. Close the viewer and confirm that the page
   remains at the same position and can scroll again. Repeat opening and closing.
7. On desktop, also test arrows, Escape, Tab focus, zoom, dragging, Page Down,
   and mouse-wheel scrolling while the viewer is open.

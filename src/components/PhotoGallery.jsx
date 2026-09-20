import { useEffect, useRef, useState } from 'react';
import { galleryText } from '@lib/photoshoot';
import '@styles/components/photo-gallery.css';

export default function PhotoGallery({ photos, locale = 'en' }) {
  const text = galleryText[locale];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dialogRef = useRef(null);
  const swipeStart = useRef(null);
  const open = selectedIndex !== null;
  const selected = open ? photos[selectedIndex] : null;

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const root = document.documentElement;
    const body = document.body;
    const { scrollX, scrollY } = window;
    const bodyWidth = body.getBoundingClientRect().width;
    const changes = [
      [root, { overflow: 'hidden', 'overscroll-behavior': 'none', 'scroll-behavior': 'auto' }],
      [body, { position: 'fixed', top: `${-scrollY}px`, left: `${-scrollX}px`, width: `${bodyWidth}px`, overflow: 'hidden' }],
    ];
    const previousStyles = changes.map(([element, styles]) => [element,
      Object.keys(styles).map(property => [property, element.style.getPropertyValue(property), element.style.getPropertyPriority(property)]),
    ]);
    // Fix the body as well as locking the root, including on mobile Safari.
    changes.forEach(([element, styles]) => {
      Object.entries(styles).forEach(([property, value]) => element.style.setProperty(property, value));
    });
    dialog.showModal();
    return () => {
      dialog.close();
      previousStyles.forEach(([element, styles]) => {
        styles.forEach(([property, value, priority]) => {
          if (property !== 'scroll-behavior') element.style.setProperty(property, value, priority);
        });
      });
      window.scrollTo(scrollX, scrollY);
      const [, value, priority] = previousStyles[0][1].find(([property]) => property === 'scroll-behavior');
      root.style.setProperty('scroll-behavior', value, priority);
    };
  }, [open]);

  const showPhoto = index => {
    swipeStart.current = null;
    setDragOffset(0);
    setZoomed(false);
    setSelectedIndex(index);
  };
  const move = direction => showPhoto((selectedIndex + direction + photos.length) % photos.length);
  const openPhoto = (event, index) => {
    event.preventDefault();
    showPhoto(index);
  };
  const cancelSwipe = () => {
    swipeStart.current = null;
    setDragOffset(0);
  };

  return (
    <div className="photo-gallery not-prose photo-gallery--grid">
      <p className="photo-gallery-hint">{text.hint}</p>
      <div className="photo-gallery-grid">
        {photos.map((photo, index) => (
          <a key={photo.id} href={photo.large} onClick={event => openPhoto(event, index)} aria-label={`${text.open}: ${photo.alt}`}>
            <img src={photo.src} srcSet={photo.srcSet} sizes="(min-width: 1024px) 260px, (min-width: 640px) 30vw, 46vw" alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
            <span className="photo-gallery-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          </a>
        ))}
      </div>

      <dialog
        className="photo-dialog"
        ref={dialogRef}
        aria-label={text.title}
        onClose={() => { cancelSwipe(); setSelectedIndex(null); setZoomed(false); }}
        onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}
        onKeyDown={event => {
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
        }}
      >
        {selected && (
          <div className="photo-dialog-layout">
            <div className="photo-dialog-toolbar">
              <span aria-live="polite">{selectedIndex + 1} {text.of} {photos.length}</span>
              <button type="button" className="photo-dialog-icon" onClick={() => setZoomed(value => !value)} aria-pressed={zoomed} aria-label={zoomed ? text.zoomOut : text.zoom} title={zoomed ? text.zoomOut : text.zoom}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="m16 16 4 4M7.5 10.5h6" />
                  {!zoomed && <path d="M10.5 7.5v6" />}
                </svg>
              </button>
              <button type="button" className="photo-dialog-icon" autoFocus onClick={() => dialogRef.current.close()} aria-label={text.close} title={text.close}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="photo-dialog-stage">
              <button type="button" className="photo-dialog-icon photo-dialog-arrow photo-dialog-previous" aria-label={text.previous} onClick={() => move(-1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div
                className={`photo-dialog-image ${zoomed ? 'is-zoomed' : ''}`}
                onPointerDown={event => {
                  if (zoomed || !event.isPrimary || event.button !== 0) {
                    cancelSwipe();
                    return;
                  }
                  swipeStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerMove={event => {
                  const start = swipeStart.current;
                  if (!start || start.id !== event.pointerId) return;
                  const deltaX = event.clientX - start.x;
                  const deltaY = event.clientY - start.y;
                  setDragOffset(Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : 0);
                }}
                onPointerUp={event => {
                  const start = swipeStart.current;
                  cancelSwipe();
                  if (!start || start.id !== event.pointerId || zoomed) return;
                  const deltaX = event.clientX - start.x;
                  const deltaY = event.clientY - start.y;
                  if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) move(deltaX < 0 ? 1 : -1);
                }}
                onPointerCancel={cancelSwipe}
                onLostPointerCapture={cancelSwipe}
              >
                <img key={selected.id} src={selected.large} alt={selected.alt} width={selected.width} height={selected.height} draggable={false} style={{ transform: dragOffset ? `translateX(${dragOffset}px)` : undefined }} />
              </div>
              <button type="button" className="photo-dialog-icon photo-dialog-arrow photo-dialog-next" aria-label={text.next} onClick={() => move(1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m10 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
            <p className="photo-dialog-caption" aria-live="polite">{selected.alt}</p>
          </div>
        )}
      </dialog>
    </div>
  );
}

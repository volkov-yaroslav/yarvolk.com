import { useEffect, useRef, useState } from 'react';
import { galleryText } from '@lib/photoshoot';
import '@styles/components/photo-gallery.css';

export default function PhotoGallery({ photos, locale = 'en', variant = 'grid' }) {
  const text = galleryText[locale];
  const [frontIndex, setFrontIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef(null);
  const touchStart = useRef(null);
  const open = selectedIndex !== null;
  const selected = open ? photos[selectedIndex] : null;

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const showPhoto = index => {
    setZoomed(false);
    setSelectedIndex(index);
  };
  const move = direction => showPhoto((selectedIndex + direction + photos.length) % photos.length);
  const openPhoto = (event, index) => {
    event.preventDefault();
    showPhoto(index);
  };

  return (
    <div className={`photo-gallery not-prose photo-gallery--${variant}`}>
      {variant === 'stack' ? (
        <>
          <a className="photo-stack" href={photos[frontIndex].large} onClick={event => openPhoto(event, frontIndex)} aria-label={`${text.open}: ${photos[frontIndex].alt}`}>
            {[2, 1, 0].map(offset => {
              const photo = photos[(frontIndex + offset) % photos.length];
              return (
                <img
                  key={offset}
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 300px, 75vw"
                  alt={offset === 0 ? photo.alt : ''}
                  aria-hidden={offset !== 0}
                  width={photo.width}
                  height={photo.height}
                  loading={offset === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{ transform: `rotate(${offset === 0 ? 0 : offset === 1 ? -5 : 5}deg)`, zIndex: 3 - offset }}
                />
              );
            })}
          </a>
          <div className="photo-stack-actions">
            <button type="button" className="button button-sm button-dark" onClick={() => setFrontIndex(index => (index + 1) % photos.length)}>{text.next} <span aria-hidden="true">↻</span></button>
            <button type="button" className="photo-gallery-link" onClick={() => showPhoto(frontIndex)}>{text.viewAll}</button>
          </div>
          <p className="photo-stack-count" aria-live="polite">{frontIndex + 1} {text.of} {photos.length}</p>
        </>
      ) : (
        <>
          <p className="photo-gallery-hint">{text.hint}</p>
          <div className="photo-gallery-grid">
            {photos.map((photo, index) => (
              <a key={photo.id} href={photo.large} onClick={event => openPhoto(event, index)} aria-label={`${text.open}: ${photo.alt}`}>
                <img src={photo.src} srcSet={photo.srcSet} sizes="(min-width: 1024px) 260px, (min-width: 640px) 30vw, 46vw" alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
                <span className="photo-gallery-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </a>
            ))}
          </div>
        </>
      )}

      <dialog
        className="photo-dialog"
        ref={dialogRef}
        aria-label={text.title}
        onClose={() => { setSelectedIndex(null); setZoomed(false); }}
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
              <button type="button" onClick={() => setZoomed(value => !value)} aria-pressed={zoomed}>{zoomed ? text.zoomOut : text.zoom}</button>
              <button type="button" autoFocus onClick={() => dialogRef.current.close()}>{text.close} <span aria-hidden="true">×</span></button>
            </div>
            <div className="photo-dialog-stage">
              <button type="button" className="photo-dialog-arrow photo-dialog-previous" aria-label={text.previous} onClick={() => move(-1)}>‹</button>
              <div
                className={`photo-dialog-image ${zoomed ? 'is-zoomed' : ''}`}
                onTouchStart={event => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }}
                onTouchEnd={event => {
                  if (!touchStart.current || zoomed) return;
                  const deltaX = event.changedTouches[0].clientX - touchStart.current.x;
                  const deltaY = event.changedTouches[0].clientY - touchStart.current.y;
                  if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) move(deltaX < 0 ? 1 : -1);
                  touchStart.current = null;
                }}
              >
                <img key={selected.id} src={selected.large} alt={selected.alt} width={selected.width} height={selected.height} />
              </div>
              <button type="button" className="photo-dialog-arrow photo-dialog-next" aria-label={text.next} onClick={() => move(1)}>›</button>
            </div>
            <p className="photo-dialog-caption" aria-live="polite">{selected.alt}</p>
          </div>
        )}
      </dialog>
    </div>
  );
}

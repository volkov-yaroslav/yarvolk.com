declare module 'photoswipe-dynamic-caption-plugin' {
  import type PhotoSwipeLightbox from 'photoswipe/lightbox';

  export default class PhotoSwipeDynamicCaption {
    constructor(lightbox: PhotoSwipeLightbox, options?: {
      type?: 'auto' | 'below' | 'aside';
      mobileLayoutBreakpoint?: number;
      verticallyCenterImage?: boolean;
    });
  }
}

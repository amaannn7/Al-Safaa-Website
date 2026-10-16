import type { Image } from "./types";

/**
 * Photographs of Al-Safaa groups and journeys.
 *
 * Only add photos the agency owns, and only include identifiable pilgrims with
 * their permission. The /gallery/ page stays unpublished (404, excluded from
 * the sitemap) until this list has at least MIN_GALLERY_IMAGES entries.
 */
export const MIN_GALLERY_IMAGES = 6;

export interface GalleryImage extends Image {
  caption?: string;
  year?: number;
  width: number;
  height: number;
}

export const gallery: GalleryImage[] = [];

export const galleryIsPublished = gallery.length >= MIN_GALLERY_IMAGES;

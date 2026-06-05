import "server-only";

import sharp from "sharp";
import slugify from "slugify";

/**
 * Convert any raster image buffer into an optimised WebP buffer.
 *
 * The pipeline:
 *  1. `.rotate()` — honours the EXIF orientation so phone photos aren't sideways.
 *  2. resize to fit within `maxWidth` (default 1600px) WITHOUT enlarging smaller
 *     images, so we never upscale and soften artwork.
 *  3. encode to WebP at the requested quality (default 82 — a strong balance of
 *     fidelity and file size for product photography).
 */
export async function toWebp(
  input: Buffer,
  opts?: { maxWidth?: number; quality?: number }
): Promise<Buffer> {
  const maxWidth = opts?.maxWidth ?? 1600;
  const quality = opts?.quality ?? 82;

  return sharp(input)
    .rotate()
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality, effort: 4 })
    .toBuffer();
}

/**
 * Derive a clean, URL-safe `.webp` filename from any original filename.
 * e.g. "My Product Photo (final).PNG" → "my-product-photo-final.webp"
 */
export function webpFilename(original: string): string {
  const dot = original.lastIndexOf(".");
  const base = dot > 0 ? original.slice(0, dot) : original;
  const slug =
    slugify(base, { lower: true, strict: true, trim: true }) || "image";
  return `${slug}.webp`;
}

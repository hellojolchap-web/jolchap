import { renderOgImage, ogSize, ogContentType } from "@/lib/og/render";
import { siteConfig } from "@/config/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.name} — The Journal`;

export default async function Image() {
  return renderOgImage({
    eyebrow: "The Jolchap Journal",
    title: "Ideas worth printing.",
    chip: "Design tips & guides",
  });
}

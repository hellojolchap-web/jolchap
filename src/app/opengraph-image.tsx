import { renderOgImage, ogSize, ogContentType } from "@/lib/og/render";
import { siteConfig } from "@/config/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Custom Print Studio · Dhaka",
    title: "Make it yours.",
    chip: "Seals · Apparel · Mugs · Gifts",
    footer: "jolchap.com.bd",
  });
}

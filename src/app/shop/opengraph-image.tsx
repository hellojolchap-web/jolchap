import { renderOgImage, ogSize, ogContentType } from "@/lib/og/render";
import { siteConfig } from "@/config/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.name} — Shop all products`;

export default async function Image() {
  return renderOgImage({
    eyebrow: "All products",
    title: "Everything we make.",
    chip: "Made to order in Dhaka",
  });
}

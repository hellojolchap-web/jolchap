import { renderOgImage, ogSize, ogContentType } from "@/lib/og/render";
import { getCategory } from "@/lib/queries";
import { siteConfig } from "@/config/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.name} collection`;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return renderOgImage({ eyebrow: siteConfig.name, title: "Shop" });
  }

  return renderOgImage({
    eyebrow: category.tagline,
    title: category.name,
    chip: "Made to order",
    footer: "jolchap.com.bd",
  });
}

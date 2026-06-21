import { renderOgImage, ogSize, ogContentType } from "@/lib/og/render";
import { getProduct } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.name} product`;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return renderOgImage({ eyebrow: siteConfig.name, title: "Product" });
  }

  return renderOgImage({
    eyebrow: product.categoryName,
    title: product.name,
    chip: formatPrice(product.price, product.currency),
  });
}

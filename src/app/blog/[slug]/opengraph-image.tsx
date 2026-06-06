import { renderOgImage, ogSize, ogContentType } from "@/lib/og/render";
import { getBlogPost } from "@/lib/queries";
import { siteConfig } from "@/config/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "The Jolchap Journal";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return renderOgImage({ eyebrow: "The Jolchap Journal", title: "Article" });
  }

  return renderOgImage({
    eyebrow: post.category,
    title: post.title,
    chip: `${post.readingTime} min read`,
    footer: "The Jolchap Journal",
  });
}

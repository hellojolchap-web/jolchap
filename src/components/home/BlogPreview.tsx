import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPost } from "@/types";

/**
 * "From the Jolchap Journal" — the three most recent journal entries, rendered
 * with the shared BlogCard and linking through to the full journal.
 */
export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const latest = posts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className="section bg-bone">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="From the Jolchap Journal"
            title={
              <>
                Ideas worth <span className="text-gradient-ember">printing.</span>
              </>
            }
            intro="Design tips, gifting inspiration and behind-the-scenes stories from our Dhaka studio."
            className="max-w-2xl"
          />
          <Button href="/blog" variant="outline" size="md" className="hidden shrink-0 sm:inline-flex">
            Read the journal
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <BlogCard post={post} priority={i === 0} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:hidden">
          <Button href="/blog" variant="outline" size="md">
            Read the journal
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

/**
 * "Shop by category" — the catalogue's categories laid out as an editorial
 * bento grid. The first and fourth tiles span two columns/rows so the grid
 * reads like a curated magazine spread rather than a uniform thumbnail wall.
 */

/** Per-position spans + image sizes for a 12-col / 2-row bento on desktop. */
const layout = [
  { span: "lg:col-span-7 lg:row-span-2", sizes: "(max-width:1024px) 100vw, 58vw" },
  { span: "lg:col-span-5", sizes: "(max-width:1024px) 100vw, 42vw" },
  { span: "lg:col-span-5", sizes: "(max-width:1024px) 100vw, 42vw" },
  { span: "lg:col-span-4", sizes: "(max-width:1024px) 50vw, 33vw" },
  { span: "lg:col-span-4", sizes: "(max-width:1024px) 50vw, 33vw" },
  { span: "lg:col-span-4", sizes: "(max-width:1024px) 50vw, 33vw" },
] as const;

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  const tiles = categories.slice(0, 6);

  return (
    <section className="section bg-bone">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Shop by category"
            title={
              <>
                Find your <span className="text-gradient-ember">craft.</span>
              </>
            }
            intro="From stamps to apparel to gifts — pick a category and we'll help you make it yours."
            className="max-w-2xl"
          />
          <Link
            href="/shop"
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-onyx-900 transition-colors hover:text-ember-600 sm:inline-flex"
          >
            All categories
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-12 lg:gap-5">
          {tiles.map((category, i) => {
            const { span, sizes } = layout[i] ?? layout[5];
            const isLead = i === 0;

            return (
              <Reveal
                key={category.id}
                delay={i * 0.06}
                className={cn(
                  "group relative overflow-hidden rounded-3xl ring-1 ring-onyx-100",
                  // lead tile is full-width on mobile, large on desktop
                  isLead && "col-span-2",
                  span
                )}
              >
                <Link
                  href={`/category/${category.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Shop ${category.name}`}
                />
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes={sizes}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                {/* legibility gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/80 via-onyx-950/5 to-transparent" />

                {/* corner arrow chip */}
                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-ember-500 group-hover:text-white">
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ember-400">
                    {category.tagline}
                  </p>
                  <h3
                    className={cn(
                      "mt-1.5 font-display font-extrabold uppercase leading-none tracking-tightest text-white",
                      isLead ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
                    )}
                  >
                    {category.name}
                  </h3>
                  {isLead && (
                    <p className="mt-3 hidden max-w-md text-sm leading-relaxed text-white/70 sm:block">
                      {category.description}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

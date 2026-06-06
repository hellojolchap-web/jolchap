import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopBrowser } from "@/components/commerce/ShopBrowser";
import { getCategories, getProducts } from "@/lib/queries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shop All Products",
  description:
    "Browse every Jolchap product — custom seals & stamps, printed apparel, photo mugs, tote bags, personalised gifts and stationery, all made to order in Dhaka.",
  path: "/shop",
});

interface ShopPageProps {
  searchParams: Promise<{ q?: string; sort?: string; sale?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const [products, categories, params] = await Promise.all([
    getProducts(),
    getCategories(),
    searchParams,
  ]);

  return (
    <>
      <PageHeader
        kicker="All products"
        title="Everything we make."
        intro="Custom seals, printed apparel, photo mugs, tote bags, personalised gifts and wedding stationery — every item made to order right here in Dhaka."
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />

      <Suspense fallback={<ShopSkeleton />}>
        <ShopBrowser
          products={products}
          categories={categories}
          initial={{ q: params.q, sort: params.sort, sale: params.sale }}
        />
      </Suspense>
    </>
  );
}

function ShopSkeleton() {
  return (
    <div className="container py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[270px_1fr] xl:grid-cols-[290px_1fr]">
        <div className="hidden h-96 rounded-3xl bg-onyx-50 lg:block" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[4/5] animate-pulse rounded-2xl bg-onyx-100" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-onyx-100" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-onyx-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

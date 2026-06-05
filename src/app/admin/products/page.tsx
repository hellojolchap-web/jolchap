import Link from "next/link";
import { Plus } from "lucide-react";

import { getProducts } from "@/lib/queries";
import { Panel, EmptyState } from "@/components/admin/AdminUI";
import { ProductsTable } from "@/components/admin/ProductsTable";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ember-600">
            Catalogue
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-tightest text-onyx-950 sm:text-3xl">
            Products
          </h1>
          <p className="mt-1.5 text-sm text-onyx-500">
            {products.length} item{products.length === 1 ? "" : "s"} in the catalogue.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-ember-500 px-5 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-ember-600 hover:shadow-glow"
        >
          <Plus className="h-4 w-4" />
          New product
        </Link>
      </div>

      {products.length === 0 ? (
        <Panel>
          <EmptyState
            title="No products yet"
            hint="Create your first product to populate the storefront."
            action={
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ember-600 hover:text-ember-700"
              >
                <Plus className="h-4 w-4" />
                New product
              </Link>
            }
          />
        </Panel>
      ) : (
        <ProductsTable products={products} />
      )}
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, PackageX } from "lucide-react";

import { getProducts } from "@/lib/queries";
import { ProductForm } from "@/components/admin/ProductForm";
import { Panel } from "@/components/admin/AdminUI";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await getProducts();
  // Match by id first; fall back to slug so links remain robust.
  const product = products.find((p) => p.id === id) ?? products.find((p) => p.slug === id);

  if (!product) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-onyx-600 transition-colors hover:text-ember-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>
        <Panel className="p-12 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-onyx-50 text-onyx-400">
            <PackageX className="h-7 w-7" />
          </div>
          <h1 className="font-display text-xl font-extrabold uppercase tracking-tightest text-onyx-950">
            Product not found
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-onyx-500">
            No product matches{" "}
            <code className="font-mono text-[13px] text-onyx-700">{id}</code>. It may have
            been deleted or the link is out of date.
          </p>
          <Link
            href="/admin/products"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ember-500 px-5 text-sm font-semibold text-white shadow-glow-sm transition-all hover:bg-ember-600"
          >
            Back to catalogue
          </Link>
        </Panel>
      </div>
    );
  }

  return <ProductForm initial={product} />;
}

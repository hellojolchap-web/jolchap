import type { Metadata } from "next";
import Link from "next/link";

import { AdminSidebar, AdminMobileNav } from "@/components/admin/AdminNav";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { StatusPill } from "@/components/admin/AdminUI";
import { Logo } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/**
 * The admin shell.
 *
 * This layout sits *inside* the storefront root layout, so it paints an opaque,
 * fixed full-viewport surface (z above the sticky storefront header) that fully
 * takes over the screen — giving the admin its own dedicated chrome: a fixed
 * onyx sidebar on desktop and a slide-in drawer on mobile.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const configured = isSupabaseConfigured();

  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden bg-bone">
      {/* Desktop sidebar */}
      <AdminSidebar />

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-[72px] flex-shrink-0 items-center gap-3 border-b border-onyx-100 bg-white/80 px-4 backdrop-blur-xl sm:px-6">
          <AdminMobileNav />

          {/* Compact brand on mobile (sidebar logo is hidden there) */}
          <Link
            className="lg:hidden"
            href="/admin"
            aria-label="Jolchap admin"
          >
            <Logo markClassName="h-8 w-8" withWordmark={false} />
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <StatusPill connected={configured} />
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

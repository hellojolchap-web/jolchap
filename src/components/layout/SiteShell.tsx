"use client";

import { usePathname } from "next/navigation";

/**
 * Wraps the storefront chrome (announcement bar, header, footer, floating
 * widgets, cart) around page content — but steps aside on /admin routes, which
 * render their own full-screen dashboard shell.
 *
 * Server components are passed in as already-rendered slots so they keep being
 * server-rendered; only this thin pathname switch runs on the client.
 */
export function SiteShell({
  announcement,
  header,
  footer,
  widgets,
  cart,
  children,
}: {
  announcement: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  widgets: React.ReactNode;
  cart: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {announcement}
      {header}
      <main>{children}</main>
      {footer}
      {widgets}
      {cart}
    </>
  );
}

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Shape of the cookie array Supabase hands to `setAll`. */
type CookieToSet = { name: string; value: string; options: CookieOptions };

/** Optional admin allowlist — only these emails may reach /admin. */
const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** Allowlist empty ⇒ any signed-in user is treated as the admin. */
const isAdmin = (email: string) =>
  adminEmails.length === 0 || adminEmails.includes(email);

/**
 * Refreshes the Supabase auth session on every admin request and gates access.
 *
 * Behaviour:
 *  • `/admin/login` is always reachable (so unauthenticated users can sign in).
 *  • Every other `/admin/*` route requires an authenticated Supabase user.
 *  • If Supabase env vars are missing we treat the visitor as unauthenticated
 *    and send them to the login page (which renders a "connect Supabase" card).
 *
 * NOTE: This file lives in `src/` because the app uses a `src` directory — a
 * root-level middleware.ts is NOT picked up by Next.js in that layout.
 *
 * The cookie plumbing mirrors the @supabase/ssr middleware pattern so the
 * refreshed session is written back onto the outgoing response.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";

  // Response we will mutate cookies onto and ultimately return.
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  // Without credentials we can't authenticate anyone — allow only the login page.
  if (!url || !anonKey) {
    if (isLoginRoute) return response;
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // IMPORTANT: getUser() revalidates the token with Supabase (getSession() does not).
  let isAuthenticated = false;
  let userEmail = "";
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    isAuthenticated = Boolean(user);
    userEmail = user?.email?.toLowerCase() ?? "";
  } catch {
    isAuthenticated = false;
  }

  // Signed-in users shouldn't sit on the login screen.
  if (isLoginRoute) {
    if (isAuthenticated) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = isAdmin(userEmail) ? "/admin" : "/";
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }
    return response;
  }

  // Every other admin route requires authentication.
  if (!isAuthenticated) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  // Restrict the admin to the owner(s); anyone else signed in goes to the store.
  if (!isAdmin(userEmail)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
